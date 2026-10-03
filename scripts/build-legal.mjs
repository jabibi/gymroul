// Genera las páginas multilingües (public/privacy.html, borrar-datos.html, creditos.html, 404.html y
// pruebas-cerradas.html) a
// partir del contenido por idioma de legal/*.mjs.
//
// Cada página contiene TODOS los idiomas, uno por <section data-lang>. public/legal.js muestra el que
// indica ?lang=, o el del navegador, y ofrece un selector. Sin JavaScript se ven todos, uno tras otro
// (inglés primero). Las direcciones públicas no cambian, así que las URLs ya enviadas a Google Play
// siguen valiendo.
//
//   node scripts/build-legal.mjs          (también lo ejecuta npm run build)

import { writeFileSync, mkdirSync } from 'node:fs';
import { LEGAL_PAGES, LANGUAGE_ORDER, LANGUAGE_NAMES, STEPS_PAGES } from '../legal/index.mjs';

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

/** Página de invitación a la prueba cerrada: tarjeta con pasos numerados. Bloques: lead, step (título, cuerpo HTML), thanks. */
function renderSteps(blocks) {
  let n = 0;
  const parts = blocks.map(([type, a, b]) => {
    if (type === 'h1') return `<header class="head"><h1>${a}</h1>`;
    if (type === 'lead') return `<p class="lead">${a}</p></header>\n<div class="steps">`;
    if (type === 'step') return `<div class="step"><div class="num">${++n}</div><div class="body"><h2>${a}</h2>${b}</div></div>`;
    if (type === 'thanks') return `</div>\n<footer class="thanks"><p>${a}</p></footer>`;
    throw new Error(`Bloque no válido en una página de pasos: ${type}`);
  });
  return `<div class="card">\n${parts.join('\n')}\n</div>`;
}

const STEPS_STYLE = `
        body { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; margin: 0; padding: 24px; background: #f8fafc; color: #1e293b; line-height: 1.5; -webkit-font-smoothing: antialiased; }
        .wrap { max-width: 42rem; margin: 0 auto; }
        nav.langs { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-bottom: 1.2em; }
        nav.langs button { font: inherit; font-size: 0.85em; padding: 4px 10px; border: 1px solid #cbd5e1; border-radius: 999px; background: #fff; color: #334155; cursor: pointer; }
        nav.langs button[aria-pressed="true"] { background: #2563eb; border-color: #2563eb; color: #fff; }
        .card { background: #fff; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,.05); }
        .head { text-align: center; margin-bottom: 32px; }
        h1 { font-size: 1.875rem; line-height: 1.2; font-weight: 700; color: #0f172a; margin: 0 0 12px; }
        .lead { font-size: 1.125rem; color: #475569; margin: 0; }
        .steps { display: flex; flex-direction: column; gap: 32px; }
        .step { display: flex; gap: 20px; }
        .num { flex: 0 0 48px; width: 48px; height: 48px; border-radius: 50%; background: #2563eb; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.25rem; box-shadow: 0 4px 6px rgba(0,0,0,.1); }
        .body { min-width: 0; }
        h2 { font-size: 1.25rem; font-weight: 600; color: #0f172a; margin: 0 0 8px; }
        .body p { color: #475569; margin: 0 0 16px; }
        .body p:last-child { margin-bottom: 0; }
        .body ul { color: #475569; margin: 0; padding-left: 1.25rem; }
        .body li + li { margin-top: 8px; }
        .btn { display: inline-block; font-weight: 600; padding: 10px 20px; border-radius: 8px; text-decoration: none; transition: background-color .15s; }
        .btn-light { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
        .btn-light:hover { background: #dbeafe; }
        .btn-primary { background: #2563eb; color: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.05); }
        .btn-primary:hover { background: #1d4ed8; }
        .inline-link { color: #2563eb; font-weight: 500; }
        .tip { font-size: 0.9em; background: #f1f5f9; border-radius: 8px; padding: 8px 12px; }
        .thanks { margin-top: 48px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-weight: 500; }
        .thanks p { margin: 0; }
        section[data-lang]:not([hidden]) + section[data-lang]:not([hidden]) { margin-top: 3em; padding-top: 2em; border-top: 2px solid #cbd5e1; }
        @media (max-width: 480px) { body { padding: 12px; } .card { padding: 20px; } .step { gap: 14px; } .num { flex-basis: 40px; width: 40px; height: 40px; font-size: 1.1rem; } h1 { font-size: 1.5rem; } }`;

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
        section[data-lang]:not([hidden]) + section[data-lang]:not([hidden]) { margin-top: 3em; padding-top: 2em; border-top: 2px solid #ddd; }`;

/** @param {string} file @param {Record<string, { title: string, blocks: any[] }>} page */
function renderPage(file, page) {
  const steps = STEPS_PAGES.includes(file);
  const sections = LANGUAGE_ORDER.map(code => {
    const doc = page[code];
    if (!doc) throw new Error(`${file}: falta el idioma ${code}`);
    const content = STEPS_PAGES.includes(file) ? renderSteps(doc.blocks) : doc.blocks.map(renderBlock).join('\n');
    return `<section lang="${code}" data-lang="${code}" data-name="${esc(LANGUAGE_NAMES[code])}" data-title="${esc(doc.title)}">\n${content}\n</section>`;
  }).join('\n\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(page.en.title)}</title>
    <style>${steps ? STEPS_STYLE : STYLE}
    </style>
    <script src="legal.js" defer></script>
</head>
<body>
${steps ? '<div class="wrap">\n' : ''}<nav class="langs" id="langNav" aria-label="Language"></nav>

${sections}${steps ? '\n</div>' : ''}
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
