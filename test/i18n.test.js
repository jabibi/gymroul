import { describe, it, expect, afterEach } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import {
  LANGUAGES, DICTIONARIES, DEFAULT_LANGUAGE, t, setLanguage, getLanguage, matchLanguage,
  iconIdsOf, iconLabel, groupName, iconSearchText,
} from '../src/i18n/index.js';
import { ICONS, ICON_GROUPS, searchIcons } from '../src/icons.js';
import { addRep, addExercise, loadActive } from '../src/store.js';

const codes = LANGUAGES.map(l => l.code);
const en = DICTIONARIES.en;
const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(m => m[1]).sort();

afterEach(() => setLanguage(DEFAULT_LANGUAGE, { persist: false }));

describe('idiomas disponibles', () => {
  it('son los once esperados e incluyen las variantes regionales', () => {
    expect(codes).toEqual(['en', 'en-GB', 'es', 'es-419', 'eu', 'gl', 'ca', 'fr', 'fr-CA', 'pt-BR', 'pt-PT']);
  });
});

describe('cobertura de las traducciones', () => {
  for (const code of codes) {
    describe(code, () => {
      const dict = DICTIONARIES[code];

      it('tiene exactamente las mismas claves que el inglés', () => {
        expect(Object.keys(dict.strings).sort()).toEqual(Object.keys(en.strings).sort());
      });

      it('conserva los mismos parámetros {x} que el inglés en cada texto', () => {
        for (const [key, text] of Object.entries(dict.strings)) {
          expect(placeholders(text), `${code}:${key}`).toEqual(placeholders(en.strings[key]));
        }
      });

      it('no deja textos vacíos', () => {
        for (const [key, text] of Object.entries(dict.strings)) expect(text.trim(), `${code}:${key}`).not.toBe('');
      });

      it('traduce todos los grupos del catálogo de iconos', () => {
        for (const group of ICON_GROUPS) expect(dict.groups[group.id], `${code}:${group.id}`).toBeTruthy();
      });

      it('tiene etiqueta para cada icono y ninguno de más', () => {
        expect(iconIdsOf(code).sort()).toEqual(ICONS.map(i => i.id).sort());
      });
    });
  }
});

