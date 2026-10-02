// Reúne los documentos legales y el orden y los nombres de los idiomas con los que se publican.
import privacy from './privacy.mjs';
import dataDeletion from './data-deletion.mjs';
import credits from './credits.mjs';
import notFound from './not-found.mjs';

export const LANGUAGE_ORDER = ['en', 'es', 'eu', 'gl', 'ca', 'fr', 'pt-BR', 'pt-PT'];

export const LANGUAGE_NAMES = {
  en: 'English',
  es: 'Español',
  eu: 'Euskara',
  gl: 'Galego',
  ca: 'Català',
  fr: 'Français',
  'pt-BR': 'Português (Brasil)',
  'pt-PT': 'Português (Portugal)',
};

/** Nombre del archivo publicado en public/ -> contenido por idioma. Las URLs ya declaradas en Play no cambian. */
export const LEGAL_PAGES = {
  'privacy.html': privacy,
  'borrar-datos.html': dataDeletion,
  'creditos.html': credits,
  '404.html': notFound,
};
