// Huella de lo que decide el aspecto de las capturas de Play: el marcado, el código, los estilos, los textos de la app
// y el script que hace las capturas. `npm run store` la guarda en store/.ui-hash; `npm run store:check` la compara
// con la actual y avisa si la interfaz ha cambiado desde la última vez que se generaron las capturas.
//
//   node scripts/store-ui-hash.mjs           compara (sale con error si las capturas están viejas)
//   node scripts/store-ui-hash.mjs --write   guarda la huella actual

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const HASH_FILE = 'store/.ui-hash';
const INPUTS = ['index.html', 'src', 'tailwind.config.js', 'public/logo-mark.svg', 'public/logo-classic.svg', 'scripts/build-store-assets.mjs'];

/** @param {string} path @returns {string[]} */
const files = path => (statSync(path).isDirectory() ? readdirSync(path).sort().flatMap(f => files(join(path, f))) : [path]);

/** Huella de los archivos que influyen en las capturas (se ignoran los saltos de línea de Windows). */
export function uiHash() {
  const hash = createHash('sha256');
  for (const file of INPUTS.flatMap(files)) hash.update(file).update(readFileSync(file, 'utf8').replace(/\r\n/g, '\n'));
  return hash.digest('hex');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const current = uiHash();
  if (process.argv.includes('--write')) {
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
