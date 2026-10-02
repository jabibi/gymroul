import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const impact = vi.fn(() => Promise.resolve());
const notification = vi.fn(() => Promise.resolve());
const oneShot = vi.fn(() => Promise.resolve());
vi.mock('@capacitor/core', () => ({ Capacitor: { isNativePlatform: () => true } }));
vi.mock('@capacitor/haptics', () => ({
  ImpactStyle: { Heavy: 'HEAVY' },
  NotificationType: { Warning: 'WARNING' },
  Haptics: { impact: (...a) => impact(...a), notification: (...a) => notification(...a), vibrate: (...a) => oneShot(...a) },
}));

const { vibrate, vibrateTick, vibrateResult } = await import('../src/audio.js');

describe('vibración nativa', () => {
  beforeEach(() => { vi.useFakeTimers(); impact.mockClear(); notification.mockClear(); oneShot.mockClear(); });
  afterEach(() => { vi.useRealTimers(); });

  it('nunca usa Haptics.vibrate (pulso de amplitud por defecto, que muchos móviles no notan)', () => {
    vibrate();
    vibrateTick();
    vibrateResult();
    vi.advanceTimersByTime(2000);
    expect(oneShot).not.toHaveBeenCalled();
  });

  it('un golpe usa impact con la intensidad máxima', () => {
    vibrate();
    expect(impact).toHaveBeenCalledWith({ style: 'HEAVY' });
  });

  it('el resultado es una notificación fuerte seguida de dos golpes', () => {
    vibrateResult();
    expect(notification).toHaveBeenCalledWith({ type: 'WARNING' });
    expect(impact).not.toHaveBeenCalled();
    vi.advanceTimersByTime(2000);
    expect(impact).toHaveBeenCalledTimes(2);
  });

  it('una vibración nueva cancela los golpes pendientes del resultado', () => {
    vibrateResult();
    vi.advanceTimersByTime(100);
    vibrate();
    vi.advanceTimersByTime(2000);
    expect(impact).toHaveBeenCalledTimes(1);
  });

  it('el pulso de sector respeta la separación mínima', () => {
    const now = vi.spyOn(performance, 'now');
    now.mockReturnValue(1000);
    vibrateTick();
    now.mockReturnValue(1050); // demasiado pronto
    vibrateTick();
    now.mockReturnValue(1200);
    vibrateTick();
    expect(impact).toHaveBeenCalledTimes(2);
    now.mockRestore();
  });
});
