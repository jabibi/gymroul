// Genera store/notas-de-la-version.txt: las novedades de la versión de TODOS los idiomas en el formato único que
// pide Google Play Console al crear una versión (una etiqueta por idioma, con el código de Play):
//
//   <en-US>
//   texto...
//   </en-US>
//   <ca>
//   ...
//
// Los textos salen de store/listing.mjs (campo notes). Play admite hasta 500 caracteres por idioma.
//
//   npm run release-notes     (también lo ejecuta npm run store)

import { writeFileSync } from 'node:fs';
import { STORE_LOCALES, LISTINGS } from '../store/listing.mjs';

/** Orden de la plantilla de Play: el idioma predeterminado primero y el resto por código. */
export const RELEASE_NOTES_ORDER = ['en-US', 'ar', 'ca', 'de-DE', 'es-ES', 'eu-ES', 'fr-FR', 'gl-ES', 'hi-IN', 'it-IT', 'ja-JP', 'nl-NL', 'pl-PL', 'pt-BR', 'pt-PT', 'tr-TR'];

export function buildReleaseNotes() {
  const byPlay = Object.fromEntries(STORE_LOCALES.map(l => [l.play, l]));
  return RELEASE_NOTES_ORDER.map(play => {
    const locale = byPlay[play];
    if (!locale) throw new Error(`El idioma ${play} del orden de Play no está en STORE_LOCALES`);
    return `<${play}>\n${LISTINGS[locale.app].notes}\n</${play}>`;
  }).join('\n') + '\n';
}

if (import.meta.url === `file://${process.argv[1]}`) {
  writeFileSync('store/notas-de-la-version.txt', buildReleaseNotes());
  console.log('  ✓ store/notas-de-la-version.txt');
}
