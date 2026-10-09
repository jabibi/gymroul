// Reúne los documentos legales y el orden y los nombres de los idiomas con los que se publican.
import privacy from './privacy.mjs';
import dataDeletion from './data-deletion.mjs';
import credits from './credits.mjs';
import notFound from './not-found.mjs';
import closedTesting from './closed-testing.mjs';

export const LANGUAGE_ORDER = ['ar', 'ca', 'de', 'en', 'es', 'eu', 'fr', 'gl', 'hi', 'it', 'ja', 'nl', 'pl', 'pt-BR', 'pt-PT', 'tr'];

export const LANGUAGE_NAMES = {
  ar: 'العربية',
  en: 'English',
  es: 'Español',
  eu: 'Euskara',
  gl: 'Galego',
  ca: 'Català',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  ja: '日本語',
  nl: 'Nederlands',
  pl: 'Polski',
  hi: 'हिन्दी',
  tr: 'Türkçe',
  'pt-BR': 'Português (Brasil)',
  'pt-PT': 'Português (Portugal)',
};

/** Idiomas que se escriben de derecha a izquierda (su sección lleva dir="rtl"). */
export const RTL_LANGUAGES = ['ar'];

/** Nombre del archivo publicado en public/ -> contenido por idioma. Las URLs ya declaradas en Play no cambian. */
export const LEGAL_PAGES = {
  'privacy.html': privacy,
  'data-deletion.html': dataDeletion,
  'credits.html': credits,
  '404.html': notFound,
  'closed-testing.html': closedTesting,
};

/** Páginas con un diseño propio (tarjeta con pasos numerados) en lugar del documento legal sencillo. */
export const STEPS_PAGES = ['closed-testing.html'];
