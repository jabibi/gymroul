// @ts-check
// Catálogo y selección activa de ejercicios (cada uno con su rango de repeticiones), persistidos en localStorage

import { isValidIcon, normalizeIcon, migrateLegacyIcon } from './icons.js';

/**
 * @typedef {import('./wheel-math.js').Exercise} Exercise
 * Error traducible: la clave (src/i18n/locales/*.js, 'error.*') y sus parámetros
 * @typedef {{ key: string, params?: Record<string, string | number> }} StoreError
 * @typedef {{ ok: true } | { ok: false, error: StoreError }} StoreResult
 */

export const MAX_EXERCISES = 12;
export const MAX_REP_VALUE = 999999;
/** Longitud máxima (en caracteres) del nombre y del nombre corto de un ejercicio */
export const MAX_NAME_LENGTH = 30;
export const MAX_SHORT_NAME_LENGTH = 12;
/** Rango de repeticiones de los ejercicios por defecto y de los nuevos */
export const DEFAULT_REPS_MIN = 10;
export const DEFAULT_REPS_MAX = 60;

/** @type {Exercise[]} */
export const DEFAULT_EXERCISES = [
  { id: '1', name: 'Burpee', shortName: 'Burpee', icon: 'burpee', color: '#0d9488', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
  { id: '2', name: 'Lunge', shortName: 'Lunge', icon: 'walk', color: '#475569', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
  { id: '3', name: 'Push-up', shortName: 'Push-up', icon: 'pushup', color: '#059669', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
  { id: '4', name: 'Air Squat', shortName: 'Squat', icon: 'squat', color: '#2563eb', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
  { id: '5', name: 'Mountain Climbers', shortName: 'Climbers', icon: 'climbers', color: '#0891b2', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
  { id: '6', name: 'Split Jumps', shortName: 'Split Jump', icon: 'jump', color: '#4f46e5', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
];
/** Lista global de repeticiones de la versión 1.14, solo para migrar (v7 -> v8) */
const LEGACY_DEFAULT_REPS = [10, 20, 30, 40, 50, 60];
export const COLOR_PALETTE = ['#0d9488', '#475569', '#059669', '#2563eb', '#0891b2', '#4f46e5', '#64748b', '#0369a1'];
/** Paleta de las versiones anteriores (arcoíris), solo para migrar (v8 -> v9); misma posición que COLOR_PALETTE */
const LEGACY_COLOR_PALETTE = ['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899', '#3b82f6'];

const KEY_EXERCISES = 'gym_exercises';
// Claves de la lista global de repeticiones, que ya no existe (migración v7 -> v8)
const KEY_LEGACY_REPS = 'gym_reps';
const KEY_LEGACY_ACTIVE_REPS = 'gymroulette_active_reps';
const KEY_ACTIVE_EXS = 'gymroulette_active_exs';
const KEY_SCHEMA = 'gym_schema_version';
// Claves de funciones que ya no existen: la analítica opcional (migración v5 -> v6) y el aviso de introducción vista (v6 -> v7)
const KEY_LEGACY_ANALYTICS_CONSENT = 'gymroulette_analytics_consent';
const KEY_LEGACY_INTRO_SEEN = 'gymroulette_intro_seen';

/** Versión actual del esquema de datos guardados; sube al cambiar su formato */
export const SCHEMA_VERSION = 9;

/** Selección activa (se muta con setActive/loadActive) */
export const active = {
  /** @type {string[]} */ exercises: [],
};

// --- Acceso tolerante a localStorage -------------------------------------------------

/**
 * Lee y valida un valor; datos ausentes, corruptos o con formato inesperado devuelven el fallback.
 * @template T
 * @param {string} key
 * @param {T} fallback
 * @param {(value: any) => boolean} isValid
 * @returns {T}
 */
export function readStorage(key, fallback, isValid) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch (e) {
    return fallback;
  }
}

/** @param {string} key @param {unknown} value */
export function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* almacenamiento no disponible */ }
}

const isExercise = (/** @type {any} */ e) => !!e && typeof e.id === 'string' && typeof e.name === 'string' && e.name.trim() !== '';
const isExerciseList = (/** @type {any} */ l) => Array.isArray(l) && l.every(isExercise);
const isRepList = (/** @type {any} */ l) => Array.isArray(l) && l.every(n => Number.isInteger(n) && n > 0);
/** @param {any} min @param {any} max */
const isRepRange = (min, max) => Number.isInteger(min) && Number.isInteger(max) && min >= 1 && max <= MAX_REP_VALUE && min <= max;
const isStringList = (/** @type {any} */ l) => Array.isArray(l) && l.every(n => typeof n === 'string');

// --- Migraciones ---------------------------------------------------------------------

/**
 * Migraciones por versión: MIGRATIONS[n] convierte los datos de la versión n a la n+1.
 * Añadir aquí un paso cada vez que cambie el formato guardado y subir SCHEMA_VERSION.
 * @type {Record<number, () => void>}
 */
const MIGRATIONS = {
  // v0 -> v1: datos sin versionar; se normalizan descartando entradas inválidas
  0: () => {
    writeStorage(KEY_EXERCISES, readStorage(KEY_EXERCISES, DEFAULT_EXERCISES, isExerciseList));
    writeStorage(KEY_LEGACY_REPS, readStorage(KEY_LEGACY_REPS, LEGACY_DEFAULT_REPS, isRepList));
  },
  // v1 -> v2: los iconos pasan de nombres de Font Awesome / emojis libres al catálogo cerrado
  1: () => {
    const list = readStorage(KEY_EXERCISES, /** @type {Exercise[] | null} */ (null), isExerciseList);
    if (list) writeStorage(KEY_EXERCISES, list.map(e => ({ ...e, icon: migrateLegacyIcon(e.icon) })));
  },
  // v2 -> v3: los ejercicios por defecto (ids 3 y 4) pasan a los nuevos iconos de flexiones y sentadilla
  2: () => {
    const list = readStorage(KEY_EXERCISES, /** @type {Exercise[] | null} */ (null), isExerciseList);
    if (!list) return;
    writeStorage(KEY_EXERCISES, list.map(e => {
      if (e.id === '3' && e.icon === 'push') return { ...e, icon: 'pushup' };
      if (e.id === '4' && e.icon === 'leg') return { ...e, icon: 'squat' };
      return e;
    }));
  },
  // v3 -> v4: el Burpee por defecto (id 1) deja la llama y usa el pictograma de burpee
  3: () => {
    const list = readStorage(KEY_EXERCISES, /** @type {Exercise[] | null} */ (null), isExerciseList);
    if (!list) return;
    writeStorage(KEY_EXERCISES, list.map(e => (e.id === '1' && e.icon === 'fire' ? { ...e, icon: 'burpee' } : e)));
  },
  // v4 -> v5: el Mountain Climbers por defecto (id 5) usa su propio pictograma
  4: () => {
    const list = readStorage(KEY_EXERCISES, /** @type {Exercise[] | null} */ (null), isExerciseList);
    if (!list) return;
    writeStorage(KEY_EXERCISES, list.map(e => (e.id === '5' && e.icon === 'run-fast' ? { ...e, icon: 'climbers' } : e)));
  },
  // v5 -> v6: la app ya no tiene analítica; se borra la elección de consentimiento que guardaban las versiones anteriores
  5: () => {
    try { localStorage.removeItem(KEY_LEGACY_ANALYTICS_CONSENT); } catch (e) { /* ignorado */ }
  },
  // v6 -> v7: la app ya no tiene introducción en la primera apertura; se borra el aviso de que se había visto
  6: () => {
    try { localStorage.removeItem(KEY_LEGACY_INTRO_SEEN); } catch (e) { /* ignorado */ }
  },
  // v7 -> v8: las repeticiones dejan de ser una lista global y pasan a ser un rango por ejercicio.
  // Cada ejercicio hereda el mínimo y el máximo de las repeticiones activas (lo que se veía en la ruleta).
  7: () => {
    const all = readStorage(KEY_LEGACY_REPS, LEGACY_DEFAULT_REPS, isRepList);
    const saved = readStorage(KEY_LEGACY_ACTIVE_REPS, /** @type {number[] | null} */ (null), isRepList);
    let pool = saved ? saved.filter(r => all.includes(r)) : all;
    if (pool.length === 0) pool = all;
    const min = Math.min(...pool);
    const max = Math.max(...pool);
    const range = pool.length > 0 && isRepRange(min, max) ? { repsMin: min, repsMax: max } : { repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX };

    const list = readStorage(KEY_EXERCISES, /** @type {Exercise[] | null} */ (null), isExerciseList);
    if (list) writeStorage(KEY_EXERCISES, list.map(e => (isRepRange(e.repsMin, e.repsMax) ? e : { ...e, ...range })));
    try {
      localStorage.removeItem(KEY_LEGACY_REPS);
      localStorage.removeItem(KEY_LEGACY_ACTIVE_REPS);
    } catch (e) { /* ignorado */ }
  },
  // v8 -> v9: los sectores pasan de la paleta arcoíris a una más sobria; cada color antiguo se cambia por el de su posición
  8: () => {
    const list = readStorage(KEY_EXERCISES, /** @type {Exercise[] | null} */ (null), isExerciseList);
    if (!list) return;
    writeStorage(KEY_EXERCISES, list.map(e => {
      const i = LEGACY_COLOR_PALETTE.indexOf(e.color);
      return i === -1 ? e : { ...e, color: COLOR_PALETTE[i] };
    }));
  },
};

/** Aplica las migraciones pendientes y fija la versión actual. */
export function migrate() {
  let version = readStorage(KEY_SCHEMA, 0, v => Number.isInteger(v) && v >= 0);
  if (version > SCHEMA_VERSION) return; // datos de una versión más nueva: no se tocan
  while (version < SCHEMA_VERSION) {
    MIGRATIONS[version]?.();
    version++;
  }
  writeStorage(KEY_SCHEMA, SCHEMA_VERSION);
}

// --- Catálogo ------------------------------------------------------------------------

/** @returns {Exercise[]} copia ordenada por nombre (no muta las constantes por defecto) */
export function getExercises() {
  // Cualquier icono fuera del catálogo (datos manipulados o antiguos) se sustituye por el de por defecto
  // Un rango de repeticiones ausente o inválido (datos manipulados o a medio migrar) se sustituye por el de por defecto
  const list = readStorage(KEY_EXERCISES, DEFAULT_EXERCISES, isExerciseList).map(e => ({
    ...e,
    icon: normalizeIcon(e.icon),
    ...(isRepRange(e.repsMin, e.repsMax) ? {} : { repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX }),
  }));
  return list.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
}

/** @param {Exercise[]} list */
const saveExercises = list => writeStorage(KEY_EXERCISES, list);

// --- Selección activa ----------------------------------------------------------------

/** Carga la selección activa descartando ejercicios que ya no existen en el catálogo. */
export function loadActive() {
  const allExs = getExercises();
  const savedExs = readStorage(KEY_ACTIVE_EXS, /** @type {string[] | null} */ (null), isStringList);
  active.exercises = savedExs
    ? savedExs.filter(name => allExs.some(e => e.name === name))
    : allExs.map(e => e.name);
}

export function persistActive() {
  writeStorage(KEY_ACTIVE_EXS, active.exercises);
}

/** @param {string[]} exercises */
export function setActive(exercises) {
  active.exercises = exercises;
  persistActive();
}

// --- CRUD ----------------------------------------------------------------------------

/**
 * Primer color de la paleta sin usar; si están todos usados, se reutilizan en orden.
 * @param {Exercise[]} list
 */
export function pickColor(list) {
  const used = list.map(e => e.color);
  return COLOR_PALETTE.find(c => !used.includes(c)) || COLOR_PALETTE[list.length % COLOR_PALETTE.length];
}

/**
 * Nombre corto cuando el usuario no escribe uno: el nombre, o su principio con «…» si no cabe.
 * @param {string} name
 */
export function deriveShortName(name) {
  return name.length <= MAX_SHORT_NAME_LENGTH ? name : `${name.slice(0, MAX_SHORT_NAME_LENGTH - 1).trimEnd()}…`;
}

/**
 * Valida y convierte un rango de repeticiones escrito por el usuario.
 * @param {string | number} min
 * @param {string | number} max
 * @returns {{ ok: true, min: number, max: number } | { ok: false, error: StoreError }}
 */
export function parseRepRange(min, max) {
  // Solo dígitos: parseInt aceptaría «12abc», «1e3» o «10.9» y los leería como 12, 1 y 10
  const toInt = (/** @type {string | number} */ v) => (/^\d+$/.test(String(v).trim()) ? Number(String(v).trim()) : NaN);
  const lo = toInt(min);
  const hi = toInt(max);
  if ([lo, hi].some(n => !Number.isFinite(n) || n < 1 || n > MAX_REP_VALUE)) {
    return { ok: false, error: { key: 'error.repRange', params: { max: MAX_REP_VALUE } } };
  }
  if (lo > hi) return { ok: false, error: { key: 'error.repMinMax' } };
  return { ok: true, min: lo, max: hi };
}

/**
 * Crea un ejercicio nuevo y lo activa.
 * @param {{ name: string, shortName?: string, icon: string, repsMin?: string | number, repsMax?: string | number }} input
 * @returns {StoreResult}
 */
export function addExercise({ name, shortName, icon, repsMin = DEFAULT_REPS_MIN, repsMax = DEFAULT_REPS_MAX }) {
  name = (name || '').replace(/\s+/g, ' ').trim();
  if (!name) return { ok: false, error: { key: 'error.nameRequired' } };
  shortName = (shortName || '').replace(/\s+/g, ' ').trim();
  if (name.length > MAX_NAME_LENGTH) return { ok: false, error: { key: 'error.maxLength', params: { max: MAX_NAME_LENGTH } } };
  if (shortName.length > MAX_SHORT_NAME_LENGTH) return { ok: false, error: { key: 'error.maxLength', params: { max: MAX_SHORT_NAME_LENGTH } } };

  if (!isValidIcon(icon)) return { ok: false, error: { key: 'error.iconRequired' } };

  const range = parseRepRange(repsMin, repsMax);
  if (!range.ok) return range;

  const list = getExercises();
  if (list.some(item => item.name.toLowerCase() === name.toLowerCase())) {
    return { ok: false, error: { key: 'error.duplicateExercise', params: { name } } };
  }
  if (list.length >= MAX_EXERCISES) {
    return { ok: false, error: { key: 'error.maxExercises', params: { max: MAX_EXERCISES } } };
  }

  list.push({
    id: Date.now().toString(),
    name,
    shortName: shortName || deriveShortName(name),
    icon,
    color: pickColor(list),
    repsMin: range.min,
    repsMax: range.max,
  });
  saveExercises(list);

  if (!active.exercises.includes(name)) {
    active.exercises.push(name);
    persistActive();
  }
  return { ok: true };
}

/** @param {string} id */
export function removeExercise(id) {
  const all = getExercises();
  const target = all.find(item => item.id === id);
  saveExercises(all.filter(item => item.id !== id));
  if (target) {
    active.exercises = active.exercises.filter(name => name !== target.name);
    persistActive();
  }
}

/**
 * Cambia el rango de repeticiones de un ejercicio.
 * @param {string} id
 * @param {string | number} min
 * @param {string | number} max
 * @returns {StoreResult}
 */
export function updateExerciseReps(id, min, max) {
  const range = parseRepRange(min, max);
  if (!range.ok) return range;
  const list = getExercises();
  const target = list.find(item => item.id === id);
  if (!target) return { ok: true };
  target.repsMin = range.min;
  target.repsMax = range.max;
  saveExercises(list);
  return { ok: true };
}
