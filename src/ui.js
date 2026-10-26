// @ts-check
// Modales, historial, configuración y avisos

import { exerciseName, sortExercises } from './exercise-names.js';
import { isolate } from './wheel-math.js';
import { getExercises, active, MAX_EXERCISES, DEFAULT_REPS_MIN, DEFAULT_REPS_MAX, MAX_REP_VALUE, COLOR_PALETTE } from './store.js';
import { THEME_CHOICES, THEME_BRAND, THEME_BG, getThemeChoice, resolveTheme, themeColor } from './theme.js';
import { WHATS_NEW_VERSION } from './whats-new.js';
import { playWinFanfare, vibrateResult } from './audio.js';
import { ICON_GROUPS, DEFAULT_ICON, getIcon, isValidIcon, searchIcons } from './icons.js';
import { shareChallenge } from './share.js';
import { t, getLanguage, getLanguageTag, groupName, iconLabel, LANGUAGES } from './i18n/index.js';

/**
 * @typedef {import('./wheel-math.js').Segment} Segment
 * @typedef {import('./wheel-math.js').Challenge} Challenge
 */

/** @param {string} id */
const $ = id => /** @type {HTMLElement} */ (document.getElementById(id));

// --- Utilidades ----------------------------------------------------------------------

/** @param {unknown} value */
function escapeHTML(value) {
  /** @type {Record<string, string>} */
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value).replace(/[&<>"']/g, c => entities[c]);
}

/**
 * HTML del icono (máscara CSS que hereda el color del texto). Cualquier id desconocido se
 * sustituye por el icono por defecto: nunca se pinta texto libre.
 * @param {string} [iconId]
 */
function renderIconHTML(iconId) {
  return `<span class="${getIcon(iconId).cls}" aria-hidden="true"></span>`;
}

/** @type {ReturnType<typeof setTimeout> | undefined} */
let toastTimer;

/** Aviso breve que deja pasar los toques. @param {string} message */
export function showToast(message) {
  $('toastText').textContent = message;
  $('toast').classList.remove('opacity-0');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').classList.add('opacity-0'), 2500);
}

/** @param {boolean} enabled */
export function setSoundIcon(enabled) {
  $('soundIcon').className = enabled
    ? 'fa-solid fa-volume-high text-sm text-brand-text'
    : 'fa-solid fa-volume-xmark text-sm text-slate-500';
}

/**
 * Marcador del sector bajo el puntero: [icono del ejercicio] nombre. Sin ejercicios activos
 * muestra un engranaje y "Configurar ruleta".
 * @param {Segment | undefined} seg
 * @param {boolean} [spinningFast] la ruleta gira deprisa: el texto se desenfoca
 */
export function updateLiveIndicator(seg, spinningFast = false) {
  if (!seg) return;
  const marker = $('liveIndicator');
  const hasExercise = seg.repsMax > 0;
  $('liveIndicatorIcon').innerHTML = hasExercise ? renderIconHTML(seg.icon) : '<i class="fa-solid fa-gear text-base" aria-hidden="true"></i>';
  $('liveIndicatorText').textContent = hasExercise ? seg.exercise : t('live.configure');
  marker.setAttribute('aria-label', hasExercise ? seg.exercise : t('live.configure'));
  marker.classList.toggle('is-spinning', spinningFast);
}

/** Rebote y destello del marcador al detenerse la ruleta sobre un sector. */
export function pulseIndicator() {
  const marker = $('liveIndicator');
  marker.classList.remove('is-landed');
  void marker.offsetWidth; // reinicia la animación aunque ya estuviera puesta
  marker.classList.add('is-landed');
  marker.addEventListener('animationend', () => marker.classList.remove('is-landed'), { once: true });
}

// --- Modales con soporte del botón Atrás -----------------------------------------------
// Cada modal que se abre añade una entrada al historial del navegador: así el botón
// "Atrás" de Android (o del navegador) lo cierra en lugar de salir de la app.

/** @typedef {'result' | 'history' | 'config' | 'share' | 'commitment' | 'document' | 'whatsnew' | 'addexercise'} ModalName */
// Pila de modales abiertos (el último es el que está encima): la política de privacidad
// puede abrirse sobre la configuración y Atrás debe cerrar primero la de arriba
/** @type {ModalName[]} */
const modalStack = [];
// popstate provocados por nuestro propio history.back() al cerrar un modal desde la interfaz:
// no deben cerrar además el modal que queda debajo
let ownPops = 0;
/** @type {Record<ModalName, () => void>} */
const closers = {
  result: () => closeResult(false),
  history: () => closeHistory(),
  config: () => backInSettings(),
  share: () => cancelShare(),
  commitment: () => closeCommitment(),
  document: () => closeDocument(),
  whatsnew: () => closeWhatsNew(),
  addexercise: () => closeAddExercise(),
};

/** @param {ModalName} name */
function pushModal(name) {
  if (modalStack.includes(name)) return;
  modalStack.push(name);
  window.history.pushState({ modal: name }, '');
}

/** @param {ModalName} name */
function dismissModal(name) {
  if (modalStack[modalStack.length - 1] !== name) return;
  modalStack.pop();
  ownPops++;
  window.history.back();
}

/**
 * Cierra el modal que está encima (equivale a "volver al paso anterior").
 * @returns {boolean} true si había alguno abierto
 */
export function closeActiveModal() {
  const name = modalStack[modalStack.length - 1];
  if (!name) return false;
  closers[name]();
  return true;
}

/** @type {HTMLElement | null} */
let lastFocused = null;

/**
 * Mueve el foco al propio diálogo (no a un botón: el anillo de foco quedaba pintado en el primer
 * botón) al abrirlo y lo devuelve al elemento anterior al cerrarlo.
 * @param {HTMLElement} modal @param {boolean} visible
 */
function manageFocus(modal, visible) {
  if (visible) {
    lastFocused = /** @type {HTMLElement | null} */ (document.activeElement);
    modal.focus({ preventScroll: true });
  } else if (lastFocused) {
    lastFocused.focus({ preventScroll: true });
    lastFocused = null;
  }
}

/** @param {string} modalId @param {string} cardId @param {boolean} visible */
function setSheetVisible(modalId, cardId, visible) {
  const modal = $(modalId);
  const card = $(cardId);
  modal.classList.toggle('opacity-0', !visible);
  modal.classList.toggle('pointer-events-none', !visible);
  card.classList.toggle('translate-y-full', !visible);
  card.classList.toggle('sm:scale-95', !visible);
  card.classList.toggle('translate-y-0', visible);
  card.classList.toggle('sm:scale-100', visible);
  modal.setAttribute('aria-hidden', String(!visible));
  manageFocus(modal, visible);
}

export function initModals() {
  window.addEventListener('popstate', () => {
    if (ownPops > 0) {
      ownPops--;
      return;
    }
    const name = modalStack.pop();
    if (name) closers[name]();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeActiveModal(); });
  // Tocar fuera de un panel no lo cierra: una pulsación errada no debe hacer perder lo que se estaba haciendo. Se sale con
  // Atrás, Esc o los botones del propio panel.
}

// --- Resultado -----------------------------------------------------------------------

/** @type {Challenge | null} */
let pendingWinner = null;
/** @type {((winner: Challenge) => void) | null} */
let onCompleted = null;

/** @param {(winner: Challenge) => void} cb se llama al confirmar un reto como completado */
export function setCompletedHandler(cb) { onCompleted = cb; }

/** Deja en el elemento solo la clase de tamaño elegida de la lista. @param {HTMLElement} el @param {string[]} sizes @param {number} chosen */
function setSizeClass(el, sizes, chosen) {
  sizes.forEach((size, i) => el.classList.toggle(size, i === chosen));
}

/** @param {Challenge} winner */
export function showResult(winner) {
  playWinFanfare();
  vibrateResult();

  $('winnerIconContainer').innerHTML = renderIconHTML(winner.icon);
  // Reto en dos niveles: repeticiones grandes y, debajo, el ejercicio. Las cifras largas y los nombres largos bajan
  // de tamaño para que quepan en la tarjeta; el h2 oculto lleva el reto entero para el lector de pantalla.
  $('winnerText').textContent = `${winner.reps} ${winner.exercise}`;
  const reps = String(winner.reps);
  setSizeClass($('winnerReps'), ['text-7xl', 'text-6xl', 'text-5xl'], reps.length <= 3 ? 0 : reps.length <= 5 ? 1 : 2);
  $('winnerReps').textContent = reps;
  setSizeClass($('winnerName'), ['text-2xl', 'text-xl', 'text-lg'], winner.exercise.length <= 20 ? 0 : winner.exercise.length <= 32 ? 1 : 2);
  $('winnerName').textContent = winner.exercise;
  $('winnerBar').style.backgroundColor = winner.color;

  $('resultModal').classList.remove('opacity-0', 'pointer-events-none');
  $('resultCard').classList.remove('scale-90');
  $('resultCard').classList.add('scale-100');
  $('resultModal').setAttribute('aria-hidden', 'false');
  manageFocus($('resultModal'), true);

  pendingWinner = winner;
  pushModal('result');
}

/** @type {AbortController | null} */
let shareAbort = null;

/** Pantalla de carga de compartir: tapa la app, la deja inerte (sin foco ni clics) y permite cancelar. */
function showShareLoading() {
  document.querySelectorAll('body > :not(#shareLoading):not(script)').forEach(el => {
    /** @type {HTMLElement} */ (el).inert = true;
  });
  $('shareLoading').classList.remove('hidden');
  $('shareLoading').focus({ preventScroll: true });
  pushModal('share');
}

function hideShareLoading() {
  if ($('shareLoading').classList.contains('hidden')) return;
  $('shareLoading').classList.add('hidden');
  document.querySelectorAll('body > [inert]').forEach(el => {
    /** @type {HTMLElement} */ (el).inert = false;
  });
  dismissModal('share');
  // El foco vuelve al resultado, que sigue abierto debajo
  if (!$('resultModal').classList.contains('pointer-events-none')) $('resultModal').focus({ preventScroll: true });
}

/**
 * Cancela compartir (botón Cancelar o Atrás) y vuelve al resultado. La operación cancelada puede seguir
 * terminando por detrás (una llamada nativa no se interrumpe), así que se suelta ya el control: un nuevo
 * toque en Compartir empieza de cero sin esperar a que acabe.
 */
export function cancelShare() {
  shareAbort?.abort();
  shareAbort = null;
  hideShareLoading();
}

/** Comparte el reto que se ve en el resultado (imagen y texto) por el menú del sistema. */
export async function shareResult() {
  const winner = pendingWinner;
  if (!winner || shareAbort) return;
  const abort = new AbortController();
  shareAbort = abort;
  showShareLoading();
  // Una ejecución cancelada que termina tarde no debe tocar la pantalla de carga de la siguiente
  const current = () => shareAbort === abort;
  try {
    // Sin conexión no hay nada que enviar desde aquí: la app solo entrega la imagen al sistema
    const outcome = await shareChallenge(winner, { signal: abort.signal, onReady: () => { if (current()) hideShareLoading(); } });
    if (outcome === 'saved' && current()) showToast(t('share.saved'));
  } catch (e) {
    if (current()) showToast(t('share.failed'));
  } finally {
    if (current()) {
      shareAbort = null;
      hideShareLoading();
    }
  }
}

// Solo los retos confirmados con el botón de completado pasan al historial
/** @param {boolean} completed */
export function closeResult(completed) {
  if (completed && pendingWinner) onCompleted?.(pendingWinner);
  pendingWinner = null;
  $('resultCard').classList.remove('scale-100');
  $('resultCard').classList.add('scale-90');
  $('resultModal').classList.add('opacity-0', 'pointer-events-none');
  $('resultModal').setAttribute('aria-hidden', 'true');
  manageFocus($('resultModal'), false);
  dismissModal('result');
}

// --- Historial -----------------------------------------------------------------------

/** @type {{ id: number, reps: number, exercise: string, icon: string, time: string }[]} */
const sessionHistory = [];

/** @param {Challenge} winner */
export function addToHistory(winner) {
  sessionHistory.unshift({
    id: Date.now(),
    reps: winner.reps,
    exercise: winner.exercise,
    icon: winner.icon,
    time: new Date().toLocaleTimeString(getLanguageTag(), { hour: '2-digit', minute: '2-digit' }),
  });
  renderHistory();
}

function clearHistory() {
  sessionHistory.length = 0;
  renderHistory();
}

const CLEAR_CONFIRM_MS = 3000;
/** @type {ReturnType<typeof setTimeout> | undefined} */
let clearConfirmTimer;

/** Pone «Limpiar historial» en su estado normal o en el de confirmación (rojo, «Pulsa otra vez»). @param {boolean} armed */
function setClearArmed(armed) {
  $('clearHistoryLabel').textContent = t(armed ? 'history.clearConfirm' : 'history.clear');
  const btn = $('clearHistoryBtn');
  btn.classList.toggle('text-red-300', armed);
  btn.classList.toggle('border-red-400/40', armed);
  btn.classList.toggle('text-slate-400', !armed);
  btn.classList.toggle('border-slate-700', !armed);
}

/** Vuelve «Limpiar historial» a su estado normal. */
function disarmClearHistory() {
  clearTimeout(clearConfirmTimer);
  clearConfirmTimer = undefined;
  setClearArmed(false);
}

/**
 * «Limpiar historial» pide una segunda pulsación para no borrar por accidente: la primera cambia el botón a
 * «Pulsa otra vez» y, si no se confirma en unos segundos, vuelve a su estado normal.
 */
export function requestClearHistory() {
  if (clearConfirmTimer === undefined) {
    if (sessionHistory.length === 0) return;
    setClearArmed(true);
    clearConfirmTimer = setTimeout(disarmClearHistory, CLEAR_CONFIRM_MS);
    return;
  }
  disarmClearHistory();
  clearHistory();
}

/** Resumen del pie: ejercicios hechos y repeticiones totales de la sesión. */
function historySummary() {
  const reps = sessionHistory.reduce((sum, h) => sum + h.reps, 0);
  return t('history.total', { n: sessionHistory.length, reps: reps.toLocaleString(getLanguageTag()) });
}

/**
 * Con ejercicios, la lista es un recuadro redondeado: arriba, fijo, el resumen y debajo una fila por ejercicio separadas por
 * una línea; «Limpiar historial» queda fuera, en el pie. Vacía, solo el aviso (sin recuadro, resumen ni botón).
 */
const HISTORY_BOX = ['bg-dark-900/60', 'border', 'border-slate-800'];

export function renderHistory() {
  const listEl = $('historyList');
  const box = $('historyBox');
  const header = $('historyHeader');
  const badge = $('historyBadge');

  if (sessionHistory.length === 0) {
    badge.classList.add('hidden');
    header.classList.add('hidden');
    header.classList.remove('flex');
    $('clearHistoryBtn').classList.add('hidden');
    $('clearHistoryBtn').classList.remove('flex');
    box.classList.remove(...HISTORY_BOX);
    listEl.innerHTML = `
      <div class="flex flex-col items-center text-center py-8 text-slate-500 text-xs">
        <i class="fa-solid fa-clipboard-list text-2xl mb-2 opacity-40"></i>
        ${escapeHTML(t('history.empty'))}
      </div>`;
    return;
  }

  badge.textContent = String(sessionHistory.length);
  badge.classList.remove('hidden');
  $('totalCompletedText').textContent = historySummary();
  header.classList.remove('hidden');
  header.classList.add('flex');
  $('clearHistoryBtn').classList.remove('hidden');
  $('clearHistoryBtn').classList.add('flex');
  box.classList.add(...HISTORY_BOX);
  listEl.innerHTML = sessionHistory.map(h => `
    <div class="px-3.5 py-3 flex justify-between items-center gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <div class="min-w-10 h-10 px-1.5 shrink-0 rounded-xl bg-brand-500/10 text-brand-text flex items-center justify-center font-black ${String(h.reps).length > 3 ? 'text-xs' : 'text-sm'} border border-brand-500/20">${h.reps}</div>
        <div class="min-w-0">
          <h4 class="font-bold text-white text-xs break-words">${escapeHTML(isolate(h.exercise))}</h4>
          <span class="text-xs text-slate-300 font-medium">${escapeHTML(h.time)}</span>
        </div>
      </div>
      <span class="shrink-0 text-xl text-brand-text/80 flex items-center">${renderIconHTML(h.icon)}</span>
    </div>`).join('');
}

const HUB_LABEL_MAX = 24;
const HUB_LABEL_MIN = 9;
const HUB_LABEL_RATIO = 0.85;
/** @type {CanvasRenderingContext2D | null} */
let hubMeasure = null;

/**
 * Botón central de girar: el texto (y el icono, que va en proporción) rellena el hueco cuando sobra sitio y baja de tamaño si
 * no cabe (palabras largas en otros idiomas, ruletas pequeñas), así que nunca desborda. Se vuelve a ajustar al cambiar el tamaño
 * del botón (giro de pantalla, barra lateral), el idioma y al cargar las fuentes.
 */
export function fitSpinHub() {
  const hub = $('spinHub');
  const icon = $('spinHubIcon');
  const label = $('spinHubLabel');
  const width = hub.clientWidth;
  const height = hub.clientHeight;
  const text = label.textContent || '';
  if (!width || !height || !text) return;
  hubMeasure ??= document.createElement('canvas').getContext('2d');
  if (!hubMeasure) return;
  const cs = getComputedStyle(label);
  hubMeasure.font = `${cs.fontWeight} 100px ${cs.fontFamily}`;
  const textAt100 = hubMeasure.measureText(text).width || 1;
  // El texto va en la mitad baja del círculo: de borde a borde no tiene todo el ancho. Icono (casi el doble que el texto), hueco y texto caben en el alto sin llenarlo
  const byWidth = (100 * 0.64 * width) / textAt100;
  const byHeight = 0.19 * height;
  const size = Math.max(HUB_LABEL_MIN, Math.min(HUB_LABEL_MAX, byWidth, byHeight));
  label.style.fontSize = `${(size * HUB_LABEL_RATIO).toFixed(1)}px`; // el texto, un pelín por debajo de la medida con la que se calcula el icono
  icon.style.fontSize = `${(size * 1.9).toFixed(1)}px`;
  icon.style.marginBottom = `${(size * 0.2).toFixed(1)}px`;
}

/** Ajusta el botón central ahora y cada vez que cambie de tamaño o terminen de cargar las fuentes. */
export function initSpinHub() {
  fitSpinHub();
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(fitSpinHub).observe($('spinHub'));
  document.fonts?.ready.then(fitSpinHub);
}

/** Bloquea o libera los botones de Historial, Ajustes y girar (mientras gira la ruleta). @param {boolean} locked */
export function setPanelsLocked(locked) {
  // También los dos botones de girar (el central y el de la barra o del pie): mientras gira, quedan apagados
  document.querySelectorAll('[data-action=open-history], [data-action=open-settings], [data-action=spin]').forEach(btn => {
    /** @type {HTMLButtonElement} */ (btn).disabled = locked;
  });
}

export function openHistory() {
  setSheetVisible('historyModal', 'historyCard', true);
  pushModal('history');
}

export function closeHistory() {
  if (clearConfirmTimer !== undefined) disarmClearHistory();
  setSheetVisible('historyModal', 'historyCard', false);
  dismissModal('history');
}

// --- Configuración -------------------------------------------------------------------

/** Id del ejercicio con el editor de repeticiones abierto (solo uno a la vez) */
let repsEditorOpen = '';

/** @param {string} id */
const repsInputId = (id, /** @type {string} */ kind) => `reps${kind}-${id}`;

/** Segundos que la línea borrada sigue en la lista con su aviso «Deshacer» */
const UNDO_MS = 5000;
/** Lo que dura el fundido de la línea al borrarla y el plegado al terminar el plazo */
const FADE_MS = 300;

/**
 * Ejercicio ya borrado del almacén cuya línea sigue en la lista (atenuada, con «Deshacer») hasta que pasa el plazo.
 * @type {{ exercise: import('./wheel-math.js').Exercise, checked: boolean, startedAt: number, undo: () => void, timer: ReturnType<typeof setTimeout>, state: 'fresh' | 'shown' | 'folding' } | null}
 */
let removal = null;

/**
 * Empieza el plazo para deshacer un borrado: la línea se desvanece y se superpone «Ejercicio eliminado · Deshacer».
 * Si ya había otra línea en plazo, esa queda borrada del todo.
 * @param {import('./wheel-math.js').Exercise} exercise @param {() => void} undo restaura el ejercicio en el almacén
 */
export function startRemoval(exercise, undo) {
  settleRemoval();
  // La casilla se lee antes de repintar: la línea desvanecida conserva el aspecto que tenía
  const box = Array.from(document.querySelectorAll('.ex-checkbox')).find(cb => /** @type {HTMLInputElement} */ (cb).value === exercise.name);
  removal = { exercise, checked: !!(/** @type {HTMLInputElement | undefined} */ (box)?.checked), startedAt: Date.now(), undo, state: 'fresh', timer: setTimeout(foldRemoval, UNDO_MS) };
  renderConfig(true);
  // El primer pintado lleva la línea visible; el siguiente la desvanece (sin esto no habría transición)
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (removal?.exercise !== exercise) return;
    removal.state = 'shown';
    // Se alternan las clases de los elementos ya pintados: si se repintara el HTML no habría transición
    const row = document.querySelector('#exsCheckboxes [data-removed]');
    row?.querySelector('[data-removed-old]')?.classList.add('opacity-0');
    row?.querySelector('[data-removed-note]')?.classList.remove('opacity-0');
    const undoButton = row?.querySelector('[data-action="undo-delete"]');
    undoButton?.removeAttribute('tabindex');
    // El botón que se pulsó ya no existe: el foco pasa a «Deshacer» para quien navega con teclado o lector de pantalla
    if (!document.activeElement || document.activeElement === document.body) /** @type {HTMLElement | null | undefined} */ (undoButton)?.focus({ preventScroll: true });
    $('removalLive').textContent = t('config.deleted');
    syncRemovalBar();
  }));
}

