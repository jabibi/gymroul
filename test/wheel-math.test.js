import { describe, it, expect } from 'vitest';
import { getWinningIndex, normalizeDelta, generateCombinations, CONFIG_SEGMENT } from '../src/wheel-math.js';

const exercises = [
  { id: '1', name: 'Burpee', shortName: 'Burpee', icon: 'fa-fire', color: '#ef4444' },
  { id: '2', name: 'Lunge', shortName: 'Lunge', icon: 'fa-person-walking', color: '#f97316' },
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

describe('generateCombinations', () => {
  it('genera el producto repeticiones × ejercicios activos', () => {
    const segs = generateCombinations(exercises, [10, 20], ['Burpee', 'Lunge'], [10, 20]);
    expect(segs).toHaveLength(4);
    expect(segs[0]).toMatchObject({ reps: 10, exercise: 'Burpee', text: '10 Burpee' });
  });

  it('respeta la selección activa', () => {
    const segs = generateCombinations(exercises, [10, 20], ['Lunge'], [20]);
    expect(segs).toHaveLength(1);
    expect(segs[0].fullName).toBe('20 Lunge');
  });

  it('devuelve el sector de configuración si no hay nada activo', () => {
    expect(generateCombinations(exercises, [10], [], [10])).toEqual([CONFIG_SEGMENT]);
    expect(generateCombinations(exercises, [10], ['Burpee'], [])).toEqual([CONFIG_SEGMENT]);
  });
});
