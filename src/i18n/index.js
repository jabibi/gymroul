// @ts-check
// Internacionalización: diccionarios por idioma, detección, interpolación y traducción del marcado.
//
// Cada idioma (src/i18n/locales/<código>.js) exporta:
//   strings  textos de la interfaz, claves planas ('config.title')
//   groups   nombres de los grupos del catálogo de iconos
//   icons    tabla "id | Etiqueta | palabras clave", una línea por icono
// El inglés es la fuente de verdad y el respaldo de cualquier texto que falte en otro idioma.

import ar from './locales/ar.js';
import en from './locales/en.js';
import enGB from './locales/en-GB.js';
import enAU from './locales/en-AU.js';
import es from './locales/es.js';
import es419 from './locales/es-419.js';
import eu from './locales/eu.js';
import gl from './locales/gl.js';
import ca from './locales/ca.js';
import fr from './locales/fr.js';
import de from './locales/de.js';
import it from './locales/it.js';
import ja from './locales/ja.js';
import nl from './locales/nl.js';
import pl from './locales/pl.js';
import hi from './locales/hi.js';
import tr from './locales/tr.js';
import frCA from './locales/fr-CA.js';
import ptBR from './locales/pt-BR.js';
import ptPT from './locales/pt-PT.js';
import { parseIconTable } from './icon-table.js';

/**
 * @typedef {{ strings: Record<string, string>, groups?: Record<string, string>, icons?: string }} LocaleData
 * @typedef {'ar' | 'en' | 'en-GB' | 'en-AU' | 'es' | 'es-419' | 'eu' | 'gl' | 'ca' | 'fr' | 'fr-CA' | 'de' | 'it' | 'ja' | 'nl' | 'pl' | 'hi' | 'tr' | 'pt-BR' | 'pt-PT'} LanguageCode
 */

/**
 * Idiomas disponibles, con su nombre en el propio idioma y la etiqueta BCP 47 para fechas y horas.
 * Van por orden alfabético del nombre (árabe por «Arabic», hindi por «Hindi» y japonés por «Japanese»), con las variantes regionales junto a su idioma base.
 */
export const LANGUAGES = /** @type {{ code: LanguageCode, name: string, tag: string }[]} */ ([
  { code: 'ar', name: 'العربية', tag: 'ar' },
  { code: 'ca', name: 'Català', tag: 'ca' },
  { code: 'de', name: 'Deutsch', tag: 'de-DE' },
  { code: 'en', name: 'English (US)', tag: 'en-US' },
  { code: 'en-GB', name: 'English (UK)', tag: 'en-GB' },
  { code: 'en-AU', name: 'English (Australia)', tag: 'en-AU' },
  { code: 'es', name: 'Español (España)', tag: 'es-ES' },
  { code: 'es-419', name: 'Español (Latinoamérica)', tag: 'es-419' },
  { code: 'eu', name: 'Euskara', tag: 'eu' },
  { code: 'fr', name: 'Français (France)', tag: 'fr-FR' },
  { code: 'fr-CA', name: 'Français (Canada)', tag: 'fr-CA' },
  { code: 'gl', name: 'Galego', tag: 'gl' },
  { code: 'hi', name: 'हिन्दी', tag: 'hi-IN' },
  { code: 'it', name: 'Italiano', tag: 'it-IT' },
  { code: 'ja', name: '日本語', tag: 'ja-JP' },
  { code: 'nl', name: 'Nederlands', tag: 'nl-NL' },
  { code: 'pl', name: 'Polski', tag: 'pl-PL' },
  { code: 'pt-BR', name: 'Português (Brasil)', tag: 'pt-BR' },
  { code: 'pt-PT', name: 'Português (Portugal)', tag: 'pt-PT' },
  { code: 'tr', name: 'Türkçe', tag: 'tr-TR' },
]);

/** Idiomas que se escriben de derecha a izquierda: la página entera pasa a dir="rtl". */
export const RTL_LANGUAGES = /** @type {LanguageCode[]} */ (['ar']);

/** @param {LanguageCode} code */
export const isRtl = code => RTL_LANGUAGES.includes(code);

export const DEFAULT_LANGUAGE = /** @type {LanguageCode} */ ('en');
export const STORAGE_LANGUAGE_KEY = 'gymroulette_language';

/**
 * Las variantes regionales (pt-PT, en-GB, en-AU, es-419, fr-CA) heredan de su idioma base y solo redefinen lo que cambia.
 * @param {LocaleData} base @param {LocaleData} over
 * @returns {LocaleData}
 */
const extend = (base, over) => ({
  strings: { ...base.strings, ...over.strings },
  groups: { ...base.groups, ...over.groups },
  icons: mergeTables(base.icons ?? '', over.icons ?? ''),
});

/** Une dos tablas de iconos; las líneas de la segunda sustituyen a las de la primera por id. */
function mergeTables(/** @type {string} */ a, /** @type {string} */ b) {
  const merged = { ...parseIconTable(a), ...parseIconTable(b) };
  return Object.entries(merged).map(([id, v]) => `${id} | ${v.label} | ${v.keywords}`).join('\n');
}

/** @type {Record<LanguageCode, LocaleData>} */
export const DICTIONARIES = {
  en, ar, es, eu, gl, ca, fr, de, it, ja, nl, pl, hi, tr,
  'en-GB': extend(en, enGB),
  'en-AU': extend(en, enAU),
  'es-419': extend(es, es419),
  'fr-CA': extend(fr, frCA),
  'pt-BR': ptBR,
  'pt-PT': extend(ptBR, ptPT),
};

/** @type {Record<LanguageCode, Record<string, { label: string, keywords: string }>>} */
const iconTables = /** @type {any} */ (Object.fromEntries(
  Object.entries(DICTIONARIES).map(([code, d]) => [code, parseIconTable(d.icons ?? '')]),
));

