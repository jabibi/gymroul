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
/** Plantillas del usuario como máximo */
export const MAX_TEMPLATES = 20;
/** Longitud máxima (en caracteres) del nombre de un ejercicio */
export const MAX_NAME_LENGTH = 30;
/** Rango de repeticiones de los ejercicios por defecto y de los nuevos */
export const DEFAULT_REPS_MIN = 10;
export const DEFAULT_REPS_MAX = 60;

/** @type {Exercise[]} */
export const DEFAULT_EXERCISES = [
  { id: '1', name: 'Burpee', icon: 'burpee', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
  { id: '2', name: 'Lunge', icon: 'walk', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
  { id: '3', name: 'Push-up', icon: 'pushup', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
  { id: '4', name: 'Air Squat', icon: 'squat', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
  { id: '5', name: 'Mountain Climbers', icon: 'climbers', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
  { id: '6', name: 'Split Jumps', icon: 'jump', repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX },
];
/** Lista global de repeticiones de la versión 1.14, solo para migrar (v7 -> v8) */
const LEGACY_DEFAULT_REPS = [10, 20, 30, 40, 50, 60];
/** Paleta de los sectores (apariencia Suave; el texto blanco llega a 4,5:1 sobre cada color, lo comprueba npm test). Los ejercicios ya no guardan color: lo da la posición del sector (sectorColorIndexes en src/wheel-math.js) */
export const COLOR_PALETTE = ['#0d8656', '#097db5', '#7855d7', '#0b8475', '#286ee6', '#913cb9', '#976f10', '#4b5565'];
/** Paleta Suave de las versiones 1.15 a 1.19 (antes de la actual), solo para migrar (v8 -> v9 y v10 -> v11): las migraciones no deben depender de COLOR_PALETTE, que cambia */
const CALM_PALETTE_V11 = ['#0f766e', '#475569', '#15803d', '#2563eb', '#0e7490', '#4f46e5', '#64748b', '#0369a1'];
/** Primera versión de la paleta Suave (tonos más claros, con poco contraste con el texto blanco), solo para migrar (v10 -> v11) */
const FIRST_CALM_PALETTE = ['#0d9488', '#475569', '#059669', '#2563eb', '#0891b2', '#4f46e5', '#64748b', '#0369a1'];
/** Paleta de la apariencia Clásico (la original, arcoíris); misma posición que COLOR_PALETTE. También sirve para migrar (v8 -> v9) */
export const CLASSIC_COLOR_PALETTE = ['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899', '#3b82f6'];
/** Paleta de la apariencia Claro: tonos cálidos pastel con tres acentos fríos suaves; todos distan al menos 15 de diferencia de color (ΔE) entre sí, vengan o no contiguos, porque el orden en la ruleta depende de los nombres; misma posición que COLOR_PALETTE. Con el texto casi negro de la ruleta llegan a más de 9:1 (lo comprueba npm test) */
export const LIGHT_COLOR_PALETTE = ['#fdba74', '#fda4af', '#fde68a', '#93c5fd', '#d4b8f4', '#a7d8b4', '#e7c8a0', '#f4a38a'];

const KEY_EXERCISES = 'gym_exercises';
// Claves de la lista global de repeticiones, que ya no existe (migración v7 -> v8)
const KEY_LEGACY_REPS = 'gym_reps';
const KEY_LEGACY_ACTIVE_REPS = 'gymroulette_active_reps';
const KEY_ACTIVE_EXS = 'gymroulette_active_exs';
const KEY_TEMPLATES = 'gym_templates';
const KEY_SCHEMA = 'gym_schema_version';
// Claves de funciones que ya no existen: la analítica opcional (migración v5 -> v6) y el aviso de introducción vista (v6 -> v7)
const KEY_LEGACY_ANALYTICS_CONSENT = 'gymroulette_analytics_consent';
const KEY_LEGACY_INTRO_SEEN = 'gymroulette_intro_seen';

/** Versión actual del esquema de datos guardados; sube al cambiar su formato */
export const SCHEMA_VERSION = 12;

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
 * Exportado para probar cada paso por separado.
 * @type {Record<number, () => void>}
 */
export const MIGRATIONS = {
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
      const i = CLASSIC_COLOR_PALETTE.indexOf(/** @type {any} */ (e).color);
      return i === -1 ? e : { ...e, color: CALM_PALETTE_V11[i] };
    }));
  },
  // v9 -> v10: desaparece el nombre corto; la ruleta muestra el nombre completo
  9: () => {
    const list = readStorage(KEY_EXERCISES, /** @type {Exercise[] | null} */ (null), isExerciseList);
    if (!list) return;
    writeStorage(KEY_EXERCISES, list.map(e => {
      const { shortName, ...rest } = /** @type {any} */ (e);
      return rest;
    }));
  },
  // v10 -> v11: la paleta Suave se oscurece para que el texto blanco de la ruleta se lea bien (contraste mínimo 4,5:1)
  10: () => {
    const list = readStorage(KEY_EXERCISES, /** @type {Exercise[] | null} */ (null), isExerciseList);
    if (!list) return;
    writeStorage(KEY_EXERCISES, list.map(e => {
      const i = FIRST_CALM_PALETTE.indexOf(/** @type {any} */ (e).color);
      return i === -1 ? e : { ...e, color: CALM_PALETTE_V11[i] };
    }));
  },
  // v11 -> v12: el color deja de ser del ejercicio; la ruleta lo reparte por la posición del sector
  11: () => {
    const list = readStorage(KEY_EXERCISES, /** @type {Exercise[] | null} */ (null), isExerciseList);
    if (!list) return;
    writeStorage(KEY_EXERCISES, list.map(e => {
      const { color, ...rest } = /** @type {any} */ (e);
      return rest;
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

function persistActive() {
  writeStorage(KEY_ACTIVE_EXS, active.exercises);
}

/** @param {string[]} exercises */
export function setActive(exercises) {
  active.exercises = exercises;
  persistActive();
}

// --- CRUD ----------------------------------------------------------------------------

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
 * Valida los datos de un ejercicio escritos por el usuario (nombre, icono y rango de repeticiones).
 * @param {{ name: string, icon: string, repsMin?: string | number, repsMax?: string | number }} input
 * @returns {{ ok: true, name: string, icon: string, repsMin: number, repsMax: number } | { ok: false, error: StoreError }}
 */
export function parseExerciseInput({ name, icon, repsMin = DEFAULT_REPS_MIN, repsMax = DEFAULT_REPS_MAX }) {
  name = (name || '').replace(/\s+/g, ' ').trim();
  if (!name) return { ok: false, error: { key: 'error.nameRequired' } };
  if (name.length > MAX_NAME_LENGTH) return { ok: false, error: { key: 'error.maxLength', params: { max: MAX_NAME_LENGTH } } };

  if (!isValidIcon(icon)) return { ok: false, error: { key: 'error.iconRequired' } };

  const range = parseRepRange(repsMin, repsMax);
  if (!range.ok) return range;
  return { ok: true, name, icon, repsMin: range.min, repsMax: range.max };
}

/**
 * Crea un ejercicio nuevo y lo activa.
 * @param {{ name: string, icon: string, repsMin?: string | number, repsMax?: string | number }} input
 * @returns {StoreResult}
 */
export function addExercise(input) {
  const parsed = parseExerciseInput(input);
  if (!parsed.ok) return parsed;
  const { name, icon } = parsed;

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
    icon,
    repsMin: parsed.repsMin,
    repsMax: parsed.repsMax,
  });
  saveExercises(list);

  if (!active.exercises.includes(name)) {
    active.exercises.push(name);
    persistActive();
  }
  return { ok: true };
}

/** @typedef {{ exercise: import('./wheel-math.js').Exercise, index: number, wasActive: boolean }} RemovedExercise */

/**
 * Borra un ejercicio. Devuelve lo necesario para deshacerlo (restoreExercise), o null si no existe.
 * @param {string} id
 * @returns {RemovedExercise | null}
 */
export function removeExercise(id) {
  const all = getExercises();
  const index = all.findIndex(item => item.id === id);
  if (index === -1) return null;
  const exercise = all[index];
  const wasActive = active.exercises.includes(exercise.name);
  saveExercises(all.filter(item => item.id !== id));
  if (wasActive) {
    active.exercises = active.exercises.filter(name => name !== exercise.name);
    persistActive();
  }
  return { exercise, index, wasActive };
}

/**
 * Deshace un borrado: el ejercicio vuelve con su mismo id (así conserva la traducción de los de por defecto), en su
 * sitio y con su estado activo. Falla si mientras tanto se creó otro con el mismo nombre o ya hay el máximo.
 * @param {RemovedExercise} removed
 * @returns {StoreResult}
 */
export function restoreExercise({ exercise, index, wasActive }) {
  const list = getExercises();
  if (list.some(item => item.id === exercise.id || item.name.toLowerCase() === exercise.name.toLowerCase())) {
    return { ok: false, error: { key: 'error.duplicateExercise', params: { name: exercise.name } } };
  }
  if (list.length >= MAX_EXERCISES) {
    return { ok: false, error: { key: 'error.maxExercises', params: { max: MAX_EXERCISES } } };
  }
  list.splice(Math.min(index, list.length), 0, exercise);
  saveExercises(list);
  if (wasActive && !active.exercises.includes(exercise.name)) {
    active.exercises.push(exercise.name);
    persistActive();
  }
  return { ok: true };
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

// --- Plantillas del usuario ------------------------------------------------------------
// Las del sistema son datos fijos (src/templates.js). Las del usuario se guardan en su propia clave: una lista de
// ejercicios sin id (se les da uno al cargarlas en la ruleta), con su nombre tal como se escribió. Una plantilla es una
// copia: cargarla no la enlaza con la ruleta ni editar la ruleta la cambia.

/**
 * @typedef {{ name: string, icon: string, repsMin: number, repsMax: number }} TemplateExercise
 * @typedef {{ id: string, name: string, exercises: TemplateExercise[] }} UserTemplate
 */

const isTemplateExercise = (/** @type {any} */ e) => !!e && typeof e.name === 'string' && e.name.trim() !== '';
const isTemplate = (/** @type {any} */ t) => !!t && typeof t.id === 'string' && typeof t.name === 'string' && t.name.trim() !== '' && Array.isArray(t.exercises) && t.exercises.every(isTemplateExercise);
const isTemplateList = (/** @type {any} */ l) => Array.isArray(l) && l.every(isTemplate);

/**
 * Plantillas del usuario por orden alfabético (sin distinguir mayúsculas ni acentos, según el idioma dado).
 * Un icono fuera del catálogo o un rango inválido (datos manipulados) se sustituyen por los de por defecto.
 * @param {string} [locale] etiqueta de idioma para ordenar
 * @returns {UserTemplate[]}
 */
export function getTemplates(locale = 'es') {
  const collator = new Intl.Collator(locale, { sensitivity: 'base', numeric: true });
  return readStorage(KEY_TEMPLATES, /** @type {UserTemplate[]} */ ([]), isTemplateList)
    .slice(0, MAX_TEMPLATES)
    .map(t => ({
      ...t,
      exercises: t.exercises.slice(0, MAX_EXERCISES).map(e => ({
        name: e.name,
        icon: normalizeIcon(e.icon),
        ...(isRepRange(e.repsMin, e.repsMax) ? { repsMin: e.repsMin, repsMax: e.repsMax } : { repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX }),
      })),
    }))
    .sort((a, b) => collator.compare(a.name, b.name));
}

/**
 * Crea o actualiza una plantilla del usuario (con id, la actualiza). Valida el nombre, que no se repita entre las del
 * usuario, que lleve al menos un ejercicio (hasta el máximo de la ruleta), sin repetir nombre, y el rango de cada uno.
 * @param {{ id?: string, name: string, exercises: { name: string, icon: string, repsMin?: string | number, repsMax?: string | number }[] }} input
 * @returns {{ ok: true, id: string } | { ok: false, error: StoreError }}
 */
export function saveTemplate({ id, name, exercises }) {
  name = (name || '').replace(/\s+/g, ' ').trim();
  if (!name) return { ok: false, error: { key: 'error.templateNameRequired' } };
  if (name.length > MAX_NAME_LENGTH) return { ok: false, error: { key: 'error.maxLength', params: { max: MAX_NAME_LENGTH } } };
  if (exercises.length === 0) return { ok: false, error: { key: 'error.templateEmpty' } };
  if (exercises.length > MAX_EXERCISES) return { ok: false, error: { key: 'error.maxExercises', params: { max: MAX_EXERCISES } } };

  /** @type {TemplateExercise[]} */
  const parsed = [];
  for (const ex of exercises) {
    const one = parseExerciseInput(ex);
    if (!one.ok) return one;
    if (parsed.some(p => p.name.toLowerCase() === one.name.toLowerCase())) {
      return { ok: false, error: { key: 'error.duplicateExercise', params: { name: one.name } } };
    }
    parsed.push({ name: one.name, icon: one.icon, repsMin: one.repsMin, repsMax: one.repsMax });
  }

  const list = getTemplates();
  const index = id ? list.findIndex(t => t.id === id) : -1;
  if (list.some((t, i) => i !== index && t.name.toLowerCase() === name.toLowerCase())) {
    return { ok: false, error: { key: 'error.duplicateTemplate', params: { name } } };
  }
  if (index === -1 && list.length >= MAX_TEMPLATES) {
    return { ok: false, error: { key: 'error.maxTemplates', params: { max: MAX_TEMPLATES } } };
  }

  let stamp = Date.now(); // dos plantillas creadas en el mismo milisegundo no pueden compartir id
  while (list.some(t => t.id === String(stamp))) stamp++;
  const saved = { id: index === -1 ? String(stamp) : list[index].id, name, exercises: parsed };
  if (index === -1) list.push(saved);
  else list[index] = saved;
  writeStorage(KEY_TEMPLATES, list);
  return { ok: true, id: saved.id };
}

/** @param {string} id */
export function deleteTemplate(id) {
  writeStorage(KEY_TEMPLATES, getTemplates().filter(t => t.id !== id));
}

/**
 * Nombre libre para una copia: el base si no está en uso y, si no, con un número detrás. Cabe en MAX_NAME_LENGTH.
 * @param {string} base
 */
export function uniqueTemplateName(base) {
  const taken = new Set(getTemplates().map(t => t.name.toLowerCase()));
  const fit = (/** @type {string} */ text, /** @type {string} */ suffix = '') => text.slice(0, MAX_NAME_LENGTH - suffix.length).trimEnd() + suffix;
  if (!taken.has(fit(base).toLowerCase())) return fit(base);
  for (let n = 2; ; n++) {
    const candidate = fit(base, ` ${n}`);
    if (!taken.has(candidate.toLowerCase())) return candidate;
  }
}

/**
 * Carga una plantilla en la ruleta: sustituye todos los ejercicios del catálogo por los suyos y los activa todos. Los
 * del sistema traen id (así siguen traduciéndose); a los del usuario se les da uno nuevo.
 * @param {{ id?: string, name: string, icon: string, repsMin: number, repsMax: number }[]} exercises
 * @returns {StoreResult}
 */
export function loadTemplate(exercises) {
  if (exercises.length === 0) return { ok: false, error: { key: 'error.templateEmpty' } };
  if (exercises.length > MAX_EXERCISES) return { ok: false, error: { key: 'error.maxExercises', params: { max: MAX_EXERCISES } } };
  const now = Date.now();
  /** @type {Exercise[]} */
  const list = exercises.map((e, i) => ({
    id: e.id ?? String(now + i),
    name: e.name,
    icon: normalizeIcon(e.icon),
    repsMin: e.repsMin,
    repsMax: e.repsMax,
  }));
  saveExercises(list);
  setActive(list.map(e => e.name));
  return { ok: true };
}
