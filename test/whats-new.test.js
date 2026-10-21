import { describe, it, expect, beforeEach } from 'vitest';
import { isFreshInstall, migrate } from '../src/store.js';
import { WHATS_NEW_VERSION, shouldShowWhatsNew, markWhatsNewSeen } from '../src/whats-new.js';

let data;
beforeEach(() => {
  data = new Map();
  globalThis.localStorage = {
    getItem: k => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => { data.set(k, String(v)); },
    removeItem: k => { data.delete(k); },
    clear: () => data.clear(),
  };
});

describe('isFreshInstall', () => {
  it('es true si no hay nada guardado y deja de serlo tras migrar', () => {
    expect(isFreshInstall()).toBe(true);
    migrate();
    expect(isFreshInstall()).toBe(false);
  });
});

describe('novedades al abrir la app', () => {
  it('una instalación nueva no las ve, pero quedan como vistas', () => {
    expect(shouldShowWhatsNew(true)).toBe(false);
    expect(shouldShowWhatsNew(false)).toBe(false);
  });

  it('quien ya tenía la app las ve una vez y no vuelve a verlas', () => {
    expect(shouldShowWhatsNew(false)).toBe(true);
    markWhatsNewSeen();
    expect(shouldShowWhatsNew(false)).toBe(false);
  });

  it('si lo guardado es de una versión anterior de las novedades, vuelven a salir', () => {
    data.set('gym_whatsnew_seen', JSON.stringify('0.9'));
    expect(shouldShowWhatsNew(false)).toBe(true);
    data.set('gym_whatsnew_seen', JSON.stringify(WHATS_NEW_VERSION));
    expect(shouldShowWhatsNew(false)).toBe(false);
  });

  it('un valor guardado corrupto cuenta como no visto', () => {
    data.set('gym_whatsnew_seen', '{mal');
    expect(shouldShowWhatsNew(false)).toBe(true);
  });
});
