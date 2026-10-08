import { describe, it, expect, afterEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { DICTIONARIES, setLanguage, isRtl, RTL_LANGUAGES, matchLanguage, LANGUAGES, DEFAULT_LANGUAGE } from '../src/i18n/index.js';
import { normalizeText, searchIcons } from '../src/icons.js';
import { LISTINGS } from '../store/listing.mjs';
import { LEGAL_PAGES } from '../legal/index.mjs';
import { buildLegalFiles } from '../scripts/build-legal.mjs';

// El árabe se escribe de derecha a izquierda, con letras que se unen entre sí y con su propia puntuación:
// estas comprobaciones cubren lo que los tests de cobertura genéricos no ven.

const ar = DICTIONARIES.ar;
const ARABIC_LETTERS = /[؀-ۿ]/;
const ARABIC_INDIC_DIGITS = /[٠-٩۰-۹]/;
const DIACRITICS = /[ً-ٰٟ]/;
/** Textos de la interfaz que no se traducen (nombre del producto). */
const UNTRANSLATED = new Set(['app.title']);

afterEach(() => setLanguage(DEFAULT_LANGUAGE, { persist: false }));

describe('árabe: dirección de escritura', () => {
  it('es el único idioma de derecha a izquierda y está declarado', () => {
    expect(RTL_LANGUAGES).toEqual(['ar']);
    expect(isRtl('ar')).toBe(true);
    for (const l of LANGUAGES.filter(l => l.code !== 'ar')) expect(isRtl(l.code), l.code).toBe(false);
  });

  it('al cambiar de idioma la página pasa a dir="rtl" y vuelve a "ltr"', () => {
    const root = { lang: '', dir: '' };
    vi.stubGlobal('document', { documentElement: root });
    setLanguage('ar', { persist: false });
    expect(root).toEqual({ lang: 'ar', dir: 'rtl' });
    setLanguage('es', { persist: false });
    expect(root).toEqual({ lang: 'es-ES', dir: 'ltr' });
    vi.unstubAllGlobals();
  });

  it('se elige para cualquier variante regional del árabe', () => {
    for (const tag of ['ar', 'ar-SA', 'ar-EG', 'ar-AE', 'ar-MA', 'AR_DZ']) expect(matchLanguage([tag]), tag).toBe('ar');
  });
});

describe('árabe: textos de la interfaz', () => {
  const entries = Object.entries(ar.strings).filter(([key]) => !UNTRANSLATED.has(key));

  it('todos los textos están escritos en árabe', () => {
    for (const [key, text] of entries) expect(text, key).toMatch(ARABIC_LETTERS);
  });

  it('usa la puntuación árabe (، ؛ ؟) y no la latina en las frases', () => {
    for (const [key, text] of entries) {
      expect(text, `${key}: coma latina`).not.toMatch(/,/);
      expect(text, `${key}: punto y coma latino`).not.toMatch(/;/);
      expect(text, `${key}: interrogación latina`).not.toMatch(/\?/);
    }
  });

  it('usa comillas angulares «…» y no las rectas ni las inglesas alrededor de texto árabe', () => {
    for (const [key, text] of entries) expect(text, key).not.toMatch(/["“”]/);
  });

  it('usa cifras occidentales (0-9), como el resto de la app, y no las indo-arábigas', () => {
    for (const [key, text] of entries) expect(text, key).not.toMatch(ARABIC_INDIC_DIGITS);
  });

  it('no usa el alargamiento (tatwil) ni caracteres de control de dirección invisibles', () => {
    for (const [key, text] of entries) {
      expect(text, key).not.toMatch(/ـ/);
      expect(text, key).not.toMatch(/[‎‏‪-‮⁦-⁩]/);
    }
  });

  it('el botón de girar es el mismo texto que cita la introducción', () => {
    expect(ar.strings['intro.how.spin']).toContain(`«${ar.strings['spin.button']}»`);
  });

  it('el texto del resultado deja los datos interpolados en su sitio', () => {
    const text = ar.strings['result.desc'];
    expect(text).toContain('{exercise}');
    expect(text).toContain('{reps}');
  });
});

describe('árabe: iconos y búsqueda', () => {
  it('las etiquetas y palabras clave de los iconos están en árabe y sin vocalización', () => {
    const lines = ar.icons.trim().split('\n');
    expect(lines.length).toBeGreaterThan(100);
    for (const line of lines) {
      const [id, label, keywords] = line.split(' | ');
      expect(label, id).toMatch(ARABIC_LETTERS);
      expect(keywords, id).toMatch(ARABIC_LETTERS);
      expect(line, id).not.toMatch(DIACRITICS);
    }
  });

  it('la búsqueda ignora la vocalización, el tatwil y las variantes de alef, ya maqsura y ta marbuta', () => {
    expect(normalizeText('أَدِر')).toBe(normalizeText('ادر'));
    expect(normalizeText('إنشاء')).toBe(normalizeText('انشاء'));
    expect(normalizeText('آسانا')).toBe(normalizeText('اسانا'));
    expect(normalizeText('مســاحة')).toBe(normalizeText('مساحة'));
    expect(normalizeText('ملاكمة')).toBe(normalizeText('ملاكمه'));
    expect(normalizeText('ذكرى')).toBe(normalizeText('ذكري'));
  });

  it('se encuentra el icono buscando en árabe, con o sin su escritura exacta', () => {
    const ids = query => searchIcons(query).map(i => i.id);
    expect(ids('ملاكمة')).toContain('boxing');
    expect(ids('ملاكمه')).toContain('boxing');
    expect(ids('يوغا')).toContain('yoga');
    expect(ids('أثقال')).toContain('dumbbell');
    expect(ids('اثقال')).toContain('dumbbell');
  });

  it('seguir buscando en otros idiomas sigue funcionando (el árabe no rompe la normalización)', () => {
    expect(searchIcons('boxeo').map(i => i.id)).toContain('boxing');
    expect(searchIcons('Müdigkeit').length).toBe(0);
  });
});

describe('árabe: estilos de la interfaz', () => {
  const css = readFileSync('src/style.css', 'utf8');

  it('anula el espaciado entre letras, que rompe las uniones de la escritura árabe', () => {
    expect(css).toMatch(/:lang\(ar\)[^{]*\{[^}]*letter-spacing:\s*normal\s*!important/);
  });

  it('los selectores tienen alto suficiente para no recortar las letras', () => {
    expect(css).toMatch(/:lang\(ar\) select\s*\{[^}]*min-height/);
  });

  it('el marcado usa propiedades lógicas (inicio/fin) donde importa el lado', () => {
    const html = readFileSync('index.html', 'utf8');
    expect(html).not.toMatch(/\bpr-1\b/);
    expect(html).not.toMatch(/-right-1\.5/);
    expect(html).toMatch(/rtl:space-x-reverse/);
  });
});

describe('árabe: ficha de Play y páginas legales', () => {
  it('la ficha tiene todos los textos y el botón del gráfico es el de la app', () => {
    const l = LISTINGS.ar;
    for (const field of ['title', 'short', 'full', 'notes']) expect(l[field], field).toBeTruthy();
    expect(l.banner.button).toBe(ar.strings['spin.button']);
    for (const text of [l.short, l.full, l.notes, ...Object.values(l.banner)]) expect(text).toMatch(ARABIC_LETTERS);
  });

  it('la descripción cita el botón con su texto exacto', () => {
    expect(LISTINGS.ar.full).toContain(`«${ar.strings['spin.button']}»`);
  });

  it('todos los idiomas de la ficha nombran el árabe en su lista de idiomas', () => {
    for (const [code, l] of Object.entries(LISTINGS)) expect(l.full, code).toContain('العربية');
  });

  it('los documentos legales tienen árabe y su sección se publica con dir="rtl"', () => {
    for (const [file, page] of Object.entries(LEGAL_PAGES)) {
      expect(page.ar, file).toBeTruthy();
      expect(JSON.stringify(page.ar.blocks), file).toMatch(ARABIC_LETTERS);
    }
    for (const [file, html] of Object.entries(buildLegalFiles())) {
      expect(html, file).toContain('<section lang="ar" dir="rtl" data-lang="ar"');
      expect(html.match(/dir="rtl"/g)?.length, file).toBe(1);
    }
  });
});
