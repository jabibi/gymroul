// @ts-check
// Modales, historial, configuración y avisos

import { getExercises, getReps, active } from './store.js';
import { playWinFanfare, vibrate } from './audio.js';
import { ICON_GROUPS, DEFAULT_ICON, getIcon, isValidIcon, searchIcons } from './icons.js';

/** @typedef {import('./wheel-math.js').Segment} Segment */

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

/** @param {Segment | undefined} seg */
export function updateLiveIndicator(seg) {
  if (!seg) return;
  $('liveIndicatorText').textContent = seg.reps > 0 ? `👉 ${seg.reps} ${seg.exercise} 👈` : '👉 Configurar Ruleta 👈';
}

// --- Modales con soporte del botón Atrás -----------------------------------------------
// Cada modal que se abre añade una entrada al historial del navegador: así el botón
// "Atrás" de Android (o del navegador) lo cierra en lugar de salir de la app.

/** @typedef {'result' | 'history' | 'config' | 'document'} ModalName */
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
  config: () => closeConfig(),
  document: () => closeDocument(),
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

  // Tocar el fondo cierra historial y configuración (el reto pendiente solo se cierra con sus botones, Esc o Atrás)
  ['historyModal', 'configModal'].forEach(id => {
    const modal = $(id);
    modal.addEventListener('click', e => { if (e.target === modal) closeActiveModal(); });
  });
}

// --- Resultado -----------------------------------------------------------------------

/** @type {Segment | null} */
let pendingWinner = null;
/** @type {((winner: Segment) => void) | null} */
let onCompleted = null;

/** @param {(winner: Segment) => void} cb se llama al confirmar un reto como completado */
export function setCompletedHandler(cb) { onCompleted = cb; }

/** @param {Segment} winner */
export function showResult(winner) {
  playWinFanfare();
  vibrate([40, 80, 40, 80, 100]);

  $('winnerIconContainer').innerHTML = renderIconHTML(winner.icon);
  $('winnerText').textContent = `${winner.reps} ${winner.exercise}`;
  $('winnerDesc').textContent = `¡Excelente reto! Realiza ${winner.reps} repeticiones de ${winner.exercise} con perfecta técnica.`;

  $('resultModal').classList.remove('opacity-0', 'pointer-events-none');
  $('resultCard').classList.remove('scale-90');
  $('resultCard').classList.add('scale-100');
  $('resultModal').setAttribute('aria-hidden', 'false');
  manageFocus($('resultModal'), true);

  pendingWinner = winner;
  pushModal('result');
}

// Solo los retos confirmados con "¡Completado!" pasan al historial
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

/** @type {{ id: number, text: string, reps: number, exercise: string, time: string }[]} */
const sessionHistory = [];

/** @param {Segment} winner */
export function addToHistory(winner) {
  sessionHistory.unshift({
    id: Date.now(),
    text: `${winner.reps} ${winner.exercise}`,
    reps: winner.reps,
    exercise: winner.exercise,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });
  renderHistory();
}

export function clearHistory() {
  sessionHistory.length = 0;
  renderHistory();
}

export function renderHistory() {
  const listEl = $('historyList');
  const badge = $('historyBadge');
  const total = $('totalCompletedText');

  if (sessionHistory.length === 0) {
    badge.classList.add('hidden');
    total.textContent = '0 completados';
    listEl.innerHTML = `
      <div class="text-center py-8 text-slate-500 text-xs">
        <i class="fa-solid fa-clipboard-list text-2xl mb-2 block opacity-40"></i>
        Aún no has registrado ejercicios hoy. ¡Gira la ruleta!
      </div>`;
    return;
  }

  badge.textContent = String(sessionHistory.length);
  badge.classList.remove('hidden');
  total.textContent = `${sessionHistory.length} completados en sesión`;
  listEl.innerHTML = sessionHistory.map(h => `
    <div class="bg-dark-900 border border-slate-800 rounded-2xl p-3 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center font-black text-sm border border-brand-500/20">${h.reps}</div>
        <div>
          <h4 class="font-bold text-white text-xs">${escapeHTML(h.text)}</h4>
          <span class="text-[10px] text-slate-400 font-medium">${escapeHTML(h.time)}</span>
        </div>
      </div>
      <span class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black border border-emerald-500/20">¡Completado!</span>
    </div>`).join('');
}

export function openHistory() {
  setSheetVisible('historyModal', 'historyCard', true);
  pushModal('history');
}

export function closeHistory() {
  setSheetVisible('historyModal', 'historyCard', false);
  dismissModal('history');
}

// --- Configuración -------------------------------------------------------------------

