// Comprueba, con la app real en Chrome sin interfaz, que ningún texto se corta ni se pisa en cada pantalla y en
// cada idioma (sobre todo en los de derecha a izquierda, donde cambian el orden y las alturas de línea).
//
// Para cada idioma y cada tamaño de móvil recorre: ruleta, resultado, historial, configuración, selector de
// iconos, compromiso de privacidad y visor de documentos, y en cada pantalla busca:
//   - texto que sobresale de su contenedor recortado (overflow oculto, p. ej. «truncate» o una caja de altura fija)
//   - texto que se sale de la pantalla o genera desplazamiento horizontal
//   - cajas de texto de elementos distintos que se solapan
//
//   npm run check:layout                      todos los idiomas
//   npm run check:layout -- --lang=ar,de      solo algunos (códigos de la app)
//   npm run check:layout -- --shots=dir       además guarda una captura de cada pantalla en ese directorio
//   CHROME_PATH=/ruta/a/chrome npm run check:layout   si Chrome no está en /usr/bin/google-chrome
//
// Sale con código 1 si encuentra algún problema. Requiere haber compilado antes (npm run build).

import { existsSync, mkdirSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
import { preview } from 'vite';
import { LANGUAGES } from '../src/i18n/index.js';

const CHROME = process.env.CHROME_PATH || '/usr/bin/google-chrome';
const PORT = 4183;
const BASE = `http://127.0.0.1:${PORT}/`;
const VIEWPORTS = [{ width: 320, height: 568 }, { width: 360, height: 640 }, { width: 412, height: 915 }];

const arg = name => process.argv.find(a => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const only = arg('lang')?.split(',');
const shotsDir = arg('shots');
const languages = LANGUAGES.map(l => l.code).filter(code => !only || only.includes(code));
if (languages.length === 0) throw new Error(`Ningún idioma coincide con --lang=${arg('lang')}`);
if (!existsSync('www/index.html')) throw new Error('Falta www/: ejecuta "npm run build" antes.');
if (!existsSync(CHROME)) throw new Error(`No encuentro Chrome en ${CHROME}. Indica la ruta con CHROME_PATH.`);
if (shotsDir) mkdirSync(shotsDir, { recursive: true });

const wait = ms => new Promise(r => setTimeout(r, ms));

/** Se ejecuta dentro de la página: devuelve la lista de problemas de la pantalla visible. */
function inspectPage() {
  const problems = [];
  const label = el => {
    const id = el.id ? `#${el.id}` : '';
    const cls = typeof el.className === 'string' ? el.className.split(/\s+/).filter(Boolean).slice(0, 2).map(c => `.${c}`).join('') : '';
    return `${el.tagName.toLowerCase()}${id}${id ? '' : cls}`;
  };
  const visible = el => {
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
      if (n.hasAttribute('inert') && !n.closest('#commitmentModal, #documentModal')) return false;
    }
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  // Cajas de texto reales (una por línea) de cada nodo de texto visible, con el elemento al que pertenecen
  const boxes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent.trim();
    const el = node.parentElement;
    if (!text || !el || ['SCRIPT', 'STYLE', 'OPTION'].includes(el.tagName) || !visible(el)) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    for (const r of range.getClientRects()) {
      if (r.width <= 1 || r.height <= 1) continue;
      // Si lo que hay encima de la caja es otra cosa (un modal abierto...), no se ve: se ignora
      const top = document.elementFromPoint(Math.min(Math.max((r.left + r.right) / 2, 0), innerWidth - 1), Math.min(Math.max((r.top + r.bottom) / 2, 0), innerHeight - 1));
      if (top && !(el.contains(top) || top.contains(el))) continue;
      boxes.push({ el, text, left: r.left, right: r.right, top: r.top, bottom: r.bottom });
    }
  }

  // 1) Texto recortado por un ancestro con overflow oculto (o por la propia pantalla)
  const clipOf = el => {
    const clips = [];
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const cs = getComputedStyle(n);
      const clipsX = ['hidden', 'clip', 'auto', 'scroll'].includes(cs.overflowX);
      const clipsY = ['hidden', 'clip', 'auto', 'scroll'].includes(cs.overflowY);
      if (clipsX || clipsY) clips.push({ n, r: n.getBoundingClientRect(), clipsX, clipsY, scrolls: ['auto', 'scroll'].includes(cs.overflowY) });
    }
    return clips;
  };
  const seen = new Set();
  for (const b of boxes) {
    for (const c of clipOf(b.el)) {
      if (c.n === b.el && c.n.tagName === 'SELECT') continue;
      const outX = c.clipsX && (b.left < c.r.left - 1 || b.right > c.r.right + 1);
      const outY = c.clipsY && !c.scrolls && (b.top < c.r.top - 1 || b.bottom > c.r.bottom + 1);
      // Un contenedor que se desplaza (auto/scroll) puede tener texto fuera de la vista: no es un corte
      if ((outX && !c.scrolls) || outY) {
        const key = `${label(b.el)}|${label(c.n)}|${b.text}`;
        if (!seen.has(key)) { seen.add(key); problems.push(`recortado: «${b.text.slice(0, 40)}» (${label(b.el)}) sobresale de ${label(c.n)}`); }
      }
    }
  }
  // Textos con puntos suspensivos (truncate) que no caben enteros
  for (const el of document.querySelectorAll('*')) {
    if (!visible(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 1 && el.textContent.trim()) {
      problems.push(`truncado con «…»: «${el.textContent.trim().slice(0, 40)}» (${label(el)})`);
    }
  }

  // 2) Texto fuera de la pantalla o desplazamiento horizontal de la página
  const vw = document.documentElement.clientWidth;
  for (const b of boxes) {
    if (b.left < -1 || b.right > vw + 1) {
      const scrolled = clipOf(b.el).some(c => c.scrolls && c.clipsX);
      if (!scrolled) problems.push(`fuera de la pantalla: «${b.text.slice(0, 40)}» (${label(b.el)})`);
    }
  }
  if (document.documentElement.scrollWidth > vw + 1) {
    // Los elementos que se salen por el lado de la página, para localizar el culpable
    const culprits = [...document.querySelectorAll('body *')].filter(e => visible(e) && (e.getBoundingClientRect().right > vw + 1 || e.getBoundingClientRect().left < -1))
      .filter(e => ![...e.children].some(c => c.getBoundingClientRect().right > vw + 1)).slice(0, 3).map(label).join(', ');
    problems.push(`la página se desplaza en horizontal (${document.documentElement.scrollWidth} > ${vw}) por: ${culprits}`);
  }

  // 3) Cajas de texto de elementos distintos que se solapan
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      // Las cajas de línea llegan a pisarse unos píxeles por la altura de línea: solo se avisa si es claro
      if (w > 3 && h > Math.min(a.bottom - a.top, b.bottom - b.top) * 0.4) {
        // Etiquetas de la ruleta: se dibujan en el canvas, no son texto del DOM
        problems.push(`solapados: «${a.text.slice(0, 30)}» y «${b.text.slice(0, 30)}»`);
      }
    }
  }
  return problems;
}

