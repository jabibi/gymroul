import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { LEGAL_PAGES, LANGUAGE_ORDER } from '../legal/index.mjs';
import { buildLegalFiles } from '../scripts/build-legal.mjs';
import { LANGUAGES } from '../src/i18n/index.js';
import { CONTACT_EMAIL } from '../legal/common.mjs';

const count = (text, re) => (text.match(re) ?? []).length;
const flat = doc => JSON.stringify(doc.blocks);

describe('páginas legales multilingües', () => {
  it('cubren exactamente los idiomas de la app y en el mismo orden', () => {
    expect(LANGUAGE_ORDER).toEqual(LANGUAGES.map(l => l.code));
  });

  for (const [file, page] of Object.entries(LEGAL_PAGES)) {
    describe(file, () => {
      it('tiene todos los idiomas', () => {
        expect(Object.keys(page).sort()).toEqual([...LANGUAGE_ORDER].sort());
      });

      it('todos los idiomas tienen la misma estructura que el inglés', () => {
        const shape = doc => doc.blocks.map(([type, a, b]) =>
          type === 'ul' || type === 'ol' ? `${type}:${a.length}` : type === 'table' ? `table:${a.length}x${b.length}` : type);
        for (const code of LANGUAGE_ORDER) expect(shape(page[code]), code).toEqual(shape(page.en));
      });

      it('conservan los mismos enlaces que el inglés', () => {
        const links = doc => (flat(doc).match(/href=\\"([^"\\]+)\\"/g) ?? []).map(h => h.replace(/\?subject=[^\\]*/, '')).sort();
        for (const code of LANGUAGE_ORDER) expect(links(page[code]), code).toEqual(links(page.en));
      });

      it('no dejan texto vacío ni HTML sin cerrar', () => {
        for (const code of LANGUAGE_ORDER) {
          const text = flat(page[code]);
          expect(text, code).not.toMatch(/\[\s*'(?:p|h\d)'\s*,\s*''\s*\]/);
          for (const tag of ['strong', 'em', 'code', 'a']) {
            expect(count(text, new RegExp(`<${tag}[ >]`, 'g')), `${code} <${tag}>`).toBe(count(text, new RegExp(`</${tag}>`, 'g')));
          }
        }
      });
    });
  }

  describe('datos que deben figurar en cada idioma', () => {
    for (const code of LANGUAGE_ORDER) {
      it(`${code}: privacidad`, () => {
        const text = flat(LEGAL_PAGES['privacy.html'][code]);
        for (const fact of [CONTACT_EMAIL, 'eus.jabibi.gymroul', 'gymroul.web.app', '14', 'Google Analytics', 'Firebase', 'borrar-datos.html', 'aepd.es']) {
          expect(text, fact).toContain(fact);
        }
      });
      it(`${code}: eliminación de datos`, () => {
        const text = flat(LEGAL_PAGES['borrar-datos.html'][code]);
        for (const fact of [CONTACT_EMAIL, 'subject=', 'privacy.html', '12', '14', 'gymroul.web.app']) expect(text, fact).toContain(fact);
      });
    }
  });

  it('los HTML publicados en public/ coinciden con el contenido (ejecuta npm run legal si falla)', () => {
    for (const [file, html] of Object.entries(buildLegalFiles())) {
      expect(readFileSync(`public/${file}`, 'utf8'), file).toBe(html);
    }
  });

  it('cada página incluye una sección por idioma y el script selector', () => {
    for (const [file, html] of Object.entries(buildLegalFiles())) {
      expect(count(html, /<section lang=/g), file).toBe(LANGUAGE_ORDER.length);
      expect(html, file).toContain('<script src="legal.js" defer>');
    }
  });
});
