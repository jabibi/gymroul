import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { buildReleaseNotes, RELEASE_NOTES_ORDER } from '../scripts/build-release-notes.mjs';
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

      it('la descripción completa no menciona Google Analytics y cita los idiomas disponibles', () => {
        expect(listing.full).not.toContain('Google Analytics');
        // Play ya pone el título «Novedades» en su propio campo: el texto empieza directamente por las viñetas
        expect(listing.notes.startsWith('• '), 'sin encabezado «Novedades:»').toBe(true);
        for (const name of ['English', 'Español', 'Euskara', 'Galego', 'Català', 'Français', 'Deutsch', 'Italiano', '日本語', 'Nederlands', 'Polski', 'हिन्दी', 'Türkçe', 'Português']) expect(listing.full, name).toContain(name);
      });
    });
  }
});

describe('notas de la versión en un único archivo', () => {
  const file = readFileSync('store/notas-de-la-version.txt', 'utf8');

  it('está al día con store/listing.mjs (ejecuta npm run release-notes si falla)', () => {
    expect(file).toBe(buildReleaseNotes());
  });

  it('tiene una etiqueta por idioma de Play, en el orden de la plantilla de Google', () => {
    const tags = [...file.matchAll(/^<([A-Za-z0-9-]+)>$/gm)].map(m => m[1]);
    expect(tags).toEqual(RELEASE_NOTES_ORDER);
    expect([...tags].sort()).toEqual(STORE_LOCALES.map(l => l.play).sort());
  });

  it('cada idioma cumple el límite de 500 caracteres y las etiquetas se cierran', () => {
    for (const play of RELEASE_NOTES_ORDER) {
      const match = file.match(new RegExp(`<${play}>\\n([\\s\\S]*?)\\n</${play}>`));
      expect(match, play).not.toBeNull();
      expect(match[1].length, play).toBeLessThanOrEqual(LIMITS.notes);
      expect(match[1].trim(), play).not.toBe('');
    }
  });
});
