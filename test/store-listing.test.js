import { describe, it, expect } from 'vitest';
import { LISTINGS, STORE_LOCALES, LIMITS } from '../store/listing.mjs';
import { LANGUAGES } from '../src/i18n/index.js';

describe('ficha de Google Play', () => {
  it('hay una ficha para cada idioma de la app, con códigos de Play únicos', () => {
    expect(STORE_LOCALES.map(l => l.app)).toEqual(LANGUAGES.map(l => l.code));
    expect(new Set(STORE_LOCALES.map(l => l.play)).size).toBe(STORE_LOCALES.length);
    for (const l of STORE_LOCALES) expect(LISTINGS[l.app], l.app).toBeDefined();
  });

  for (const l of STORE_LOCALES) {
    describe(l.play, () => {
      const listing = LISTINGS[l.app];

      it('respeta los límites de caracteres de Play', () => {
        expect(listing.title.length).toBeLessThanOrEqual(LIMITS.title);
        expect(listing.short.length).toBeLessThanOrEqual(LIMITS.short);
        expect(listing.full.length).toBeLessThanOrEqual(LIMITS.full);
        expect(listing.notes.length).toBeLessThanOrEqual(LIMITS.notes);
      });

      it('no deja campos vacíos y lleva el texto del gráfico', () => {
        for (const field of ['title', 'short', 'full', 'notes']) expect(listing[field].trim(), field).not.toBe('');
        for (const field of ['line1', 'line2', 'tagline', 'button']) expect(listing.banner[field].trim(), field).not.toBe('');
      });

      it('las variantes regionales usan su ortografía', () => {
        if (l.app === 'fr-CA') {
          expect(listing.full).not.toMatch(/[\u00a0 ][!?]/);
          expect(listing.full).not.toContain('Réglages');
        }
        if (l.app === 'es-419') {
          expect(listing.full).not.toMatch(/\bPulsa|\bAñade|tu móvil/);
          expect(listing.full).toContain('Presiona');
        }
      });

      it('la descripción completa cita la privacidad y los idiomas disponibles', () => {
        expect(listing.full).toContain('Google Analytics');
        for (const name of ['English', 'Español', 'Euskara', 'Galego', 'Català', 'Français', 'Português']) expect(listing.full, name).toContain(name);
      });
    });
  }
});
