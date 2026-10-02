// @ts-check
// Modales, historial, configuración y avisos

import { getExercises, getReps, active } from './store.js';
import { playWinFanfare, vibrate } from './audio.js';

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

/** @param {string} [iconStr] */
export function renderIconHTML(iconStr) {
  if (!iconStr) return '<i class="fa-solid fa-dumbbell"></i>';
  if (iconStr.startsWith('fa-')) {
    // Solo nombres de clase válidos de Font Awesome
    return /^fa-[a-z0-9-]+$/.test(iconStr)
      ? `<i class="fa-solid ${iconStr}"></i>`
      : '<i class="fa-solid fa-dumbbell"></i>';
  }
  return `<span>${escapeHTML(iconStr)}</span>`;
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

/** @typedef {'result' | 'history' | 'config' | 'privacy'} ModalName */
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
  privacy: () => closePrivacy(),
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
 * Mueve el foco al modal al abrirlo y lo devuelve al elemento anterior al cerrarlo.
 * @param {HTMLElement} modal @param {boolean} visible
 */
function manageFocus(modal, visible) {
  if (visible) {
    lastFocused = /** @type {HTMLElement | null} */ (document.activeElement);
    modal.querySelector('button')?.focus({ preventScroll: true });
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
          <span class="text-brand-400 w-4 text-center">${renderIconHTML(ex.icon)}</span>
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

export function toggleCustomIconInput() {
  const select = /** @type {HTMLSelectElement} */ ($('newExIconSelect'));
  const custom = /** @type {HTMLInputElement} */ ($('newExIconCustom'));
  if (select.value === 'custom') {
    custom.classList.remove('hidden');
    custom.focus();
  } else {
    custom.classList.add('hidden');
  }
}

/** Lee el formulario de nuevo ejercicio. */
export function readNewExerciseForm() {
  const name = /** @type {HTMLInputElement} */ ($('newExName')).value.trim();
  const short = /** @type {HTMLInputElement} */ ($('newExShort')).value.trim();
  const select = /** @type {HTMLSelectElement} */ ($('newExIconSelect'));
  const custom = /** @type {HTMLInputElement} */ ($('newExIconCustom'));
  const icon = select.value === 'custom' ? (custom.value.trim() || 'fa-dumbbell') : select.value;
  return { name, shortName: short || name, icon };
}

export function resetNewExerciseForm() {
  /** @type {HTMLInputElement} */ ($('newExName')).value = '';
  /** @type {HTMLInputElement} */ ($('newExShort')).value = '';
  /** @type {HTMLSelectElement} */ ($('newExIconSelect')).value = 'fa-dumbbell';
  const custom = /** @type {HTMLInputElement} */ ($('newExIconCustom'));
  custom.value = '';
  custom.classList.add('hidden');
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

// --- Política de privacidad ----------------------------------------------------------
// Se muestra dentro de la app (iframe) en vez de navegar a privacy.html: así no se sale de la
// página y el botón Atrás cierra el visor en lugar de cerrar la aplicación.

export function openPrivacy() {
  const frame = /** @type {HTMLIFrameElement} */ ($('privacyFrame'));
  if (!frame.getAttribute('src')) frame.setAttribute('src', frame.dataset.src || 'privacy.html');
  $('privacyModal').classList.remove('hidden');
  $('privacyModal').querySelector('button')?.focus({ preventScroll: true });
  pushModal('privacy');
}

export function closePrivacy() {
  $('privacyModal').classList.add('hidden');
  dismissModal('privacy');
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
  document.querySelectorAll('body > :not(#consentGate):not(#privacyModal):not(script)').forEach(el => {
    /** @type {HTMLElement} */ (el).inert = visible;
  });
  if (visible) /** @type {HTMLElement} */ (document.getElementById('consentAccept')).focus({ preventScroll: true });
}
