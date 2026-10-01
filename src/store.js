// @ts-check
// Catálogo y selección activa de ejercicios/repeticiones, persistidos en localStorage

/** @typedef {import('./wheel-math.js').Exercise} Exercise */

export const MAX_REPS = 12;
export const MAX_EXERCISES = 12;
export const MAX_REP_VALUE = 500;

/** @type {Exercise[]} */
export const DEFAULT_EXERCISES = [
  { id: '1', name: 'Burpee', shortName: 'Burpee', icon: 'fa-fire', color: '#ef4444' },
  { id: '2', name: 'Lunge', shortName: 'Lunge', icon: 'fa-person-walking', color: '#f97316' },
  { id: '3', name: 'Push-up', shortName: 'Push-up', icon: 'fa-child-reaching', color: '#f59e0b' },
  { id: '4', name: 'Air Squat', shortName: 'Squat', icon: 'fa-person-running', color: '#22c55e' },
  { id: '5', name: 'Mountain Climbers', shortName: 'Climbers', icon: 'fa-bolt', color: '#06b6d4' },
  { id: '6', name: 'Split Jumps', shortName: 'Split J', icon: 'fa-angles-up', color: '#8b5cf6' },
];
export const DEFAULT_REPS = [10, 20, 30, 40, 50, 60];
export const COLOR_PALETTE = ['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899', '#3b82f6'];

const KEY_EXERCISES = 'gym_exercises';
const KEY_REPS = 'gym_reps';
const KEY_ACTIVE_REPS = 'gymroulette_active_reps';
const KEY_ACTIVE_EXS = 'gymroulette_active_exs';
const KEY_SCHEMA = 'gym_schema_version';

/** Versión actual del esquema de datos guardados; sube al cambiar su formato */
export const SCHEMA_VERSION = 1;

/** Selección activa (se muta con setActive/loadActive) */
export const active = {
  /** @type {number[]} */ reps: [],
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
    writeStorage(KEY_REPS, readStorage(KEY_REPS, DEFAULT_REPS, isRepList));
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
  const list = readStorage(KEY_EXERCISES, DEFAULT_EXERCISES, isExerciseList).map(e => ({ ...e }));
  return list.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
}

/** @returns {number[]} */
export function getReps() {
  return [...readStorage(KEY_REPS, DEFAULT_REPS, isRepList)].sort((a, b) => a - b);
}

/** @param {Exercise[]} list */
const saveExercises = list => writeStorage(KEY_EXERCISES, list);
/** @param {number[]} list */
const saveReps = list => writeStorage(KEY_REPS, list);

// --- Selección activa ----------------------------------------------------------------

/** Carga la selección activa descartando elementos que ya no existen en el catálogo. */
export function loadActive() {
  const allReps = getReps();
  const allExs = getExercises();
  const savedReps = readStorage(KEY_ACTIVE_REPS, /** @type {number[] | null} */ (null), isRepList);
  const savedExs = readStorage(KEY_ACTIVE_EXS, /** @type {string[] | null} */ (null), isStringList);

  active.reps = savedReps ? savedReps.filter(r => allReps.includes(r)) : [...allReps];
  active.exercises = savedExs
    ? savedExs.filter(name => allExs.some(e => e.name === name))
    : allExs.map(e => e.name);
}

export function persistActive() {
  writeStorage(KEY_ACTIVE_REPS, active.reps);
  writeStorage(KEY_ACTIVE_EXS, active.exercises);
}

/**
 * @param {number[]} reps
 * @param {string[]} exercises
 */
export function setActive(reps, exercises) {
  active.reps = reps;
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
 * Crea un ejercicio nuevo y lo activa.
 * @param {{ name: string, shortName?: string, icon?: string }} input
 * @returns {{ ok: true } | { ok: false, error: string }}
 */
export function addExercise({ name, shortName, icon }) {
  name = (name || '').trim();
  if (!name) return { ok: false, error: 'Escribe un nombre para el ejercicio' };

  const list = getExercises();
  if (list.some(item => item.name.toLowerCase() === name.toLowerCase())) {
    return { ok: false, error: `Ya existe un ejercicio llamado "${name}"` };
  }
  if (list.length >= MAX_EXERCISES) {
    return { ok: false, error: `Máximo ${MAX_EXERCISES} ejercicios` };
  }

  list.push({
    id: Date.now().toString(),
    name,
    shortName: (shortName || '').trim() || name,
    icon: icon || 'fa-dumbbell',
    color: pickColor(list),
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
 * @param {string | number} value
 * @returns {{ ok: true } | { ok: false, error: string }}
 */
export function addRep(value) {
  const num = parseInt(String(value), 10);
  if (isNaN(num) || num <= 0 || num > MAX_REP_VALUE) {
    return { ok: false, error: `Introduce un número entre 1 y ${MAX_REP_VALUE}` };
  }
  const list = getReps();
  if (list.includes(num)) return { ok: false, error: `Ya existe la repetición ${num}` };
  if (list.length >= MAX_REPS) return { ok: false, error: `Máximo ${MAX_REPS} repeticiones` };

  list.push(num);
  saveReps(list);
  if (!active.reps.includes(num)) {
    active.reps.push(num);
    persistActive();
  }
  return { ok: true };
}

/** @param {number} value */
export function removeRep(value) {
  saveReps(getReps().filter(r => r !== value));
  active.reps = active.reps.filter(r => r !== value);
  persistActive();
}
