import { describe, it, expect } from 'vitest';
import { getWinningIndex, normalizeDelta, generateSegments, rollReps, fitText, isolate, CONFIG_SEGMENT } from '../src/wheel-math.js';

const exercises = [
  { id: '1', name: 'Burpee', shortName: 'Burpee', icon: 'fa-fire', color: '#ef4444', repsMin: 10, repsMax: 30 },
  { id: '2', name: 'Lunge', shortName: 'Lunge', icon: 'fa-person-walking', color: '#f97316', repsMin: 5, repsMax: 5 },
];

describe('getWinningIndex', () => {
  it('el puntero (arriba) cae en el último sector con ángulo 0', () => {
    // El puntero está en 1.5π; con 4 sectores de π/2 le corresponde el índice 3
    expect(getWinningIndex(0, 4)).toBe(3);
  });

  it('avanza al girar la ruleta', () => {
    expect(getWinningIndex(Math.PI / 2, 4)).toBe(2);
    expect(getWinningIndex(Math.PI, 4)).toBe(1);
  });

  it('es periódico y soporta ángulos negativos', () => {
    const total = 36;
    for (const a of [0.3, 1.7, 5.2]) {
      expect(getWinningIndex(a, total)).toBe(getWinningIndex(a + 2 * Math.PI, total));
      expect(getWinningIndex(a, total)).toBe(getWinningIndex(a - 4 * Math.PI, total));
    }
  });

  it('siempre devuelve un índice válido', () => {
    for (let i = 0; i < 1000; i++) {
      const idx = getWinningIndex(Math.random() * 100 - 50, 7);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(7);
    }
  });

  it('sin sectores devuelve 0', () => {
    expect(getWinningIndex(1, 0)).toBe(0);
  });
});

describe('normalizeDelta', () => {
  it('absorbe el salto de atan2 en ±π', () => {
    expect(normalizeDelta(2 * Math.PI - 0.1)).toBeCloseTo(-0.1);
    expect(normalizeDelta(-2 * Math.PI + 0.1)).toBeCloseTo(0.1);
  });

  it('deja intactas las diferencias pequeñas', () => {
    expect(normalizeDelta(0.5)).toBe(0.5);
    expect(normalizeDelta(-0.5)).toBe(-0.5);
  });
});

describe('generateSegments', () => {
  it('genera un sector por ejercicio activo, con su rango de repeticiones', () => {
    const segs = generateSegments(exercises, ['Burpee', 'Lunge']);
    expect(segs).toHaveLength(2);
    expect(segs[0]).toMatchObject({ exercise: 'Burpee', text: 'Burpee', repsMin: 10, repsMax: 30 });
  });

  it('respeta la selección activa', () => {
    const segs = generateSegments(exercises, ['Lunge']);
    expect(segs).toHaveLength(1);
    expect(segs[0]).toMatchObject({ exercise: 'Lunge', repsMin: 5, repsMax: 5 });
  });

  it('devuelve el sector de configuración si no hay nada activo', () => {
    expect(generateSegments(exercises, [])).toEqual([CONFIG_SEGMENT]);
  });
});

describe('rollReps', () => {
  it('cubre los dos extremos del rango', () => {
    expect(rollReps(10, 30, () => 0)).toBe(10);
    expect(rollReps(10, 30, () => 0.9999999)).toBe(30);
  });

  it('con mínimo igual al máximo devuelve ese valor', () => {
    expect(rollReps(15, 15, () => 0.5)).toBe(15);
  });

  it('siempre devuelve un entero dentro del rango', () => {
    for (let i = 0; i < 1000; i++) {
      const n = rollReps(3, 8);
      expect(Number.isInteger(n)).toBe(true);
      expect(n).toBeGreaterThanOrEqual(3);
      expect(n).toBeLessThanOrEqual(8);
    }
  });
});

describe('generateSegments con nombres traducidos', () => {
  it('filtra por el nombre guardado y muestra el que da la función de traducción', () => {
    const segs = generateSegments(exercises, ['Burpee'], ex => ({ name: `T-${ex.name}`, shortName: `S-${ex.name}` }));
    expect(segs).toHaveLength(1);
    expect(segs[0]).toMatchObject({ exercise: 'T-Burpee', text: 'S-Burpee', shortName: 'S-Burpee' });
  });
});

describe('fitText', () => {
  // Medida simulada: cada carácter ocupa size * 0.6
  const measure = (text, size) => Array.from(text).length * size * 0.6;

  it('deja el texto y el tamaño máximo si cabe', () => {
    expect(fitText(measure, 'Burpee', 200, 18, 9)).toEqual({ text: 'Burpee', size: 18 });
  });

  it('baja el tamaño de letra antes de recortar', () => {
    const r = fitText(measure, 'Mountain Climbers', 100, 18, 9);
    expect(r.text).toBe('Mountain Climbers');
    expect(r.size).toBeLessThan(18);
    expect(r.size).toBeGreaterThanOrEqual(9);
    expect(measure(r.text, r.size)).toBeLessThanOrEqual(100);
  });

  it('si no cabe ni con el tamaño mínimo, recorta con «…» y cabe', () => {
    const r = fitText(measure, 'Supercalifragilisticexpialidocious', 60, 18, 9);
    expect(r.size).toBe(9);
    expect(r.text.endsWith('…')).toBe(true);
    expect(measure(r.text, r.size)).toBeLessThanOrEqual(60);
    expect(r.text.length).toBeGreaterThan(2);
  });

  it('con un ancho diminuto devuelve solo «…» y no falla con texto vacío', () => {
    expect(fitText(measure, 'Largo', 1, 18, 9).text).toBe('…');
    expect(fitText(measure, '', 10, 18, 9)).toEqual({ text: '', size: 18 });
  });

  it('no parte caracteres de varios bytes', () => {
    const r = fitText(measure, '😀😀😀😀😀😀😀😀😀😀', 40, 18, 9);
    expect(r.text).toMatch(/^(😀)*…$/u);
  });
});

describe('isolate', () => {
  it('rodean el texto con marcas de aislamiento que no cambian el texto visible', () => {
    expect(isolate('Burpee')).toBe('⁨Burpee⁩');
    expect(isolate('Burpee').replace(/[⁨⁩]/g, '')).toBe('Burpee');
  });
});
