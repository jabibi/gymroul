// @ts-check
// Modales, historial, configuración y avisos

import { exerciseName } from './exercise-names.js';
import { isolate } from './wheel-math.js';
import { getExercises, active, DEFAULT_REPS_MIN, DEFAULT_REPS_MAX, MAX_REP_VALUE, COLOR_PALETTE } from './store.js';
import { THEMES, THEME_BRAND, getTheme, themeColor } from './theme.js';
import { WHATS_NEW_VERSION } from './whats-new.js';
import { playWinFanfare, vibrateResult } from './audio.js';
import { ICON_GROUPS, DEFAULT_ICON, getIcon, isValidIcon, searchIcons } from './icons.js';
import { shareChallenge } from './share.js';
import { t, getLanguage, getLanguageTag, groupName, iconLabel, isRtl, LANGUAGES } from './i18n/index.js';

/**
 * @typedef {import('./wheel-math.js').Segment} Segment
 * @typedef {import('./wheel-math.js').Challenge} Challenge
 */

/** @param {string} id */
const $ = id => /** @type {HTMLElement} */ (document.getElementById(id));

// --- Utilidades ----------------------------------------------------------------------

/** @param {unknown} value */
export function escapeHTML(value) {
  /** @type {Record<string, string>} */
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value).replace(/[&<>"']/g, c => entities[c]);
}

/**
 * HTML del icono (máscara CSS que hereda el color del texto). Cualquier id desconocido se
 * sustituye por el icono por defecto: nunca se pinta texto libre.
 * @param {string} [iconId]
 */
export function renderIconHTML(iconId) {
  return `<span class="${getIcon(iconId).cls}" aria-hidden="true"></span>`;
}

/** @type {ReturnType<typeof setTimeout> | undefined} */
let toastTimer;
/** @param {string} message */
export function showToast(message) {
  $('toastText').textContent = message;
  $('toast').classList.remove('opacity-0');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').classList.add('opacity-0'), 2500);
}

/** @param {boolean} enabled */
export function setSoundIcon(enabled) {
  $('soundIcon').className = enabled
    ? 'fa-solid fa-volume-high text-sm text-brand-400'
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

/** @typedef {'result' | 'history' | 'config' | 'share' | 'commitment' | 'document' | 'whatsnew'} ModalName */
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

  // Tocar el fondo cierra historial, configuración y compromiso de privacidad (el reto pendiente solo se cierra con sus botones, Esc o Atrás)
  ['historyModal', 'configModal', 'commitmentModal', 'whatsNewModal'].forEach(id => {
    const modal = $(id);
    modal.addEventListener('click', e => { if (e.target === modal) closeActiveModal(); });
  });
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

export function clearHistory() {
  sessionHistory.length = 0;
  renderHistory();
}

const CLEAR_CONFIRM_MS = 3000;
/** @type {ReturnType<typeof setTimeout> | undefined} */
let clearConfirmTimer;

/** Vuelve «Limpiar historial» a su estado normal. */
function disarmClearHistory() {
  clearTimeout(clearConfirmTimer);
  clearConfirmTimer = undefined;
  const btn = $('clearHistoryBtn');
  btn.textContent = t('history.clear');
  btn.classList.remove('text-red-300');
}

/**
 * «Limpiar historial» pide una segunda pulsación para no borrar por accidente: la primera cambia el botón a
 * «Pulsa otra vez» y, si no se confirma en unos segundos, vuelve a su estado normal.
 */
export function requestClearHistory() {
  if (clearConfirmTimer === undefined) {
    if (sessionHistory.length === 0) return;
    const btn = $('clearHistoryBtn');
    btn.textContent = t('history.clearConfirm');
    btn.classList.add('text-red-300');
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

export function renderHistory() {
  const listEl = $('historyList');
  const badge = $('historyBadge');
  const total = $('totalCompletedText');

  if (sessionHistory.length === 0) {
    badge.classList.add('hidden');
    total.textContent = historySummary();
    listEl.innerHTML = `
      <div class="text-center py-8 text-slate-500 text-xs">
        <i class="fa-solid fa-clipboard-list text-2xl mb-2 block opacity-40"></i>
        ${escapeHTML(t('history.empty'))}
      </div>`;
    return;
  }

  badge.textContent = String(sessionHistory.length);
  badge.classList.remove('hidden');
  total.textContent = historySummary();
  listEl.innerHTML = sessionHistory.map(h => `
    <div class="bg-dark-900 border border-slate-800 rounded-2xl p-3 flex justify-between items-center gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <div class="min-w-10 h-10 px-1.5 shrink-0 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center font-black ${String(h.reps).length > 3 ? 'text-xs' : 'text-sm'} border border-brand-500/20">${h.reps}</div>
        <div class="min-w-0">
          <h4 class="font-bold text-white text-xs break-words">${escapeHTML(isolate(h.exercise))}</h4>
          <span class="text-xs text-slate-300 font-medium">${escapeHTML(h.time)}</span>
        </div>
      </div>
      <span class="shrink-0 text-xl text-brand-400/80 flex items-center">${renderIconHTML(h.icon)}</span>
    </div>`).join('');
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

/** @param {boolean} [keepChecks] conserva las casillas marcadas que aún no se han guardado */
export function renderConfig(keepChecks = false) {
  const pending = keepChecks
    ? new Map(Array.from(document.querySelectorAll('.ex-checkbox')).map(cb => [/** @type {HTMLInputElement} */ (cb).value, /** @type {HTMLInputElement} */ (cb).checked]))
    : null;
  const isOn = (/** @type {string} */ name) => (pending?.has(name) ? !!pending.get(name) : active.exercises.includes(name));
  const inputClass = 'min-h-[44px] w-full px-2.5 py-1.5 text-xs bg-dark-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-brand-500';

  $('exsCheckboxes').innerHTML = getExercises().map(ex => {
    const open = repsEditorOpen === ex.id;
    const range = t('config.repsRange', { min: ex.repsMin, max: ex.repsMax });
    const name = exerciseName(ex);
    return `
    <div class="rounded-xl bg-dark-950 border border-slate-800">
      <div class="flex items-stretch min-h-[46px]">
        <label class="flex items-center gap-2 cursor-pointer flex-1 min-w-0 ps-2.5 py-2">
          <input type="checkbox" value="${escapeHTML(ex.name)}" ${isOn(ex.name) ? 'checked' : ''} class="ex-checkbox w-4 h-4 shrink-0 rounded text-brand-500 focus:ring-brand-500 bg-dark-900 border-slate-700">
          <span class="text-xs font-bold text-white flex items-center gap-2 min-w-0">
            <span class="text-brand-400 text-lg flex items-center shrink-0">${renderIconHTML(ex.icon)}</span>
            <span class="min-w-0 break-words">${escapeHTML(name)}</span>
          </span>
        </label>
        <button data-action="delete-exercise" data-arg="${escapeHTML(ex.id)}" aria-label="${escapeHTML(t('config.deleteExercise', { name }))}" class="flex items-center justify-center w-11 shrink-0 text-slate-500 hover:text-red-400 text-xs transition-colors">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <button data-action="edit-reps" data-arg="${escapeHTML(ex.id)}" aria-expanded="${open}" aria-label="${escapeHTML(t('config.editReps', { name }))}" class="flex items-center min-h-[44px] ps-2.5 pe-3 text-xs font-bold text-brand-400 hover:underline">
        <bdi dir="ltr">${escapeHTML(range)}</bdi>
      </button>
      <div class="${open ? '' : 'hidden'} grid grid-cols-[1fr_1fr_auto] items-end gap-2 px-2.5 pb-2.5 pt-1 border-t border-slate-800/80">
        <label class="block text-xs font-bold text-slate-400">${escapeHTML(t('config.repsMin'))}
          <input type="number" dir="ltr" inputmode="numeric" id="${repsInputId(ex.id, 'Min')}" value="${ex.repsMin}" min="1" max="${MAX_REP_VALUE}" class="${inputClass} mt-1">
        </label>
        <label class="block text-xs font-bold text-slate-400">${escapeHTML(t('config.repsMax'))}
          <input type="number" dir="ltr" inputmode="numeric" id="${repsInputId(ex.id, 'Max')}" value="${ex.repsMax}" min="1" max="${MAX_REP_VALUE}" class="${inputClass} mt-1">
        </label>
        <button data-action="save-reps" data-arg="${escapeHTML(ex.id)}" class="min-h-[44px] px-3 py-1.5 bg-brand-500/20 text-brand-400 border border-brand-500/30 rounded-xl text-xs font-bold hover:bg-brand-500/30 transition-all">${escapeHTML(t('config.repsSave'))}</button>
      </div>
    </div>`;
  }).join('');
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
const THEME_NAME_KEYS = { calm: 'appearance.calm', classic: 'appearance.classic' };
const THEME_DESC_KEYS = { calm: 'appearance.calmDesc', classic: 'appearance.classicDesc' };

/**
 * @param {SettingsView} view
 * @param {boolean} [moveFocus] lleva el foco al título de la pantalla nueva: el botón que se pulsó queda oculto y, sin esto,
 *   el teclado y el lector de pantalla se quedarían sin sitio
 */
export function showSettingsView(view, moveFocus = true) {
  settingsView = view;
  document.querySelectorAll('#configCard [data-view]').forEach(el => {
    el.classList.toggle('hidden', /** @type {HTMLElement} */ (el).dataset.view !== view);
  });
  $('configTitle').textContent = t(VIEW_TITLE_KEYS[view]);
  $('settingsBack').classList.toggle('hidden', view === 'menu');
  $('settingsBack').classList.toggle('flex', view !== 'menu');
  $('settingsFooter').classList.toggle('hidden', view !== 'wheel');
  $('settingsLinks').classList.toggle('hidden', view !== 'menu');
  const scroller = $('configCard').querySelector('.overflow-y-auto');
  if (scroller) scroller.scrollTop = 0;
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
  const theme = getTheme();
  $('configTitle').textContent = t(VIEW_TITLE_KEYS[settingsView]);
  $('settingsThemeValue').textContent = t(THEME_NAME_KEYS[theme]);
  $('settingsLanguageValue').textContent = LANGUAGES.find(l => l.code === lang)?.name ?? '';

  const row = 'w-full flex items-center justify-between gap-3 min-h-[48px] px-3.5 py-2 text-start hover:bg-dark-800/60 active:bg-dark-800 transition-colors';
  const check = '<i class="fa-solid fa-check text-brand-400 text-sm shrink-0" aria-hidden="true"></i>';
  $('languageOptions').innerHTML = LANGUAGES.map(l => {
    const selected = l.code === lang;
    return `<button type="button" role="radio" aria-checked="${selected}" data-action="set-language" data-arg="${l.code}" lang="${l.tag}" class="${row}">
      <span class="text-sm font-bold ${selected ? 'text-white' : 'text-slate-300'}">${escapeHTML(l.name)}</span>${selected ? check : ''}
    </button>`;
  }).join('');

  $('themeOptions').innerHTML = THEMES.map(id => {
    const selected = id === theme;
    return `<button type="button" role="radio" aria-checked="${selected}" data-action="set-theme" data-arg="${id}" class="w-full text-start rounded-2xl border p-3.5 transition-colors ${selected ? 'border-brand-500 bg-brand-500/10' : 'border-slate-800 bg-dark-900/60 hover:bg-dark-800/60'}">
      <span class="flex items-center justify-between gap-3">
        <span class="text-sm font-black text-white">${escapeHTML(t(THEME_NAME_KEYS[id]))}</span>
        ${selected ? check : '<span class="w-4 h-4 rounded-full border border-slate-600 shrink-0" aria-hidden="true"></span>'}
      </span>
      <span class="block text-xs text-slate-400 mt-1">${escapeHTML(t(THEME_DESC_KEYS[id]))}</span>
      <span class="flex items-center gap-1.5 mt-3" aria-hidden="true" data-swatches="${id}"></span>
    </button>`;
  }).join('');
  // Los colores se ponen con el DOM: la CSP prohíbe los estilos en línea escritos en el HTML
  document.querySelectorAll('[data-swatches]').forEach(box => {
    const id = /** @type {import('./theme.js').Theme} */ (/** @type {HTMLElement} */ (box).dataset.swatches);
    [THEME_BRAND[id], ...COLOR_PALETTE.slice(0, 6).map(c => themeColor(c, id))].forEach((color, i) => {
      const dot = document.createElement('span');
      dot.className = i === 0 ? 'h-4 w-8 rounded-full' : 'h-4 w-4 rounded-full';
      dot.style.backgroundColor = color;
      box.appendChild(dot);
    });
  });
}

// --- Novedades ---------------------------------------------------------------------------

/** Pinta los textos con parámetros (título y cómo recuperar la apariencia original); el resto va con data-i18n. */
export function renderWhatsNew() {
  $('whatsNewTitle').textContent = t('whatsnew.title', { version: WHATS_NEW_VERSION });
  // Los nombres salen de los mismos textos que Ajustes: lo que dice el aviso es siempre lo que se verá en pantalla
  $('whatsNewClassicText').textContent = t('whatsnew.classicText', {
    settings: t('settings.title'),
    appearance: t('settings.appearance'),
    classic: t('appearance.classic'),
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
  $('iconPickerCurrent').innerHTML = `<span class="text-brand-400 text-xl flex items-center">${renderIconHTML(icon.id)}</span><span>${escapeHTML(iconLabel(icon.id))}</span>`;
}

/** @param {string} [query] */
function renderIconGrid(query = '') {
  const matches = new Set(searchIcons(query).map(i => i.id));
  const html = ICON_GROUPS.map(group => {
    const icons = group.icons.filter(i => matches.has(i.id));
    if (icons.length === 0) return '';
    return `
      <div class="col-span-full text-xs font-black uppercase tracking-wider text-slate-500 mt-2 first:mt-0">${escapeHTML(groupName(group.id))}</div>
      ${icons.map(i => `
        <button type="button" data-action="pick-icon" data-arg="${escapeHTML(i.id)}" title="${escapeHTML(iconLabel(i.id))}" aria-label="${escapeHTML(iconLabel(i.id))}" aria-pressed="${i.id === selectedIcon}"
          class="aspect-square rounded-xl flex items-center justify-center text-xl border transition-colors ${i.id === selectedIcon ? 'bg-brand-500/25 border-brand-500 text-brand-400' : 'bg-dark-950 border-slate-800 text-slate-300 hover:border-slate-600'}">
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

export function resetNewExerciseForm() {
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

/** Rellena el visor (título, marco y URL) con el documento abierto en el idioma activo. */
function renderDocument() {
  if (!openedDocument) return;
  const doc = DOCUMENTS[openedDocument];
  const src = `${doc.page}?lang=${getLanguage()}`;
  const frame = /** @type {HTMLIFrameElement} */ ($('documentFrame'));
  if (frame.getAttribute('src') !== src) frame.setAttribute('src', src);
  frame.title = t(doc.titleKey);
  $('documentTitle').textContent = t(doc.titleKey);
}

/** @param {keyof typeof DOCUMENTS} kind */
export function openDocument(kind) {
  openedDocument = kind;
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
  renderSettings();
  renderWhatsNew();
  renderConfig(true);
  renderHistory();
  updateIconButton();
  if (!$('iconPicker').classList.contains('hidden')) renderIconGrid(/** @type {HTMLInputElement} */ ($('iconSearch')).value);
  renderDocument();
}