/** Pulsación de «Deshacer»: el ejercicio vuelve y su línea reaparece. */
export function undoRemoval() {
  if (!removal) return;
  const { undo, exercise } = removal;
  clearTimeout(removal.timer);
  removal = null;
  $('removalLive').textContent = '';
  undo();
  const box = Array.from(document.querySelectorAll('.ex-checkbox')).find(cb => /** @type {HTMLInputElement} */ (cb).value === exercise.name);
  /** @type {HTMLElement | undefined} */ (box)?.focus({ preventScroll: true });
}

/** Pasado el plazo: la línea se pliega y desaparece. */
function foldRemoval() {
  if (!removal) return;
  removal.state = 'folding';
  const row = document.querySelector('#exsCheckboxes [data-removed]');
  row?.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
  row?.classList.add('-mb-2', 'opacity-0');
  const hadFocus = !!row?.contains(document.activeElement);
  row?.querySelector('[data-action="undo-delete"]')?.setAttribute('tabindex', '-1');
  $('removalLive').textContent = '';
  const current = removal;
  removal.timer = setTimeout(() => {
    if (removal !== current) return;
    removal = null;
    renderConfig(true);
    if (hadFocus && (!document.activeElement || document.activeElement === document.body)) {
      // La línea desapareció con el foco dentro: pasa a «Añadir» (que ya se puede usar si la lista estaba llena) o, si no, a la primera casilla.
      // Se hace tras repintar la lista: antes, la casilla enfocada se destruía con el repintado
      const add = /** @type {HTMLButtonElement} */ ($('addExerciseBtn'));
      const target = add.disabled ? document.querySelector('#exsCheckboxes .ex-checkbox') ?? document.querySelector('[data-action="toggle-exs"]') : add;
      /** @type {HTMLElement | null} */ (target)?.focus({ preventScroll: true });
    }
  }, FADE_MS);
}

