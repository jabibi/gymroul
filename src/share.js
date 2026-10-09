// @ts-check
// Compartir el reto del resultado: una imagen PNG y un texto con el enlace a la app. Todo se genera en
// el dispositivo y se entrega al menú de compartir del sistema; la app no envía nada a ningún sitio
// (por eso no necesita el permiso de Internet).

import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { t, getLanguage, isRtl } from './i18n/index.js';

/** @typedef {import('./wheel-math.js').Segment} Segment */

/** Ficha de la app en Google Play: es lo que lleva el texto compartido. */
export const APP_URL = 'https://play.google.com/store/apps/details?id=eus.jabibi.gymroul';
/** Dirección corta que se dibuja al pie de la imagen. */
const WEB_HOST = 'gymroul.web.app';

export const IMAGE_SIZE = 1080;
const FILE_NAME = 'gymroulette-reto.png';
/** Carpeta de la caché de la app donde se deja la imagen mientras se comparte. */
const CACHE_DIR = 'share';
const FONT = "'Plus Jakarta Sans', 'Noto Sans Arabic', 'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'IPAGothic', sans-serif";

/** @param {Segment} winner */
export const challengeLabel = winner => `${winner.reps} ${winner.exercise}`;

/** @param {Segment} winner @returns {string} texto que acompaña a la imagen */
export const shareText = winner => t('share.text', { challenge: challengeLabel(winner), url: APP_URL });

/**
 * Mayor tamaño de letra (entre min y start) con el que el texto cabe en el ancho dado.
 * @param {(size: number) => number} widthAt ancho del texto con ese tamaño
 * @param {number} maxWidth @param {number} start @param {number} min
 */
export function fitFontSize(widthAt, maxWidth, start, min) {
  let size = start;
  while (size > min && widthAt(size) > maxWidth) size--;
  return size;
}

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
 * Dibuja la tarjeta del reto (marca, reto, color del sector, botón y dirección) en un lienzo cuadrado.
 * @param {HTMLCanvasElement} canvas @param {Segment} winner @param {HTMLImageElement | null} logo
 */
