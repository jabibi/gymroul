// @ts-check
// Render (canvas), física y arrastre de la ruleta

import { getWinningIndex, normalizeDelta, fitLabel, CONFIG_SEGMENT } from './wheel-math.js';
import { t } from './i18n/index.js';
import { initAudio, playTickSound, vibrateSpinStart } from './audio.js';

/** @typedef {import('./wheel-math.js').Segment} Segment */

const TWO_PI = 2 * Math.PI;
const FRICTION = 0.982; // factor de rozamiento por cada 1/60 s
const FRAME_MS = 1000 / 60;
const MIN_SAMPLE_MS = 4;

/** Color de marca (variable CSS --brand-500), para el aro interior de la ruleta */
let brandColor = '#10b981';
/** Separación entre sectores y aro exterior: salen de las variables CSS de la apariencia (--wheel-line y --wheel-ring) */
let lineColor = '#020617';
let ringColor = '#1e293b';

/** @type {HTMLCanvasElement} */ let canvas;
/** @type {CanvasRenderingContext2D} */ let ctx;
/** @type {{ onChange: () => void, onFinish: (segment: Segment) => void }} */
let callbacks;

/** @type {Segment[]} */
let segments = [];
let wheelSize = 0;
let dpr = 1;
let currentAngle = 0;
let isSpinning = false;
let angularVelocity = 0; // rad por fotograma a 60 fps
let lastFrameTime = 0;
let lastTickIndex = -1;

// Las etiquetas y sombras son costosas: los sectores y las etiquetas se dibujan una vez en dos canvas auxiliares
// y cada fotograma solo los rota. Van separados para poder oscurecer los sectores que no están bajo el puntero
// sin apagar el texto
/** @type {HTMLCanvasElement | null} */
let cache = null;
/** @type {HTMLCanvasElement | null} */
let labelCache = null;
let cacheDirty = true;

// Arrastre
let isDragging = false;
let lastTouchAngle = 0;
let lastSampleAngle = 0;
let lastPointerTime = 0;
/** @type {{ vel: number, time: number }[]} */
let velocitySamples = [];

export const getSegments = () => segments;
export const isBusy = () => isSpinning;
/** Velocidad angular actual (rad por fotograma a 60 fps), siempre positiva */
export const getSpinSpeed = () => Math.abs(angularVelocity);
export const getActiveIndex = () => getWinningIndex(currentAngle, segments.length);
export const getActiveSegment = () => segments[getActiveIndex()];

/** @param {Segment[]} next */
export function setSegments(next) {
  segments = next;
  cacheDirty = true;
  lastTickIndex = getActiveIndex();
  draw();
  callbacks.onChange();
}

const MIN_LABEL_SIZE = 12;
/** Separación entre líneas de una etiqueta de dos líneas, en múltiplos del tamaño de letra */
const LABEL_LINE_HEIGHT = 1.15;
/** Tamaño máximo de etiqueta en una ruleta de 320 px; crece en proporción con el tamaño de la ruleta (tope en MAX_LABEL_SCALED) */
const MAX_LABEL_SIZE = 18;
const MAX_LABEL_SCALED = 24;
/** Fracción del radio que ocupa el botón central: el texto de los sectores empieza después */
const LABEL_HUB_RESERVE = 0.32;
const labelFont = (/** @type {number} */ px) => `800 ${px}px 'Plus Jakarta Sans', 'Manrope', 'Noto Sans Arabic', 'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'IPAGothic', sans-serif`;

