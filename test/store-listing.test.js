import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { buildReleaseNotes, RELEASE_NOTES_ORDER } from '../scripts/build-release-notes.mjs';
import { LISTINGS, STORE_LOCALES, LIMITS, NOTES_VERSIONS } from '../store/listing.mjs';
import { LANGUAGES } from '../src/i18n/index.js';

/** Variantes regionales de la app que no tienen ficha en Play: ahí se enseña la de su idioma base (así no hay que subir las capturas varias veces) */
const NO_STORE_LISTING = ['en-GB', 'en-AU', 'es-419', 'fr-CA'];

describe('ficha de Google Play', () => {
  it('hay una ficha para cada idioma de la app salvo las variantes regionales sin ficha propia (Play enseña la de su idioma base), con códigos de Play únicos', () => {
    expect(STORE_LOCALES.map(l => l.app)).toEqual(LANGUAGES.map(l => l.code).filter(code => !NO_STORE_LISTING.includes(code)));
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

      it('la descripción completa tiene las mismas viñetas por sección que la inglesa', () => {
        // Evita viñetas sueltas o pegadas a otra sección (y en otro idioma) al añadir una a todas las fichas
        const bulletsPerBlock = text => text.split('\n\n').map(b => b.split('\n').filter(x => x.startsWith('• ')).length);
        expect(bulletsPerBlock(listing.full)).toEqual(bulletsPerBlock(LISTINGS.en.full));
      });

      it('la descripción completa no menciona Google Analytics y cita los idiomas disponibles', () => {
        expect(listing.full).not.toContain('Google Analytics');
        // Play ya pone el título «Novedades» en su propio campo: el texto empieza directamente por la versión más reciente
        expect(listing.notes, 'sin encabezado «Novedades:»').toMatch(new RegExp(`^\\S+ ${NOTES_VERSIONS[0].version} \\(${NOTES_VERSIONS[0].codename}\\):\\n• `));
        expect(listing.notes, 'versión anterior').toContain(` ${NOTES_VERSIONS[1].version} (${NOTES_VERSIONS[1].codename}):\n• `);
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

describe('novedades de la ficha', () => {
  it('muestran dos versiones consecutivas, la más reciente primero, sin adelantarse a package.json', () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    const [pkgMajor, pkgMinor] = pkg.version.split('.').map(Number);
    const [major, minor] = NOTES_VERSIONS[0].version.split('.').map(Number);
    expect(NOTES_VERSIONS).toHaveLength(2);
    // La ficha se actualiza al publicar: durante el desarrollo de una versión puede ir una por detrás, nunca por delante
    expect(major * 1000 + minor).toBeLessThanOrEqual(pkgMajor * 1000 + pkgMinor);
    expect(NOTES_VERSIONS[1].version).toBe(`${major}.${minor - 1}`);
  });
});