/**
 * Barra fina en el borde de la línea borrada que se vacía a lo largo del plazo. Se ajusta con el tiempo que queda
 * (un repintado a mitad de plazo no la reinicia) y por JS, porque la duración depende de ese resto.
 */
function syncRemovalBar() {
  const bar = /** @type {HTMLElement | null} */ (document.querySelector('#exsCheckboxes [data-removed-bar]'));
  if (!bar || !removal || removal.state === 'fresh') return;
  const left = Math.max(0, UNDO_MS - (Date.now() - removal.startedAt));
  bar.style.transition = 'none';
  bar.style.width = `${(left / UNDO_MS) * 100}%`;
  void bar.offsetWidth; // fija el ancho de partida antes de animar
  bar.style.transition = `width ${left}ms linear`;
  bar.style.width = '0%';
}

/** Da el borrado por definitivo sin esperar: el ejercicio ya no está en el almacén, solo se quita la línea. */
export function settleRemoval() {
  if (!removal) return;
  clearTimeout(removal.timer);
  removal = null;
  $('removalLive').textContent = '';
  renderConfig(true);
}

/** @param {boolean} [keepChecks] conserva las casillas marcadas que aún no se han guardado */
export function renderConfig(keepChecks = false) {
  const pending = keepChecks
    ? new Map(Array.from(document.querySelectorAll('.ex-checkbox')).map(cb => [/** @type {HTMLInputElement} */ (cb).value, /** @type {HTMLInputElement} */ (cb).checked]))
    : null;
  const isOn = (/** @type {string} */ name) => (pending?.has(name) ? !!pending.get(name) : active.exercises.includes(name));
  const inputClass = 'min-h-[44px] w-full px-2.5 py-1.5 text-xs bg-dark-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-brand-500';

  const ghost = removal?.exercise;
  $('exsCheckboxes').innerHTML = sortExercises(ghost ? [...getExercises(), ghost] : getExercises()).map(ex => {
    if (removal && ex === ghost) return renderRemovedRow(ex, removal.state, removal.checked);
    const open = repsEditorOpen === ex.id;
    const range = t('config.repsRange', { min: ex.repsMin, max: ex.repsMax });
    const name = exerciseName(ex);
    return `
    <div class="rounded-xl bg-dark-950 border border-slate-800">
      <div class="flex flex-wrap items-stretch min-h-[48px]">
        <label class="flex items-center gap-2 cursor-pointer flex-1 min-w-[9rem] ps-2.5 pe-2 py-2">
          <input type="checkbox" value="${escapeHTML(ex.name)}" ${isOn(ex.name) ? 'checked' : ''} class="ex-checkbox w-4 h-4 shrink-0 rounded text-brand-text focus:ring-brand-500 bg-dark-900 border-slate-700">
          <span class="text-xs font-bold text-white flex items-center gap-2 min-w-0">
            <span class="text-brand-text text-lg flex items-center shrink-0">${renderIconHTML(ex.icon)}</span>
            <span class="min-w-0 break-words">${escapeHTML(name)}</span>
          </span>
        </label>
        <div class="flex items-stretch shrink-0 ms-auto">
          <button data-action="edit-reps" data-arg="${escapeHTML(ex.id)}" aria-expanded="${open}" aria-label="${escapeHTML(t('config.editReps', { name }))}" class="flex items-center justify-center min-h-[44px] px-2 shrink-0 text-xs font-bold text-brand-text hover:underline">
            <bdi dir="ltr">${escapeHTML(range)}</bdi>
          </button>
          <button data-action="delete-exercise" data-arg="${escapeHTML(ex.id)}" aria-label="${escapeHTML(t('config.deleteExercise', { name }))}" class="flex items-center justify-center w-11 shrink-0 text-slate-500 hover:text-red-400 text-xs transition-colors">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
      <div class="${open ? '' : 'hidden'} grid grid-cols-[1fr_1fr_auto] items-end gap-2 px-2.5 pb-2.5 pt-1 border-t border-slate-800/80">
        <label class="block text-xs font-bold text-slate-400">${escapeHTML(t('config.repsMin'))}
          <input type="number" dir="ltr" inputmode="numeric" id="${repsInputId(ex.id, 'Min')}" value="${ex.repsMin}" min="1" max="${MAX_REP_VALUE}" class="${inputClass} mt-1">
        </label>
        <label class="block text-xs font-bold text-slate-400">${escapeHTML(t('config.repsMax'))}
          <input type="number" dir="ltr" inputmode="numeric" id="${repsInputId(ex.id, 'Max')}" value="${ex.repsMax}" min="1" max="${MAX_REP_VALUE}" class="${inputClass} mt-1">
        </label>
        <button data-action="save-reps" data-arg="${escapeHTML(ex.id)}" class="min-h-[44px] px-3 py-1.5 bg-brand-500/20 text-brand-text border border-brand-500/30 rounded-xl text-xs font-bold hover:bg-brand-500/30 transition-all">${escapeHTML(t('config.repsSave'))}</button>
      </div>
    </div>`;
  }).join('');
  syncRemovalBar();
  syncAddExercise();
}

