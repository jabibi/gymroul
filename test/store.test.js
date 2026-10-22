import { describe, it, expect, beforeEach } from 'vitest';
import {
  readStorage, getExercises, loadActive, active, migrate, SCHEMA_VERSION,
  addExercise, removeExercise, updateExerciseReps, parseRepRange, MAX_NAME_LENGTH, MAX_REP_VALUE, DEFAULT_EXERCISES, DEFAULT_REPS_MIN, DEFAULT_REPS_MAX, MAX_EXERCISES, pickColor, COLOR_PALETTE,
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
    expect(DEFAULT_EXERCISES.map(e => e.name)).toEqual(before);
    expect(DEFAULT_EXERCISES.every(e => e.repsMin === DEFAULT_REPS_MIN && e.repsMax === DEFAULT_REPS_MAX)).toBe(true);
  });

  it('ignora datos guardados con formato inválido', () => {
    data.set('gym_exercises', JSON.stringify([{ id: 1, name: 'mal' }]));
    expect(getExercises()).toHaveLength(DEFAULT_EXERCISES.length);
  });

  it('sustituye por el rango por defecto un rango guardado ausente o inválido', () => {
    data.set('gym_exercises', JSON.stringify([
      { id: 'a', name: 'Sin rango', icon: 'dumbbell', color: '#fff' },
      { id: 'b', name: 'Invertido', icon: 'dumbbell', color: '#fff', repsMin: 30, repsMax: 10 },
      { id: 'c', name: 'Bueno', icon: 'dumbbell', color: '#fff', repsMin: 5, repsMax: 9 },
    ]));
    const byName = Object.fromEntries(getExercises().map(e => [e.name, [e.repsMin, e.repsMax]]));
    expect(byName).toEqual({ 'Sin rango': [10, 60], Invertido: [10, 60], Bueno: [5, 9] });
  });
});

describe('selección activa', () => {
  it('descarta elementos huérfanos al cargar', () => {
    data.set('gymroulette_active_exs', JSON.stringify(['Burpee', 'Inexistente']));
    loadActive();
    expect(active.exercises).toEqual(['Burpee']);
  });
});

describe('ejercicios', () => {
  it('rechaza nombres vacíos y duplicados (sin distinguir mayúsculas)', () => {
    expect(addExercise({ name: '  ', icon: 'dumbbell' }).ok).toBe(false);
    expect(addExercise({ name: 'burpee', icon: 'dumbbell' }).ok).toBe(false);
  });

  it('crea, activa y elimina un ejercicio', () => {
    expect(addExercise({ name: 'Plancha', icon: 'timer' }).ok).toBe(true);
    expect(active.exercises).toContain('Plancha');
    const created = getExercises().find(e => e.name === 'Plancha');
    removeExercise(created.id);
    expect(getExercises().some(e => e.name === 'Plancha')).toBe(false);
    expect(active.exercises).not.toContain('Plancha');
  });

  it('respeta el máximo de ejercicios', () => {
    for (let i = getExercises().length; i < MAX_EXERCISES; i++) {
      expect(addExercise({ name: `Ej ${i}`, icon: 'dumbbell' }).ok).toBe(true);
    }
    expect(addExercise({ name: 'Uno más', icon: 'dumbbell' }).ok).toBe(false);
  });

  it('pickColor usa primero los colores libres', () => {
    const used = COLOR_PALETTE.slice(0, 3).map(c => ({ color: c }));
    expect(pickColor(used)).toBe(COLOR_PALETTE[3]);
  });
});

describe('repeticiones por ejercicio', () => {
  it('valida el rango: números entre 1 y el máximo y mínimo no mayor que el máximo', () => {
    expect(parseRepRange('abc', 20).ok).toBe(false);
    expect(parseRepRange(0, 20).ok).toBe(false);
    expect(parseRepRange(10, MAX_REP_VALUE + 1).ok).toBe(false);
    expect(parseRepRange(30, 20).error.key).toBe('error.repMinMax');
    expect(parseRepRange('10', '20')).toEqual({ ok: true, min: 10, max: 20 });
    expect(parseRepRange(' 10 ', ' 20 ')).toEqual({ ok: true, min: 10, max: 20 });
    expect(parseRepRange(15, 15).ok).toBe(true);
  });

  it('un ejercicio nuevo lleva el rango indicado o el de por defecto', () => {
    expect(addExercise({ name: 'Dominadas', icon: 'dumbbell', repsMin: '3', repsMax: '12' }).ok).toBe(true);
    expect(addExercise({ name: 'Plancha', icon: 'timer' }).ok).toBe(true);
    const byName = Object.fromEntries(getExercises().map(e => [e.name, [e.repsMin, e.repsMax]]));
    expect(byName.Dominadas).toEqual([3, 12]);
    expect(byName.Plancha).toEqual([DEFAULT_REPS_MIN, DEFAULT_REPS_MAX]);
  });

  it('rechaza un rango inválido al crear y no guarda el ejercicio', () => {
    expect(addExercise({ name: 'Mal', icon: 'dumbbell', repsMin: 20, repsMax: 10 }).ok).toBe(false);
    expect(getExercises().some(e => e.name === 'Mal')).toBe(false);
  });

  it('actualiza el rango de un ejercicio y rechaza uno inválido sin cambiarlo', () => {
    const id = DEFAULT_EXERCISES[0].id;
    expect(updateExerciseReps(id, 5, 8).ok).toBe(true);
    expect(getExercises().find(e => e.id === id)).toMatchObject({ repsMin: 5, repsMax: 8 });
    expect(updateExerciseReps(id, 9, 2).ok).toBe(false);
    expect(getExercises().find(e => e.id === id)).toMatchObject({ repsMin: 5, repsMax: 8 });
  });
});

