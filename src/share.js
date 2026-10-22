// @ts-check
// Compartir el reto del resultado: una imagen PNG y un texto con el enlace a la app. Todo se genera en
// el dispositivo y se entrega al menú de compartir del sistema; la app no envía nada a ningún sitio
// (por eso no necesita el permiso de Internet).

import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { t, getLanguage, isRtl } from './i18n/index.js';
import { fitText } from './wheel-math.js';
import { getTheme } from './theme.js';

/** @typedef {import('./wheel-math.js').Challenge} Challenge */

/** Ficha de la app en Google Play: es lo que lleva el texto compartido. */
export const APP_URL = 'https://play.google.com/store/apps/details?id=eus.jabibi.gymroul';
/** Dirección corta que se dibuja al pie de la imagen. */
const WEB_HOST = 'gymroul.web.app';

export const IMAGE_SIZE = 1080;
const FILE_NAME = 'gymroulette-reto.png';
/** Nombre único por ejecución: si una compartición cancelada sigue escribiendo, no pisa la de la siguiente. */
const uniqueName = () => `gymroulette-reto-${Date.now()}.png`;
/** Carpeta de la caché de la app donde se deja la imagen mientras se comparte. */
const CACHE_DIR = 'share';
const FONT = "'Plus Jakarta Sans', 'Manrope', 'Noto Sans Arabic', 'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'IPAGothic', sans-serif";

/**
 * Colores de la tarjeta por apariencia (los mismos --brand-* de src/style.css). Un tema nuevo (por ejemplo uno claro)
 * se añade aquí con su fondo, sus textos y su logo.
 * @type {Record<import('./theme.js').Theme, { bg: string, brand: string, brandText: string, button: string, buttonText: string, title: string, muted: string, logo: string }>}
 */
export const CARD_THEMES = {
  calm: { bg: '#060D1B', brand: '16, 185, 129', brandText: '#34D399', button: '#10B981', buttonText: '#020617', title: '#FFFFFF', muted: '#94A3B8', logo: 'logo-mark.svg' },
  light: { bg: '#FAFAF9', brand: '16, 185, 129', brandText: '#047857', button: '#10B981', buttonText: '#020617', title: '#1C1917', muted: '#57534E', logo: 'logo-light.svg' },
  classic: { bg: '#060D1B', brand: '34, 197, 94', brandText: '#4ADE80', button: '#22C55E', buttonText: '#020617', title: '#FFFFFF', muted: '#94A3B8', logo: 'logo-classic.svg' },
};

/** @param {Challenge} winner */
export const challengeLabel = winner => `${winner.reps} ${winner.exercise}`;

/** @param {Challenge} winner @returns {string} texto que acompaña a la imagen */
export const shareText = winner => t('share.text', { challenge: challengeLabel(winner), url: APP_URL });

/** @param {string} src @returns {Promise<HTMLImageElement | null>} */
function loadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** @param {CanvasRenderingContext2D} ctx @param {number} x @param {number} y @param {number} w @param {number} h @param {number} r */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/**
 * Dibuja la tarjeta del reto (marca, reto, color del sector, botón y dirección) en un lienzo cuadrado, con los colores
 * de la apariencia activa.
 * @param {HTMLCanvasElement} canvas @param {Challenge} winner @param {HTMLImageElement | null} logo
 * @param {import('./theme.js').Theme} [theme]
 */
