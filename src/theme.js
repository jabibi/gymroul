// @ts-check
// Apariencia de la app. Lo que se ve es una de tres: «calm» (se muestra como «Oscuro»; el identificador interno es el que
// se guarda en gym_theme y no se cambia), «light» (Claro) o «classic» (Clásico, la original con colores vivos).
// Lo que se elige en Ajustes son esas tres más «system»: sigue al sistema (Oscuro si el dispositivo está en modo oscuro y
// Claro si está en modo claro). Clásico nunca se aplica solo.
// El tema se aplica con data-theme en <html>: las variables --brand-* y demás colores de src/style.css cambian solos.
// Los colores de los ejercicios se guardan siempre con la paleta de «calm» (COLOR_PALETTE); con «classic» y «light» se
// sustituyen al mostrarlos por el de la misma posición en CLASSIC_COLOR_PALETTE o LIGHT_COLOR_PALETTE, así cambiar de apariencia no toca los datos.

import { Capacitor, registerPlugin } from '@capacitor/core';
import { COLOR_PALETTE, CLASSIC_COLOR_PALETTE, LIGHT_COLOR_PALETTE, readStorage, writeStorage } from './store.js';

/** Apariencias que se ven. */
export const THEMES = /** @type {const} */ (['calm', 'light', 'classic']);
/** @typedef {typeof THEMES[number]} Theme */
/** Lo que se elige en Ajustes: seguir al sistema o una apariencia fija. */
export const THEME_CHOICES = /** @type {const} */ (['system', 'calm', 'light', 'classic']);
/** @typedef {typeof THEME_CHOICES[number]} ThemeChoice */
/** Color de marca de cada apariencia (el mismo de --brand-500 en src/style.css), para las vistas previas */
export const THEME_BRAND = /** @type {Record<Theme, string>} */ ({ calm: '#10b981', light: '#10b981', classic: '#22c55e' });
/** Fondo de cada apariencia (el de --slate-950 en src/style.css), para las vistas previas */
export const THEME_BG = /** @type {Record<Theme, string>} */ ({ calm: '#020617', light: '#fafaf9', classic: '#020617' });
export const DEFAULT_THEME = /** @type {ThemeChoice} */ ('system');

const KEY_THEME = 'gym_theme';

/** @param {any} value @returns {value is ThemeChoice} */
export const isThemeChoice = value => THEME_CHOICES.includes(value);

/** @type {ThemeChoice} */
let choice = DEFAULT_THEME;

const darkQuery = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null;

/** Apariencia que se ve ahora: la elegida o, con «system», la que pide el dispositivo. */
export const getTheme = () => /** @type {Theme} */ (choice === 'system' ? (darkQuery && !darkQuery.matches ? 'light' : 'calm') : choice);
/** Lo que está elegido en Ajustes (puede ser «system»). */
export const getThemeChoice = () => choice;

/** @type {(() => void) | null} */
let onSystemChange = null;

/** Plugin propio de Android (AppBarsPlugin.java): color de las barras del sistema e iconos a juego con la apariencia. */
const AppBars = registerPlugin('AppBars');

function applyThemeAttribute() {
  const theme = getTheme();
  document.documentElement.dataset.theme = theme;
  // Barras del sistema de Android: del color de la apariencia (no del modo del dispositivo) y con iconos que contrasten
  if (Capacitor.isNativePlatform()) AppBars.setBars({ background: THEME_BG[theme], darkIcons: theme === 'light' }).catch(() => {});
}

/** Lee la apariencia guardada y la aplica (se llama al arrancar). @param {() => void} [onChange] se llama si, con «system», el dispositivo cambia de modo */
export function loadTheme(onChange) {
  choice = readStorage(KEY_THEME, DEFAULT_THEME, isThemeChoice);
  applyThemeAttribute();
  onSystemChange = onChange ?? null;
  darkQuery?.addEventListener?.('change', () => {
    if (choice !== 'system') return;
    applyThemeAttribute();
    onSystemChange?.();
  });
}

/**
 * Cambia y guarda la apariencia.
 * @param {string} next
 * @returns {boolean} true si cambió
 */
export function setTheme(next) {
  if (!isThemeChoice(next) || next === choice) return false;
  choice = next;
  writeStorage(KEY_THEME, next);
  applyThemeAttribute();
  return true;
}

/**
 * Color del sector tal como se ve con la apariencia dada. Los colores que no son de la paleta se dejan como están.
 * @param {string} color color guardado (paleta de «calm»)
 * @param {Theme} [theme]
 */
export function themeColor(color, theme = getTheme()) {
  if (theme === 'calm') return color;
  const i = COLOR_PALETTE.indexOf(color);
  if (i === -1) return color;
  return (theme === 'classic' ? CLASSIC_COLOR_PALETTE : LIGHT_COLOR_PALETTE)[i];
}