function buildCache() {
  const size = wheelSize;
  const center = size / 2;
  const radius = center - 12;
  const total = segments.length;
  const slice = TWO_PI / total;

  cache = document.createElement('canvas');
  cache.width = size * dpr;
  cache.height = size * dpr;
  const c = /** @type {CanvasRenderingContext2D} */ (cache.getContext('2d'));
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.translate(center, center);

  labelCache = document.createElement('canvas');
  labelCache.width = size * dpr;
  labelCache.height = size * dpr;
  const l = /** @type {CanvasRenderingContext2D} */ (labelCache.getContext('2d'));
  l.setTransform(dpr, 0, 0, dpr, 0, 0);
  l.translate(center, center);

  for (let i = 0; i < total; i++) {
    const start = i * slice;
    const end = (i + 1) * slice;

    c.beginPath();
    c.moveTo(0, 0);
    c.arc(0, 0, radius, start, end);
    c.closePath();
    c.fillStyle = segments[i].color;
    c.fill();
    c.lineWidth = 1.5;
    c.strokeStyle = lineColor;
    c.stroke();

    l.save();
    l.rotate(start + slice / 2);
    l.textAlign = 'right';
    l.textBaseline = 'middle';
    l.fillStyle = '#ffffff';
    l.shadowColor = 'rgba(0, 0, 0, 0.9)';
    l.shadowBlur = 4;
    const label = segments[i] === CONFIG_SEGMENT
      ? t('wheel.setup')
      : segments[i].text;
    // Tamaño según el grosor del sector junto al botón central; si el texto no cabe en el radio libre, baja
    // hasta el mínimo y, si aun así no cabe, se recorta con «…» (el usuario puede escribir cualquier nombre)
    const textEnd = radius - 16;
    const textStart = radius * LABEL_HUB_RESERVE;
    const thickness = 2 * textStart * Math.sin(Math.min(slice, Math.PI) / 2);
    const maxSize = Math.max(MIN_LABEL_SIZE, Math.min(Math.min(MAX_LABEL_SCALED, Math.round(MAX_LABEL_SIZE * size / 320)), Math.floor(thickness * 0.55)));
    // Hay sitio para dos líneas si, a mitad del texto, el sector es más alto que dos líneas del tamaño mínimo
    const midThickness = 2 * ((textStart + textEnd) / 2) * Math.sin(Math.min(slice, Math.PI) / 2);
    const maxLines = midThickness >= MIN_LABEL_SIZE * LABEL_LINE_HEIGHT * 2 + 8 ? 2 : 1;
    const fitted = fitLabel((text, px) => (l.font = labelFont(px), l.measureText(text).width), label, textEnd - textStart, Math.max(maxSize, MIN_LABEL_SIZE), MIN_LABEL_SIZE, maxLines);
    l.font = labelFont(fitted.size);
    const lineGap = fitted.size * LABEL_LINE_HEIGHT;
    fitted.lines.forEach((line, n) => l.fillText(line, textEnd, (n - (fitted.lines.length - 1) / 2) * lineGap));
    l.restore();
  }
  cacheDirty = false;
}

function draw() {
  const total = segments.length;
  if (total === 0 || wheelSize === 0) return;
  if (cacheDirty || !cache) buildCache();

  const center = wheelSize / 2;
  const radius = center - 12;
  const slice = TWO_PI / total;
  const activeIndex = getActiveIndex();

  ctx.clearRect(0, 0, wheelSize, wheelSize);

  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(currentAngle);
  ctx.drawImage(/** @type {HTMLCanvasElement} */ (cache), -center, -center, wheelSize, wheelSize);

  // Resalte del sector activo: se oscurecen los demás. Aclarar el activo le quitaría contraste justo al texto blanco que se está leyendo
  if (total > 1) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, (activeIndex + 1) * slice, (activeIndex + total) * slice);
    ctx.closePath();
    ctx.fillStyle = 'rgba(2, 6, 23, 0.34)';
    ctx.fill();
  }
  ctx.drawImage(/** @type {HTMLCanvasElement} */ (labelCache), -center, -center, wheelSize, wheelSize);
  ctx.restore();

  // Anillos exteriores
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, TWO_PI);
  ctx.lineWidth = 8;
  ctx.strokeStyle = ringColor;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(center, center, radius - 4, 0, TWO_PI);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = brandColor;
  ctx.stroke();
}

// Sonido y vibración al cruzar de sector; solo lo llaman el arrastre y el giro,
// nunca un simple redibujado (resize, cambio de configuración...)
function checkTick() {
  const index = getActiveIndex();
  if (index !== lastTickIndex) {
    playTickSound();
    lastTickIndex = index;
  }
}

export function resize() {
  const newDpr = window.devicePixelRatio || 1;
  const newSize = canvas.getBoundingClientRect().width || 360;
  // Un resize que no cambia el tamaño (teclado virtual, barras del navegador) no necesita reconfigurar el canvas
  if (newSize === wheelSize && newDpr === dpr) return;
  wheelSize = newSize;
  dpr = newDpr;
  canvas.width = wheelSize * dpr;
  canvas.height = wheelSize * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cacheDirty = true;
  lastTickIndex = getActiveIndex();
  draw();
  callbacks.onChange();
}

/** @param {PointerEvent} e */
function angleFromCenter(e) {
  const rect = canvas.getBoundingClientRect();
  return Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2));
}