export function renderConfig() {
  $('repsCheckboxes').innerHTML = getReps().map(rep => `
    <div class="flex items-center justify-between p-2 rounded-xl bg-dark-950 border border-slate-800">
      <label class="flex items-center gap-2 cursor-pointer flex-1">
        <input type="checkbox" value="${rep}" ${active.reps.includes(rep) ? 'checked' : ''} class="rep-checkbox w-4 h-4 rounded text-brand-500 focus:ring-brand-500 bg-dark-900 border-slate-700">
        <span class="text-xs font-bold text-white">${rep} reps</span>
      </label>
      <button data-action="delete-rep" data-arg="${rep}" aria-label="Eliminar ${rep} repeticiones" class="text-slate-500 hover:text-red-400 p-1 text-xs transition-colors">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>`).join('');

  $('exsCheckboxes').innerHTML = getExercises().map(ex => `
    <div class="flex items-center justify-between p-2.5 rounded-xl bg-dark-950 border border-slate-800">
      <label class="flex items-center gap-2 cursor-pointer flex-1">
        <input type="checkbox" value="${escapeHTML(ex.name)}" ${active.exercises.includes(ex.name) ? 'checked' : ''} class="ex-checkbox w-4 h-4 rounded text-brand-500 focus:ring-brand-500 bg-dark-900 border-slate-700">
        <span class="text-xs font-bold text-white flex items-center gap-2">
          <span class="text-brand-400 text-lg flex items-center">${renderIconHTML(ex.icon)}</span>
          ${escapeHTML(ex.name)}
        </span>
      </label>
      <button data-action="delete-exercise" data-arg="${escapeHTML(ex.id)}" aria-label="Eliminar ${escapeHTML(ex.name)}" class="text-slate-500 hover:text-red-400 p-1 text-xs transition-colors">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>`).join('');
}

export function openConfig() {
  renderConfig();
  setSheetVisible('configModal', 'configCard', true);
  pushModal('config');
}

export function closeConfig() {
  setSheetVisible('configModal', 'configCard', false);
  dismissModal('config');
}

/** @param {'.rep-checkbox' | '.ex-checkbox'} selector @param {boolean} checked */
export function setAllChecked(selector, checked) {
  document.querySelectorAll(selector).forEach(cb => { /** @type {HTMLInputElement} */ (cb).checked = checked; });
}

/** Lee las casillas marcadas en el formulario de configuración. */
export function readCheckedConfig() {
  const reps = Array.from(document.querySelectorAll('.rep-checkbox'))
    .filter(cb => /** @type {HTMLInputElement} */ (cb).checked)
    .map(cb => parseInt(/** @type {HTMLInputElement} */ (cb).value, 10));
  const exercises = Array.from(document.querySelectorAll('.ex-checkbox'))
    .filter(cb => /** @type {HTMLInputElement} */ (cb).checked)
    .map(cb => /** @type {HTMLInputElement} */ (cb).value);
  return { reps, exercises };
}

// --- Selector de iconos ----------------------------------------------------------------
// Solo se puede elegir un icono del catálogo cerrado (src/icons.js); no hay entrada de texto libre.

let selectedIcon = DEFAULT_ICON;

function updateIconButton() {
  const icon = getIcon(selectedIcon);
  $('iconPickerCurrent').innerHTML = `<span class="text-brand-400 text-xl flex items-center">${renderIconHTML(icon.id)}</span><span>${escapeHTML(icon.label)}</span>`;
}

/** @param {string} [query] */
function renderIconGrid(query = '') {
  const matches = new Set(searchIcons(query).map(i => i.id));
  const html = ICON_GROUPS.map(group => {
    const icons = group.icons.filter(i => matches.has(i.id));
    if (icons.length === 0) return '';
    return `
      <div class="col-span-full text-[10px] font-black uppercase tracking-wider text-slate-500 mt-2 first:mt-0">${escapeHTML(group.name)}</div>
      ${icons.map(i => `
        <button type="button" data-action="pick-icon" data-arg="${escapeHTML(i.id)}" title="${escapeHTML(i.label)}" aria-label="${escapeHTML(i.label)}" aria-pressed="${i.id === selectedIcon}"
          class="aspect-square rounded-xl flex items-center justify-center text-xl border transition-colors ${i.id === selectedIcon ? 'bg-brand-500/25 border-brand-500 text-brand-400' : 'bg-dark-950 border-slate-800 text-slate-300 hover:border-slate-600'}">
          ${renderIconHTML(i.id)}
        </button>`).join('')}`;
  }).join('');
  $('iconGrid').innerHTML = html || '<p class="col-span-full text-center text-xs text-slate-500 py-4">No hay iconos para esa búsqueda</p>';
}