/** Con el máximo de ejercicios, «Añadir nuevo ejercicio» se desactiva y el motivo queda a la vista (no tras rellenar el formulario). */
function syncAddExercise() {
  // La línea recién borrada aún ocupa su sitio: si se llenara la lista, «Deshacer» ya no podría devolverla
  const full = getExercises().length + (removal ? 1 : 0) >= MAX_EXERCISES;
  /** @type {HTMLButtonElement} */ ($('addExerciseBtn')).disabled = full;
  $('addExerciseHint').textContent = full ? t('error.maxExercises', { max: MAX_EXERCISES }) : '';
  $('addExerciseHint').classList.toggle('hidden', !full);
}

/**
 * Línea de un ejercicio recién borrado: su contenido se desvanece (conserva el alto) y encima queda el aviso (con el
 * texto a la izquierda, a la altura de la casilla y gris como la papelera) y «Deshacer»; al terminar el plazo se pliega. Clases literales para que Tailwind las genere.
 * @param {import('./wheel-math.js').Exercise} ex @param {'fresh' | 'shown' | 'folding'} state @param {boolean} checked
 */
function renderRemovedRow(ex, state, checked) {
  const faded = state !== 'fresh';
  const folded = state === 'folding';
  const name = exerciseName(ex);
  return `
    <div data-removed class="grid transition-all duration-300 ${folded ? 'grid-rows-[0fr] -mb-2 opacity-0' : 'grid-rows-[1fr]'}">
      <div class="relative min-h-0 overflow-hidden rounded-xl bg-dark-950 border border-slate-800">
        <div data-removed-old aria-hidden="true" class="flex items-stretch min-h-[48px] transition-opacity duration-500 ease-in-out ${faded ? 'opacity-0' : ''}">
          <div class="flex items-center gap-2 flex-1 min-w-0 ps-2.5 pe-2 py-2">
            <input type="checkbox" tabindex="-1" ${checked ? 'checked' : ''} class="pointer-events-none w-4 h-4 shrink-0 rounded text-brand-text bg-dark-900 border-slate-700">
            <span class="text-brand-text text-lg flex items-center shrink-0">${renderIconHTML(ex.icon)}</span>
            <span class="text-xs font-bold text-white min-w-0 break-words">${escapeHTML(name)}</span>
          </div>
          <div class="flex items-stretch shrink-0 ms-auto">
            <span class="flex items-center px-2 text-xs font-bold text-brand-text"><bdi dir="ltr">${escapeHTML(t('config.repsRange', { min: ex.repsMin, max: ex.repsMax }))}</bdi></span>
            <span class="flex items-center justify-center w-11 text-slate-500 text-xs"><i class="fa-solid fa-trash-can"></i></span>
          </div>
        </div>
        <div data-removed-note class="absolute inset-0 flex items-center gap-2 ps-2.5 pe-1 transition-opacity duration-500 ease-in-out ${faded ? '' : 'opacity-0'}">
          <span class="flex-1 text-xs font-bold text-slate-400 min-w-0 break-words">${escapeHTML(t('config.deleted'))}</span>
          <button data-action="undo-delete" ${faded && !folded ? '' : 'tabindex="-1"'} class="group shrink-0 flex items-center gap-1.5 min-h-[44px] px-3 rounded-lg whitespace-nowrap text-xs font-black text-brand-text"><i class="fa-solid fa-rotate-left" aria-hidden="true"></i><span class="group-hover:underline">${escapeHTML(t('config.undo'))}</span></button>
        </div>
        <div data-removed-bar aria-hidden="true" class="absolute bottom-0 start-0 h-0.5 w-full bg-brand-500/50"></div>
      </div>
    </div>`;
}

