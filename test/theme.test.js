import { describe, it, expect, vi, afterEach } from 'vitest';
import { COLOR_PALETTE, CLASSIC_COLOR_PALETTE } from '../src/store.js';
import { THEMES, THEME_CHOICES, THEME_BRAND, DEFAULT_THEME, isThemeChoice, themeColor, getTheme, getThemeChoice, setTheme } from '../src/theme.js';

describe('apariencias', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('hay tres que se ven (Oscuro, Claro y Clásico), se elige entre cuatro con «Sistema» y la de por defecto es Oscuro', () => {
    expect(THEMES).toEqual(['calm', 'light', 'classic']);
    expect(THEME_CHOICES).toEqual(['system', 'calm', 'light', 'classic']);
    expect(DEFAULT_THEME).toBe('calm');
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

  it('Claro deja los colores guardados como Oscuro', () => {
    COLOR_PALETTE.forEach(color => expect(themeColor(color, 'light')).toBe(color));
  });

  it('un color que no es de la paleta se muestra tal cual', () => {
    expect(themeColor('#123456', 'classic')).toBe('#123456');
  });
});
