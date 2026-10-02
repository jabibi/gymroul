// Sonido (Web Audio) y vibración

import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

/** @type {AudioContext | null} */
let audioCtx = null;
let soundEnabled = true;

export const isSoundEnabled = () => soundEnabled;

export function toggleSound() {
  soundEnabled = !soundEnabled;
  return soundEnabled;
}

export function initAudio() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || /** @type {any} */ (window).webkitAudioContext;
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

export function playTickSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    const ctx = /** @type {AudioContext} */ (audioCtx);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.025);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.025);
  } catch (e) { /* audio no disponible */ }
}

export function playWinFanfare() {
  if (!soundEnabled) return;
  try {
    initAudio();
    const ctx = /** @type {AudioContext} */ (audioCtx);
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }, idx * 90);
    });
  } catch (e) { /* audio no disponible */ }
}

// --- Vibración -----------------------------------------------------------------------------
// En Android se usa el plugin nativo. Haptics.vibrate({ duration }) crea un pulso con amplitud "por
// defecto" que muchos móviles ignoran o dejan imperceptible; en cambio impact() y notification()
// usan formas de onda con amplitud explícita (hasta 255) y sí se notan. Por eso todo pasa por esas
// dos. En la web se mantiene navigator.vibrate.

/** Pulso de la web al cruzar de sector (ms) */
export const TICK_VIBRATION_MS = 30;
/** Patrón de la web para el resultado: [vibra, pausa, vibra, ...] en ms */
export const RESULT_VIBRATION = [150, 80, 150, 80, 320];
/** Con la ruleta rápida los sectores pasan muy seguidos: los pulsos se funden en una vibración continua */
const MIN_TICK_GAP_MS = 90;
/** En la app el resultado es una notificación fuerte seguida de dos golpes (ms desde el inicio) */
const NATIVE_RESULT_FOLLOWUPS_MS = [380, 540];

/** @type {ReturnType<typeof setTimeout>[]} */
let pendingTimers = [];
let lastTickVibration = 0;

function ignoreHapticError() { /* sin vibrador o desactivado en el sistema */ }

function nativeImpact() {
  Haptics.impact({ style: ImpactStyle.Heavy }).catch(ignoreHapticError);
}

function cancelPending() {
  pendingTimers.forEach(t => clearTimeout(t));
  pendingTimers = [];
}

/** Vibración corta y fuerte (un golpe). */
export function vibrate() {
  cancelPending();
  if (Capacitor.isNativePlatform()) nativeImpact();
  else if (navigator.vibrate) {
    try { navigator.vibrate(TICK_VIBRATION_MS); } catch (e) { /* vibración no disponible */ }
  }
}

/** Pulso al cruzar de sector, con una separación mínima entre pulsos. */
export function vibrateTick() {
  const now = performance.now();
  if (now - lastTickVibration < MIN_TICK_GAP_MS) return;
  lastTickVibration = now;
  vibrate();
}

/** Vibración al mostrar el resultado: claramente más fuerte y larga que la de cada sector. */
export function vibrateResult() {
  cancelPending();
  if (Capacitor.isNativePlatform()) {
    Haptics.notification({ type: NotificationType.Warning }).catch(ignoreHapticError);
    NATIVE_RESULT_FOLLOWUPS_MS.forEach(at => pendingTimers.push(setTimeout(nativeImpact, at)));
  } else if (navigator.vibrate) {
    try { navigator.vibrate(RESULT_VIBRATION); } catch (e) { /* vibración no disponible */ }
  }
}
