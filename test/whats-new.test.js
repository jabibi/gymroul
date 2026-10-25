import { describe, it, expect, beforeEach } from 'vitest';
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

describe('novedades al abrir la app', () => {
  it('quien abre la app por primera vez (sin nada guardado) también las ve, una sola vez', () => {
    expect(shouldShowWhatsNew()).toBe(true);
    markWhatsNewSeen();
    expect(shouldShowWhatsNew()).toBe(false);
  });

  it('si lo guardado es de una versión anterior de las novedades, vuelven a salir', () => {
    data.set('gym_whatsnew_seen', JSON.stringify('0.9'));
    expect(shouldShowWhatsNew()).toBe(true);
    data.set('gym_whatsnew_seen', JSON.stringify(WHATS_NEW_VERSION));
    expect(shouldShowWhatsNew()).toBe(false);
  });

  it('un valor guardado corrupto cuenta como no visto', () => {
    data.set('gym_whatsnew_seen', '{mal');
    expect(shouldShowWhatsNew()).toBe(true);
  });
});
