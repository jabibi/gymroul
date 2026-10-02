// @ts-check
// Lógica pura de la ruleta (sin DOM) para poder testearla

/**
 * @typedef {{ id: string, name: string, shortName: string, icon: string, color: string }} Exercise
 * @typedef {{ text: string, fullName: string, reps: number, exercise: string, shortName: string, color: string, icon: string }} Segment
 */

const TWO_PI = 2 * Math.PI;

/** Sector mostrado cuando no hay nada activo; al girar abre la configuración */
export const CONFIG_SEGMENT = /** @type {Segment} */ ({
  text: 'Configurar',
  fullName: 'Configurar',
  reps: 0,
  exercise: 'Configurar',
  shortName: 'Config',
  color: '#475569',
  icon: 'dumbbell',
});

/**
 * Producto cartesiano repeticiones × ejercicios activos.
 * @param {Exercise[]} exercises catálogo completo
 * @param {number[]} reps catálogo completo
 * @param {string[]} activeExercises nombres activos
 * @param {number[]} activeReps repeticiones activas
 * @returns {Segment[]}
 */
export function generateCombinations(exercises, reps, activeExercises, activeReps) {
  const exs = exercises.filter(ex => activeExercises.includes(ex.name));
  const rs = reps.filter(r => activeReps.includes(r));

  if (rs.length === 0 || exs.length === 0) return [CONFIG_SEGMENT];

  /** @type {Segment[]} */
  const combinations = [];
  rs.forEach(rep => {
    exs.forEach(ex => {
      combinations.push({
        text: `${rep} ${ex.shortName || ex.name}`,
        fullName: `${rep} ${ex.name}`,
        reps: rep,
        exercise: ex.name,
        shortName: ex.shortName || ex.name,
        color: ex.color || '#f97316',
        icon: ex.icon || 'dumbbell',
      });
    });
  });
  return combinations;
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
