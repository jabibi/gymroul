// Huella de lo que decide el aspecto de las capturas de Play: el marcado, el código, los estilos, los textos de la app
// y el script que hace las capturas. `npm run store` la guarda en store/.ui-hash; `npm run store:check` la compara
// con la actual y avisa si la interfaz ha cambiado desde la última vez que se generaron las capturas.
//
// Se ignora lo que no cambia el aspecto: los comentarios y el formato del JavaScript (se normaliza con el minificador de Vite,
// sin renombrar nada ni tocar los textos) y los comentarios y el espacio en blanco del HTML y del CSS (que al pintar se colapsa). Así retocar un comentario no obliga a repetir
// las capturas (unos 30 minutos). Cualquier cambio de código, de textos o de estilos sí cambia la huella.
//
//   node scripts/store-ui-hash.mjs           compara (sale con error si las capturas están viejas)
//   node scripts/store-ui-hash.mjs --write   guarda la huella actual (no con STORE_ONLY: generación parcial)

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { minifySync } from 'vite';

export const HASH_FILE = 'store/.ui-hash';
const INPUTS = ['index.html', 'src', 'tailwind.config.js', 'public/logo-mark.svg', 'public/logo-light.svg', 'public/logo-classic.svg', 'scripts/build-store-assets.mjs'];

/** @param {string} path @returns {string[]} */
const files = path => (statSync(path).isDirectory() ? readdirSync(path).sort().flatMap(f => files(join(path, f))) : [path]);

/** El contenido de un archivo sin lo que no afecta al aspecto: comentarios y, en JavaScript, el formato. @param {string} file @param {string} text */
export function normalize(file, text) {
  if (/\.m?js$/.test(file)) return minifySync(file, text, { mangle: false, compress: false }).code;
  if (file.endsWith('.css')) return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
  if (file.endsWith('.html')) return text.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim();
  return text;
}

/** Huella de los archivos que influyen en las capturas (se ignoran los saltos de línea de Windows y los comentarios). */
export function uiHash() {
  const hash = createHash('sha256');
  for (const file of INPUTS.flatMap(files)) hash.update(file).update(normalize(file, readFileSync(file, 'utf8').replace(/\r\n/g, '\n')));
  return hash.digest('hex');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const current = uiHash();
  if (process.argv.includes('--write')) {
    if (process.env.STORE_ONLY) {
      // Con solo algunos idiomas regenerados, el resto de capturas sigue siendo de la interfaz anterior
      console.log('  · Generación parcial (STORE_ONLY): no se guarda la huella; ejecuta npm run store completo antes de subir a Play.');
      process.exit(0);
    }
    writeFileSync(HASH_FILE, current + '\n');
    console.log('  ✓', HASH_FILE);
  } else {
    const saved = existsSync(HASH_FILE) ? readFileSync(HASH_FILE, 'utf8').trim() : '';
    if (saved === current) {
      console.log('✓ Las capturas de store/ corresponden a la interfaz actual.');
    } else {
      console.error('✗ La interfaz ha cambiado desde que se generaron las capturas de store/: ejecuta npm run store antes de subirlas a Play.');
      process.exit(1);
    }
  }
}