const server = await preview({ preview: { port: PORT, host: '127.0.0.1', open: false }, logLevel: 'silent' });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
let total = 0;

/** @param {string} lang @param {{ width: number, height: number }} vp */
async function openApp(lang, vp) {
  const page = await browser.newPage();
  await page.setViewport({ ...vp, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await page.setRequestInterception(true);
  page.on('request', req => (req.url().startsWith(BASE) || req.url().startsWith('data:') ? req.continue() : req.abort()));
  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.goto(`${BASE}?lang=${lang}`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await wait(400);
  return page;
}

async function check(page, lang, vp, screen) {
  await wait(300);
  const problems = await page.evaluate(inspectPage);
  if (shotsDir) await page.screenshot({ path: `${shotsDir}/${lang}-${vp.width}-${screen}.png` });
  total += problems.length;
  for (const p of [...new Set(problems)]) console.log(`  ✗ ${lang} ${vp.width}x${vp.height} ${screen}: ${p}`);
}

try {
  for (const lang of languages) {
    for (const vp of VIEWPORTS) {
      const page = await openApp(lang, vp);
      await check(page, lang, vp, '01-ruleta');
      await page.click('#spinBtn');
      await page.waitForFunction(() => !document.getElementById('resultModal').classList.contains('pointer-events-none'), { timeout: 30000 });
      await wait(700);
      await check(page, lang, vp, '02-resultado');
      await page.click('[data-action=close-result][data-arg=done]');
      await wait(500);
      for (let i = 0; i < 3; i++) {
        await page.click('#spinBtn');
        await page.waitForFunction(() => !document.getElementById('resultModal').classList.contains('pointer-events-none'), { timeout: 30000 });
        await wait(600);
        await page.click('[data-action=close-result][data-arg=done]');
        await wait(500);
      }
      await page.click('[data-action=open-history]');
      await wait(600);
      await check(page, lang, vp, '03-historial');
      await page.click('[data-action=close-history]');
      await wait(500);
      await page.click('[data-action=open-config]');
      await wait(600);
      await check(page, lang, vp, '04-configuracion');
      await page.evaluate(() => document.getElementById('exsCheckboxes').scrollIntoView({ block: 'start' }));
      await check(page, lang, vp, '05-ejercicios');
      await page.click('#iconPickerBtn');
      await wait(300);
      await page.evaluate(() => document.getElementById('iconPicker').scrollIntoView({ block: 'center' }));
      await check(page, lang, vp, '06-selector-de-iconos');
      await page.type('#iconSearch', 'zzzzzz');
      await wait(300);
      await check(page, lang, vp, '07-sin-iconos');
      await page.close();

      // Compromiso de privacidad (desde Configuración) y, encima, la política completa
      const privacy = await openApp(lang, vp);
      await privacy.click('[data-action=open-config]');
      await wait(500);
      await privacy.evaluate(() => document.querySelector('#configModal [data-action=open-commitment]').click());
      await wait(300);
      await check(privacy, lang, vp, '08-compromiso-de-privacidad');
      await privacy.click('#commitmentModal [data-action=open-privacy]');
      await wait(600);
      await check(privacy, lang, vp, '09-politica-de-privacidad');
      await privacy.close();
    }
    console.log(`${lang}: revisado`);
  }
} finally {
  await browser.close();
  await new Promise(r => server.httpServer.close(r));
}

console.log(total === 0 ? '\n✓ Ningún texto cortado ni solapado.' : `\n✗ ${total} problema(s).`);
process.exit(total === 0 ? 0 : 1);