describe('claves usadas en el marcado y en el código', () => {
  const html = readFileSync('index.html', 'utf8');
  const sources = readdirSync('src').filter(f => f.endsWith('.js')).map(f => readFileSync(`src/${f}`, 'utf8'));

  it('todas las claves data-i18n* de index.html existen', () => {
    const keys = [...html.matchAll(/data-i18n(?:-[a-z-]+)?="([^"]+)"/g)].map(m => m[1]);
    expect(keys.length).toBeGreaterThan(30);
    for (const key of keys) expect(en.strings[key], key).toBeDefined();
  });

  it('todas las claves t(\'...\') y titleKey del código existen', () => {
    const keys = sources.flatMap(src => [...src.matchAll(/\bt\('([a-zA-Z.]+)'/g), ...src.matchAll(/(?:titleKey|key): '([a-zA-Z.]+)'/g)].map(m => m[1]));
    expect(keys.length).toBeGreaterThan(15);
    for (const key of keys) expect(en.strings[key], key).toBeDefined();
  });
});

describe('detección del idioma', () => {
  const cases = [
    [['es-ES'], 'es'], [['es'], 'es'], [['es-MX', 'en'], 'es-419'], [['es-AR'], 'es-419'], [['es-419'], 'es-419'], [['es-CO'], 'es-419'], [['fr-CA'], 'fr-CA'], [['fr-FR'], 'fr'], [['fr-BE'], 'fr'], [['en-GB'], 'en-GB'], [['en-US'], 'en'], [['en-AU'], 'en-GB'], [['en-IE'], 'en-GB'], [['en-IN'], 'en-GB'], [['en-CA'], 'en'], [['en'], 'en'], [['eu-ES'], 'eu'], [['gl'], 'gl'], [['ca-ES'], 'ca'],
    [['pt-PT'], 'pt-PT'], [['pt-BR'], 'pt-BR'], [['pt'], 'pt-BR'], [['pt_PT'], 'pt-PT'],
    [['de', 'fr'], 'fr'], [['zh-CN'], 'en'], [[], 'en'], [['EU'], 'eu'],
  ];
  for (const [prefs, expected] of cases) {
    it(`${JSON.stringify(prefs)} -> ${expected}`, () => expect(matchLanguage(prefs)).toBe(expected));
  }
});

describe('traducción', () => {
  it('traduce al idioma activo e interpola parámetros', () => {
    setLanguage('es', { persist: false });
    expect(t('result.skip')).toBe('Saltar este reto');
    expect(t('result.desc', { reps: 20, exercise: 'Burpee' })).toContain('20 repeticiones de Burpee');
  });

  it('una clave desconocida devuelve la propia clave y un parámetro ausente no se pierde', () => {
    expect(t('no.existe')).toBe('no.existe');
    expect(t('history.total')).toBe('Completed this session: {n}');
  });

  it('el inglés británico hereda del estadounidense y solo cambia su vocabulario', () => {
    setLanguage('en', { persist: false });
    expect(iconLabel('soccer')).toBe('Soccer');
    expect(t('doc.credits')).toBe('Credits and licenses');
    setLanguage('en-GB', { persist: false });
    expect(iconLabel('soccer')).toBe('Football');
    expect(iconLabel('tire')).toBe('Tyre');
    expect(t('doc.credits')).toBe('Credits and licences');
    expect(t('config.title')).toBe(DICTIONARIES.en.strings['config.title']);
  });

  it('el español de Latinoamérica y el francés de Canadá heredan de su idioma base', () => {
    setLanguage('es', { persist: false });
    expect(t('config.add')).toBe('Añadir');
    expect(iconLabel('basketball')).toBe('Baloncesto');
    setLanguage('es-419', { persist: false });
    expect(t('config.add')).toBe('Agregar');
    expect(iconLabel('basketball')).toBe('Básquetbol');
    expect(t('config.title')).toBe(DICTIONARIES.es.strings['config.title']);
    setLanguage('fr', { persist: false });
    expect(t('spin.button')).toBe('LANCER LA ROUE\u00a0!');
    expect(iconLabel('soccer')).toBe('Football');
    setLanguage('fr-CA', { persist: false });
    expect(t('spin.button')).toBe('LANCER LA ROUE!');
    expect(iconLabel('soccer')).toBe('Soccer');
    expect(t('config.reps')).toBe(DICTIONARIES.fr.strings['config.reps']);
  });

  it('el portugués de Portugal hereda lo que no redefine del de Brasil', () => {
    expect(DICTIONARIES['pt-PT'].strings['config.title']).toBe(DICTIONARIES['pt-BR'].strings['config.title']);
    setLanguage('pt-PT', { persist: false });
    expect(t('config.close')).toBe('Fechar definições');
    setLanguage('pt-BR', { persist: false });
    expect(t('config.close')).toBe('Fechar configurações');
  });

  it('cambia las etiquetas de iconos y grupos con el idioma', () => {
    setLanguage('fr', { persist: false });
    expect(iconLabel('boxing')).toBe('Boxe');
    expect(groupName('martial')).toBe('Arts martiaux et combat');
    setLanguage('pt-PT', { persist: false });
    expect(iconLabel('sneaker')).toBe('Sapatilhas');
    expect(getLanguage()).toBe('pt-PT');
  });

  it('rechaza idiomas no soportados', () => {
    expect(setLanguage(/** @type {any} */ ('de'), { persist: false })).toBe(false);
    expect(getLanguage()).toBe('en');
  });
});

describe('búsqueda de iconos en cualquier idioma', () => {
  const ids = q => searchIcons(q).map(i => i.id);
  it('encuentra el mismo icono escribiendo en cada idioma', () => {
    for (const q of ['boxing', 'boxeo', 'boxeoa', 'boxa', 'boxe']) expect(ids(q), q).toContain('boxing');
    for (const q of ['yoga', 'ioga']) expect(ids(q), q).toContain('yoga');
    for (const q of ['swimming', 'natación', 'natació', 'natation', 'igeriketa', 'natação']) expect(ids(q), q).toContain('swim');
  });
  it('no distingue acentos ni mayúsculas', () => {
    expect(ids('NATACION')).toContain('swim');
    expect(ids('Karaté')).toContain('karate');
  });
  it('el texto buscable de un icono mezcla todos los idiomas', () => {
    const text = iconSearchText('swim').toLowerCase();
    for (const word of ['swimming', 'natación', 'igeriketa', 'natation']) expect(text).toContain(word);
  });
});

describe('errores del almacén', () => {
  it('son claves traducibles con sus parámetros', () => {
    loadActive();
    const bad = addRep('abc');
    expect(bad.ok).toBe(false);
    expect(bad.error.key).toBe('error.repRange');
    expect(bad.error.params.max).toBe(500);
    expect(addExercise({ name: '', icon: 'dumbbell' }).error.key).toBe('error.nameRequired');
    expect(addExercise({ name: 'X', icon: '🔥' }).error.key).toBe('error.iconRequired');
  });
});

describe('consentimiento de analítica opcional', () => {
  const html = readFileSync('index.html', 'utf8');
  const main = readFileSync('src/main.js', 'utf8');

  it('no hay textos ni elementos que condicionen el uso de la app a aceptar', () => {
    expect(html).not.toContain('consentRejected');
    for (const code of codes) {
      for (const key of ['consent.required', 'consent.rejected']) expect(DICTIONARIES[code].strings[key], `${code}:${key}`).toBeUndefined();
    }
  });

  it('todos los idiomas explican que es opcional y los dos botones existen', () => {
    for (const code of codes) expect(DICTIONARIES[code].strings['consent.optional'], code).toBeTruthy();
    expect(html).toContain('data-i18n="consent.deny"');
    expect(html).toContain('data-i18n="consent.grant"');
  });

  it('Aceptar y Rechazar tienen exactamente el mismo estilo (mismo peso visual)', () => {
    const classes = key => html.match(new RegExp(`<button[^>]*class="([^"]*)"[^>]*data-i18n="${key}"`))?.[1];
    expect(classes('consent.deny')).toBeTruthy();
    expect(classes('consent.deny')).toBe(classes('consent.grant'));
  });

  it('solo se pregunta cuando no hay decisión previa: rechazar o aceptar no bloquean la app', () => {
    expect(main).toMatch(/consent === null\) ui\.setConsentGate\(true\)/);
    expect(main).toMatch(/setConsent\(arg === 'grant'\);\s*ui\.hideConsent\(\)/);
  });
});