/** @type {LanguageCode} */
let current = DEFAULT_LANGUAGE;

/** @param {unknown} code @returns {code is LanguageCode} */
export const isSupported = code => LANGUAGES.some(l => l.code === code);

export const getLanguage = () => current;
export const getLanguageTag = () => LANGUAGES.find(l => l.code === current)?.tag ?? 'en';

/** Regiones donde se usa el inglés británico (ortografía y vocabulario): reciben en-GB (Australia tiene su propia variante, en-AU); el resto del inglés, en. */
const BRITISH_ENGLISH_REGIONS = ['gb', 'nz', 'ie', 'za', 'in', 'sg'];
/** Regiones de habla hispana fuera de España: reciben el español de Latinoamérica. */
const LATIN_AMERICAN_REGIONS = ['419', 'mx', 'ar', 'co', 'cl', 'pe', 've', 'ec', 'gt', 'cu', 'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'pr', 'us'];

/**
 * Elige el idioma a partir de las preferencias del navegador. 'pt' sin región va a Brasil, que es
 * la variante con más hablantes; el inglés de Reino Unido, Irlanda, India... va a en-GB y el de Australia a en-AU; el
 * español de Latinoamérica a es-419 y el de España (o sin región) a es; el francés de Canadá a fr-CA;
 * cualquier idioma no soportado cae al inglés.
 * @param {readonly string[]} preferred
 * @returns {LanguageCode}
 */
export function matchLanguage(preferred) {
  for (const raw of preferred) {
    const tag = raw.trim().toLowerCase().replace('_', '-');
    const exact = LANGUAGES.find(l => l.code.toLowerCase() === tag);
    if (exact) return exact.code;
    const base = tag.split('-')[0];
    if (base === 'pt') return 'pt-BR';
    const region = tag.split('-')[1] ?? '';
    if (base === 'en' && region === 'au') return 'en-AU';
    if (base === 'en') return BRITISH_ENGLISH_REGIONS.includes(region) ? 'en-GB' : 'en';
    if (base === 'es') return LATIN_AMERICAN_REGIONS.includes(region) ? 'es-419' : 'es';
    const byBase = LANGUAGES.find(l => l.code.toLowerCase() === base);
    if (byBase) return byBase.code;
  }
  return DEFAULT_LANGUAGE;
}

/** Idioma inicial: parámetro ?lang=, idioma guardado, preferencia del dispositivo y, si no, inglés. */
export function detectLanguage() {
  try {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (isSupported(fromUrl)) return /** @type {LanguageCode} */ (fromUrl);
    const saved = localStorage.getItem(STORAGE_LANGUAGE_KEY);
    if (isSupported(saved)) return /** @type {LanguageCode} */ (saved);
  } catch (e) { /* almacenamiento no disponible */ }
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language ?? ''];
  return matchLanguage(preferred);
}

/** @param {string} template @param {Record<string, string | number>} [params] */
const interpolate = (template, params) =>
  params ? template.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m)) : template;

/**
 * Traduce una clave al idioma activo (con respaldo en inglés y, como último recurso, la propia clave).
 * @param {string} key @param {Record<string, string | number>} [params]
 */
export function t(key, params) {
  const text = DICTIONARIES[current].strings[key] ?? DICTIONARIES[DEFAULT_LANGUAGE].strings[key] ?? key;
  return interpolate(text, params);
}

/** Nombre de un grupo del catálogo de iconos en el idioma activo. @param {string} groupId */
export const groupName = groupId =>
  DICTIONARIES[current].groups?.[groupId] ?? DICTIONARIES[DEFAULT_LANGUAGE].groups?.[groupId] ?? groupId;

/** Etiqueta de un icono en el idioma activo. @param {string} iconId */
export const iconLabel = iconId => iconTables[current][iconId]?.label ?? iconTables[DEFAULT_LANGUAGE][iconId]?.label ?? iconId;

/**
 * Texto buscable de un icono: etiquetas y palabras clave de TODOS los idiomas, de modo que se
 * encuentra el mismo icono escribiendo «boxeo», «boxing» o «boxe».
 * @param {string} iconId
 */
export function iconSearchText(iconId) {
  return Object.values(iconTables).map(table => `${table[iconId]?.label ?? ''} ${table[iconId]?.keywords ?? ''}`).join(' ');
}

/** Ids de icono definidos en un idioma (para los tests de cobertura). @param {LanguageCode} code */
export const iconIdsOf = code => Object.keys(iconTables[code]);

/**
 * Cambia el idioma activo. Devuelve true si cambió.
 * @param {LanguageCode} code @param {{ persist?: boolean }} [options]
 */
export function setLanguage(code, { persist = true } = {}) {
  if (!isSupported(code)) return false;
  const changed = code !== current;
  current = code;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = getLanguageTag();
    document.documentElement.dir = isRtl(code) ? 'rtl' : 'ltr';
  }
  if (persist) {
    try { localStorage.setItem(STORAGE_LANGUAGE_KEY, code); } catch (e) { /* ignorado */ }
  }
  return changed;
}

/**
 * Traduce el marcado: data-i18n (texto), data-i18n-placeholder, data-i18n-aria-label y data-i18n-title.
 * @param {ParentNode} [root]
 */
export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(/** @type {HTMLElement} */ (el).dataset.i18n ?? ''); });
  for (const attr of ['placeholder', 'aria-label', 'title']) {
    const dataKey = `data-i18n-${attr}`;
    root.querySelectorAll(`[${dataKey}]`).forEach(el => el.setAttribute(attr, t(el.getAttribute(dataKey) ?? '')));
  }
  if (typeof document !== 'undefined') document.title = t('app.title');
}
