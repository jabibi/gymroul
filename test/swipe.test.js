import { describe, it, expect } from 'vitest';
import { swipeDirection } from '../src/swipe.js';

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
