// Sonido (Web Audio) y vibración

import { Capacitor } from '@capacitor/core';
import { Haptics } from '@capacitor/haptics';

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

// Intensidades de la vibración. Un pulso de 10 ms apenas se nota en muchos móviles: el motor
// necesita unos 25-30 ms para arrancar y entregar algo perceptible.
export const TICK_VIBRATION_MS = 30;
/** Resultado: tres pulsos crecientes [vibra, pausa, vibra, pausa, vibra] en ms */
export const RESULT_VIBRATION = [150, 80, 150, 80, 320];
/** Con la ruleta rápida los sectores pasan muy seguidos: los pulsos se funden en una vibración continua */
const MIN_TICK_GAP_MS = 70;

/** @type {ReturnType<typeof setTimeout>[]} */
let patternTimers = [];
let lastTickVibration = 0;

/** @param {number} duration */
function nativePulse(duration) {
  Haptics.vibrate({ duration }).catch(() => { /* sin vibrador o desactivado en el sistema */ });
}

/**
 * Vibración. En la app Android se usa el plugin nativo (Vibrator del sistema), que es más fiable
 * que navigator.vibrate dentro de la WebView; en la web se mantiene navigator.vibrate.
 * @param {number | number[]} pattern duración en ms, o patrón [vibra, pausa, vibra, ...] en ms
 */
export function vibrate(pattern = TICK_VIBRATION_MS) {
  patternTimers.forEach(clearTimeout);
  patternTimers = [];

  if (Capacitor.isNativePlatform()) {
    if (!Array.isArray(pattern)) {
      nativePulse(pattern);
      return;
    }
    // El plugin solo admite una duración: el patrón se reproduce encadenando pulsos
    let at = 0;
    pattern.forEach((ms, i) => {
      if (i % 2 === 0) patternTimers.push(setTimeout(() => nativePulse(ms), at));
      at += ms;
    });
    return;
  }
  if (navigator.vibrate) {
    try { navigator.vibrate(pattern); } catch (e) { /* vibración no disponible */ }
  }
}

/** Pulso al cruzar de sector, con una separación mínima entre pulsos. */
export function vibrateTick() {
  const now = performance.now();
  if (now - lastTickVibration < MIN_TICK_GAP_MS) return;
  lastTickVibration = now;
  vibrate(TICK_VIBRATION_MS);
}