export function drawCard(canvas, winner, logo) {
  const S = IMAGE_SIZE;
  canvas.width = S;
  canvas.height = S;
  const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
  const rtl = isRtl(getLanguage());
  ctx.direction = rtl ? 'rtl' : 'ltr';
  const green = '34, 197, 94';

  const bg = ctx.createLinearGradient(0, 0, S, S);
  bg.addColorStop(0, '#0B1220');
  bg.addColorStop(1, '#020617');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, S, S);
  const glow = ctx.createRadialGradient(S / 2, S * 0.5, 0, S / 2, S * 0.5, S * 0.62);
  glow.addColorStop(0, `rgba(${green}, .24)`);
  glow.addColorStop(1, `rgba(${green}, 0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, S, S);

  // Marca arriba, centrada: logo, nombre y rótulo
  const brandW = 640;
  const bx = (S - brandW) / 2;
  if (logo) ctx.drawImage(logo, bx, 96, 128, 128);
  ctx.textAlign = 'left';
  ctx.direction = 'ltr';
  ctx.textBaseline = 'alphabetic';
  ctx.font = `800 72px ${FONT}`;
  ctx.fillStyle = '#fff';
  const gymW = ctx.measureText('Gym').width;
  ctx.fillText('Gym', bx + 160, 160);
  ctx.fillStyle = `rgb(${green})`;
  ctx.fillText('Roulette', bx + 160 + gymW, 160);
  ctx.font = `800 26px ${FONT}`;
  ctx.fillStyle = '#4ADE80';
  if ('letterSpacing' in ctx) /** @type {any} */ (ctx).letterSpacing = '6px';
  ctx.fillText('WORKOUT GENERATOR', bx + 162, 206);
  if ('letterSpacing' in ctx) /** @type {any} */ (ctx).letterSpacing = '0px';
  ctx.direction = rtl ? 'rtl' : 'ltr';

  // Insignia del resultado
  ctx.textAlign = 'center';
  const badge = t('result.badge');
  ctx.font = `800 34px ${FONT}`;
  const badgeW = ctx.measureText(badge).width + 96;
  roundRect(ctx, (S - badgeW) / 2, 340, badgeW, 76, 38);
  ctx.fillStyle = `rgba(${green}, .14)`;
  ctx.fill();
  ctx.strokeStyle = `rgba(${green}, .45)`;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#4ADE80';
  ctx.fillText(badge, S / 2, 392);

  // El reto, lo más grande que quepa
  const label = challengeLabel(winner);
  const size = fitFontSize(px => (ctx.font = `800 ${px}px ${FONT}`, ctx.measureText(label).width), S - 160, 200, 64);
  ctx.font = `800 ${size}px ${FONT}`;
  ctx.fillStyle = '#fff';
  ctx.fillText(label, S / 2, 590);

  // Barra con el color del sector de la ruleta
  roundRect(ctx, (S - 360) / 2, 640, 360, 18, 9);
  ctx.fillStyle = winner.color;
  ctx.fill();

  // Botón con el texto de girar
  const cta = t('spin.button');
  ctx.font = `800 44px ${FONT}`;
  const ctaW = Math.min(S - 160, ctx.measureText(cta).width + 160);
  const button = ctx.createLinearGradient((S - ctaW) / 2, 0, (S + ctaW) / 2, 0);
  button.addColorStop(0, 'rgb(22, 163, 74)');
  button.addColorStop(1, 'rgb(74, 222, 128)');
  roundRect(ctx, (S - ctaW) / 2, 760, ctaW, 124, 36);
  ctx.fillStyle = button;
  ctx.fill();
  ctx.fillStyle = '#020617';
  ctx.fillText(cta, S / 2, 838);

  // Dirección de la web al pie
  ctx.direction = 'ltr';
  ctx.font = `700 34px ${FONT}`;
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(WEB_HOST, S / 2, 988);
}

/** @param {Segment} winner @returns {Promise<Blob>} */
export async function renderCard(winner) {
  // Las letras y el logo deben estar cargados antes de dibujar
  await Promise.all([
    document.fonts?.load(`800 48px 'Plus Jakarta Sans'`),
    document.fonts?.load(`700 34px 'Plus Jakarta Sans'`),
  ]).catch(() => {});
  const logo = await loadImage('favicon.svg');
  const canvas = document.createElement('canvas');
  drawCard(canvas, winner, logo);
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

/**
 * Comparte el reto: en Android, por el menú del sistema con la imagen guardada un momento en la caché de la app;
 * en el navegador, con la API de compartir si admite archivos y, si no, descargando la imagen.
 * @param {Segment} winner
 * @returns {Promise<'shared' | 'saved' | 'cancelled'>}
 */
export async function shareChallenge(winner) {
  const blob = await renderCard(winner);
  const text = shareText(winner);

  if (Capacitor.isNativePlatform()) {
    // La imagen anterior se borra al compartir la siguiente (borrarla nada más abrir el menú podría
    // quitársela a la app que está recibiéndola)
    await Filesystem.rmdir({ path: CACHE_DIR, directory: Directory.Cache, recursive: true }).catch(() => {});
    const { uri } = await Filesystem.writeFile({
      path: `${CACHE_DIR}/${FILE_NAME}`, data: await toBase64(blob), directory: Directory.Cache, recursive: true,
    });
    try {
      await Share.share({ text, files: [uri], dialogTitle: t('result.share') });
      return 'shared';
    } catch (e) {
      if (isCancel(e)) return 'cancelled';
      throw e;
    }
  }

  const file = new File([blob], FILE_NAME, { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text });
      return 'shared';
    } catch (e) {
      if (isCancel(e)) return 'cancelled';
      throw e;
    }
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
}

/** Borra la carpeta temporal de la caché (al arrancar, por si quedó una imagen de otra sesión). */
export function cleanShareCache() {
  if (Capacitor.isNativePlatform()) Filesystem.rmdir({ path: CACHE_DIR, directory: Directory.Cache, recursive: true }).catch(() => {});
}