describe('límites de lo que escribe el usuario', () => {
  it('rechaza repeticiones enormes sin guardarlas (999999999999999, 1e21, muchos dígitos)', () => {
    const id = DEFAULT_EXERCISES[0].id;
    for (const big of ['999999999999999', 999999999999999, 1e21, '9'.repeat(400), String(MAX_REP_VALUE + 1)]) {
      expect(parseRepRange(10, big).error.key, String(big)).toBe('error.repRange');
      expect(updateExerciseReps(id, 10, big).ok).toBe(false);
      expect(addExercise({ name: 'Enorme', icon: 'dumbbell', repsMin: 1, repsMax: big }).ok).toBe(false);
    }
    expect(getExercises().find(e => e.id === id)).toMatchObject({ repsMin: DEFAULT_REPS_MIN, repsMax: DEFAULT_REPS_MAX });
    expect(getExercises().some(e => e.name === 'Enorme')).toBe(false);
    expect(parseRepRange(MAX_REP_VALUE, MAX_REP_VALUE).ok).toBe(true);
    expect(MAX_REP_VALUE).toBe(999999);
    expect(parseRepRange(1, '1000000').ok).toBe(false);
  });

  it('solo admite enteros: nada de decimales, signos, notación científica, texto ni vacío', () => {
    for (const bad of ['10.5', '1e3', '12abc', '-5', '+5', '0x10', '', '  ', 'NaN', 'Infinity', null, undefined, '0']) {
      expect(parseRepRange(bad, 20).ok, String(bad)).toBe(false);
    }
  });

  it('limita la longitud del nombre y del nombre corto', () => {
    const long = 'x'.repeat(MAX_NAME_LENGTH + 1);
    expect(addExercise({ name: long, icon: 'dumbbell' }).error).toEqual({ key: 'error.maxLength', params: { max: MAX_NAME_LENGTH } });
    expect(getExercises().some(e => e.name === long)).toBe(false);
  });

  it('colapsa espacios y saltos de línea del nombre', () => {
    expect(addExercise({ name: '  Press \n  de   banca\t', icon: 'dumbbell' }).ok).toBe(true);
    expect(getExercises().some(e => e.name === 'Press de banca')).toBe(true);
    expect(addExercise({ name: 'press de banca', icon: 'dumbbell' }).ok).toBe(false);
  });

  it('un nombre guardado por versiones anteriores, más largo que el límite, se sigue leyendo', () => {
    const legacy = 'N'.repeat(80);
    data.set('gym_exercises', JSON.stringify([{ id: 'z', name: legacy, shortName: legacy, icon: 'dumbbell', color: '#fff', repsMin: 5, repsMax: 9 }]));
    expect(getExercises()[0].name).toBe(legacy);
  });
});

describe('iconos', () => {
  it('rechaza iconos fuera del catálogo (emoji, nombres fa-* o texto libre)', () => {
    for (const icon of ['🔥', 'fa-fire', '<b>x</b>', '', undefined]) {
      expect(addExercise({ name: 'Prueba', icon }).ok).toBe(false);
    }
    expect(getExercises().some(e => e.name === 'Prueba')).toBe(false);
  });

  it('acepta un icono del catálogo', () => {
    expect(addExercise({ name: 'Yoga', icon: 'yoga' }).ok).toBe(true);
    expect(getExercises().find(e => e.name === 'Yoga').icon).toBe('yoga');
  });

  it('sustituye por el icono por defecto los guardados que no están en el catálogo', () => {
    data.set('gym_exercises', JSON.stringify([{ id: 'a', name: 'Raro', icon: '🔥', color: '#fff' }]));
    expect(getExercises()[0].icon).toBe('dumbbell');
  });
});

