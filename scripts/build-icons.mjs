// Genera el logo de GymRoulette y los recursos que consume @capacitor/assets.
//
//   node scripts/build-icons.mjs        -> assets/*.png, assets/logo.svg y public/favicon.svg
//   npm run icons                       -> lo anterior + capacitor-assets generate --android
//
// Un único diseño (la ruleta) con tres presentaciones:
//   - logo.svg / favicon.svg   cuadrado redondeado con fondo de color (cabecera de la app y pestaña)
//   - icon-only.png            icono completo a sangre (lanzadores antiguos)
//   - icon-foreground.png      solo la ruleta, más grande, sobre transparente (icono adaptativo; Android
//                              lo reduce al 66 % dentro de la zona segura)
//   - icon-background.png      solo el degradado de fondo (icono adaptativo)
//   - splash.png               ruleta sobre el fondo oscuro de la app

import { writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

const NAVY = '#111827';

// Tema del logo (el color de la interfaz está en src/style.css, variables --brand-*).
// Verde: degradado del fondo (luz arriba, sombra abajo), remaches del aro y sombra de la ruleta.
const THEME = {
  bgLight: '#86EFAC',
  bgMid: '#22C55E',
  bgDark: '#15803D',
  stud: '#16A34A',
  shadow: '#052E16',
};
// Colores de los sectores: la misma paleta que la ruleta de la app, ordenados para que dos sectores
// contiguos nunca se parezcan
const SECTOR_COLORS = ['#EF4444', '#FBBF24', '#22C55E', '#06B6D4', '#8B5CF6', '#F97316', '#3B82F6', '#EC4899'];
const APP_BG = '#020617';

const point = (r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [256 + r * Math.cos(a), 256 + r * Math.sin(a)];
};
const f = n => n.toFixed(2);

// Ocho sectores de 45° con la paleta de la app, separados por finas líneas azul marino
function sectors(radius) {
  let out = '';
  for (let i = 0; i < 8; i++) {
    const [x1, y1] = point(radius, i * 45);
    const [x2, y2] = point(radius, (i + 1) * 45);
    out += `<path d="M256,256 L${f(x1)},${f(y1)} A${radius},${radius} 0 0 1 ${f(x2)},${f(y2)} Z" fill="${SECTOR_COLORS[i]}"/>`;
  }
  for (let i = 0; i < 8; i++) {
    const [x, y] = point(radius, i * 45);
    out += `<line x1="256" y1="256" x2="${f(x)}" y2="${f(y)}" stroke="${NAVY}" stroke-width="4"/>`;
  }
  return out;
}

// Ocho remaches sobre el aro, en el límite de cada sector
function studs() {
  let out = '';
  for (let i = 0; i < 8; i++) {
    const [x, y] = point(187, i * 45);
    out += `<circle cx="${f(x)}" cy="${f(y)}" r="5.5" fill="${THEME.stud}"/>`;
  }
  return out;
}

const DEFS = `<defs>
  <radialGradient id="bg" cx="0.5" cy="0.3" r="0.9">
    <stop offset="0" stop-color="${THEME.bgLight}"/><stop offset="0.55" stop-color="${THEME.bgMid}"/><stop offset="1" stop-color="${THEME.bgDark}"/>
  </radialGradient>
  <radialGradient id="hub" cx="0.5" cy="0.35" r="0.8">
    <stop offset="0" stop-color="#2B3548"/><stop offset="1" stop-color="#0B0F19"/>
  </radialGradient>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
</defs>`;

// La ruleta completa (aro, sectores, buje con mancuerna y puntero), centrada en 256,256 con radio 196
const WHEEL = `
  <circle cx="256" cy="268" r="196" fill="${THEME.shadow}" opacity="0.45" filter="url(#shadow)"/>
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
