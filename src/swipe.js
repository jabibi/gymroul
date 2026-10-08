// Detección de deslizamientos horizontales (lógica pura, sin DOM).

/** Desplazamiento horizontal mínimo, en px, para contar como deslizamiento. */
export const SWIPE_MIN_DISTANCE = 50;
/** El gesto debe ser claramente más horizontal que vertical (relación mínima dx/dy). */
export const SWIPE_MIN_RATIO = 1.5;

/**
 * Dirección de un gesto según lo que se movió el dedo entre que tocó y que soltó.
 * @param {number} dx desplazamiento horizontal (positivo hacia la derecha)
 * @param {number} dy desplazamiento vertical
 * @returns {'left' | 'right' | null} null si fue un toque, un desplazamiento vertical o uno diagonal
 */
export function swipeDirection(dx, dy) {
  if (Math.abs(dx) < SWIPE_MIN_DISTANCE) return null;
  if (Math.abs(dx) < Math.abs(dy) * SWIPE_MIN_RATIO) return null;
  return dx < 0 ? 'left' : 'right';
}

/**
 * Cuántas diapositivas avanza un deslizamiento: +1 a la siguiente, -1 a la anterior. En un idioma de derecha a
 * izquierda la siguiente queda a la izquierda, así que se llega a ella deslizando a la derecha.
 * @param {'left' | 'right'} direction
 * @param {boolean} rtl
 * @returns {1 | -1}
 */
export function swipeStep(direction, rtl) {
  return (direction === 'left') === !rtl ? 1 : -1;
}