/**
 * Muestra u oculta un bloque plegable y mantiene aria-expanded de su botón.
 * @param {string} buttonId @param {string} panelId @param {boolean} open
 */
function setDisclosure(buttonId, panelId, open) {
  $(panelId).classList.toggle('hidden', !open);
  $(buttonId).setAttribute('aria-expanded', String(open));
}

/** Muestra u oculta la ayuda del editor (botón con interrogación). */
export function toggleConfigHelp() {
  setDisclosure('configHelpBtn', 'configHelp', $('configHelp').classList.contains('hidden'));
}

/** Abre la ventana de nuevo ejercicio (encima de Ajustes), con el formulario vacío y el cursor en el nombre. */
export function openAddExercise() {
  resetNewExerciseForm();
  setSheetVisible('addExerciseModal', 'addExerciseCard', true);
  pushModal('addexercise');
  $('newExName').focus({ preventScroll: true });
}

/** Cierra la ventana de nuevo ejercicio sin guardar nada: se vuelve a la lista. */
export function closeAddExercise() {
  setSheetVisible('addExerciseModal', 'addExerciseCard', false);
  dismissModal('addexercise');
}

/** Deja a la vista el último ejercicio creado en la lista del editor. */
export function revealLastExercise() {
  const last = getExercises().at(-1);
  if (!last) return;
  const box = Array.from(document.querySelectorAll('.ex-checkbox')).find(cb => /** @type {HTMLInputElement} */ (cb).value === last.name);
  box?.closest('label')?.scrollIntoView({ block: 'nearest' });
}

/** Abre o cierra el editor de repeticiones de un ejercicio. @param {string} id */
export function toggleRepsEditor(id) {
  repsEditorOpen = repsEditorOpen === id ? '' : id;
  renderConfig(true);
}

/** Lee el rango escrito en el editor de un ejercicio. @param {string} id */
export function readRepsEditor(id) {
  return {
    min: /** @type {HTMLInputElement} */ ($(repsInputId(id, 'Min'))).value,
    max: /** @type {HTMLInputElement} */ ($(repsInputId(id, 'Max'))).value,
  };
}

