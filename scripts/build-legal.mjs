// Genera las páginas legales (public/privacy.html, borrar-datos.html, creditos.html y 404.html) a
// partir del contenido por idioma de legal/*.mjs.
//
// Cada página contiene TODOS los idiomas, uno por <section data-lang>. public/legal.js muestra el que
// indica ?lang=, o el del navegador, y ofrece un selector. Sin JavaScript se ven todos, uno tras otro
// (inglés primero). Las direcciones públicas no cambian, así que las URLs ya enviadas a Google Play
// siguen valiendo.
//
//   node scripts/build-legal.mjs          (también lo ejecuta npm run build)

import { writeFileSync, mkdirSync } from 'node:fs';
import { LEGAL_PAGES, LANGUAGE_ORDER, LANGUAGE_NAMES } from '../legal/index.mjs';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Un bloque del contenido; los textos admiten HTML en línea (enlaces, strong, code) escrito por nosotros. */
function renderBlock([type, a, b]) {
  switch (type) {
    case 'h1': return `<h1>${a}</h1>`;
    case 'h2': return `<h2>${a}</h2>`;
    case 'h3': return `<h3>${a}</h3>`;
    case 'p': return `<p>${a}</p>`;
    case 'ul': return `<ul>${a.map(li => `<li>${li}</li>`).join('')}</ul>`;
    case 'ol': return `<ol>${a.map(li => `<li>${li}</li>`).join('')}</ol>`;
    case 'table':
      return `<table><thead><tr>${a.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${b.map(row => `<tr>${row.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    default: throw new Error(`Tipo de bloque desconocido: ${type}`);
  }
}

const STYLE = `
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #333; }
        h1 { color: #111; }
        h2 { margin-top: 2em; color: #111; }
        table { border-collapse: collapse; width: 100%; font-size: 0.95em; }
        th, td { border: 1px solid #ccc; padding: 6px 10px; text-align: left; vertical-align: top; }
        th { background: #f3f3f3; }
        nav.langs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.5em; }
        nav.langs button { font: inherit; font-size: 0.85em; padding: 4px 10px; border: 1px solid #bbb; border-radius: 999px; background: #fff; color: #333; cursor: pointer; }
        nav.langs button[aria-pressed="true"] { background: #15803d; border-color: #15803d; color: #fff; }
        section[data-lang] + section[data-lang] { margin-top: 3em; padding-top: 2em; border-top: 2px solid #ddd; }`;

/** @param {string} file @param {Record<string, { title: string, blocks: any[] }>} page */
function renderPage(file, page) {
  const sections = LANGUAGE_ORDER.map(code => {
    const doc = page[code];
    if (!doc) throw new Error(`${file}: falta el idioma ${code}`);
    return `<section lang="${code}" data-lang="${code}" data-name="${esc(LANGUAGE_NAMES[code])}" data-title="${esc(doc.title)}">\n${doc.blocks.map(renderBlock).join('\n')}\n</section>`;
  }).join('\n\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(page.en.title)}</title>
    <style>${STYLE}
    </style>
    <script src="legal.js" defer></script>
</head>
<body>
<nav class="langs" id="langNav" aria-label="Language"></nav>

${sections}
</body>
</html>
`;
}

/** Devuelve { archivo: contenido } sin escribir nada (lo usan los tests para comprobar que están al día). */
export function buildLegalFiles() {
  return Object.fromEntries(Object.entries(LEGAL_PAGES).map(([file, page]) => [file, renderPage(file, page)]));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  mkdirSync('public', { recursive: true });
  for (const [file, html] of Object.entries(buildLegalFiles())) {
    writeFileSync(`public/${file}`, html);
    console.log('  ✓ public/' + file);
  }
}
