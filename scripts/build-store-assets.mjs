// Genera la ficha de Google Play de cada idioma en store/<idioma-de-Play>/:
//   grafico-de-funciones-1024x500.png   Gráfico de funciones con el texto traducido y la ruleta real
//   capturas-telefono/01..07-*.png      Capturas 1080x1920 (9:16) de la app real, en ese idioma
//   textos/*.txt                        Título, descripción corta y completa y novedades (de store/listing.mjs)
// y store/icon.png (512x512), igual para todos los idiomas.
//
// Las capturas salen de la app compilada (www/), renderizada con Chrome sin interfaz y sin red
// (no se contacta con ningún servidor).
//
//   npm run store                              compila y genera todos los idiomas
//   npm run store -- --only es-ES,en-US        solo algunos idiomas (códigos de Play)
//   CHROME_PATH=/ruta/a/chrome npm run store   si Chrome no está en /usr/bin/google-chrome

import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
import { preview } from 'vite';
import sharp from 'sharp';
import { STORE_LOCALES, LISTINGS, LIMITS } from '../store/listing.mjs';
import { isRtl } from '../src/i18n/index.js';

const CHROME = process.env.CHROME_PATH || '/usr/bin/google-chrome';
const PORT = 4179;
const BASE = `http://127.0.0.1:${PORT}/`;
const OUT = 'store';

const onlyArg = process.argv.find(a => a.startsWith('--only='))?.slice(7) ?? (process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : '');
const only = onlyArg ? onlyArg.split(',') : null;
const locales = STORE_LOCALES.filter(l => !only || only.includes(l.play));
if (locales.length === 0) throw new Error(`Ningún idioma coincide con --only=${onlyArg}`);

if (!existsSync('www/index.html')) throw new Error('Falta www/: ejecuta "npm run build" antes (o usa "npm run store").');
if (!existsSync(CHROME)) throw new Error(`No encuentro Chrome en ${CHROME}. Indica la ruta con CHROME_PATH.`);

const wait = ms => new Promise(r => setTimeout(r, ms));
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Play pide PNG sin canal alfa en capturas y gráfico de funciones
const savePng = async (input, path) => {
  await sharp(input).flatten({ background: '#020617' }).removeAlpha().png({ compressionLevel: 9 }).toFile(path);
  console.log('  ✓', path);
};

const server = await preview({ preview: { port: PORT, host: '127.0.0.1', open: false }, logLevel: 'silent' });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });

/** Abre la app en un móvil de 360x640 con factor 3 => capturas de 1080x1920, en el idioma pedido. */
async function openApp(appLang) {
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  // Solo se permite la propia app: no se contacta con ningún otro servidor
  await page.setRequestInterception(true);
  page.on('request', req => (req.url().startsWith(BASE) || req.url().startsWith('data:') ? req.continue() : req.abort()));
  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5; // giros reproducibles
  });
  await page.goto(`${BASE}?lang=${appLang}`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await wait(500);
  return page;
}

/** Hace un giro y espera a que aparezca el modal de resultado. */
async function spinAndWait(page) {
  await page.click('#spinBtn');
  await page.waitForFunction(() => !document.getElementById('resultModal').classList.contains('pointer-events-none'), { timeout: 30000 });
  await wait(700);
}

