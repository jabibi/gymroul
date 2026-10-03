// @ts-check
import './style.css';

import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';

import { initWheel, setSegments, spin, getActiveSegment, getSegments, resize, refreshLabels } from './wheel.js';
import { generateCombinations, CONFIG_SEGMENT } from './wheel-math.js';
import {
  migrate, loadActive, getExercises, getReps, active, setActive,
  addExercise, removeExercise, addRep, removeRep,
} from './store.js';
import { toggleSound, initAudio } from './audio.js';
import { getConsent, setConsent, applyConsent } from './analytics.js';
import * as ui from './ui.js';
import { t, detectLanguage, setLanguage, applyTranslations, isSupported } from './i18n/index.js';

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

/** @param {import('./store.js').StoreResult} result */
function reportError(result) {
  if (!result.ok) ui.showToast(t(result.error.key, result.error.params));
}

/** Aplica el idioma activo a todo: marcado fijo, textos generados por código, ruleta y visor. */
function applyLanguage() {
  applyTranslations();
  ui.refreshLanguage();
  refreshLabels();
  ui.updateLiveIndicator(getActiveSegment());
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

  'open-privacy': () => ui.openDocument('privacy'),
  'open-credits': () => ui.openDocument('credits'),
  'close-document': () => ui.closeDocument(),
  'toggle-icon-picker': () => ui.toggleIconPicker(),
  'pick-icon': arg => arg && ui.pickIcon(arg),
  'show-consent': () => ui.showConsentFromSettings(),
  // La analítica es opcional: tanto Aceptar como Rechazar dejan usar la app; la elección se puede cambiar en Configuración
  'consent': arg => {
    setConsent(arg === 'grant');
    ui.hideConsent();
  },
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
    if (!ui.closeActiveModal()) CapacitorApp.exitApp();
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
    onChange: () => ui.updateLiveIndicator(getActiveSegment()),
    onFinish: handleFinish,
  });

  rebuildWheel();
  resize();
  ui.renderHistory();

  // Solo se pregunta si el usuario aún no ha decidido; rechazar no impide usar la app y Google Analytics no se carga
  const consent = getConsent();
  if (consent === 'granted') applyConsent(true);
  else if (consent === null) ui.setConsentGate(true);
}

init();
