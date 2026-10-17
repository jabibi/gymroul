// @ts-check
// Nombre traducido de los ejercicios por defecto. Lo guardado sigue en inglés (el nombre es la identidad del
// ejercicio: selección activa, duplicados, historial); solo cambia lo que se muestra.

import { DEFAULT_EXERCISES } from './store.js';
import { t } from './i18n/index.js';

/** @typedef {import('./wheel-math.js').Exercise} Exercise */

/** Clave de traducción (exercise.<clave> y exercise.<clave>.short) de cada ejercicio por defecto, por id */
export const DEFAULT_EXERCISE_KEYS = /** @type {Record<string, string>} */ ({
  1: 'burpee',
  2: 'lunge',
  3: 'pushup',
  4: 'squat',
  5: 'climbers',
  6: 'splitjump',
});

/**
 * Nombre y nombre corto para mostrar. Los ejercicios del usuario se muestran como los escribió.
 * @param {Pick<Exercise, 'id' | 'name' | 'shortName'>} ex
 * @returns {{ name: string, shortName: string }}
 */
export function exerciseLabels(ex) {
  const key = DEFAULT_EXERCISE_KEYS[ex.id];
  const original = DEFAULT_EXERCISES.find(d => d.id === ex.id);
  if (!key || !original || ex.name !== original.name) return { name: ex.name, shortName: ex.shortName || ex.name };
  return { name: t(`exercise.${key}`), shortName: t(`exercise.${key}.short`) };
}
