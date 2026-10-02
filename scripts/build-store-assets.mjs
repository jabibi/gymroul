// Genera los gráficos de la ficha de Google Play en store/:
//   store/graficos/icon.png                       Icono de la aplicación (512x512)
//   store/graficos/grafico-de-funciones-1024x500.png   Gráfico de funciones (1024x500)
//   store/capturas-telefono/01..06-*.png               Capturas reales de la app (1080x1920, 9:16)
//
// Las capturas salen de la app compilada (www/), renderizada con Chrome sin interfaz y sin red
// (no se envía nada a Google Analytics). El texto de la ficha está escrito a mano en store/textos/.
//
//   npm run store        (compila y genera)
//   CHROME_PATH=/ruta/a/chrome npm run store   (si Chrome no está en /usr/bin/google-chrome)

import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
import { preview } from 'vite';
import sharp from 'sharp';

const CHROME = process.env.CHROME_PATH || '/usr/bin/google-chrome';
const PORT = 4179;
const BASE = `http://127.0.0.1:${PORT}/`;
const OUT = 'store';

if (!existsSync('www/index.html')) throw new Error('Falta www/: ejecuta "npm run build" antes (o usa "npm run store").');
if (!existsSync(CHROME)) throw new Error(`No encuentro Chrome en ${CHROME}. Indica la ruta con CHROME_PATH.`);

mkdirSync(`${OUT}/graficos`, { recursive: true });
mkdirSync(`${OUT}/capturas-telefono`, { recursive: true });

const server = await preview({ preview: { port: PORT, host: '127.0.0.1', open: false }, logLevel: 'silent' });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });

const wait = ms => new Promise(r => setTimeout(r, ms));

// Play pide PNG sin canal alfa en capturas y gráfico de funciones
const savePng = async (input, path) => {
  await sharp(input).flatten({ background: '#020617' }).removeAlpha().png({ compressionLevel: 9 }).toFile(path);
  console.log('  ✓', path);
};

/** Abre la app en un móvil de 360x640 con factor 3 => capturas de 1080x1920, ya con el consentimiento dado. */
async function openApp() {
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  // Solo se permite la propia app: nada llega a Google Analytics ni a otros servidores
  await page.setRequestInterception(true);
  page.on('request', req => (req.url().startsWith(BASE) || req.url().startsWith('data:') ? req.continue() : req.abort()));
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('gymroulette_analytics_consent', 'granted');
    Math.random = () => 0.5; // giros reproducibles
  });
  await page.goto(BASE, { waitUntil: 'networkidle0' });
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

const shot = async (page, name) => savePng(await page.screenshot(), `${OUT}/capturas-telefono/${name}.png`);

