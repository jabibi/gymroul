// Reúne los documentos legales y el orden y los nombres de los idiomas con los que se publican.
import privacy from './privacy.mjs';
import dataDeletion from './data-deletion.mjs';
import credits from './credits.mjs';
import notFound from './not-found.mjs';
import closedTesting from './closed-testing.mjs';

export const LANGUAGE_ORDER = ['ca', 'de', 'en', 'es', 'eu', 'fr', 'gl', 'hi', 'it', 'pl', 'pt-BR', 'pt-PT', 'tr'];

export const LANGUAGE_NAMES = {
  en: 'English',
  es: 'Español',
  eu: 'Euskara',
  gl: 'Galego',
  ca: 'Català',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pl: 'Polski',
  hi: 'हिन्दी',
  tr: 'Türkçe',
  'pt-BR': 'Português (Brasil)',
  'pt-PT': 'Português (Portugal)',
};

/** Nombre del archivo publicado en public/ -> contenido por idioma. Las URLs ya declaradas en Play no cambian. */
export const LEGAL_PAGES = {
  'privacy.html': privacy,
  'borrar-datos.html': dataDeletion,
  'creditos.html': credits,
  '404.html': notFound,
  'pruebas-cerradas.html': closedTesting,
};

/** Páginas con un diseño propio (tarjeta con pasos numerados) en lugar del documento legal sencillo. */
export const STEPS_PAGES = ['pruebas-cerradas.html'];
