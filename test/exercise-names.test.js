import { describe, it, expect, afterEach } from 'vitest';
import { LANGUAGES, DICTIONARIES, setLanguage, DEFAULT_LANGUAGE } from '../src/i18n/index.js';
import { exerciseLabels, DEFAULT_EXERCISE_KEYS } from '../src/exercise-names.js';
import { DEFAULT_EXERCISES } from '../src/store.js';

afterEach(() => setLanguage(DEFAULT_LANGUAGE, { persist: false }));

describe('nombres de los ejercicios por defecto', () => {
  it('hay una clave para cada ejercicio por defecto y su traducción existe en todos los idiomas', () => {
    expect(Object.keys(DEFAULT_EXERCISE_KEYS).sort()).toEqual(DEFAULT_EXERCISES.map(e => e.id).sort());
    for (const { code } of LANGUAGES) {
      setLanguage(code, { persist: false });
      for (const ex of DEFAULT_EXERCISES) {
        const { name, shortName } = exerciseLabels(ex);
        const key = DEFAULT_EXERCISE_KEYS[ex.id];
        expect(name, `${code}:${key}`).not.toBe(`exercise.${key}`);
        expect(shortName, `${code}:${key}.short`).not.toBe(`exercise.${key}.short`);
        expect(name.trim()).not.toBe('');
      }
    }
  });

  it('en inglés se ven igual que los nombres guardados', () => {
    for (const ex of DEFAULT_EXERCISES) {
      expect(exerciseLabels(ex)).toEqual({ name: ex.name, shortName: ex.shortName });
    }
  });

  it('cambian con el idioma', () => {
    const burpee = DEFAULT_EXERCISES[0];
    setLanguage('ja', { persist: false });
    expect(exerciseLabels(burpee).name).toBe('バーピー');
    setLanguage('es', { persist: false });
    expect(exerciseLabels(DEFAULT_EXERCISES[2]).name).toBe('Flexiones');
    setLanguage('pt-PT', { persist: false });
    expect(exerciseLabels(DEFAULT_EXERCISES[1]).name).toBe('Avanços');
    setLanguage('pt-BR', { persist: false });
    expect(exerciseLabels(DEFAULT_EXERCISES[1]).name).toBe('Afundos');
  });

  it('los ejercicios del usuario no se traducen, ni uno por defecto con el nombre cambiado', () => {
    setLanguage('es', { persist: false });
    expect(exerciseLabels({ id: '1700000000000', name: 'Burpee', shortName: 'Burpee' })).toEqual({ name: 'Burpee', shortName: 'Burpee' });
    expect(exerciseLabels({ id: '1', name: 'Mi burpee', shortName: '' })).toEqual({ name: 'Mi burpee', shortName: 'Mi burpee' });
  });

  it('todos los textos son distintos de vacío y mantienen las mismas claves en cada idioma', () => {
    const keys = Object.keys(DICTIONARIES.en.strings).filter(k => k.startsWith('exercise.'));
    expect(keys).toHaveLength(12);
  });
});