export function toggleIconPicker() {
  const panel = $('iconPicker');
  const open = panel.classList.contains('hidden');
  panel.classList.toggle('hidden', !open);
  $('iconPickerBtn').setAttribute('aria-expanded', String(open));
  if (open) {
    /** @type {HTMLInputElement} */ ($('iconSearch')).value = '';
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
  const short = /** @type {HTMLInputElement} */ ($('newExShort')).value.trim();
  return { name, shortName: short || name, icon: selectedIcon };
}

export function resetNewExerciseForm() {
  /** @type {HTMLInputElement} */ ($('newExName')).value = '';
  /** @type {HTMLInputElement} */ ($('newExShort')).value = '';
  selectedIcon = DEFAULT_ICON;
  updateIconButton();
  $('iconPicker').classList.add('hidden');
  $('iconPickerBtn').setAttribute('aria-expanded', 'false');
}

export function initIconPicker() {
  updateIconButton();
}

export const readNewRepValue = () => /** @type {HTMLInputElement} */ ($('newRepInput')).value;
export const clearNewRepValue = () => { /** @type {HTMLInputElement} */ ($('newRepInput')).value = ''; };

// --- Teclado virtual -----------------------------------------------------------------
// Al abrirse el teclado el viewport se reduce y el campo con foco puede quedar tapado. Se hace
// un único ajuste, sin animación, y solo si el campo no está ya completamente visible; varios
// desplazamientos suaves encadenados se pisaban entre sí y producían un efecto de rebote.

const TEXT_FIELDS = 'input:not([type=checkbox]):not([type=radio]), textarea, select';
const REVEAL_MARGIN_PX = 12;
const KEYBOARD_SETTLE_MS = 250;

/** @type {ReturnType<typeof setTimeout> | undefined} */
let revealTimer;

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
  if (rect.top >= top && rect.bottom <= bottom) return; // ya se ve: no tocar nada

  const delta = rect.top < top ? rect.top - top : rect.bottom - bottom;
  if (scroller) scroller.scrollTop += delta;
  else window.scrollBy(0, delta);
}

/** Reprograma el ajuste: solo se ejecuta cuando el viewport lleva un rato sin cambiar. */
function scheduleReveal() {
  clearTimeout(revealTimer);
  revealTimer = setTimeout(revealFocusedField, KEYBOARD_SETTLE_MS);
}

export function initKeyboardAvoidance() {
  document.addEventListener('focusin', e => {
    if (e.target instanceof HTMLElement && e.target.matches(TEXT_FIELDS)) scheduleReveal();
  });
  window.visualViewport?.addEventListener('resize', scheduleReveal);
}

// --- Documentos (política de privacidad, créditos) ----------------------------------------
// Se muestran dentro de la app (iframe) en vez de navegar a la página: así no se sale de la
// aplicación y el botón Atrás cierra el visor en lugar de cerrar la app.

/** @type {Record<'privacy' | 'credits', { src: string, title: string }>} */
const DOCUMENTS = {
  privacy: { src: 'privacy.html', title: 'Política de privacidad' },
  credits: { src: 'creditos.html', title: 'Créditos y licencias' },
};

/** @param {'privacy' | 'credits'} kind */
export function openDocument(kind) {
  const doc = DOCUMENTS[kind];
  const frame = /** @type {HTMLIFrameElement} */ ($('documentFrame'));
  if (frame.getAttribute('src') !== doc.src) frame.setAttribute('src', doc.src);
  frame.title = doc.title;
  $('documentTitle').textContent = doc.title;
  $('documentModal').classList.remove('hidden');
  $('documentModal').focus({ preventScroll: true });
  pushModal('document');
}

export function closeDocument() {
  $('documentModal').classList.add('hidden');
  dismissModal('document');
}

// --- Consentimiento ------------------------------------------------------------------

/**
 * Muestra u oculta la pantalla de consentimiento. Mientras está visible el resto de la app
 * queda inerte (sin foco, clics ni lectores de pantalla) además de tapado por el fondo opaco.
 * @param {boolean} visible
 * @param {boolean} [rejected] mostrar el aviso de que rechazar impide usar la app
 */
export function setConsentGate(visible, rejected = false) {
  $('consentGate').classList.toggle('hidden', !visible);
  $('consentRejected').classList.toggle('hidden', !(visible && rejected));
  document.querySelectorAll('body > :not(#consentGate):not(#documentModal):not(script)').forEach(el => {
    /** @type {HTMLElement} */ (el).inert = visible;
  });
  if (visible) $('consentGate').focus({ preventScroll: true });
}
