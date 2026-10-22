import { describe, it, expect } from 'vitest';
import { COLOR_PALETTE, CLASSIC_COLOR_PALETTE } from '../src/store.js';
import { THEMES, THEME_BRAND, DEFAULT_THEME, isTheme, themeColor } from '../src/theme.js';

describe('apariencias', () => {
  it('hay dos y la de por defecto es Suave', () => {
    expect(THEMES).toEqual(['calm', 'classic']);
    expect(DEFAULT_THEME).toBe('calm');
    expect(isTheme('classic')).toBe(true);
    expect(isTheme('neon')).toBe(false);
    expect(Object.keys(THEME_BRAND).sort()).toEqual([...THEMES].sort());
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

  it('un color que no es de la paleta se muestra tal cual', () => {
    expect(themeColor('#123456', 'classic')).toBe('#123456');
  });
});