describe('migraciones', () => {
  it('v1 -> v2 convierte los iconos antiguos al catálogo', () => {
    data.set('gym_schema_version', '1');
    data.set('gym_exercises', JSON.stringify([
      { id: 'a', name: 'A', icon: 'fa-fire', color: '#fff' },
      { id: 'b', name: 'B', icon: 'fa-person-running', color: '#fff' },
      { id: 'c', name: 'C', icon: '🏋️', color: '#fff' },
      { id: 'd', name: 'D', icon: 'fa-bicycle', color: '#fff' },
    ]));
    migrate();
    const stored = JSON.parse(data.get('gym_exercises'));
    expect(stored.map(e => e.icon)).toEqual(['fire', 'run', 'dumbbell', 'dumbbell']);
    expect(JSON.parse(data.get('gym_schema_version'))).toBe(SCHEMA_VERSION);
  });

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

describe('migración v5 -> v6', () => {
  it('borra la elección de analítica de versiones anteriores y conserva el resto', () => {
    data.set('gym_schema_version', '5');
    data.set('gymroulette_analytics_consent', 'granted');
    data.set('gym_exercises', JSON.stringify([{ id: 'a', name: 'A', icon: 'dumbbell', color: '#fff' }]));
    migrate();
    expect(data.has('gymroulette_analytics_consent')).toBe(false);
    expect(JSON.parse(data.get('gym_exercises'))).toHaveLength(1);
  });

  it('también limpia la clave si el usuario rechazó la analítica', () => {
    data.set('gym_schema_version', '5');
    data.set('gymroulette_analytics_consent', 'denied');
    migrate();
    expect(data.has('gymroulette_analytics_consent')).toBe(false);
  });
});

describe('migración v7 -> v8', () => {
  const exs = () => JSON.stringify([
    { id: 'a', name: 'A', icon: 'dumbbell', color: '#fff' },
    { id: 'b', name: 'B', icon: 'dumbbell', color: '#fff' },
  ]);
  const ranges = () => JSON.parse(data.get('gym_exercises')).map(e => [e.repsMin, e.repsMax]);

  it('cada ejercicio hereda el mínimo y el máximo de las repeticiones activas', () => {
    data.set('gym_schema_version', '7');
    data.set('gym_exercises', exs());
    data.set('gym_reps', JSON.stringify([5, 10, 20, 40]));
    data.set('gymroulette_active_reps', JSON.stringify([10, 20, 999]));
    migrate();
    expect(ranges()).toEqual([[10, 20], [10, 20]]);
  });

  it('sin selección activa usa toda la lista global', () => {
    data.set('gym_schema_version', '7');
    data.set('gym_exercises', exs());
    data.set('gym_reps', JSON.stringify([15, 25, 35]));
    migrate();
    expect(ranges()).toEqual([[15, 35], [15, 35]]);
  });

  it('si no había repeticiones activas usa toda la lista global', () => {
    data.set('gym_schema_version', '7');
    data.set('gym_exercises', exs());
    data.set('gym_reps', JSON.stringify([15, 25]));
    data.set('gymroulette_active_reps', JSON.stringify([]));
    migrate();
    expect(ranges()).toEqual([[15, 25], [15, 25]]);
  });

  it('sin datos de repeticiones usa 10-60', () => {
    data.set('gym_schema_version', '7');
    data.set('gym_exercises', exs());
    data.set('gym_reps', 'corrupto');
    migrate();
    expect(ranges()).toEqual([[10, 60], [10, 60]]);
  });

  it('respeta un rango ya válido y borra las claves de la lista global', () => {
    data.set('gym_schema_version', '7');
    data.set('gym_exercises', JSON.stringify([{ id: 'a', name: 'A', icon: 'dumbbell', color: '#fff', repsMin: 3, repsMax: 7 }]));
    data.set('gym_reps', JSON.stringify([10, 20]));
    data.set('gymroulette_active_reps', JSON.stringify([10]));
    migrate();
    expect(ranges()).toEqual([[3, 7]]);
    expect(data.has('gym_reps')).toBe(false);
    expect(data.has('gymroulette_active_reps')).toBe(false);
  });

  it('es idempotente: migrar dos veces no cambia el resultado', () => {
    data.set('gym_schema_version', '7');
    data.set('gym_exercises', exs());
    data.set('gym_reps', JSON.stringify([10, 20]));
    migrate();
    const first = data.get('gym_exercises');
    data.set('gym_schema_version', '7');
    migrate();
    expect(data.get('gym_exercises')).toBe(first);
  });

  it('una instalación nueva queda con los ejercicios por defecto y su rango', () => {
    migrate();
    expect(getExercises().every(e => e.repsMin === DEFAULT_REPS_MIN && e.repsMax === DEFAULT_REPS_MAX)).toBe(true);
  });
});

describe('migración v6 -> v7', () => {
  it('borra el aviso de introducción vista de las versiones anteriores', () => {
    data.set('gym_schema_version', '6');
    data.set('gymroulette_intro_seen', 'true');
    migrate();
    expect(data.has('gymroulette_intro_seen')).toBe(false);
  });
});

describe('migración v4 -> v5', () => {
  it('cambia el icono del Mountain Climbers por defecto y respeta otros ejercicios', () => {
    data.set('gym_schema_version', '4');
    data.set('gym_exercises', JSON.stringify([
      { id: '5', name: 'Mountain Climbers', icon: 'run-fast', color: '#fff' },
      { id: '88', name: 'Sprint', icon: 'run-fast', color: '#fff' },
    ]));
    migrate();
    expect(JSON.parse(data.get('gym_exercises')).map(e => e.icon)).toEqual(['climbers', 'run-fast']);
  });
});

describe('migración v3 -> v4', () => {
  it('cambia la llama del Burpee por defecto por el pictograma de burpee y respeta otros ejercicios', () => {
    data.set('gym_schema_version', '3');
    data.set('gym_exercises', JSON.stringify([
      { id: '1', name: 'Burpee', icon: 'fire', color: '#fff' },
      { id: '77', name: 'Hiit', icon: 'fire', color: '#fff' },
    ]));
    migrate();
    expect(JSON.parse(data.get('gym_exercises')).map(e => e.icon)).toEqual(['burpee', 'fire']);
  });
});

describe('migración v2 -> v3', () => {
  it('actualiza los iconos de Push-up y Air Squat por defecto, y respeta los demás', () => {
    data.set('gym_schema_version', '2');
    data.set('gym_exercises', JSON.stringify([
      { id: '3', name: 'Push-up', icon: 'push', color: '#fff' },
      { id: '4', name: 'Air Squat', icon: 'leg', color: '#fff' },
      { id: '99', name: 'Mío', icon: 'push', color: '#fff' },
    ]));
    migrate();
    expect(JSON.parse(data.get('gym_exercises')).map(e => e.icon)).toEqual(['pushup', 'squat', 'push']);
  });
});

describe('migración v8 -> v9', () => {
  it('cambia los colores de la paleta antigua por los de la nueva y respeta los demás', () => {
    data.set('gym_schema_version', '8');
    data.set('gym_exercises', JSON.stringify([
      { id: '1', name: 'A', icon: 'dumbbell', color: '#ef4444', repsMin: 10, repsMax: 20 },
      { id: '2', name: 'B', icon: 'dumbbell', color: '#3b82f6', repsMin: 10, repsMax: 20 },
      { id: '3', name: 'C', icon: 'dumbbell', color: '#123456', repsMin: 10, repsMax: 20 },
    ]));
    migrate();
    expect(JSON.parse(data.get('gym_exercises')).map(e => e.color)).toEqual(['#0f766e', '#0369a1', '#123456']);
  });
});

describe('migración v9 -> v10', () => {
  it('quita el nombre corto de los ejercicios guardados y conserva el resto', () => {
    data.set('gym_schema_version', '9');
    data.set('gym_exercises', JSON.stringify([{ id: '1', name: 'Burpee', shortName: 'Burp', icon: 'burpee', color: '#fff', repsMin: 10, repsMax: 20 }]));
    migrate();
    expect(JSON.parse(data.get('gym_exercises'))).toEqual([{ id: '1', name: 'Burpee', icon: 'burpee', color: '#fff', repsMin: 10, repsMax: 20 }]);
  });
});

describe('migración v10 -> v11', () => {
  it('cambia los colores de la primera paleta Suave por los oscurecidos y respeta los demás', () => {
    data.set('gym_schema_version', '10');
    data.set('gym_exercises', JSON.stringify([
      { id: '1', name: 'A', icon: 'dumbbell', color: '#0d9488', repsMin: 10, repsMax: 20 },
      { id: '2', name: 'B', icon: 'dumbbell', color: '#059669', repsMin: 10, repsMax: 20 },
      { id: '3', name: 'C', icon: 'dumbbell', color: '#123456', repsMin: 10, repsMax: 20 },
    ]));
    migrate();
    expect(JSON.parse(data.get('gym_exercises')).map(e => e.color)).toEqual(['#0f766e', '#15803d', '#123456']);
  });
});
