// Sonido (Web Audio) y vibración

import { Capacitor } from '@capacitor/core';
import { Haptics, NotificationType } from '@capacitor/haptics';

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

/**
 * Vibración. En la app Android se usa el plugin nativo (Vibrator del sistema), que es más fiable
 * que navigator.vibrate dentro de la WebView; en la web se mantiene navigator.vibrate.
 * @param {number | number[]} pattern duración en ms o patrón (se interpreta como "éxito")
 */
export function vibrate(pattern = 15) {
  if (Capacitor.isNativePlatform()) {
    const action = Array.isArray(pattern)
      ? Haptics.notification({ type: NotificationType.Success })
      : Haptics.vibrate({ duration: pattern });
    action.catch(() => { /* sin vibrador o desactivado en el sistema */ });
    return;
  }
  if (navigator.vibrate) {
    try { navigator.vibrate(pattern); } catch (e) { /* vibración no disponible */ }
  }
}
