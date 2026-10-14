// @ts-check
// Lógica pura de la ruleta (sin DOM) para poder testearla

/**
 * @typedef {{ id: string, name: string, shortName: string, icon: string, color: string, repsMin: number, repsMax: number }} Exercise
 * @typedef {{ text: string, exercise: string, shortName: string, color: string, icon: string, repsMin: number, repsMax: number }} Segment
 * Reto resultante de un giro: el sector ganador con las repeticiones ya tiradas
 * @typedef {Segment & { reps: number }} Challenge
 */

const TWO_PI = 2 * Math.PI;

/** Sector mostrado cuando no hay nada activo; al girar abre la configuración */
export const CONFIG_SEGMENT = /** @type {Segment} */ ({
  text: 'Configurar',
  exercise: 'Configurar',
  shortName: 'Config',
  color: '#475569',
  icon: 'dumbbell',
  repsMin: 0,
  repsMax: 0,
});

/**
 * Un sector por ejercicio activo; las repeticiones no se ven en la ruleta, salen al terminar el giro.
 * @param {Exercise[]} exercises catálogo completo
 * @param {string[]} activeExercises nombres activos
 * @returns {Segment[]}
 */
export function generateSegments(exercises, activeExercises) {
  const exs = exercises.filter(ex => activeExercises.includes(ex.name));
  if (exs.length === 0) return [CONFIG_SEGMENT];

  return exs.map(ex => ({
    text: ex.shortName || ex.name,
    exercise: ex.name,
    shortName: ex.shortName || ex.name,
    color: ex.color || '#f97316',
    icon: ex.icon || 'dumbbell',
    repsMin: ex.repsMin,
    repsMax: ex.repsMax,
  }));
}

/**
 * Repeticiones del reto: entero uniforme entre el mínimo y el máximo, ambos incluidos.
 * @param {number} min
 * @param {number} max
 * @param {() => number} [rng] devuelve un número en [0, 1)
 */
export function rollReps(min, max, rng = Math.random) {
  return min + Math.floor(rng() * (max - min + 1));
}

/**
 * Índice del sector bajo el puntero (parte superior de la ruleta).
 * @param {number} angle rotación actual de la ruleta (rad)
 * @param {number} total número de sectores
 */
export function getWinningIndex(angle, total) {
  if (total <= 0) return 0;
  const slice = TWO_PI / total;
  let normalized = angle % TWO_PI;
  if (normalized < 0) normalized += TWO_PI;

  let pointer = (1.5 * Math.PI - normalized) % TWO_PI;
  if (pointer < 0) pointer += TWO_PI;

  return Math.floor((pointer + 1e-9) / slice) % total;
}

/**
 * Normaliza una diferencia de ángulos a (-π, π] para absorber el salto de atan2 en ±π.
 * @param {number} delta
 */
export function normalizeDelta(delta) {
  while (delta > Math.PI) delta -= TWO_PI;
  while (delta <= -Math.PI) delta += TWO_PI;
  return delta;
}
