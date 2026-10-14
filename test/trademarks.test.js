import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Marcas registradas que no deben aparecer en nada que se vea: Google Play puede rechazar la ficha por citarlas.
// Se permiten únicamente como palabras clave ocultas del buscador de iconos (tercera columna de `icons` en cada idioma).
const BRANDS = /hyrox|cross-?fit|هايركس|كروس\s?فيت|हाइरॉक्स|क्रॉसफ़?िट|クロスフィット|ハイロックス/i;

const read = file => readFileSync(file, 'utf8');
const files = (dir, ext) => readdirSync(dir, { recursive: true, encoding: 'utf8' }).filter(f => ext.some(e => f.endsWith(e))).map(f => join(dir, f));
const expectClean = (text, where) => {
  const hit = text.match(BRANDS);
  expect(hit, hit ? `«${hit[0]}» en ${where}` : where).toBeNull();
};

describe('sin marcas registradas en lo que se ve', () => {
  describe('textos de la app', () => {
    for (const file of files('src/i18n/locales', ['.js'])) {
      it(file, async () => {
        const { default: locale } = await import(`../${file}`);
        for (const [key, value] of Object.entries({ ...locale.strings, ...locale.groups })) expectClean(String(value), `${file} · ${key}`);
        // Etiquetas visibles de los iconos (segunda columna); las palabras clave (tercera) son invisibles
        for (const line of (locale.icons ?? '').split('\n')) {
          const [id, label] = line.split('|').map(s => s.trim());
          if (label) expectClean(label, `${file} · icono ${id}`);
        }
      });
    }

    it('la interfaz, las páginas legales y el README', () => {
      for (const file of ['index.html', 'README.md', ...files('legal', ['.mjs'])]) expectClean(read(file), file);
    });
  });

  describe('ficha de Google Play', () => {
    it('fuente de los textos (store/listing.mjs)', () => expectClean(read('store/listing.mjs'), 'store/listing.mjs'));

    it('textos generados, CSV y guía (si falla, ejecuta npm run store)', () => {
      for (const file of files('store', ['.txt', '.csv', '.md'])) expectClean(read(file), file);
    });
  });

  describe('capturas de la ficha', () => {
    // Un PNG no se puede leer como texto: se vigila lo que las produce, que es el guion que escribe en la app
    // (la búsqueda de iconos) y los textos de la interfaz que aparecen en ellas, ya comprobados arriba.
    it('el guion de las capturas no escribe ni nombra ninguna marca', () => {
      expectClean(read('scripts/build-store-assets.mjs'), 'scripts/build-store-assets.mjs');
    });
  });
});