// --- Ajustes ---------------------------------------------------------------------------
// Un único panel con cuatro pantallas: el menú (Configurar ruleta, Apariencia, Idioma, Compromiso de
// privacidad y Créditos) y, dentro, el editor de ejercicios, la apariencia y el idioma. Las pantallas no
// añaden entradas al historial: Atrás vuelve al menú y, desde el menú, cierra el panel.

/** @typedef {'menu' | 'wheel' | 'appearance' | 'language'} SettingsView */
/** @type {SettingsView} */
let settingsView = 'menu';
const VIEW_TITLE_KEYS = /** @type {Record<SettingsView, string>} */ ({
  menu: 'settings.title',
  wheel: 'config.title',
  appearance: 'settings.appearance',
  language: 'config.language',
});
const THEME_NAME_KEYS = { system: 'appearance.system', calm: 'appearance.calm', light: 'appearance.light', classic: 'appearance.classic' };
/** Nombre de una apariencia; «Sistema» lleva entre paréntesis la que pide el dispositivo (no la que se ve ahora, que puede ser otra elegida a mano): «Sistema (oscuro)» o «Sistema (claro)». @param {import('./theme.js').ThemeChoice} choice */
function themeLabel(choice) {
  const name = t(THEME_NAME_KEYS[choice]);
  if (choice !== 'system') return name;
  return `${name} (${t(THEME_NAME_KEYS[resolveTheme('system')]).toLocaleLowerCase(getLanguageTag())})`;
}
const THEME_DESC_KEYS = { system: 'appearance.systemDesc', calm: 'appearance.calmDesc', light: 'appearance.lightDesc', classic: 'appearance.classicDesc' };

/**
 * @param {SettingsView} view
 * @param {boolean} [moveFocus] lleva el foco al título de la pantalla nueva: el botón que se pulsó queda oculto y, sin esto,
 *   el teclado y el lector de pantalla se quedarían sin sitio
 */
export function showSettingsView(view, moveFocus = true) {
  settingsView = view;
  document.querySelectorAll('#configCard [data-view]').forEach(el => {
    el.classList.toggle('invisible', /** @type {HTMLElement} */ (el).dataset.view !== view);
  });
  $('configTitle').textContent = t(VIEW_TITLE_KEYS[view]);
  $('settingsBack').classList.toggle('hidden', view === 'menu');
  $('settingsBack').classList.toggle('flex', view !== 'menu');
  setDisclosure('configHelpBtn', 'configHelp', false);
  // Todo se guarda al momento: sin botones de guardar. La X cierra Ajustes desde cualquier pantalla y la flecha vuelve al menú
  // Cada pantalla empieza arriba (las otras siguen ahí, ocultas, con su propio desplazamiento)
  document.querySelectorAll('#configCard [data-view], #languageOptions').forEach(el => { el.scrollTop = 0; });
  if (moveFocus) $('configTitle').focus({ preventScroll: true });
}

/** Atrás dentro de Ajustes: de una pantalla al menú; desde el menú, cierra el panel. */
function backInSettings() {
  if (settingsView === 'menu') {
    closeConfig();
    return;
  }
  showSettingsView('menu');
  pushModal('config'); // si Atrás ya sacó el panel de la pila, vuelve a ponerlo (si no, no hace nada)
}

/** Vuelve al menú desde la flecha del encabezado. */
export function settingsBack() {
  showSettingsView('menu');
}

/** Pinta los textos que se generan por código: título, valores del menú, apariencias e idiomas. */
export function renderSettings() {
  const lang = getLanguage();
  const theme = getThemeChoice();
  $('configTitle').textContent = t(VIEW_TITLE_KEYS[settingsView]);
  $('settingsThemeValue').textContent = themeLabel(theme);
  $('settingsLanguageValue').textContent = LANGUAGES.find(l => l.code === lang)?.name ?? '';

  const row = 'w-full flex items-center justify-between gap-3 min-h-[48px] px-3.5 py-2 text-start hover:bg-dark-800/60 active:bg-dark-800 transition-colors';
  const check = '<i class="fa-solid fa-check text-brand-text text-sm shrink-0" aria-hidden="true"></i>';
  $('languageOptions').innerHTML = LANGUAGES.map(l => {
    const selected = l.code === lang;
    return `<button type="button" role="radio" aria-checked="${selected}" data-action="set-language" data-arg="${l.code}" lang="${l.tag}" class="${row}">
      <span class="text-sm font-bold ${selected ? 'text-white' : 'text-slate-300'}">${escapeHTML(l.name)}</span>${selected ? check : ''}
    </button>`;
  }).join('');

  $('themeOptions').innerHTML = THEME_CHOICES.map(id => {
    const selected = id === theme;
    return `<button type="button" role="radio" aria-checked="${selected}" data-action="set-theme" data-arg="${id}" class="w-full flex items-center gap-3 text-start rounded-2xl border p-3 transition-colors ${selected ? 'border-brand-500 bg-brand-500/10' : 'border-slate-800 bg-dark-900/60 hover:bg-dark-800/60'}">
      <span class="min-w-0 flex-1">
        <span class="flex items-center justify-between gap-3">
          <span class="text-sm font-black text-white min-w-0 break-words">${escapeHTML(themeLabel(id))}</span>
          <span class="w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${selected ? 'border-brand-500' : 'border-slate-600'}" aria-hidden="true">${selected ? '<span class="w-2.5 h-2.5 rounded-full bg-brand-500"></span>' : ''}</span>
        </span>
        <span class="block text-xs text-slate-400 mt-1">${escapeHTML(t(THEME_DESC_KEYS[id]))}</span>
      </span>
      <span class="relative h-14 w-20 shrink-0 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden" aria-hidden="true" data-preview="${id}"></span>
    </button>`;
  }).join('');
  // Vista previa: una mini ruleta sobre el fondo de la apariencia (en «Sistema», mitad oscuro y mitad claro). Los colores se
  // ponen con el DOM: la CSP prohíbe los estilos en línea escritos en el HTML
  document.querySelectorAll('[data-preview]').forEach(box => {
    const choice = /** @type {import('./theme.js').ThemeChoice} */ (/** @type {HTMLElement} */ (box).dataset.preview);
    const id = choice === 'system' ? resolveTheme('system') : choice; // «Sistema» enseña la ruleta de la apariencia que pide el dispositivo, aunque ahora se vea otra
    const bg = THEME_BG[id];
    /** @type {HTMLElement} */ (box).style.background = choice === 'system' ? `linear-gradient(135deg, ${THEME_BG.calm} 50%, ${THEME_BG.light} 50%)` : bg;
    const slice = 100 / 6;
    const wheel = document.createElement('span');
    wheel.className = 'relative block h-10 w-10 rounded-full border-2';
    wheel.style.borderColor = THEME_BRAND[id];
    wheel.style.background = `conic-gradient(${COLOR_PALETTE.slice(0, 6).map((c, i) => `${themeColor(c, id)} 0 ${(i + 1) * slice}%`).join(', ')})`;
    const hub = document.createElement('span');
    hub.className = 'absolute inset-[30%] block rounded-full';
    hub.style.background = bg;
    wheel.appendChild(hub);
    box.appendChild(wheel);
  });
}

