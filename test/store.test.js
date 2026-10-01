import { describe, it, expect, beforeEach } from 'vitest';
import {
  readStorage, getExercises, getReps, loadActive, active, migrate, SCHEMA_VERSION,
  addExercise, removeExercise, addRep, removeRep, DEFAULT_EXERCISES, DEFAULT_REPS, MAX_REPS, MAX_EXERCISES, pickColor, COLOR_PALETTE,
} from '../src/store.js';

function installLocalStorage() {
  const data = new Map();
  globalThis.localStorage = {
    getItem: k => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => { data.set(k, String(v)); },
    removeItem: k => { data.delete(k); },
    clear: () => data.clear(),
  };
  return data;
}

let data;
beforeEach(() => {
  data = installLocalStorage();
  loadActive();
});

describe('readStorage', () => {
  it('devuelve el fallback si falta, está corrupto o no es válido', () => {
    expect(readStorage('x', 5, Number.isInteger)).toBe(5);
    data.set('x', '{bad');
    expect(readStorage('x', 5, Number.isInteger)).toBe(5);
    data.set('x', '"texto"');
    expect(readStorage('x', 5, Number.isInteger)).toBe(5);
    data.set('x', '7');
    expect(readStorage('x', 5, Number.isInteger)).toBe(7);
  });

  it('devuelve el fallback si localStorage lanza', () => {
    globalThis.localStorage = { getItem() { throw new Error('bloqueado'); } };
    expect(readStorage('x', 5, () => true)).toBe(5);
  });
});

describe('catálogo', () => {
  it('no muta las constantes por defecto al ordenar', () => {
    const before = DEFAULT_EXERCISES.map(e => e.name);
    getExercises().reverse();
    getReps().reverse();
    expect(DEFAULT_EXERCISES.map(e => e.name)).toEqual(before);
    expect(DEFAULT_REPS).toEqual([10, 20, 30, 40, 50, 60]);
  });

  it('ignora datos guardados con formato inválido', () => {
    data.set('gym_exercises', JSON.stringify([{ id: 1, name: 'mal' }]));
    data.set('gym_reps', JSON.stringify([10, -5, 'a']));
    expect(getExercises()).toHaveLength(DEFAULT_EXERCISES.length);
    expect(getReps()).toEqual(DEFAULT_REPS);
  });
});

describe('selección activa', () => {
  it('descarta elementos huérfanos al cargar', () => {
    data.set('gymroulette_active_reps', JSON.stringify([10, 999]));
    data.set('gymroulette_active_exs', JSON.stringify(['Burpee', 'Inexistente']));
    loadActive();
    expect(active.reps).toEqual([10]);
    expect(active.exercises).toEqual(['Burpee']);
  });
});

describe('ejercicios', () => {
  it('rechaza nombres vacíos y duplicados (sin distinguir mayúsculas)', () => {
    expect(addExercise({ name: '  ' }).ok).toBe(false);
    expect(addExercise({ name: 'burpee' }).ok).toBe(false);
  });

  it('crea, activa y elimina un ejercicio', () => {
    expect(addExercise({ name: 'Plancha', icon: 'fa-stopwatch' }).ok).toBe(true);
    expect(active.exercises).toContain('Plancha');
    const created = getExercises().find(e => e.name === 'Plancha');
    expect(created.shortName).toBe('Plancha');
    removeExercise(created.id);
    expect(getExercises().some(e => e.name === 'Plancha')).toBe(false);
    expect(active.exercises).not.toContain('Plancha');
  });

  it('respeta el máximo de ejercicios', () => {
    for (let i = getExercises().length; i < MAX_EXERCISES; i++) {
      expect(addExercise({ name: `Ej ${i}` }).ok).toBe(true);
    }
    expect(addExercise({ name: 'Uno más' }).ok).toBe(false);
  });

  it('pickColor usa primero los colores libres', () => {
    const used = COLOR_PALETTE.slice(0, 3).map(c => ({ color: c }));
    expect(pickColor(used)).toBe(COLOR_PALETTE[3]);
  });
});

describe('repeticiones', () => {
  it('valida rango, duplicados y máximo', () => {
    expect(addRep('abc').ok).toBe(false);
    expect(addRep(0).ok).toBe(false);
    expect(addRep(501).ok).toBe(false);
    expect(addRep(10).ok).toBe(false);
    expect(addRep(15).ok).toBe(true);
    expect(getReps()).toContain(15);
    expect(active.reps).toContain(15);
    for (let n = 100; getReps().length < MAX_REPS; n++) addRep(n);
    expect(addRep(499).ok).toBe(false);
  });

  it('elimina de catálogo y de la selección activa', () => {
    removeRep(10);
    expect(getReps()).not.toContain(10);
    expect(active.reps).not.toContain(10);
  });
});

describe('migraciones', () => {
  it('estampa la versión de esquema actual', () => {
    migrate();
    expect(JSON.parse(data.get('gym_schema_version'))).toBe(SCHEMA_VERSION);
  });

  it('no toca datos de una versión más nueva', () => {
    data.set('gym_schema_version', String(SCHEMA_VERSION + 1));
    migrate();
    expect(JSON.parse(data.get('gym_schema_version'))).toBe(SCHEMA_VERSION + 1);
  });
});
