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

/** En Android la web se extiende bajo las barras y MainActivity le dice cuánto miden: se aplican como zonas seguras. */
export function initSafeArea() {
  if (!Capacitor.isNativePlatform()) return;
  /** @param {{top: number, right: number, bottom: number, left: number}} i */
  const apply = i => {
    for (const side of /** @type {const} */ (['top', 'right', 'bottom', 'left'])) document.documentElement.style.setProperty(`--safe-area-inset-${side}`, `${i[side]}px`);
  };
  AppBars.addListener('insets', apply);
  AppBars.getInsets().then(apply).catch(() => {});
}

/** Última orden a las barras del sistema (se resuelve cuando la capa nativa ya las ha cambiado) */
let barsApplied = Promise.resolve();

function applyThemeAttribute() {
  const theme = getTheme();
  document.documentElement.dataset.theme = theme;
  // Barras del sistema de Android: del color de la apariencia (no del modo del dispositivo) y con iconos que contrasten
  if (Capacitor.isNativePlatform()) barsApplied = AppBars.setBars({ background: THEME_BG[theme], darkIcons: theme === 'light' }).catch(() => {});
}

/** Apariencia que se vería con esta elección (con «system», la que pide el dispositivo ahora). @param {ThemeChoice} next */
export const resolveTheme = next => /** @type {Theme} */ (next === 'system' ? (darkQuery && !darkQuery.matches ? 'light' : 'calm') : next);

/** Opacidad máxima del velo: opaco del todo, para que no se vea nada del cambio que ocurre debajo */
const VEIL_PEAK = 1;
const VEIL_IN_MS = 50;
const VEIL_OUT_MS = 100;
/** Margen tras confirmar el cambio nativo: el sistema repinta las barras y sus iconos un poco después de que el plugin responda */
const BARS_SETTLE_MS = 0;
/** @type {HTMLDivElement | null} */
let veil = null;
/** @type {Animation | null} */
let veilAnimation = null;
/** Número del último cambio pedido: los anteriores que sigan en marcha se abandonan */
let veilTurn = 0;

/** Capa a pantalla completa que tapa el cambio de apariencia; se crea la primera vez. */
function getVeil() {
  if (!veil) {
    veil = document.createElement('div');
    veil.className = 'theme-veil';
    veil.setAttribute('aria-hidden', 'true');
    veil.hidden = true;
    document.body.appendChild(veil);
  }
  return veil;
}

const nextFrames = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve(undefined))));

/**
 * Aplica un cambio de apariencia tapándolo con un velo del color de la apariencia nueva: sube hasta opaco, el cambio
 * ocurre debajo (atributo, ruleta, Ajustes y barras del sistema) y el velo se retira. Sin él, los colores del HTML cambian
 * al instante y la ruleta (canvas), Ajustes y las barras de Android (capa nativa) se repintan a destiempo, y de Oscuro a
 * Claro o de Claro a Clásico se veía un parpadeo. Con «reducir movimiento» (o sin Web Animations) el cambio es directo.
 * @param {() => void} update cambia el atributo y repinta lo que depende de la apariencia
 * @param {Theme} [target] apariencia que se verá al terminar (por defecto, la que hay al llamar)
 */
export async function withThemeTransition(update, target = getTheme()) {
  const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || typeof Element === 'undefined' || typeof Element.prototype.animate !== 'function') {
    update();
    return;
  }
  const layer = getVeil();
  const mine = ++veilTurn;
  // Si ya había un velo a medias (pulsaciones seguidas), se sube desde donde estaba
  const from = layer.hidden ? 0 : Number(getComputedStyle(layer).opacity) || 0;
  veilAnimation?.cancel();
  layer.style.backgroundColor = THEME_BG[target];
  layer.hidden = false;
  // Sin transiciones CSS mientras dura el cambio: si no, los colores (transition-colors, transition-all, el filtro de la
  // ruleta…) seguían animándose bajo el velo y se veían al bajarlo
  document.documentElement.classList.add('theme-switching');
  const rise = layer.animate([{ opacity: from }, { opacity: VEIL_PEAK }], { duration: VEIL_IN_MS * (1 - from / VEIL_PEAK), easing: 'ease-out', fill: 'forwards' });
  veilAnimation = rise;
  await rise.finished.catch(() => {});
  if (mine !== veilTurn) return; // otra pulsación tomó el relevo: ella aplica su cambio y retira el velo
  update();
  // El velo no baja hasta que las barras nativas estén cambiadas y repintadas: si baja antes, se ve la franja de la barra de
  // estado con el color o los iconos de la apariencia anterior
  await barsApplied;
  await nextFrames();
  await new Promise(resolve => setTimeout(resolve, BARS_SETTLE_MS));
  if (mine !== veilTurn) return;
  const fall = layer.animate([{ opacity: VEIL_PEAK }, { opacity: 0 }], { duration: VEIL_OUT_MS, easing: 'ease-in', fill: 'forwards' });
  veilAnimation = fall;
  await fall.finished.catch(() => {});
  if (mine !== veilTurn) return;
  fall.cancel();
  layer.hidden = true;
  document.documentElement.classList.remove('theme-switching');
}

/** Lee la apariencia guardada y la aplica (se llama al arrancar). @param {() => void} [onChange] se llama si, con «system», el dispositivo cambia de modo */
export function loadTheme(onChange) {
  choice = readStorage(KEY_THEME, DEFAULT_THEME, isThemeChoice);
  applyThemeAttribute();
  onSystemChange = onChange ?? null;
  darkQuery?.addEventListener?.('change', () => {
    if (choice !== 'system') return;
    withThemeTransition(() => {
      applyThemeAttribute();
      onSystemChange?.();
    }, resolveTheme(choice));
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
