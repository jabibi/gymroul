// Genera el logo de GymRoulette y los recursos que consume @capacitor/assets.
//
//   node scripts/build-icons.mjs        -> assets/*.png, assets/logo.svg y public/favicon.svg
//   npm run icons                       -> lo anterior + capacitor-assets generate --android
//
// Un único diseño (la ruleta) con tres presentaciones:
//   - logo.svg / favicon.svg   cuadrado redondeado con fondo naranja (cabecera de la app y pestaña)
//   - icon-only.png            icono completo a sangre (lanzadores antiguos)
//   - icon-foreground.png      solo la ruleta, más grande, sobre transparente (icono adaptativo; Android
//                              lo reduce al 66 % dentro de la zona segura)
//   - icon-background.png      solo el degradado naranja (icono adaptativo)
//   - splash.png               ruleta sobre el fondo oscuro de la app

import { writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

const NAVY = '#111827';
const CREAM = '#FFF4DC';
const ORANGE = '#FF5A1F';
const APP_BG = '#020617';

const point = (r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [256 + r * Math.cos(a), 256 + r * Math.sin(a)];
};
const f = n => n.toFixed(2);

// Ocho sectores alternos (azul marino / crema) de 45° cada uno
function sectors(radius) {
  let out = '';
  for (let i = 0; i < 8; i++) {
    const [x1, y1] = point(radius, i * 45);
    const [x2, y2] = point(radius, (i + 1) * 45);
    out += `<path d="M256,256 L${f(x1)},${f(y1)} A${radius},${radius} 0 0 1 ${f(x2)},${f(y2)} Z" fill="${i % 2 ? CREAM : NAVY}"/>`;
  }
  return out;
}

// Ocho remaches naranjas sobre el aro, en el límite de cada sector
function studs() {
  let out = '';
  for (let i = 0; i < 8; i++) {
    const [x, y] = point(187, i * 45);
    out += `<circle cx="${f(x)}" cy="${f(y)}" r="5.5" fill="${ORANGE}"/>`;
  }
  return out;
}

const DEFS = `<defs>
  <radialGradient id="bg" cx="0.5" cy="0.3" r="0.9">
    <stop offset="0" stop-color="#FFC233"/><stop offset="0.55" stop-color="#FF7A1A"/><stop offset="1" stop-color="#E8400C"/>
  </radialGradient>
  <radialGradient id="hub" cx="0.5" cy="0.35" r="0.8">
    <stop offset="0" stop-color="#FF9A3C"/><stop offset="1" stop-color="#EA4A0C"/>
  </radialGradient>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
</defs>`;

// La ruleta completa (aro, sectores, buje con mancuerna y puntero), centrada en 256,256 con radio 196
const WHEEL = `
  <circle cx="256" cy="268" r="196" fill="#7A1F00" opacity="0.45" filter="url(#shadow)"/>
  <circle cx="256" cy="256" r="196" fill="#FFFFFF"/>
  <circle cx="256" cy="256" r="176" fill="${NAVY}"/>
  ${sectors(172)}
  ${studs()}
  <circle cx="256" cy="256" r="70" fill="#FFFFFF"/>
  <circle cx="256" cy="256" r="60" fill="url(#hub)"/>
  <g transform="translate(256,256) rotate(-35)" fill="#FFFFFF">
    <rect x="-30" y="-6" width="60" height="12" rx="4"/>
    <rect x="-41" y="-22" width="13" height="44" rx="4"/>
    <rect x="28" y="-22" width="13" height="44" rx="4"/>
    <rect x="-51" y="-14" width="10" height="28" rx="3.5"/>
    <rect x="41" y="-14" width="10" height="28" rx="3.5"/>
  </g>
  <path d="M222,46 L290,46 L256,118 Z" fill="${NAVY}" stroke="#FFFFFF" stroke-width="9" stroke-linejoin="round"/>`;

const svg = (body, { bg = '', size = 512, extra = '' } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">${DEFS}${bg}${extra}${body}</svg>`;

// dy desplaza la ruleta hacia abajo para dejar sitio al puntero cuando se amplía
const wheelScaled = (s, dy = 0) => `<g transform="translate(256,${256 + dy}) scale(${s}) translate(-256,-256)">${WHEEL}</g>`;

const BG_ROUNDED = '<rect width="512" height="512" rx="112" fill="url(#bg)"/>';
const BG_FULL = '<rect width="512" height="512" fill="url(#bg)"/>';

const outputs = {
  logo: svg(wheelScaled(1), { bg: BG_ROUNDED }),
  iconOnly: svg(wheelScaled(1), { bg: BG_FULL }),
  foreground: svg(wheelScaled(1.16, 10)),
  background: svg('', { bg: BG_FULL }),
  wheelOnly: svg(WHEEL),
};

mkdirSync('assets', { recursive: true });
mkdirSync('public', { recursive: true });
writeFileSync('assets/logo.svg', outputs.logo);
writeFileSync('public/favicon.svg', outputs.logo);

const png = (name, source, size) => sharp(Buffer.from(source), { density: 300 }).resize(size, size).png().toFile(`assets/${name}.png`);

await Promise.all([
  png('icon-only', outputs.iconOnly, 1024),
  png('icon-foreground', outputs.foreground, 1024),
  png('icon-background', outputs.background, 1024),
]);

// Pantalla de bienvenida: la ruleta (sin fondo propio) centrada sobre el fondo oscuro de la app
const splashSize = 2732;
const wheelPx = 760;
const wheelBuf = await sharp(Buffer.from(outputs.wheelOnly), { density: 300 }).resize(wheelPx, wheelPx).png().toBuffer();
for (const name of ['splash', 'splash-dark']) {
  await sharp({ create: { width: splashSize, height: splashSize, channels: 4, background: APP_BG } })
    .composite([{ input: wheelBuf, gravity: 'center' }])
    .png()
    .toFile(`assets/${name}.png`);
}

console.log('Recursos generados en assets/ y public/favicon.svg');
