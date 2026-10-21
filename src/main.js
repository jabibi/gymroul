// @ts-check
import './style.css';

import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';

import { initWheel, setSegments, spin, getActiveSegment, getSegments, resize, getSpinSpeed, refreshBrand } from './wheel.js';
import { generateSegments, rollReps, CONFIG_SEGMENT } from './wheel-math.js';
import {
  migrate, isFreshInstall, loadActive, active, setActive,
  addExercise, removeExercise, updateExerciseReps,
} from './store.js';
import { toggleSound, initAudio } from './audio.js';
import * as ui from './ui.js';
import { cleanShareCache } from './share.js';
import { exerciseName, sortedExercises } from './exercise-names.js';
import { loadTheme, setTheme, themeColor } from './theme.js';
import { shouldShowWhatsNew, markWhatsNewSeen } from './whats-new.js';
import { t, detectLanguage, setLanguage, applyTranslations, isSupported } from './i18n/index.js';

/** @typedef {import('./wheel-math.js').Segment} Segment */

/** Reconstruye los sectores a partir del catálogo y la selección activa. */
function rebuildWheel() {
  const segments = generateSegments(sortedExercises(), active.exercises, exerciseName);
  // Los colores guardados son los de la apariencia Suave; con Clásico se cambian al mostrarlos (el sector «Configurar» se deja tal cual: se reconoce por identidad)
  setSegments(segments.map(s => (s === CONFIG_SEGMENT ? s : { ...s, color: themeColor(s.color) })));
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

/** Pausa entre que se pinta la ruleta y salen las novedades */
const WHATS_NEW_DELAY_MS = 700;

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

/** Repinta lo que depende de la apariencia: color de marca de la ruleta, sectores y los ajustes. */
function applyTheme() {
  refreshBrand();
  rebuildWheel();
  refreshMarker();
  ui.renderSettings();
}

/** @type {Record<string, (arg: string | undefined) => void>} */
const actions = {
  'toggle-sound': () => ui.setSoundIcon(toggleSound()),
  'open-history': () => ui.openHistory(),
  'close-history': () => ui.closeHistory(),
  'clear-history': () => ui.requestClearHistory(),
  'open-settings': () => ui.openSettings(),
  'close-whatsnew': () => ui.closeWhatsNew(),
  'whatsnew-appearance': () => ui.whatsNewToAppearance(),
  'settings-open': arg => arg && ui.showSettingsView(/** @type {'wheel' | 'appearance' | 'language'} */ (arg)),
  'settings-back': () => ui.settingsBack(),
  'set-language': arg => { if (arg && isSupported(arg) && setLanguage(arg)) applyLanguage(); },
  'set-theme': arg => { if (arg && setTheme(arg)) applyTheme(); },
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
    const result = addExercise(form);
    reportError(result);
    if (!result.ok) return;
    ui.closeAddExercise();
    rebuildWheel();
    ui.renderConfig(true);
    ui.revealLastExercise();
  },
  'delete-exercise': arg => {
    if (arg) removeExercise(arg);
    rebuildWheel();
    ui.renderConfig(true);
  },
  // La apariencia y el idioma ya se aplican al elegirlos: el botón solo cierra Ajustes
  'close-settings': () => ui.closeConfig(),
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
  'toggle-config-help': () => ui.toggleConfigHelp(),
  'open-add-exercise': () => ui.openAddExercise(),
  'close-add-exercise': () => ui.closeAddExercise(),
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

document.getElementById('iconSearch')?.addEventListener('input', e => ui.filterIcons(/** @type {HTMLInputElement} */ (e.target).value));

function init() {
  // El idioma elegido a mano se guarda; el detectado del dispositivo no, para seguir sus cambios
  setLanguage(detectLanguage(), { persist: false });
  applyTranslations();
  const freshInstall = isFreshInstall(); // antes de migrate(), que deja guardada la versión del esquema
  migrate();
  loadTheme();
  loadActive();
  ui.initModals();
  ui.initKeyboardAvoidance();
  ui.initIconPicker();
  ui.renderSettings();
  ui.setCompletedHandler(ui.addToHistory);

  initWheel(/** @type {HTMLCanvasElement} */ (document.getElementById('wheelCanvas')), {
    onChange: refreshMarker,
    onFinish: handleFinish,
  });

  rebuildWheel();
  resize();
  ui.renderHistory();
  cleanShareCache(); // por si quedó la imagen temporal de un reto compartido en otra sesión

  // Novedades tras actualizar: un instante después de pintar la ruleta, y se dan por vistas al enseñarlas para no repetirlas
  if (shouldShowWhatsNew(freshInstall)) {
    markWhatsNewSeen();
    setTimeout(() => ui.openWhatsNew(), WHATS_NEW_DELAY_MS);
  }
}

init();
