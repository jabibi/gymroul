import { describe, it, expect, afterEach } from 'vitest';
import { shareText, challengeLabel, fitFontSize, APP_URL, IMAGE_SIZE } from '../src/share.js';
import { LANGUAGES, setLanguage, DEFAULT_LANGUAGE, DICTIONARIES } from '../src/i18n/index.js';

const winner = { text: '20 Burpee', fullName: 'Burpee', reps: 20, exercise: 'Burpee', shortName: 'Burpee', color: '#22c55e', icon: 'burpee' };

afterEach(() => setLanguage(DEFAULT_LANGUAGE, { persist: false }));

describe('compartir el reto', () => {
  it('el reto es «repeticiones ejercicio» y el texto lleva el enlace a la ficha de Play', () => {
    expect(challengeLabel(winner)).toBe('20 Burpee');
    expect(APP_URL).toBe('https://play.google.com/store/apps/details?id=eus.jabibi.gymroul');
    for (const { code } of LANGUAGES) {
      setLanguage(code, { persist: false });
      const text = shareText(winner);
      expect(text, code).toContain('20 Burpee');
      expect(text, code).toContain(APP_URL);
      expect(text, code).not.toMatch(/\{\w+\}/);
    }
  });

  it('todos los idiomas traducen el botón y los avisos', () => {
    for (const { code } of LANGUAGES) {
      for (const key of ['result.share', 'share.text', 'share.saved', 'share.failed']) {
        expect(DICTIONARIES[code].strings[key] ?? DICTIONARIES.en.strings[key], `${code}:${key}`).toBeTruthy();
      }
    }
    for (const code of ['ar', 'ca', 'de', 'es', 'eu', 'fr', 'gl', 'hi', 'it', 'ja', 'nl', 'pl', 'pt-BR', 'tr']) {
      expect(DICTIONARIES[code].strings['result.share'], code).not.toBe(DICTIONARIES.en.strings['result.share']);
    }
  });

  it('la imagen es cuadrada y el titular se encoge hasta caber', () => {
    expect(IMAGE_SIZE).toBe(1080);
    const widthAt = size => size * 10; // 10 px por punto de tamaño
    expect(fitFontSize(widthAt, 920, 200, 64)).toBe(92);
    expect(fitFontSize(widthAt, 5000, 200, 64)).toBe(200);
    expect(fitFontSize(widthAt, 10, 200, 64)).toBe(64);
  });
});