// --- Novedades ---------------------------------------------------------------------------

/** Pinta los textos con parámetros (título y tarjeta para elegir la apariencia); el resto va con data-i18n. */
function renderWhatsNew() {
  $('whatsNewTitle').textContent = t('whatsnew.title', { version: WHATS_NEW_VERSION });
  // Los nombres salen de los mismos textos que Ajustes: lo que dice el aviso es siempre lo que se verá en pantalla
  const options = new Intl.ListFormat(getLanguageTag(), { style: 'long', type: 'disjunction' }).format(THEME_CHOICES.map(c => t(THEME_NAME_KEYS[c])));
  $('whatsNewClassicText').textContent = t('whatsnew.classicText', {
    settings: t('settings.title'),
    appearance: t('settings.appearance'),
    options,
  });
}

export function openWhatsNew() {
  renderWhatsNew();
  setSheetVisible('whatsNewModal', 'whatsNewCard', true);
  pushModal('whatsnew');
}

export function closeWhatsNew() {
  setSheetVisible('whatsNewModal', 'whatsNewCard', false);
  dismissModal('whatsnew');
}

/** Del aviso a Apariencia: Ajustes ocupa el sitio de las novedades en la pila, así que Atrás lo cierra sin volver al aviso. */
export function whatsNewToAppearance() {
  setSheetVisible('whatsNewModal', 'whatsNewCard', false);
  openSettingsAt('appearance', 'whatsnew');
}

/** Abre Ajustes en el menú. */
export function openSettings() {
  openSettingsAt('menu');
}

/** Abre Ajustes directamente en el editor de ejercicios (por ejemplo, cuando la ruleta no tiene nada activo). */
export function openConfig() {
  openSettingsAt('wheel');
}

/**
 * @param {SettingsView} view
 * @param {ModalName} [replacing] panel de la cima de la pila al que sustituye Ajustes (sin añadir otra entrada al historial)
 */
function openSettingsAt(view, replacing) {
  repsEditorOpen = '';
  renderConfig();
  renderSettings();
  showSettingsView(view, false); // al abrir, manageFocus ya lleva el foco al panel
  setSheetVisible('configModal', 'configCard', true);
  if (replacing && modalStack[modalStack.length - 1] === replacing) {
    modalStack[modalStack.length - 1] = 'config';
    window.history.replaceState({ modal: 'config' }, '');
  } else {
    pushModal('config');
  }
}

export function closeConfig() {
  settleRemoval(); // salir antes de que acabe el plazo deja el ejercicio borrado
  setSheetVisible('configModal', 'configCard', false);
  dismissModal('config');
}

/** @param {boolean} checked */
export function setAllChecked(checked) {
  document.querySelectorAll('.ex-checkbox').forEach(cb => { /** @type {HTMLInputElement} */ (cb).checked = checked; });
}

/** Nombres de los ejercicios marcados en el formulario de configuración. */
export function readCheckedExercises() {
  return Array.from(document.querySelectorAll('.ex-checkbox'))
    .filter(cb => /** @type {HTMLInputElement} */ (cb).checked)
    .map(cb => /** @type {HTMLInputElement} */ (cb).value);
}

// --- Selector de iconos ----------------------------------------------------------------
// Solo se puede elegir un icono del catálogo cerrado (src/icons.js); no hay entrada de texto libre.

let selectedIcon = DEFAULT_ICON;

function updateIconButton() {
  const icon = getIcon(selectedIcon);
  $('iconPickerCurrent').innerHTML = `<span class="text-brand-text text-xl flex items-center">${renderIconHTML(icon.id)}</span><span>${escapeHTML(iconLabel(icon.id))}</span>`;
}

/** @param {string} [query] */
function renderIconGrid(query = '') {
  const matches = new Set(searchIcons(query).map(i => i.id));
  const html = ICON_GROUPS.map(group => {
    const icons = group.icons.filter(i => matches.has(i.id));
    if (icons.length === 0) return '';
    return `
      <div class="col-span-full text-xs font-bold text-slate-400 mt-2 first:mt-0">${escapeHTML(groupName(group.id))}</div>
      ${icons.map(i => `
        <button type="button" data-action="pick-icon" data-arg="${escapeHTML(i.id)}" title="${escapeHTML(iconLabel(i.id))}" aria-label="${escapeHTML(iconLabel(i.id))}" aria-pressed="${i.id === selectedIcon}"
          class="aspect-square rounded-xl flex items-center justify-center text-xl border transition-colors ${i.id === selectedIcon ? 'bg-brand-500/25 border-brand-500 text-brand-text' : 'bg-dark-950 border-slate-800 text-slate-300 hover:border-slate-600'}">
          ${renderIconHTML(i.id)}
        </button>`).join('')}`;
  }).join('');
  $('iconGrid').innerHTML = html || `<p class="col-span-full text-center text-xs text-slate-500 py-4">${escapeHTML(t('config.noIcons'))}</p>`;
}

export function toggleIconPicker() {
  const panel = $('iconPicker');
  const open = panel.classList.contains('hidden');
  panel.classList.toggle('hidden', !open);
  $('iconPickerBtn').setAttribute('aria-expanded', String(open));
  if (open) {
    /** @type {HTMLInputElement} */ ($('iconSearch')).value = '';
    $('iconGrid').style.maxHeight = ''; // vuelve a la altura de CSS; se reajusta si se abre el teclado
    renderIconGrid();
  }
}

/** @param {string} id */
export function pickIcon(id) {
  if (!isValidIcon(id)) return;
  selectedIcon = id;
  updateIconButton();
  $('iconPicker').classList.add('hidden');
  $('iconPickerBtn').setAttribute('aria-expanded', 'false');
}

/** @param {string} query */
export function filterIcons(query) {
  renderIconGrid(query);
}

/** Lee el formulario de nuevo ejercicio. */
export function readNewExerciseForm() {
  const name = /** @type {HTMLInputElement} */ ($('newExName')).value.trim();
  const repsMin = /** @type {HTMLInputElement} */ ($('newExRepsMin')).value;
  const repsMax = /** @type {HTMLInputElement} */ ($('newExRepsMax')).value;
  return { name, icon: selectedIcon, repsMin, repsMax };
}

function resetNewExerciseForm() {
  /** @type {HTMLInputElement} */ ($('newExName')).value = '';
  /** @type {HTMLInputElement} */ ($('newExRepsMin')).value = String(DEFAULT_REPS_MIN);
  /** @type {HTMLInputElement} */ ($('newExRepsMax')).value = String(DEFAULT_REPS_MAX);
  selectedIcon = DEFAULT_ICON;
  updateIconButton();
  $('iconPicker').classList.add('hidden');
  $('iconPickerBtn').setAttribute('aria-expanded', 'false');
}

export function initIconPicker() {
  updateIconButton();
}

