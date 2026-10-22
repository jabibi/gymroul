// Sonido (Web Audio) y vibración

import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

/** @type {AudioContext | null} */
let audioCtx = null;
let soundEnabled = true;

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
// Vibran el inicio del giro (un toque corto de éxito) y el resultado (notificación fuerte y dos golpes);
// durante el giro no vibra. Son deliberadamente distintos para poder reconocerlos sin mirar. En Android se usa el plugin nativo:
// Haptics.vibrate({ duration }) crea un pulso con amplitud "por defecto" que muchos móviles ignoran,
// mientras que impact() y notification() usan formas de onda con amplitud explícita (hasta 255) y sí
// se notan; por eso se usan estas dos. En la web se mantiene navigator.vibrate.

/** Patrón de la web para el inicio del giro: un único toque corto */
export const SPIN_START_VIBRATION = [45];
/** Patrón de la web para el resultado: [vibra, pausa, vibra, ...] en ms */
export const RESULT_VIBRATION = [150, 80, 150, 80, 320];
/** En la app el resultado es una notificación fuerte seguida de dos golpes (ms desde el inicio) */
const NATIVE_RESULT_FOLLOWUPS_MS = [380, 540];

/** @type {ReturnType<typeof setTimeout>[]} */
let pendingTimers = [];

function ignoreHapticError() { /* sin vibrador o desactivado en el sistema */ }

function nativeImpact() {
  Haptics.impact({ style: ImpactStyle.Heavy }).catch(ignoreHapticError);
}

/** Vibración al mostrar el resultado. */
export function vibrateResult() {
  pendingTimers.forEach(t => clearTimeout(t));
  pendingTimers = [];
  if (Capacitor.isNativePlatform()) {
    Haptics.notification({ type: NotificationType.Warning }).catch(ignoreHapticError);
    NATIVE_RESULT_FOLLOWUPS_MS.forEach(at => pendingTimers.push(setTimeout(nativeImpact, at)));
  } else if (navigator.vibrate) {
    try { navigator.vibrate(RESULT_VIBRATION); } catch (e) { /* vibración no disponible */ }
  }
}

/** Vibración al iniciar el giro: un toque corto de tipo éxito, muy distinto al patrón del resultado. */
export function vibrateSpinStart() {
  if (Capacitor.isNativePlatform()) {
    Haptics.notification({ type: NotificationType.Success }).catch(ignoreHapticError);
  } else if (navigator.vibrate) {
    try { navigator.vibrate(SPIN_START_VIBRATION); } catch (e) { /* vibración no disponible */ }
  }
}
