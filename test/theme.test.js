import { readFileSync } from 'node:fs';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { COLOR_PALETTE, CLASSIC_COLOR_PALETTE, LIGHT_COLOR_PALETTE } from '../src/store.js';
import { THEMES, THEME_CHOICES, THEME_BRAND, DEFAULT_THEME, isThemeChoice, themeColor, getTheme, getThemeChoice, setTheme } from '../src/theme.js';

describe('apariencias', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('hay tres que se ven (Oscuro, Claro y Clásico), se elige entre cuatro con «Sistema» y la de por defecto es Sistema', () => {
    expect(THEMES).toEqual(['calm', 'light', 'classic']);
    expect(THEME_CHOICES).toEqual(['system', 'calm', 'light', 'classic']);
    expect(DEFAULT_THEME).toBe('system');
    expect(isThemeChoice('classic')).toBe(true);
    expect(isThemeChoice('system')).toBe(true);
    expect(isThemeChoice('neon')).toBe(false);
    expect(Object.keys(THEME_BRAND).sort()).toEqual([...THEMES].sort());
  });

  it('«Sistema» se resuelve a una apariencia que se ve y Clásico nunca sale solo', () => {
    vi.stubGlobal('document', { documentElement: { dataset: {} } });
    // sin matchMedia (Node) el sistema cuenta como oscuro
    setTheme('system');
    expect(getThemeChoice()).toBe('system');
    expect(THEMES).toContain(getTheme());
    expect(getTheme()).not.toBe('classic');
    setTheme('light');
    expect(getTheme()).toBe('light');
  });

  it('las dos paletas tienen los mismos colores en las mismas posiciones y no repiten ninguno', () => {
    expect(CLASSIC_COLOR_PALETTE).toHaveLength(COLOR_PALETTE.length);
    expect(new Set(COLOR_PALETTE).size).toBe(COLOR_PALETTE.length);
    expect(new Set(CLASSIC_COLOR_PALETTE).size).toBe(CLASSIC_COLOR_PALETTE.length);
  });

  it('Suave deja los colores guardados y Clásico usa el de la misma posición de su paleta', () => {
    COLOR_PALETTE.forEach((color, i) => {
      expect(themeColor(color, 'calm')).toBe(color);
      expect(themeColor(color, 'classic')).toBe(CLASSIC_COLOR_PALETTE[i]);
    });
  });

  it('Claro usa el color de la misma posición de su paleta', () => {
    COLOR_PALETTE.forEach((color, i) => expect(themeColor(color, 'light')).toBe(LIGHT_COLOR_PALETTE[i]));
  });

  it('la paleta clara tiene los mismos colores en las mismas posiciones, sin repetir', () => {
    expect(LIGHT_COLOR_PALETTE).toHaveLength(COLOR_PALETTE.length);
    expect(new Set(LIGHT_COLOR_PALETTE).size).toBe(LIGHT_COLOR_PALETTE.length);
  });

  // WCAG: contraste del texto de la ruleta (--wheel-label de Claro) con cada sector, y diferencia entre sectores contiguos
  const luminance = hex => {
    const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);
  // Diferencia de color perceptual (CIE76 en Lab): da igual que dos colores no sean contiguos, porque el orden en la ruleta es alfabético
  const lab = hex => {
    const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    const x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, y = 0.2126 * r + 0.7152 * g + 0.0722 * b, z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;
    const f = v => (v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116);
    return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
  };
  const distance = (a, b) => Math.hypot(...lab(a).map((v, i) => v - lab(b)[i]));

  it('el texto de la ruleta clara llega a AAA (7:1) sobre cada color de la paleta clara', () => {
    const label = readFileSync('src/style.css', 'utf8').match(/data-theme="light"\][^}]*--wheel-label: (#[0-9a-f]{6});/)?.[1];
    expect(label).toBeTruthy();
    for (const color of [...LIGHT_COLOR_PALETTE, ...['#d6d3d1']]) expect(contrast(label, color), color).toBeGreaterThanOrEqual(7);
  });

  it('ningún par de colores de la paleta clara se parece (ΔE de al menos 15)', () => {
    LIGHT_COLOR_PALETTE.forEach((a, i) => LIGHT_COLOR_PALETTE.slice(i + 1).forEach(b => expect(distance(a, b), `${a} ${b}`).toBeGreaterThanOrEqual(15)));
  });

  it('un color que no es de la paleta se muestra tal cual', () => {
    expect(themeColor('#123456', 'classic')).toBe('#123456');
  });
});