// --- Teclado virtual -----------------------------------------------------------------
// Al abrirse el teclado el viewport se reduce y el campo con foco puede quedar tapado. Se hace
// un único ajuste, sin animación, y solo si el campo no está ya completamente visible; varios
// desplazamientos suaves encadenados se pisaban entre sí y producían un efecto de rebote.

const TEXT_FIELDS = 'input:not([type=checkbox]):not([type=radio]), textarea, select';
const REVEAL_MARGIN_PX = 12;
const KEYBOARD_SETTLE_MS = 250;

/** @type {ReturnType<typeof setTimeout> | undefined} */
let revealTimer;

/** Altura máxima de la cuadrícula de iconos cuando hay sitio de sobra (la que tiene en CSS) y la mínima útil */
const ICON_GRID_MAX_PX = 208;
const ICON_GRID_MIN_PX = 56;

/**
 * Con el teclado abierto la zona visible de Configuración es pequeña y la cuadrícula de iconos (que tiene su propio
 * desplazamiento) quedaba medio fuera de ella: al arrastrar sobre ella se movía la parte oculta de la cuadrícula y la
 * pantalla parecía bloqueada. Se limita su altura a lo que se ve, para que sea toda visible y no haya dos
 * desplazamientos solapados.
 */
function fitIconGrid() {
  const grid = $('iconGrid');
  if ($('iconPicker').classList.contains('hidden')) return;
  const scroller = $('iconPicker').closest('.overflow-y-auto'); // el de la pantalla, no la propia cuadrícula
  const vv = window.visualViewport;
  const viewportBottom = (vv ? vv.offsetTop + vv.height : window.innerHeight) - REVEAL_MARGIN_PX;
  const bottom = Math.min(scroller ? scroller.getBoundingClientRect().bottom - REVEAL_MARGIN_PX : viewportBottom, viewportBottom);
  const available = bottom - grid.getBoundingClientRect().top;
  grid.style.maxHeight = `${Math.round(Math.max(ICON_GRID_MIN_PX, Math.min(ICON_GRID_MAX_PX, available)))}px`;
}

function revealFocusedField() {
  const el = document.activeElement;
  if (!(el instanceof HTMLElement) || !el.matches(TEXT_FIELDS)) return;

  const vv = window.visualViewport;
  const viewportBottom = (vv ? vv.offsetTop + vv.height : window.innerHeight) - REVEAL_MARGIN_PX;
  const scroller = el.closest('.overflow-y-auto');
  const box = scroller ? scroller.getBoundingClientRect() : null;

  const top = (box ? Math.max(box.top, 0) : 0) + REVEAL_MARGIN_PX;
  const bottom = box ? Math.min(box.bottom - REVEAL_MARGIN_PX, viewportBottom) : viewportBottom;
  const rect = el.getBoundingClientRect();
  const isIconSearch = el.id === 'iconSearch';
  if (!isIconSearch && rect.top >= top && rect.bottom <= bottom) return; // ya se ve: no tocar nada

  // El buscador de iconos se sube hasta arriba de la zona visible: debajo tiene que caber la cuadrícula con los resultados
  const delta = rect.top < top || isIconSearch ? rect.top - top : rect.bottom - bottom;
  if (scroller) scroller.scrollTop += delta;
  else window.scrollBy(0, delta);
}

/** Reprograma el ajuste: solo se ejecuta cuando el viewport lleva un rato sin cambiar. */
function scheduleReveal() {
  clearTimeout(revealTimer);
  revealTimer = setTimeout(() => {
    revealFocusedField();
    fitIconGrid();
  }, KEYBOARD_SETTLE_MS);
}

export function initKeyboardAvoidance() {
  document.addEventListener('focusin', e => {
    if (e.target instanceof HTMLElement && e.target.matches(TEXT_FIELDS)) scheduleReveal();
  });
  window.visualViewport?.addEventListener('resize', scheduleReveal);
}

// --- Compromiso de privacidad ---------------------------------------------------------

export function openCommitment() {
  $('commitmentModal').classList.remove('hidden');
  $('commitmentModal').focus({ preventScroll: true });
  pushModal('commitment');
}

export function closeCommitment() {
  $('commitmentModal').classList.add('hidden');
  dismissModal('commitment');
}

// --- Documentos (política de privacidad, créditos) ----------------------------------------
// Se muestran dentro de la app (iframe) en vez de navegar a la página: así no se sale de la
// aplicación y el botón Atrás cierra el visor en lugar de cerrar la app.

/** Las páginas legales contienen todos los idiomas y muestran el que indica ?lang= */
const DOCUMENTS = /** @type {const} */ ({
  privacy: { page: 'privacy.html', titleKey: 'doc.privacy' },
  credits: { page: 'credits.html', titleKey: 'doc.credits' },
});

/** @type {keyof typeof DOCUMENTS | null} */
let openedDocument = null;
/** Dirección que muestra ahora el marco del visor. */
let documentSrc = '';

/** Rellena el visor (título, marco y URL) con el documento abierto en el idioma activo. */
function renderDocument() {
  if (!openedDocument) return;
  const doc = DOCUMENTS[openedDocument];
  const src = `${doc.page}?lang=${getLanguage()}`;
  let frame = /** @type {HTMLIFrameElement} */ ($('documentFrame'));
  // Cambiar el src de un marco ya cargado (o usar location.replace desde fuera) añade una entrada al historial del
  // navegador, y Atrás deshacía primero esa navegación dejando créditos bajo el título de la política. La primera
  // carga de un marco nuevo no añade entrada: por eso se sustituye el marco entero.
  if (documentSrc !== src) {
    documentSrc = src;
    const fresh = /** @type {HTMLIFrameElement} */ (frame.cloneNode(false));
    fresh.setAttribute('src', src);
    frame.replaceWith(fresh);
    frame = fresh;
  }
  frame.title = t(doc.titleKey);
  $('documentTitle').textContent = t(doc.titleKey);
}

/** @param {keyof typeof DOCUMENTS} kind */
export function openDocument(kind) {
  openedDocument = kind;
  // Un marco nuevo en cada apertura: así empieza siempre arriba y en el documento pedido, sin recordar el
  // desplazamiento ni la página a la que se hubiera navegado dentro del visor
  documentSrc = '';
  renderDocument();
  $('documentModal').classList.remove('hidden');
  $('documentModal').focus({ preventScroll: true });
  pushModal('document');
}

export function closeDocument() {
  openedDocument = null;
  $('documentModal').classList.add('hidden');
  dismissModal('document');
}

// --- Idioma --------------------------------------------------------------------------

/** Vuelve a pintar lo que se genera por código cuando cambia el idioma (el marcado fijo lo hace applyTranslations). */
export function refreshLanguage() {
  fitSpinHub();
  renderSettings();
  renderWhatsNew();
  renderConfig(true);
  renderHistory();
  updateIconButton();
  if (!$('iconPicker').classList.contains('hidden')) renderIconGrid(/** @type {HTMLInputElement} */ ($('iconSearch')).value);
  renderDocument();
}