try {
  console.log('Capturas del teléfono');
  const page = await openApp();

  // 1. Pantalla principal
  await shot(page, '01-ruleta');

  // Imagen de la ruleta (con el puntero) para el gráfico de funciones
  // La caja de la ruleta; se captura con margen para incluir el puntero (queda por encima) y la sombra
  const box = await page.evaluate(() => {
    const r = document.getElementById('wheelCanvas').parentElement.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  const PAD = { side: 16, top: 30, bottom: 70 };
  // La página tiene fondo oscuro propio: se vuelve transparente para que la ruleta se integre en el gráfico
  // y se ocultan los elementos vecinos que el margen de la captura arrastraría (indicador, botón y cabecera)
  // (se asignan estilos a los elementos: una hoja <style> inyectada la bloquea la CSP de la app)
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
  const wheelPng = await page.screenshot({
    omitBackground: true,
    clip: { x: box.x - PAD.side, y: box.y - PAD.top, width: box.width + PAD.side * 2, height: box.height + PAD.top + PAD.bottom },
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await wait(500);

  // 2. Resultado de un giro
  await spinAndWait(page);
  await shot(page, '02-resultado');
  await page.click('[data-action=close-result][data-arg=done]');
  await wait(500);

  // 3. Historial con varios retos completados
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

  // 4. Configuración: ejercicios con sus iconos
  await page.click('[data-action=open-config]');
  await wait(700);
  await page.evaluate(() => document.getElementById('exsCheckboxes').scrollIntoView({ block: 'start' }));
  await wait(400);
  await shot(page, '04-configuracion');

  // 5. Selector de iconos
  await page.click('#iconPickerBtn');
  await wait(300);
  await page.evaluate(() => document.getElementById('iconPicker').scrollIntoView({ block: 'center' }));
  await wait(400);
  await shot(page, '05-selector-de-iconos');

  // 6. Búsqueda en el selector
  await page.type('#iconSearch', 'hyrox');
  await wait(400);
  await page.evaluate(() => document.getElementById('iconPicker').scrollIntoView({ block: 'center' }));
  await wait(400);
  await shot(page, '06-busqueda-de-iconos');
  await page.close();

  console.log('Gráficos');
  // Icono de la aplicación: 512x512 con canal alfa (Play lo exige de 32 bits)
  await sharp('assets/icon-only.png').resize(512, 512).ensureAlpha().png({ compressionLevel: 9 }).toFile(`${OUT}/graficos/icon.png`);
  console.log('  ✓', `${OUT}/graficos/icon.png`);

  // Gráfico de funciones 1024x500: texto a la izquierda y la ruleta real saliendo por la derecha
  const font = w => readFileSync(`node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-${w}-normal.woff2`).toString('base64');
  const logo = `data:image/svg+xml;base64,${readFileSync('public/favicon.svg').toString('base64')}`;
  const wheel = `data:image/png;base64,${wheelPng.toString('base64')}`;
  const green = '34 197 94';
  // La ruleta entera (400 px de diámetro) a la derecha, centrada en vertical y con su puntero visible
  const WHEEL_SIZE = 400;
  const K = WHEEL_SIZE / box.width; // factor de escala de la captura al gráfico
  const WHEEL_LEFT = 1024 - 56 - WHEEL_SIZE;
  const WHEEL_TOP = Math.round((500 - WHEEL_SIZE) / 2) + 12;
  const html = `<!doctype html><meta charset="utf-8"><style>
    @font-face{font-family:J;font-weight:700;src:url(data:font/woff2;base64,${font(700)}) format('woff2')}
    @font-face{font-family:J;font-weight:800;src:url(data:font/woff2;base64,${font(800)}) format('woff2')}
    *{margin:0;box-sizing:border-box}
    body{width:1024px;height:500px;overflow:hidden;font-family:J,sans-serif;color:#fff;position:relative;
      background:radial-gradient(circle at 76% 52%, rgb(${green} / .22), transparent 55%), linear-gradient(135deg,#0B1220,#020617)}
    .brand{position:absolute;left:64px;top:56px;display:flex;align-items:center;gap:16px}
    .brand img{width:64px;height:64px;border-radius:16px;box-shadow:0 8px 24px rgb(${green} / .35)}
    .brand b{font-weight:800;font-size:34px;letter-spacing:-.5px;line-height:1}
    .brand b span{color:rgb(${green})}
    .brand small{display:block;font-weight:800;font-size:12px;letter-spacing:3px;color:rgb(74 222 128);margin-top:6px}
    h1{position:absolute;left:64px;top:168px;font-weight:800;font-size:58px;line-height:1.08;letter-spacing:-1.5px}
    h1 span{color:rgb(${green})}
    p{position:absolute;left:64px;top:312px;font-weight:700;font-size:21px;color:#cbd5e1}
    .btn{position:absolute;left:64px;top:372px;padding:18px 34px;border-radius:18px;font-weight:800;font-size:22px;color:#020617;
      background:linear-gradient(90deg,rgb(22 163 74),rgb(74 222 128));box-shadow:0 10px 30px rgb(${green} / .4)}
    .wheel{position:absolute;left:${WHEEL_LEFT - PAD.side * K}px;top:${WHEEL_TOP - PAD.top * K}px;width:${(box.width + PAD.side * 2) * K}px;height:auto}
  </style>
  <div class="brand"><img src="${logo}"><div><b>Gym<span>Roulette</span></b><small>GASTEIZ TRAINNING</small></div></div>
  <h1>¡Gira la ruleta<br><span>y a entrenar!</span></h1>
  <p>Ejercicios aleatorios para retarte cada día</p>
  <div class="btn">¡GIRAR RULETA!</div>
  <img class="wheel" src="${wheel}">`;
  const banner = await browser.newPage();
  await banner.setViewport({ width: 1024, height: 500, deviceScaleFactor: 1 });
  await banner.setContent(html, { waitUntil: 'load' });
  await banner.evaluate(() => document.fonts.ready);
  await wait(300);
  await savePng(await banner.screenshot(), `${OUT}/graficos/grafico-de-funciones-1024x500.png`);
  await banner.close();
} finally {
  await browser.close();
  await new Promise(r => server.httpServer.close(r));
}