/** @param {PointerEvent} e */
function onPointerDown(e) {
  if (isSpinning) return;
  isDragging = true;
  initAudio();
  lastTouchAngle = angleFromCenter(e);
  velocitySamples = [];
  lastPointerTime = performance.now();
  lastSampleAngle = currentAngle;
  canvas.setPointerCapture(e.pointerId);
}

/** @param {PointerEvent} e */
function onPointerMove(e) {
  if (!isDragging || isSpinning) return;
  // Se acumula el incremento entre eventos en vez de la diferencia con el inicio:
  // así cruzar el eje ±π no genera un salto de 2π ni una velocidad falsa
  const touchAngle = angleFromCenter(e);
  currentAngle += normalizeDelta(touchAngle - lastTouchAngle);
  lastTouchAngle = touchAngle;

  const now = performance.now();
  const dt = now - lastPointerTime;
  // Eventos casi simultáneos darían velocidades desproporcionadas: se acumulan en la siguiente muestra
  if (dt >= MIN_SAMPLE_MS) {
    velocitySamples.push({ vel: (currentAngle - lastSampleAngle) / (dt / 1000), time: now });
    if (velocitySamples.length > 5) velocitySamples.shift();
    lastPointerTime = now;
    lastSampleAngle = currentAngle;
  }

  checkTick();
  draw();
  callbacks.onChange();
}

/** @param {PointerEvent} e */
function onPointerUp(e) {
  if (!isDragging) return;
  isDragging = false;
  try { canvas.releasePointerCapture(e.pointerId); } catch (err) { /* ya liberado */ }

  const now = performance.now();
  const recent = velocitySamples.filter(s => now - s.time < 100);
  if (recent.length > 0) {
    const avgVel = recent.reduce((sum, s) => sum + s.vel, 0) / recent.length;
    const perFrame = avgVel / 60;
    if (Math.abs(perFrame) > 0.02) {
      startSpin(Math.sign(perFrame) * Math.min(Math.abs(perFrame), 0.65));
    }
  }
  // Sin inercia suficiente la ruleta se queda donde está y no hay resultado
}

/** @param {number} velocity */
function startSpin(velocity) {
  isSpinning = true;
  vibrateSpinStart();
  angularVelocity = velocity;
  lastFrameTime = performance.now();
  requestAnimationFrame(animate);
}

/**
 * Lanza un giro en sentido horario con velocidad inicial aleatoria
 * (en el canvas un ángulo creciente es sentido horario).
 */
export function spin() {
  if (isSpinning || segments.length === 0) return;
  initAudio();
  startSpin(0.38 + Math.random() * 0.25);
}

// Física basada en tiempo real: misma duración y velocidad a 60, 120 o 144 Hz
/** @param {number} now */
function animate(now) {
  if (!isSpinning) return;
  // Se limita el salto de tiempo (pestaña en segundo plano, tirones) a 3 fotogramas
  const frames = Math.min((now - lastFrameTime) / FRAME_MS, 3);
  lastFrameTime = now;
  angularVelocity *= Math.pow(FRICTION, frames);
  currentAngle += angularVelocity * frames;

  checkTick();
  draw();
  callbacks.onChange();

  if (Math.abs(angularVelocity) < 0.0015) {
    angularVelocity = 0;
    isSpinning = false;
    callbacks.onFinish(getActiveSegment());
  } else {
    requestAnimationFrame(animate);
  }
}

function readBrandColor() {
  const css = getComputedStyle(document.documentElement);
  const channels = css.getPropertyValue('--brand-500').trim();
  if (channels) brandColor = `rgb(${channels.split(/\s+/).join(',')})`;
  lineColor = css.getPropertyValue('--wheel-line').trim() || lineColor;
  ringColor = css.getPropertyValue('--wheel-ring').trim() || ringColor;
}

/** Vuelve a leer el color de marca y repinta la ruleta (al cambiar de apariencia). */
export function refreshBrand() {
  readBrandColor();
  cacheDirty = true;
  draw();
}

/**
 * @param {HTMLCanvasElement} canvasEl
 * @param {typeof callbacks} cbs
 */
export function initWheel(canvasEl, cbs) {
  canvas = canvasEl;
  readBrandColor();
  ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
  callbacks = cbs;

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', () => { isDragging = false; });
  window.addEventListener('resize', resize);
  // Al cargar la fuente web hay que regenerar las etiquetas del caché
  document.fonts?.ready.then(() => { cacheDirty = true; draw(); });
}
