import { describe, it, expect } from 'vitest';
import { swipeDirection, swipeStep } from '../src/swipe.js';

describe('swipeDirection', () => {
  it('reconoce deslizamientos horizontales', () => {
    expect(swipeDirection(-120, 10)).toBe('left');
    expect(swipeDirection(120, -10)).toBe('right');
  });
  it('ignora toques y desplazamientos cortos', () => {
    expect(swipeDirection(0, 0)).toBeNull();
    expect(swipeDirection(-49, 0)).toBeNull();
  });
  it('ignora desplazamientos verticales y diagonales', () => {
    expect(swipeDirection(60, 200)).toBeNull();
    expect(swipeDirection(100, 90)).toBeNull();
  });
});

describe('swipeStep', () => {
  it('en un idioma de izquierda a derecha: izquierda avanza y derecha retrocede', () => {
    expect(swipeStep('left', false)).toBe(1);
    expect(swipeStep('right', false)).toBe(-1);
  });
  it('en un idioma de derecha a izquierda es al revés', () => {
    expect(swipeStep('right', true)).toBe(1);
    expect(swipeStep('left', true)).toBe(-1);
  });
});
