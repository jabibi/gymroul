// @ts-check
// Lógica pura de la ruleta (sin DOM) para poder testearla

/**
 * @typedef {{ id: string, name: string, icon: string, color: string, repsMin: number, repsMax: number }} Exercise
 * @typedef {{ text: string, exercise: string, color: string, icon: string, repsMin: number, repsMax: number }} Segment
 * Reto resultante de un giro: el sector ganador con las repeticiones ya tiradas
 * @typedef {Segment & { reps: number }} Challenge
 */

const TWO_PI = 2 * Math.PI;

/** Sector mostrado cuando no hay nada activo; al girar abre la configuración */
export const CONFIG_SEGMENT = /** @type {Segment} */ ({
  text: 'Configurar',
  exercise: 'Configurar',
  color: '#475569',
  icon: 'dumbbell',
  repsMin: 0,
  repsMax: 0,
});

/** Nombre tal como está guardado */
const storedName = (/** @type {Exercise} */ ex) => ex.name;

/**
 * Un sector por ejercicio activo; las repeticiones no se ven en la ruleta, salen al terminar el giro.
 * @param {Exercise[]} exercises catálogo completo
 * @param {string[]} activeExercises nombres activos (los guardados)
 * @param {(ex: Exercise) => string} [displayName] nombre que se muestra
 * @returns {Segment[]}
 */
export function generateSegments(exercises, activeExercises, displayName = storedName) {
  const exs = exercises.filter(ex => activeExercises.includes(ex.name));
  if (exs.length === 0) return [CONFIG_SEGMENT];

  return exs.map(ex => {
    const name = displayName(ex);
    return {
      text: name,
      exercise: name,
      color: ex.color || '#475569',
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

/** Compresión horizontal máxima de una etiqueta (la letra no baja de su tamaño mínimo): por encima de esto se nota la deformación */
export const MIN_LABEL_SCALE = 0.9;

/**
 * Ajusta la etiqueta de un sector sin bajar de su tamaño mínimo de letra: primero reduce el tamaño hasta el mínimo, luego
 * comprime un poco en horizontal, después la parte en dos líneas por un espacio o un guion (si el sector tiene altura) y, si aun así no
 * cabe, la recorta con «…».
 * @param {(text: string, px: number) => number} measure ancho del texto con ese tamaño de letra
 * @param {string} text
 * @param {number} maxWidth ancho disponible
 * @param {number} maxSize tamaño de letra con el que se empieza
 * @param {number} minSize tamaño mínimo
 * @param {number} maxLines líneas que caben en el alto del sector (1 o 2)
 * @returns {{ lines: string[], size: number, scale: number }}
 */
export function fitLabel(measure, text, maxWidth, maxSize, minSize, maxLines) {
  const single = fitText(measure, text, maxWidth, maxSize, minSize);
  if (single.text === text) return { lines: [text], size: single.size, scale: 1 };

  const atMin = measure(text, minSize);
  if (atMin * MIN_LABEL_SCALE <= maxWidth) return { lines: [text], size: minSize, scale: maxWidth / atMin };

  if (maxLines >= 2) {
    // Corte por un espacio (que desaparece) o tras un guion (que se queda en la primera línea), el que deje las dos líneas más parejas
    let best = null;
    for (let i = 1; i < text.length - 1; i++) {
      if (text[i] !== ' ' && text[i] !== '-') continue;
      const lines = text[i] === ' ' ? [text.slice(0, i), text.slice(i + 1)] : [text.slice(0, i + 1), text.slice(i + 1)];
      const width = Math.max(...lines.map(line => measure(line, minSize)));
      if (!best || width < best.width) best = { lines, width };
    }
    if (best && best.width * MIN_LABEL_SCALE <= maxWidth) return { lines: best.lines, size: minSize, scale: Math.min(1, maxWidth / best.width) };
  }
  return { lines: [single.text], size: single.size, scale: 1 };
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
