// @ts-check
// Nombre traducido de los ejercicios por defecto. Lo guardado sigue en inglés (el nombre es la identidad del
// ejercicio: selección activa, duplicados, historial); solo cambia lo que se muestra.

import { DEFAULT_EXERCISES, getExercises } from './store.js';
import { t, getLanguageTag } from './i18n/index.js';

/** @typedef {import('./wheel-math.js').Exercise} Exercise */

/** Clave de traducción (exercise.<clave>) de cada ejercicio por defecto, por id */
export const DEFAULT_EXERCISE_KEYS = /** @type {Record<string, string>} */ ({
  1: 'burpee',
  2: 'lunge',
  3: 'pushup',
  4: 'squat',
  5: 'climbers',
  6: 'splitjump',
});

/**
 * Nombre para mostrar. Los ejercicios del usuario se muestran como los escribió.
 * @param {Pick<Exercise, 'id' | 'name'>} ex
 */
export function exerciseName(ex) {
  const key = DEFAULT_EXERCISE_KEYS[ex.id];
  const original = DEFAULT_EXERCISES.find(d => d.id === ex.id);
  if (!key || !original || ex.name !== original.name) return ex.name;
  return t(`exercise.${key}`);
}

/**
 * Ejercicios por orden alfabético del nombre que se ve (traducido) y según el idioma activo: sin distinguir
 * mayúsculas ni acentos y con los números por su valor. No se guarda: cambia al cambiar de idioma.
 * @template {Pick<Exercise, 'id' | 'name'>} T
 * @param {T[]} list
 * @returns {T[]}
 */
export function sortExercises(list) {
  const collator = new Intl.Collator(getLanguageTag(), { sensitivity: 'base', numeric: true });
  return [...list].sort((a, b) => collator.compare(exerciseName(a), exerciseName(b)));
}

/** Los ejercicios guardados, ordenados alfabéticamente para mostrarlos (editor y ruleta). */
export const sortedExercises = () => sortExercises(getExercises());