function drawCard(canvas, winner, logo, theme = getTheme()) {
  const S = IMAGE_SIZE;
  canvas.width = S;
  canvas.height = S;
  const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
  const rtl = isRtl(getLanguage());
  ctx.direction = rtl ? 'rtl' : 'ltr';
  const c = CARD_THEMES[theme];
  const green = c.brand;

  // Colores planos, sin degradados: un PNG con degradados pesa más de 1 MB y tarda mucho en pasar por el puente
  // de Capacitor (va como texto base64); así pesa unas decenas de KB. El brillo del centro son círculos planos.
  ctx.fillStyle = c.bg;
  ctx.fillRect(0, 0, S, S);
  for (const [radius, alpha] of [[S * 0.62, 0.022], [S * 0.46, 0.028], [S * 0.3, 0.036]]) {
    ctx.beginPath();
    ctx.arc(S / 2, S * 0.5, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${green}, ${alpha})`;
    ctx.fill();
  }

  // Marca arriba, centrada: logo y nombre (el centro del nombre queda a la altura del centro del logo)
  ctx.textAlign = 'left';
  ctx.direction = 'ltr';
  ctx.textBaseline = 'alphabetic';
  ctx.font = `800 72px ${FONT}`;
  const gymW = ctx.measureText('Gym').width;
  const brandW = 160 + gymW + ctx.measureText('Roulette').width;
  const bx = (S - brandW) / 2;
  if (logo) ctx.drawImage(logo, bx, 96, 128, 128);
  ctx.fillStyle = c.title;
  ctx.fillText('Gym', bx + 160, 186);
  ctx.fillStyle = `rgb(${green})`;
  ctx.fillText('Roulette', bx + 160 + gymW, 186);
  ctx.direction = rtl ? 'rtl' : 'ltr';

  // Insignia del resultado
  ctx.textAlign = 'center';
  const badge = t('result.badge');
  ctx.font = `800 34px ${FONT}`;
  const badgeW = ctx.measureText(badge).width + 96;
  roundRect(ctx, (S - badgeW) / 2, 300, badgeW, 76, 38);
  ctx.fillStyle = `rgba(${green}, .14)`;
  ctx.fill();
  ctx.strokeStyle = `rgba(${green}, .45)`;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = c.brandText;
  ctx.fillText(badge, S / 2, 352);

  // El reto en dos niveles, como en pantalla: repeticiones grandes, su etiqueta y el ejercicio. Lo más grande que
  // quepa; un nombre larguísimo se recorta con «…» en lugar de salirse de la imagen
  const measureAt = (/** @type {string} */ text, /** @type {number} */ px) => (ctx.font = `800 ${px}px ${FONT}`, ctx.measureText(text).width);
  const reps = fitText(measureAt, String(winner.reps), S - 160, 240, 120);
  ctx.font = `800 ${reps.size}px ${FONT}`;
  ctx.fillStyle = c.brandText;
  ctx.fillText(reps.text, S / 2, 580);

  ctx.font = `700 40px ${FONT}`;
  ctx.fillStyle = c.muted;
  ctx.fillText(t('result.reps'), S / 2, 628);

  const name = fitText(measureAt, winner.exercise, S - 160, 96, 44);
  ctx.font = `800 ${name.size}px ${FONT}`;
  ctx.fillStyle = c.title;
  ctx.fillText(name.text, S / 2, 756);

  // Barra con el color del sector de la ruleta
  roundRect(ctx, (S - 360) / 2, 796, 360, 18, 9);
  ctx.fillStyle = winner.color;
  ctx.fill();

  // Botón con el texto de girar
  const cta = t('spin.button');
  ctx.font = `800 44px ${FONT}`;
  const ctaW = Math.min(S - 160, ctx.measureText(cta).width + 160);
  roundRect(ctx, (S - ctaW) / 2, 848, ctaW, 124, 36);
  ctx.fillStyle = c.button;
  ctx.fill();
  ctx.fillStyle = c.buttonText;
  ctx.fillText(cta, S / 2, 926);

  // Dirección de la web al pie
  ctx.direction = 'ltr';
  ctx.font = `700 34px ${FONT}`;
  ctx.fillStyle = c.muted;
  ctx.fillText(WEB_HOST, S / 2, 1022);
}

/** @param {Challenge} winner @returns {Promise<Blob>} */
async function renderCard(winner) {
  // Las letras y el logo deben estar cargados antes de dibujar
  await Promise.all([
    document.fonts?.load(`800 48px 'Plus Jakarta Sans'`),
    document.fonts?.load(`700 34px 'Plus Jakarta Sans'`),
  ]).catch(() => {});
  const theme = getTheme();
  const logo = await loadImage(CARD_THEMES[theme].logo);
  const canvas = document.createElement('canvas');
  drawCard(canvas, winner, logo, theme);
  return await new Promise((resolve, reject) => canvas.toBlob(b => (b ? resolve(b) : reject(new Error('toBlob'))), 'image/png'));
}

/** @param {Blob} blob @returns {Promise<string>} contenido en base64 (sin la cabecera data:) */
function toBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Una cancelación del usuario no es un error. */
const isCancel = (/** @type {any} */ e) => e?.name === 'AbortError' || /cancel/i.test(String(e?.message ?? e));

/** Error de cancelación (el mismo nombre que usa la API de compartir del navegador). */
const abortError = () => new DOMException('Compartir cancelado', 'AbortError');

/** @param {AbortSignal | undefined} signal */
function throwIfAborted(signal) {
  if (signal?.aborted) throw abortError();
}

/** Deja que el navegador pinte la pantalla de carga antes del trabajo pesado del lienzo. */
function nextPaint() {
  if (typeof requestAnimationFrame !== 'function') return Promise.resolve();
  return new Promise(resolve => {
    const done = () => resolve(undefined);
    requestAnimationFrame(() => setTimeout(done, 0));
    setTimeout(done, 120); // por si la pestaña no pinta (segundo plano)
  });
}

/**
 * Comparte el reto: en Android, por el menú del sistema con la imagen guardada un momento en la caché de la app;
 * en el navegador, con la API de compartir si admite archivos y, si no, descargando la imagen.
 * Se puede cancelar con `signal` mientras se prepara la imagen; `onReady` se llama justo antes de entregarla
 * al sistema (a partir de ahí ya no se puede cancelar desde la app).
 * @param {Challenge} winner
 * @param {{ signal?: AbortSignal, onReady?: () => void }} [options]
 * @returns {Promise<'shared' | 'saved' | 'cancelled'>}
 */
export async function shareChallenge(winner, { signal, onReady } = {}) {
  try {
    throwIfAborted(signal);
    await nextPaint();
    throwIfAborted(signal);
    const blob = await renderCard(winner);
    throwIfAborted(signal);
    const text = shareText(winner);

    if (Capacitor.isNativePlatform()) {
      // La imagen anterior se borra al compartir la siguiente (borrarla nada más abrir el menú podría
      // quitársela a la app que está recibiéndola)
      await Filesystem.rmdir({ path: CACHE_DIR, directory: Directory.Cache, recursive: true }).catch(() => {});
      throwIfAborted(signal);
      const { uri } = await Filesystem.writeFile({
        path: `${CACHE_DIR}/${uniqueName()}`, data: await toBase64(blob), directory: Directory.Cache, recursive: true,
      });
      throwIfAborted(signal);
      onReady?.();
      await Share.share({ text, files: [uri], dialogTitle: t('result.share') });
      return 'shared';
    }

    const file = new File([blob], FILE_NAME, { type: 'image/png' });
    onReady?.();
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], text });
      return 'shared';
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = FILE_NAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    return 'saved';
  } catch (e) {
    if (isCancel(e)) return 'cancelled';
    throw e;
  }
}

/** Borra la carpeta temporal de la caché (al arrancar, por si quedó una imagen de otra sesión). */
export function cleanShareCache() {
  if (Capacitor.isNativePlatform()) Filesystem.rmdir({ path: CACHE_DIR, directory: Directory.Cache, recursive: true }).catch(() => {});
}
