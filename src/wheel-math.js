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

/** Nombre y nombre corto tal como están guardados */
const storedLabels = (/** @type {Exercise} */ ex) => ({ name: ex.name, shortName: ex.shortName || ex.name });

/**
 * Un sector por ejercicio activo; las repeticiones no se ven en la ruleta, salen al terminar el giro.
 * @param {Exercise[]} exercises catálogo completo
 * @param {string[]} activeExercises nombres activos (los guardados)
 * @param {(ex: Exercise) => { name: string, shortName: string }} [labels] nombre y nombre corto que se muestran
 * @returns {Segment[]}
 */
export function generateSegments(exercises, activeExercises, labels = storedLabels) {
  const exs = exercises.filter(ex => activeExercises.includes(ex.name));
  if (exs.length === 0) return [CONFIG_SEGMENT];

  return exs.map(ex => {
    const { name, shortName } = labels(ex);
    return {
      text: shortName,
      exercise: name,
      shortName,
      color: ex.color || '#f97316',
      icon: ex.icon || 'dumbbell',
      repsMin: ex.repsMin,
      repsMax: ex.repsMax,
    };
  });
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
 * Aísla un texto del que lo rodea para el orden bidireccional: un nombre en alfabeto latino dentro de una interfaz de
 * derecha a izquierda (o al revés) no mezcla sus palabras con los números de alrededor. No se ve ni cambia el texto.
 * @param {string} text
 */
export const isolate = text => `\u2068${text}\u2069`;

/**
 * Reto tal como se muestra en pantalla: repeticiones y ejercicio (el nombre aislado, que lo escribe el usuario).
 * Para compartir como texto se usa el plano, sin marcas de control.
 * @param {number} reps
 * @param {string} exercise
 */
export const displayChallenge = (reps, exercise) => `${reps} ${isolate(exercise)}`;

/**
 * Ajusta un texto a un ancho: baja el tamaño de letra hasta el mínimo y, si aun así no cabe, lo recorta con «…».
 * @param {(text: string, size: number) => number} measure ancho del texto con ese tamaño
 * @param {string} text
 * @param {number} maxWidth
 * @param {number} maxSize tamaño de letra con el que se empieza
 * @param {number} minSize tamaño mínimo
 * @returns {{ text: string, size: number }}
 */
export function fitText(measure, text, maxWidth, maxSize, minSize) {
  let size = maxSize;
  while (size > minSize && measure(text, size) > maxWidth) size--;
  if (measure(text, size) <= maxWidth) return { text, size };

  const chars = Array.from(text);
  const cut = (/** @type {number} */ n) => `${chars.slice(0, n).join('').trimEnd()}…`;
  let lo = 0;
  let hi = chars.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (measure(cut(mid), size) <= maxWidth) lo = mid;
    else hi = mid - 1;
  }
  return { text: cut(lo), size };
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
