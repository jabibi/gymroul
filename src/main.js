// @ts-check
import './style.css';

import { initWheel, setSegments, spin, getActiveSegment, getSegments, resize } from './wheel.js';
import { generateCombinations, CONFIG_SEGMENT } from './wheel-math.js';
import {
  migrate, loadActive, getExercises, getReps, active, setActive,
  addExercise, removeExercise, addRep, removeRep,
} from './store.js';
import { toggleSound, initAudio } from './audio.js';
import { getConsent, setConsent, applyConsent } from './analytics.js';
import * as ui from './ui.js';

/** @typedef {import('./wheel-math.js').Segment} Segment */

/** Reconstruye los sectores a partir del catálogo y la selección activa. */
function rebuildWheel() {
  setSegments(generateCombinations(getExercises(), getReps(), active.exercises, active.reps));
}

/** Abre la configuración si la ruleta no tiene nada activo; devuelve true si lo hizo. */
function redirectIfUnconfigured() {
  const segs = getSegments();
  if (segs.length === 1 && segs[0] === CONFIG_SEGMENT) {
    ui.openConfig();
    return true;
  }
  return false;
}

function handleSpin() {
  if (redirectIfUnconfigured()) return;
  initAudio();
  spin();
}

/** @param {Segment} winner */
function handleFinish(winner) {
  if (winner === CONFIG_SEGMENT || winner.reps === 0) {
    ui.openConfig();
    return;
  }
  ui.showResult(winner);
}

/** @param {{ ok: boolean, error?: string }} result */
function reportError(result) {
  if (!result.ok && 'error' in result && result.error) ui.showToast(result.error);
}

/** @type {Record<string, (arg: string | undefined) => void>} */
const actions = {
  'toggle-sound': () => ui.setSoundIcon(toggleSound()),
  'open-history': () => ui.openHistory(),
  'close-history': () => ui.closeHistory(),
  'clear-history': () => ui.clearHistory(),
  'open-config': () => ui.openConfig(),
  'close-config': () => ui.closeConfig(),
  'spin': () => handleSpin(),
  'close-result': arg => ui.closeResult(arg === 'done'),
  'toggle-reps': arg => ui.setAllChecked('.rep-checkbox', arg === 'on'),
  'toggle-exs': arg => ui.setAllChecked('.ex-checkbox', arg === 'on'),

  'add-rep': () => {
    const result = addRep(ui.readNewRepValue());
    reportError(result);
    if (result.ok) ui.clearNewRepValue();
    rebuildWheel();
    ui.renderConfig();
  },
  'delete-rep': arg => {
    removeRep(Number(arg));
    rebuildWheel();
    ui.renderConfig();
  },
  'add-exercise': () => {
    const form = ui.readNewExerciseForm();
    if (!form.name) return;
    const result = addExercise(form);
    reportError(result);
    if (!result.ok) return;
    ui.resetNewExerciseForm();
    rebuildWheel();
    ui.renderConfig();
  },
  'delete-exercise': arg => {
    if (arg) removeExercise(arg);
    rebuildWheel();
    ui.renderConfig();
  },
  'save-config': () => {
    const { reps, exercises } = ui.readCheckedConfig();
    setActive(reps, exercises);
    rebuildWheel();
    ui.closeConfig();
  },

  'open-privacy': () => ui.openPrivacy(),
  'close-privacy': () => ui.closePrivacy(),
  'show-consent': () => {
    ui.closeConfig();
    ui.setConsentGate(true);
  },
  // Aceptar desbloquea la app; rechazar la mantiene bloqueada
  'consent': arg => {
    const granted = arg === 'grant';
    setConsent(granted);
    ui.setConsentGate(!granted, !granted);
  },
};

// Delegación de eventos: el HTML usa data-action en lugar de onclick inline (compatible con CSP estricta)
document.addEventListener('click', e => {
  const el = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (e.target).closest('[data-action]'));
  if (!el) return;
  if (el.tagName === 'A') e.preventDefault(); // enlaces con acción: no navegar fuera de la app
  actions[/** @type {string} */ (el.dataset.action)]?.(el.dataset.arg);
});

document.getElementById('newExIconSelect')?.addEventListener('change', ui.toggleCustomIconInput);

function init() {
  migrate();
  loadActive();
  ui.initModals();
  ui.setCompletedHandler(ui.addToHistory);

  initWheel(/** @type {HTMLCanvasElement} */ (document.getElementById('wheelCanvas')), {
    onChange: () => ui.updateLiveIndicator(getActiveSegment()),
    onFinish: handleFinish,
  });

  rebuildWheel();
  resize();
  ui.renderHistory();

  // Sin consentimiento previo la app no se puede usar
  if (getConsent() === 'granted') applyConsent(true);
  else ui.setConsentGate(true);
}

init();
