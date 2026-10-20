// @ts-check
// Apariencia de la app: «calm» (Sereno, la actual) o «classic» (Clásico, la original con colores vivos).
// El tema se aplica con data-theme en <html>: las variables --brand-* y demás colores de src/style.css cambian solos.
// Los colores de los ejercicios se guardan siempre con la paleta de «calm» (COLOR_PALETTE); con «classic» se
// sustituyen al mostrarlos por el de la misma posición en CLASSIC_COLOR_PALETTE, así cambiar de apariencia no toca los datos.

import { COLOR_PALETTE, CLASSIC_COLOR_PALETTE, readStorage, writeStorage } from './store.js';

export const THEMES = /** @type {const} */ (['calm', 'classic']);
/** @typedef {typeof THEMES[number]} Theme */
/** Color de marca de cada apariencia (el mismo de --brand-500 en src/style.css), para las vistas previas */
export const THEME_BRAND = /** @type {Record<Theme, string>} */ ({ calm: '#10b981', classic: '#22c55e' });
export const DEFAULT_THEME = /** @type {Theme} */ ('calm');

const KEY_THEME = 'gym_theme';

/** @param {any} value @returns {value is Theme} */
export const isTheme = value => THEMES.includes(value);

/** @type {Theme} */
let current = DEFAULT_THEME;

export const getTheme = () => current;

function applyThemeAttribute() {
  document.documentElement.dataset.theme = current;
}

/** Lee la apariencia guardada y la aplica (se llama al arrancar). */
export function loadTheme() {
  current = readStorage(KEY_THEME, DEFAULT_THEME, isTheme);
  applyThemeAttribute();
}

/**
 * Cambia y guarda la apariencia.
 * @param {string} theme
 * @returns {boolean} true si cambió
 */
export function setTheme(theme) {
  if (!isTheme(theme) || theme === current) return false;
  current = theme;
  writeStorage(KEY_THEME, theme);
  applyThemeAttribute();
  return true;
}

/**
 * Color del sector tal como se ve con la apariencia dada. Los colores que no son de la paleta se dejan como están.
 * @param {string} color color guardado (paleta de «calm»)
 * @param {Theme} [theme]
 */
export function themeColor(color, theme = current) {
  if (theme !== 'classic') return color;
  const i = COLOR_PALETTE.indexOf(color);
  return i === -1 ? color : CLASSIC_COLOR_PALETTE[i];
}
