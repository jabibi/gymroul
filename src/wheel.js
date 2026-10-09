// @ts-check
// Render (canvas), física y arrastre de la ruleta

import { getWinningIndex, normalizeDelta, CONFIG_SEGMENT } from './wheel-math.js';
import { t } from './i18n/index.js';
import { initAudio, playTickSound, vibrateSpinStart } from './audio.js';

/** @typedef {import('./wheel-math.js').Segment} Segment */

const TWO_PI = 2 * Math.PI;
const FRICTION = 0.982; // factor de rozamiento por cada 1/60 s
const FRAME_MS = 1000 / 60;
const MIN_SAMPLE_MS = 4;

/** Color de marca (variable CSS --brand-500), para el aro interior de la ruleta */
let brandColor = '#22c55e';

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

// Las etiquetas y sombras son costosas: los sectores se dibujan una vez en un canvas auxiliar
// y cada fotograma solo lo rota
/** @type {HTMLCanvasElement | null} */
let cache = null;
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
    c.strokeStyle = '#020617';
    c.stroke();

    c.save();
    c.rotate(start + slice / 2);
    c.textAlign = 'right';
    c.textBaseline = 'middle';
    c.fillStyle = '#ffffff';
    const fontSize = Math.max(9, Math.min(12, Math.floor(size / (total * 0.7))));
    c.font = `800 ${fontSize}px 'Plus Jakarta Sans', 'Noto Sans Arabic', 'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'IPAGothic', sans-serif`;
    c.shadowColor = 'rgba(0, 0, 0, 0.9)';
    c.shadowBlur = 4;
    const label = segments[i] === CONFIG_SEGMENT
      ? t('wheel.setup')
      : total >= 24 ? `${segments[i].reps} ${segments[i].shortName}` : segments[i].text;
    c.fillText(label, radius - 16, 0);
    c.restore();
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

  // Resalte del sector activo
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, radius, activeIndex * slice, (activeIndex + 1) * slice);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
  ctx.fill();
  ctx.restore();

  // Anillos exteriores
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, TWO_PI);
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#1e293b';
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

/** Vuelve a dibujar las etiquetas (p. ej. al cambiar de idioma el sector de configuración). */
export function refreshLabels() {
  cacheDirty = true;
  draw();
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

/**
 * @param {HTMLCanvasElement} canvasEl
 * @param {typeof callbacks} cbs
 */
export function initWheel(canvasEl, cbs) {
  canvas = canvasEl;
  const channels = getComputedStyle(document.documentElement).getPropertyValue('--brand-500').trim();
  if (channels) brandColor = `rgb(${channels.split(/\s+/).join(',')})`;
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
