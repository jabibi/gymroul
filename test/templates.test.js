import { describe, it, expect, afterEach } from 'vitest';
import { LANGUAGES, DICTIONARIES, setLanguage, DEFAULT_LANGUAGE } from '../src/i18n/index.js';
import { isValidIcon } from '../src/icons.js';
import { exerciseName } from '../src/exercise-names.js';
import { DEFAULT_EXERCISES, MAX_EXERCISES, MAX_NAME_LENGTH, MAX_REP_VALUE } from '../src/store.js';
import { SYSTEM_EXERCISES, SYSTEM_TEMPLATES, systemTemplateExercises } from '../src/templates.js';

afterEach(() => setLanguage(DEFAULT_LANGUAGE, { persist: false }));

describe('plantillas del sistema', () => {
  it('son cinco, con su nombre traducido en todos los idiomas', () => {
    expect(SYSTEM_TEMPLATES.map(t => t.slug)).toEqual(['bodyweight', 'cardio', 'weights', 'home', 'abs']);
    for (const { code } of LANGUAGES) {
      for (const { slug } of SYSTEM_TEMPLATES) {
        const text = DICTIONARIES[code].strings[`template.${slug}`];
        expect(text?.trim(), `${code}:template.${slug}`).toBeTruthy();
      }
    }
  });

  it('la de peso corporal es la lista que trae la ruleta de fábrica', () => {
    const bodyweight = systemTemplateExercises(SYSTEM_TEMPLATES[0]);
    expect(bodyweight).toEqual(DEFAULT_EXERCISES);
  });

  it('el catálogo no repite ids, nombres ni claves y usa solo iconos del catálogo', () => {
    for (const field of ['id', 'name', 'slug']) {
      const values = SYSTEM_EXERCISES.map(e => e[field].toLowerCase());
      expect(new Set(values).size, field).toBe(values.length);
    }
    for (const ex of SYSTEM_EXERCISES) {
      expect(isValidIcon(ex.icon), ex.name).toBe(true);
      expect(ex.name.length, ex.name).toBeLessThanOrEqual(MAX_NAME_LENGTH);
    }
  });

  it('cada plantilla cabe en la ruleta, sin ejercicios repetidos y con rangos de repeticiones válidos', () => {
    for (const template of SYSTEM_TEMPLATES) {
      const list = systemTemplateExercises(template);
      expect(list.length, template.slug).toBeGreaterThanOrEqual(6);
      expect(list.length, template.slug).toBeLessThanOrEqual(MAX_EXERCISES);
      expect(new Set(list.map(e => e.id)).size, template.slug).toBe(list.length);
      for (const ex of list) {
        expect(Number.isInteger(ex.repsMin) && Number.isInteger(ex.repsMax), `${template.slug}:${ex.name}`).toBe(true);
        expect(ex.repsMin, `${template.slug}:${ex.name}`).toBeGreaterThanOrEqual(1);
        expect(ex.repsMin, `${template.slug}:${ex.name}`).toBeLessThanOrEqual(ex.repsMax);
        expect(ex.repsMax, `${template.slug}:${ex.name}`).toBeLessThanOrEqual(MAX_REP_VALUE);
      }
    }
  });

  it('la de abdominales tiene los ocho ejercicios acordados', () => {
    const abs = systemTemplateExercises(SYSTEM_TEMPLATES.find(t => t.slug === 'abs'));
    expect(abs.map(e => e.name)).toEqual(['Superman', 'Heel Touches', 'Tuck-ups', 'Russian Twists', 'Crunch', 'Bicycle Crunch', 'Flutter Kicks', 'Forearm Plank']);
  });

  it('un ejercicio de varias plantillas es el mismo (misma id y nombre) y solo cambia su rango', () => {
    const plank = SYSTEM_TEMPLATES.filter(t => t.exercises.some(e => e.id === '30'));
    expect(plank.map(t => t.slug)).toEqual(['home', 'abs']);
  });

  it('los ejercicios nuevos se ven traducidos', () => {
    const tuck = SYSTEM_EXERCISES.find(e => e.slug === 'tuckups');
    setLanguage('es', { persist: false });
    expect(exerciseName(tuck)).toBe('Encogimientos completos');
    setLanguage('ja', { persist: false });
    expect(exerciseName(SYSTEM_EXERCISES.find(e => e.slug === 'deadlift'))).toBe('デッドリフト');
  });
});
