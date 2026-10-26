// @ts-check
// Nombre traducido de los ejercicios del sistema (los de por defecto y los de las plantillas). Lo guardado sigue en
// inglés (el nombre es la identidad del ejercicio: selección activa, duplicados, historial); solo cambia lo que se muestra.

import { getExercises } from './store.js';
import { SYSTEM_EXERCISES, systemExercise } from './templates.js';
import { t, getLanguageTag } from './i18n/index.js';

/** @typedef {import('./wheel-math.js').Exercise} Exercise */

/** Clave de traducción (exercise.<clave>) de cada ejercicio del sistema, por id */
export const DEFAULT_EXERCISE_KEYS = /** @type {Record<string, string>} */ (
  Object.fromEntries(SYSTEM_EXERCISES.map(e => [e.id, e.slug]))
);

/**
 * Nombre para mostrar. Los ejercicios del usuario se muestran como los escribió (también los copiados de una plantilla
 * del sistema: al copiar se quedan con el nombre del idioma de ese momento).
 * @param {Pick<Exercise, 'id' | 'name'>} ex
 */
export function exerciseName(ex) {
  const key = DEFAULT_EXERCISE_KEYS[ex.id];
  const original = systemExercise(ex.id);
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
