import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { LEGAL_PAGES, LANGUAGE_ORDER } from '../legal/index.mjs';
import { buildLegalFiles } from '../scripts/build-legal.mjs';
import { LANGUAGES } from '../src/i18n/index.js';
import { CONTACT_EMAIL } from '../legal/common.mjs';

const count = (text, re) => (text.match(re) ?? []).length;
const flat = doc => JSON.stringify(doc.blocks);

describe('páginas legales multilingües', () => {
  it('cubren los idiomas de la app y en el mismo orden (las variantes en-GB, en-AU, es-419 y fr-CA usan la sección de su idioma base)', () => {
    const variants = ['en-GB', 'en-AU', 'es-419', 'fr-CA'];
    expect(LANGUAGE_ORDER).toEqual(LANGUAGES.map(l => l.code).filter(code => !variants.includes(code)));
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
        for (const fact of [CONTACT_EMAIL, 'eus.jabibi.gymroul', 'gymroul.web.app', '14', 'Firebase', 'data-deletion.html', 'aepd.es']) {
          expect(text, fact).toContain(fact);
        }
        // La app publicada nunca ha tenido analítica ni rastreadores: la política no habla de versiones antiguas
        expect(text).not.toContain('Google Analytics');
        expect(text).not.toContain('1.13');
      });
      it(`${code}: eliminación de datos`, () => {
        const text = flat(LEGAL_PAGES['data-deletion.html'][code]);
        for (const fact of [CONTACT_EMAIL, 'subject=', 'privacy.html', '12', 'gymroul.web.app']) expect(text, fact).toContain(fact);
        expect(text).not.toContain('Google Analytics');
        expect(text).not.toContain('1.13');
      });
    }
  });

  describe('closed-testing.html', () => {
    const page = LEGAL_PAGES['closed-testing.html'];
    for (const code of LANGUAGE_ORDER) {
      it(`${code}: cuatro pasos, enlaces al grupo y a Google Play, correo y los 14 días`, () => {
        const doc = page[code];
        expect(doc.blocks.filter(([type]) => type === 'step'), code).toHaveLength(4);
        expect(doc.blocks[0][0]).toBe('h1');
        expect(doc.blocks.at(-1)[0]).toBe('thanks');
        const text = flat(doc);
        for (const fact of ['https://groups.google.com/g/jabibi', 'https://play.google.com/store/apps/details?id=eus.jabibi.gymroul', `mailto:${CONTACT_EMAIL}`, '14']) {
          expect(text, fact).toContain(fact);
        }
      });
    }
  });

  it('los archivos tienen nombre en inglés y las direcciones antiguas se redirigen (301)', () => {
    expect(Object.keys(LEGAL_PAGES).sort()).toEqual(['404.html', 'closed-testing.html', 'credits.html', 'data-deletion.html', 'privacy.html']);
    const { redirects } = JSON.parse(readFileSync('firebase.json', 'utf8')).hosting;
    expect(redirects.map(r => [r.source, r.destination, r.type]).sort()).toEqual([
      ['/borrar-datos.html', '/data-deletion.html', 301],
      ['/creditos.html', '/credits.html', 301],
      ['/pruebas-cerradas.html', '/closed-testing.html', 301],
    ]);
  });

  it('la página de pruebas cerradas lleva en la cabecera el icono, el nombre y el identificador de la app', () => {
    const html = readFileSync('public/closed-testing.html', 'utf8');
    expect(html).toMatch(/<div class="brand"><img src="favicon.svg"[^>]*><div><p class="brand-name">GymRoulette<\/p><p class="brand-id">eus\.jabibi\.gymroul<\/p>/);
  });

  it('los HTML publicados en public/ coinciden con el contenido (ejecuta npm run legal si falla)', () => {
    for (const [file, html] of Object.entries(buildLegalFiles())) {
      expect(readFileSync(`public/${file}`, 'utf8'), file).toBe(html);
    }
  });

  it('los créditos muestran la versión de package.json en cada idioma', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    const version = `${pkg.version.split('.').slice(0, 2).join('.')} (${pkg.versionCodename})`;
    const html = buildLegalFiles()['credits.html'];
    expect(count(html, new RegExp(`<bdi dir="ltr">${version.replace(/[()]/g, '\\$&')}</bdi>`, 'g'))).toBe(LANGUAGE_ORDER.length);
  });

  it('cada página incluye una sección por idioma y el script selector', () => {
    for (const [file, html] of Object.entries(buildLegalFiles())) {
      expect(count(html, /<section lang=/g), file).toBe(LANGUAGE_ORDER.length);
      expect(html, file).toContain('<script src="legal.js" defer>');
    }
  });
});
