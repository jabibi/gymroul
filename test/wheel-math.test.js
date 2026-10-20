import { describe, it, expect } from 'vitest';
import { getWinningIndex, normalizeDelta, generateSegments, rollReps, fitText, fitLabel, isolate, CONFIG_SEGMENT } from '../src/wheel-math.js';

const exercises = [
  { id: '1', name: 'Burpee', icon: 'fa-fire', color: '#ef4444', repsMin: 10, repsMax: 30 },
  { id: '2', name: 'Lunge', icon: 'fa-person-walking', color: '#f97316', repsMin: 5, repsMax: 5 },
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
    const segs = generateSegments(exercises, ['Burpee'], ex => `T-${ex.name}`);
    expect(segs).toHaveLength(1);
    expect(segs[0]).toMatchObject({ exercise: 'T-Burpee', text: 'T-Burpee' });
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

describe('fitLabel', () => {
  const measure = (text, px) => text.length * px * 0.6;

  it('si cabe a tamaño normal, la deja en una línea sin tocar', () => {
    expect(fitLabel(measure, 'Burpee', 200, 18, 12, 2)).toEqual({ lines: ['Burpee'], size: 18, scale: 1 });
  });

  it('baja el tamaño hasta el mínimo y nunca por debajo', () => {
    const r = fitLabel(measure, 'Flexiones', 70, 18, 12, 1);
    expect(r.size).toBeGreaterThanOrEqual(12);
    expect(r.lines).toEqual(['Flexiones']);
  });

  it('con el mínimo comprime un poco en horizontal antes de partir o recortar', () => {
    // 'Sentadillas' (11 letras) a 12 px mide 79,2; con 75 de ancho hace falta una compresión de ~0,95
    const r = fitLabel(measure, 'Sentadillas', 75, 18, 12, 1);
    expect(r.size).toBe(12);
    expect(r.lines).toEqual(['Sentadillas']);
    expect(r.scale).toBeLessThan(1);
    expect(r.scale).toBeGreaterThanOrEqual(0.9);
  });

  it('si no cabe ni comprimida, la parte en dos líneas por el espacio más equilibrado', () => {
    const r = fitLabel(measure, 'Zancadas con salto', 80, 18, 12, 2);
    expect(r.size).toBe(12);
    expect(r.lines).toEqual(['Zancadas', 'con salto']);
    expect(r.scale).toBeLessThanOrEqual(1);
  });

  it('sin altura para dos líneas, recorta con «…» a tamaño mínimo', () => {
    const r = fitLabel(measure, 'Zancadas con salto', 80, 18, 12, 1);
    expect(r.size).toBe(12);
    expect(r.lines).toHaveLength(1);
    expect(r.lines[0].endsWith('…')).toBe(true);
    expect(r.scale).toBe(1);
  });

  it('un nombre largo sin espacios se recorta aunque haya sitio para dos líneas', () => {
    const r = fitLabel(measure, 'Supercalifragilisticexpialidocious', 80, 18, 12, 2);
    expect(r.lines).toHaveLength(1);
    expect(r.lines[0].endsWith('…')).toBe(true);
  });

  it('también parte por un guion, que se queda en la primera línea', () => {
    const r = fitLabel(measure, 'Sprung-Ausfälle', 60, 18, 12, 2);
    expect(r.lines).toEqual(['Sprung-', 'Ausfälle']);
  });
});
