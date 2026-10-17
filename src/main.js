// @ts-check
import './style.css';

import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';

import { initWheel, setSegments, spin, getActiveSegment, getSegments, resize, getSpinSpeed } from './wheel.js';
import { generateSegments, rollReps, CONFIG_SEGMENT } from './wheel-math.js';
import {
  migrate, loadActive, getExercises, active, setActive,
  addExercise, removeExercise, updateExerciseReps,
} from './store.js';
import { toggleSound, initAudio } from './audio.js';
import * as ui from './ui.js';
import { cleanShareCache } from './share.js';
import { exerciseLabels } from './exercise-names.js';
import { t, detectLanguage, setLanguage, applyTranslations, isSupported } from './i18n/index.js';

/** @typedef {import('./wheel-math.js').Segment} Segment */

/** Reconstruye los sectores a partir del catálogo y la selección activa. */
function rebuildWheel() {
  setSegments(generateSegments(getExercises(), active.exercises, exerciseLabels));
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

/** Por encima de esta velocidad (rad/fotograma) los nombres pasan tan deprisa que el marcador se desenfoca */
const BLUR_SPEED = 0.1;
/** Pausa entre que la ruleta se detiene y aparece el resultado: deja ver el rebote del marcador */
const RESULT_DELAY_MS = 600;
let resultPending = false;

/** Refresca el marcador del sector activo (con desenfoque si la ruleta gira deprisa). */
function refreshMarker() {
  ui.updateLiveIndicator(getActiveSegment(), getSpinSpeed() > BLUR_SPEED);
}

function handleSpin() {
  if (resultPending || redirectIfUnconfigured()) return;
  initAudio();
  spin();
}

/** @param {Segment} winner */
function handleFinish(winner) {
  if (winner === CONFIG_SEGMENT) {
    ui.openConfig();
    return;
  }
  // Las repeticiones salen al terminar el giro, dentro del rango del ejercicio
  const challenge = { ...winner, reps: rollReps(winner.repsMin, winner.repsMax) };
  // Primero rebota el marcador sobre el sector ganador y, un instante después, aparece el resultado
  resultPending = true;
  ui.pulseIndicator();
  setTimeout(() => {
    resultPending = false;
    ui.showResult(challenge);
  }, RESULT_DELAY_MS);
}

/** @param {import('./store.js').StoreResult} result */
function reportError(result) {
  if (!result.ok) ui.showToast(t(result.error.key, result.error.params));
}

/** Aplica el idioma activo a todo: marcado fijo, textos generados por código, ruleta y visor. */
function applyLanguage() {
  applyTranslations();
  ui.refreshLanguage();
  rebuildWheel(); // los nombres de los ejercicios por defecto cambian con el idioma
  refreshMarker();
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
  'toggle-exs': arg => ui.setAllChecked(arg === 'on'),

  'edit-reps': arg => arg && ui.toggleRepsEditor(arg),
  'save-reps': arg => {
    if (!arg) return;
    const { min, max } = ui.readRepsEditor(arg);
    const result = updateExerciseReps(arg, min, max);
    reportError(result);
    if (!result.ok) return;
    rebuildWheel();
    ui.renderConfig(true);
  },
  'add-exercise': () => {
    const form = ui.readNewExerciseForm();
    if (!form.name) return;
    const result = addExercise(form);
    reportError(result);
    if (!result.ok) return;
    ui.resetNewExerciseForm();
    rebuildWheel();
    ui.renderConfig(true);
  },
  'delete-exercise': arg => {
    if (arg) removeExercise(arg);
    rebuildWheel();
    ui.renderConfig(true);
  },
  'save-config': () => {
    setActive(ui.readCheckedExercises());
    rebuildWheel();
    ui.closeConfig();
  },

  'share-result': () => ui.shareResult(),
  'cancel-share': () => ui.cancelShare(),
  'open-commitment': () => ui.openCommitment(),
  'close-commitment': () => ui.closeCommitment(),
  'open-privacy': () => ui.openDocument('privacy'),
  'open-credits': () => ui.openDocument('credits'),
  'close-document': () => ui.closeDocument(),
  'toggle-icon-picker': () => ui.toggleIconPicker(),
  'pick-icon': arg => arg && ui.pickIcon(arg),
};

// Delegación de eventos: el HTML usa data-action en lugar de onclick inline (compatible con CSP estricta)
document.addEventListener('click', e => {
  const el = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (e.target).closest('[data-action]'));
  if (!el) return;
  if (el.tagName === 'A') e.preventDefault(); // enlaces con acción: no navegar fuera de la app
  actions[/** @type {string} */ (el.dataset.action)]?.(el.dataset.arg);
});

// En Android la WebView no siempre conserva el historial de pushState, así que el botón/gesto
// Atrás se gestiona aquí: vuelve al paso anterior (cierra el modal de encima) y solo sale de
// la app cuando no queda nada que cerrar.
if (Capacitor.isNativePlatform()) {
  CapacitorApp.addListener('backButton', () => {
    if (ui.closeActiveModal()) return;
    CapacitorApp.exitApp();
  });
}

document.addEventListener('change', e => {
  const target = /** @type {HTMLElement} */ (e.target);
  if (!target.matches('select.lang-select')) return;
  const code = /** @type {HTMLSelectElement} */ (target).value;
  if (isSupported(code) && setLanguage(code)) applyLanguage();
});

document.getElementById('iconSearch')?.addEventListener('input', e => ui.filterIcons(/** @type {HTMLInputElement} */ (e.target).value));

function init() {
  // El idioma elegido a mano se guarda; el detectado del dispositivo no, para seguir sus cambios
  setLanguage(detectLanguage(), { persist: false });
  applyTranslations();
  migrate();
  loadActive();
  ui.initModals();
  ui.initKeyboardAvoidance();
  ui.initIconPicker();
  ui.renderLanguageSelectors();
  ui.setCompletedHandler(ui.addToHistory);

  initWheel(/** @type {HTMLCanvasElement} */ (document.getElementById('wheelCanvas')), {
    onChange: refreshMarker,
    onFinish: handleFinish,
  });

  rebuildWheel();
  resize();
  ui.renderHistory();
  cleanShareCache(); // por si quedó la imagen temporal de un reto compartido en otra sesión
}

init();