/** Captura de la ruleta (con su puntero y su sombra) sobre fondo transparente, para el gráfico de funciones. */
async function captureWheel(page) {
  const box = await page.evaluate(() => {
    const r = document.getElementById('wheelCanvas').parentElement.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  const PAD = { side: 16, top: 30, bottom: 70 };
  // La página tiene fondo oscuro propio: se vuelve transparente para que la ruleta se integre en el gráfico, y se
  // ocultan los elementos vecinos que el margen de la captura arrastraría (indicador, botón y cabecera).
  // Se asignan estilos a los elementos: una hoja <style> inyectada la bloquea la CSP de la app.
  await page.evaluate(() => {
    for (const el of [document.documentElement, document.body]) el.style.setProperty('background', 'transparent', 'important');
    for (const sel of ['#liveIndicator', '#spinBtn', 'header']) {
      // Tienen transition-all: sin quitarla, el cambio de visibilidad tarda y la captura llega antes
      const el = document.querySelector(sel);
      el?.style.setProperty('transition', 'none', 'important');
      el?.style.setProperty('visibility', 'hidden', 'important');
    }
  });
  await wait(300);
  const png = await page.screenshot({
    omitBackground: true,
    clip: { x: box.x - PAD.side, y: box.y - PAD.top, width: box.width + PAD.side * 2, height: box.height + PAD.top + PAD.bottom },
  });
  return { png, box, PAD };
}

// Mismo icono que el botón de la app (fa-rotate de Font Awesome)
const ROTATE_ICON = readFileSync('node_modules/@fortawesome/fontawesome-free/svgs/solid/rotate.svg', 'utf8').replace(/<!--.*?-->/gs, '');

/** Gráfico de funciones 1024x500: texto a la izquierda y la ruleta entera a la derecha. */
async function buildBanner(listing, wheel, path, rtl = false) {
  const font = w => readFileSync(`node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-${w}-normal.woff2`).toString('base64');
  const logo = `data:image/svg+xml;base64,${readFileSync('public/logo-mark.svg').toString('base64')}`;
  const wheelUri = `data:image/png;base64,${wheel.png.toString('base64')}`;
  const green = '16 185 129';
  // Play recorta y redondea los bordes del gráfico: se deja un margen lateral de 96 px para que no tape contenido
  const SIDE = 96;
  const WHEEL_SIZE = 360;
  const COPY_WIDTH = 1024 - SIDE * 2 - WHEEL_SIZE - 32;
  const K = WHEEL_SIZE / wheel.box.width; // factor de escala de la captura al gráfico
  // En un idioma de derecha a izquierda el gráfico se espeja: el texto a la derecha y la ruleta a la izquierda
  const WHEEL_LEFT = rtl ? SIDE : 1024 - SIDE - WHEEL_SIZE;
  const START = rtl ? 'right' : 'left';
  const WHEEL_TOP = Math.round((500 - WHEEL_SIZE) / 2) + 12;
  const b = listing.banner;
  const html = `<!doctype html><html lang="${rtl ? 'ar' : 'en'}" dir="${rtl ? 'rtl' : 'ltr'}"><meta charset="utf-8"><style>
    @font-face{font-family:J;font-weight:700;src:url(data:font/woff2;base64,${font(700)}) format('woff2')}
    @font-face{font-family:J;font-weight:800;src:url(data:font/woff2;base64,${font(800)}) format('woff2')}
    *{margin:0;box-sizing:border-box}
    body{width:1024px;height:500px;overflow:hidden;font-family:J,'Noto Sans Arabic','Noto Sans JP','Hiragino Sans','Yu Gothic','IPAGothic',sans-serif;color:#fff;position:relative;
      background:radial-gradient(circle at ${rtl ? 24 : 76}% 52%, rgb(${green} / .22), transparent 55%), linear-gradient(135deg,#0B1220,#020617)}
    .brand{position:absolute;${START}:${SIDE}px;top:56px;display:flex;align-items:center;gap:16px}
    .brand img{width:64px;height:64px}
    .brand b{font-weight:800;font-size:34px;letter-spacing:-.5px;line-height:1}
    .brand b span{color:rgb(${green})}
    .copy{position:absolute;${START}:${SIDE}px;top:168px;width:${COPY_WIDTH}px}
    h1{font-weight:800;font-size:56px;line-height:1.08;letter-spacing:-1.5px}
    h1 span{display:block;white-space:nowrap}
    h1 span + span{color:rgb(${green})}
    p{margin-top:26px;font-weight:700;font-size:21px;line-height:1.3;color:#cbd5e1}
    .btn{position:absolute;${START}:${SIDE}px;top:392px;padding:16px 32px;border-radius:16px;font-weight:800;font-size:22px;color:#020617;
      display:flex;align-items:center;gap:12px;
      background:linear-gradient(90deg,rgb(5 150 105),rgb(16 185 129),rgb(52 211 153));box-shadow:0 20px 25px -5px rgb(${green} / .25), 0 8px 10px -6px rgb(${green} / .25)}
    .btn svg{width:22px;height:22px;fill:currentColor}
    .wheel{position:absolute;left:${WHEEL_LEFT - wheel.PAD.side * K}px;top:${WHEEL_TOP - wheel.PAD.top * K}px;width:${(wheel.box.width + wheel.PAD.side * 2) * K}px;height:auto}
    ${rtl ? '*{letter-spacing:normal!important} h1{line-height:1.3} h1 span{padding-block:2px}' : ''}
  </style>
  <div class="brand"><img src="${logo}"><div><b>Gym<span>Roulette</span></b></div></div>
  <div class="copy"><h1><span>${esc(b.line1)}</span><span>${esc(b.line2)}</span></h1>
  <p>${esc(b.tagline)}</p></div>
  <div class="btn">${ROTATE_ICON}<span>${esc(b.button)}</span></div>
  <img class="wheel" src="${wheelUri}">`;
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 500, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  // Cada línea del titular va en una sola línea: si algún idioma no cabe en el ancho del texto, se reduce la letra
  await page.evaluate(maxWidth => {
    const h1 = document.querySelector('h1');
    const lines = [...h1.children];
    let size = 56;
    while (size > 36 && lines.some(l => l.scrollWidth > maxWidth)) h1.style.fontSize = `${--size}px`;
  }, COPY_WIDTH);
  await wait(300);
  await savePng(await page.screenshot(), path);
  await page.close();
}

function writeTexts(listing, dir) {
  mkdirSync(dir, { recursive: true });
  const files = { 'titulo.txt': listing.title, 'descripcion-corta.txt': listing.short, 'descripcion-completa.txt': listing.full, 'notas-de-la-version.txt': listing.notes };
  for (const [name, text] of Object.entries(files)) writeFileSync(`${dir}/${name}`, text + '\n');
  console.log('  ✓', `${dir}/*.txt`);
}

/** store/README.md: dónde está cada archivo y qué campo de Play Console rellena (con las longitudes de los textos). */
function writeReadme() {
  const rows = STORE_LOCALES.map(loc => {
    const l = LISTINGS[loc.app];
    return `| \`${loc.play}\` | ${loc.name} | ${l.short.length}/${LIMITS.short} | ${l.full.length}/${LIMITS.full} | ${l.notes.length}/${LIMITS.notes} |`;
  }).join('\n');
  const md = `# Recursos de la ficha de Google Play

Una carpeta por idioma de Play Console, con **título, descripción breve, descripción completa, novedades de la versión,
gráfico de funciones y capturas de teléfono** de ese idioma. El icono es el mismo para todos. Este archivo lo genera
\`npm run store\`; el texto de cada ficha está en [\`listing.mjs\`](listing.mjs).

\`\`\`
store/
├── icon.png                                 Icono de la aplicación, 512 x 512 (común a todos los idiomas)
├── notas-de-la-version.txt                  Novedades de TODOS los idiomas en el formato único que pide Play
├── importar-traducciones.csv                Título y descripciones de TODOS los idiomas para «Importar un archivo» (npm run store)
├── datos-de-la-ficha.md                     Enlaces, clasificación y Seguridad de los datos
├── listing.mjs                              Fuente de los textos de cada idioma
└── <idioma de Play>/                        ${STORE_LOCALES.map(l => l.play).join(', ')}
    ├── grafico-de-funciones-1024x500.png    Gráfico de funciones con el texto traducido
    ├── capturas-telefono/                   Siete capturas 1080 x 1920 (9:16) con la app en ese idioma
    └── textos/
        ├── titulo.txt                       Nombre de la aplicación
        ├── descripcion-corta.txt            Descripción breve
        ├── descripcion-completa.txt         Descripción completa
        └── notas-de-la-version.txt          Novedades (las dos últimas versiones)
\`\`\`

## Idiomas y longitud de los textos
| Carpeta | Idioma en Play Console | Descripción breve | Descripción completa | Novedades |
|---|---|---|---|---|
${rows}

## Dónde sube cada archivo en Play Console
En **Presencia en Google Play Store → Fichas de Play Store**, elige el idioma arriba (*Gestionar idiomas* para añadirlos) y rellena:

| Archivo | Campo de la consola |
|---|---|
| \`icon.png\` | Recursos visuales comunes → Icono de la aplicación |
| \`<idioma>/textos/titulo.txt\` | Nombre de la aplicación |
| \`<idioma>/textos/descripcion-corta.txt\` | Descripción breve |
| \`<idioma>/textos/descripcion-completa.txt\` | Descripción completa |
| \`<idioma>/grafico-de-funciones-1024x500.png\` | Gráfico de funciones |
| \`<idioma>/capturas-telefono/*.png\` | Capturas de pantalla de teléfonos (entre 2 y 8) |
| \`notas-de-la-version.txt\` | Novedades de las dos últimas versiones (la actual y la anterior, cada una con su encabezado): se pega **entero** en el cuadro de novedades al crear la versión (un bloque por idioma, con la etiqueta del código de Play) |

Recomendación: deja **en-US** como idioma predeterminado, porque es el que ve quien tenga un idioma que no hayas añadido.

## Requisitos de Google Play que cumplen
- Icono: PNG de 32 bits con canal alfa, 512 x 512 px, menos de 1 MB.
- Gráfico de funciones: PNG sin canal alfa, 1024 x 500 px.
- Capturas de teléfono: PNG sin canal alfa, relación 9:16 y lados entre 320 y 3840 px, menos de 8 MB cada una.
- Título hasta 30 caracteres, descripción breve hasta 80, completa hasta 4000 y novedades hasta 500 (lo comprueba \`npm test\`).

## Regenerar
\`\`\`bash
npm run store                                  # todos los idiomas
npm run store -- --only=es-ES,en-US            # solo algunos (códigos de Play)
\`\`\`
Compila la app y la renderiza con Chrome sin interfaz y sin red: no se contacta con ningún servidor. Si Chrome no está en
\`/usr/bin/google-chrome\`, indica su ruta con \`CHROME_PATH=/ruta/a/chrome npm run store\`. Las capturas son de la app real y salen en
el idioma de cada ficha; si cambias la interfaz o los textos, vuelve a ejecutarlo.

## Revisión de las traducciones
Las traducciones al euskera, gallego, catalán y árabe (este último, además, en sentido de lectura de derecha a izquierda), y los textos legales de todos los idiomas, conviene que los revise una persona
nativa antes de publicar. Las páginas de privacidad no son asesoramiento jurídico.
`;
  writeFileSync(`${OUT}/README.md`, md);
  console.log('  ✓', `${OUT}/README.md`);
}

try {
  mkdirSync(OUT, { recursive: true });
  // Icono de la aplicación: 512x512 con canal alfa (Play lo exige de 32 bits); el mismo para todos los idiomas
  await sharp('assets/icon-only.png').resize(512, 512).ensureAlpha().png({ compressionLevel: 9 }).toFile(`${OUT}/icon.png`);
  console.log('  ✓', `${OUT}/icon.png`);
  writeReadme();

  for (const loc of locales) {
    console.log(`\n${loc.play} (${loc.name})`);
    const dir = `${OUT}/${loc.play}`;
    mkdirSync(`${dir}/capturas-telefono`, { recursive: true });
    const listing = LISTINGS[loc.app];
    const shot = async (page, name) => savePng(await page.screenshot(), `${dir}/capturas-telefono/${name}.png`);

    const page = await openApp(loc.app);
    await shot(page, '01-ruleta');
    const wheel = await captureWheel(page);
    await page.reload({ waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await wait(500);

    await spinAndWait(page);
    await shot(page, '02-resultado');
    await page.click('[data-action=close-result][data-arg=done]');
    await wait(500);

    // Historial con varios retos completados
    for (let i = 0; i < 3; i++) {
      await spinAndWait(page);
      await page.click('[data-action=close-result][data-arg=done]');
      await wait(500);
    }
    await page.click('[data-action=open-history]');
    await wait(700);
    await shot(page, '03-historial');
    await page.click('[data-action=close-history]');
    await wait(600);

    // Configuración: ejercicios con sus iconos
    await page.click('[data-action=open-settings]');
    await wait(700);
    await page.click('#settingsMenu [data-arg=wheel]');
    await wait(400);
    await page.evaluate(() => document.getElementById('exsCheckboxes').scrollIntoView({ block: 'start' }));
    await wait(400);
    await shot(page, '04-configuracion');

    // Selector de iconos y búsqueda
    await page.click('#addFormBtn');
    await wait(300);
    await page.click('#iconPickerBtn');
    await wait(300);
    await page.evaluate(() => document.getElementById('iconPicker').scrollIntoView({ block: 'center' }));
    await wait(400);
    await shot(page, '05-selector-de-iconos');
    await page.type('#iconSearch', 'karate');
    await wait(400);
    await page.evaluate(() => document.getElementById('iconPicker').scrollIntoView({ block: 'center' }));
    await wait(400);
    await shot(page, '06-busqueda-de-iconos');
    await page.close();

    // Compromiso de privacidad: resumen de lo que la app no hace con tus datos
    const commitment = await openApp(loc.app);
    await commitment.click('[data-action=open-settings]');
    await wait(700);
    await commitment.evaluate(() => document.querySelector('#configModal [data-action=open-commitment]').click());
    await wait(500);
    await shot(commitment, '07-compromiso-de-privacidad');
    await commitment.close();

    await buildBanner(listing, wheel, `${dir}/grafico-de-funciones-1024x500.png`, isRtl(loc.app));
    writeTexts(listing, `${dir}/textos`);
  }
} finally {
  await browser.close();
  await new Promise(r => server.httpServer.close(r));
}
