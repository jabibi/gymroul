import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const impact = vi.fn(() => Promise.resolve());
const notification = vi.fn(() => Promise.resolve());
const oneShot = vi.fn(() => Promise.resolve());
vi.mock('@capacitor/core', () => ({ Capacitor: { isNativePlatform: () => true } }));
vi.mock('@capacitor/haptics', () => ({
  ImpactStyle: { Heavy: 'HEAVY' },
  NotificationType: { Warning: 'WARNING', Success: 'SUCCESS' },
  Haptics: { impact: (...a) => impact(...a), notification: (...a) => notification(...a), vibrate: (...a) => oneShot(...a) },
}));

const audio = await import('../src/audio.js');

describe('vibración del resultado (nativa)', () => {
  beforeEach(() => { vi.useFakeTimers(); impact.mockClear(); notification.mockClear(); oneShot.mockClear(); });
  afterEach(() => { vi.useRealTimers(); });

  it('es una notificación fuerte seguida de dos golpes', () => {
    audio.vibrateResult();
    expect(notification).toHaveBeenCalledWith({ type: 'WARNING' });
    expect(impact).not.toHaveBeenCalled();
    vi.advanceTimersByTime(2000);
    expect(impact).toHaveBeenCalledTimes(2);
    expect(impact).toHaveBeenCalledWith({ style: 'HEAVY' });
  });

  it('nunca usa Haptics.vibrate (pulso de amplitud por defecto, que muchos móviles no notan)', () => {
    audio.vibrateResult();
    vi.advanceTimersByTime(2000);
    expect(oneShot).not.toHaveBeenCalled();
  });

  it('repetirla no acumula golpes pendientes de la anterior', () => {
    audio.vibrateResult();
    vi.advanceTimersByTime(100);
    audio.vibrateResult();
    vi.advanceTimersByTime(2000);
    expect(impact).toHaveBeenCalledTimes(2);
  });

  it('el inicio del giro es una única notificación de éxito, distinta al resultado', () => {
    audio.vibrateSpinStart();
    vi.advanceTimersByTime(2000);
    expect(notification).toHaveBeenCalledTimes(1);
    expect(notification).toHaveBeenCalledWith({ type: 'SUCCESS' });
    expect(impact).not.toHaveBeenCalled();
    expect(oneShot).not.toHaveBeenCalled();
  });

  it('la ruleta ya no vibra al girar: no se exporta ninguna vibración por sector', () => {
    expect(audio.vibrateTick).toBeUndefined();
  });
});
