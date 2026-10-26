import { describe, it, expect, afterEach } from 'vitest';
import { LANGUAGES, DICTIONARIES, setLanguage, DEFAULT_LANGUAGE } from '../src/i18n/index.js';
import { exerciseName, sortExercises, DEFAULT_EXERCISE_KEYS } from '../src/exercise-names.js';
import { DEFAULT_EXERCISES } from '../src/store.js';
import { SYSTEM_EXERCISES } from '../src/templates.js';

afterEach(() => setLanguage(DEFAULT_LANGUAGE, { persist: false }));

describe('nombres de los ejercicios del sistema', () => {
  it('hay una clave para cada ejercicio del sistema y su traducción existe en todos los idiomas', () => {
    expect(Object.keys(DEFAULT_EXERCISE_KEYS).sort()).toEqual(SYSTEM_EXERCISES.map(e => e.id).sort());
    for (const { code } of LANGUAGES) {
      setLanguage(code, { persist: false });
      for (const ex of SYSTEM_EXERCISES) {
        const name = exerciseName(ex);
        const key = DEFAULT_EXERCISE_KEYS[ex.id];
        expect(name, `${code}:${key}`).not.toBe(`exercise.${key}`);
        expect(name.trim()).not.toBe('');
      }
    }
  });

  it('en inglés se ven igual que los nombres guardados', () => {
    for (const ex of SYSTEM_EXERCISES) {
      expect(exerciseName(ex)).toBe(ex.name);
    }
  });

  it('cambian con el idioma', () => {
    const burpee = DEFAULT_EXERCISES[0];
    setLanguage('ja', { persist: false });
    expect(exerciseName(burpee)).toBe('バーピー');
    setLanguage('es', { persist: false });
    expect(exerciseName(DEFAULT_EXERCISES[2])).toBe('Flexiones');
    setLanguage('pt-PT', { persist: false });
    expect(exerciseName(DEFAULT_EXERCISES[1])).toBe('Avanços');
    setLanguage('pt-BR', { persist: false });
    expect(exerciseName(DEFAULT_EXERCISES[1])).toBe('Afundos');
  });

  it('los ejercicios del usuario no se traducen, ni uno por defecto con el nombre cambiado', () => {
    setLanguage('es', { persist: false });
    expect(exerciseName({ id: '1700000000000', name: 'Burpee' })).toBe('Burpee');
    expect(exerciseName({ id: '1', name: 'Mi burpee' })).toBe('Mi burpee');
  });

  it('todos los textos son distintos de vacío y mantienen las mismas claves en cada idioma', () => {
    const keys = Object.keys(DICTIONARIES.en.strings).filter(k => k.startsWith('exercise.'));
    expect(keys.sort()).toEqual(SYSTEM_EXERCISES.map(e => `exercise.${e.slug}`).sort());
  });

  it('se ordenan alfabéticamente por el nombre que se ve, sin distinguir mayúsculas ni acentos', () => {
    const own = ['zeta', 'Árbol', 'abeto', 'Ejercicio 10', 'Ejercicio 2'].map((name, i) => ({ id: `u${i}`, name }));
    expect(sortExercises(own).map(e => e.name)).toEqual(['abeto', 'Árbol', 'Ejercicio 2', 'Ejercicio 10', 'zeta']);
  });

  it('el orden de los ejercicios por defecto sigue el idioma activo y no cambia la lista original', () => {
    const copy = [...DEFAULT_EXERCISES];
    expect(sortExercises(DEFAULT_EXERCISES).map(e => e.name)).toEqual(['Air Squat', 'Burpee', 'Lunge', 'Mountain Climbers', 'Push-up', 'Split Jumps']);
    setLanguage('es', { persist: false });
    expect(sortExercises(DEFAULT_EXERCISES).map(exerciseName)).toEqual(['Burpees', 'Escaladores', 'Flexiones', 'Sentadillas', 'Zancadas', 'Zancadas con salto']);
    expect(DEFAULT_EXERCISES).toEqual(copy);
  });
});
