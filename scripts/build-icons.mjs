// Genera el logo de GymRoulette y los recursos que consume @capacitor/assets.
//
//   node scripts/build-icons.mjs        -> assets/*.png, assets/logo.svg, public/favicon.svg, public/logo-mark.svg y public/logo-light.svg
//   npm run icons                       -> lo anterior + capacitor-assets generate --android
//
// Un único diseño (la ruleta, en verde neón sobre azul noche) con varias presentaciones:
//   - logo.svg / favicon.svg   cuadrado redondeado con el fondo oscuro (cabecera de la app y pestaña)
//   - logo-mark.svg            solo la ruleta, sin fondo (cabecera de la app, que ya pone el suyo)
//   - logo-light.svg           lo mismo con colores para fondo claro (cabecera con el tema Claro)
//   - icon-only.png            icono completo a sangre (lanzadores antiguos)
//   - icon-foreground.png      solo la ruleta, con la circunferencia centrada, sobre transparente (icono
//                              adaptativo; Android lo reduce al 66 % dentro de la zona segura)
//   - icon-background.png      solo el degradado de fondo (icono adaptativo)
//   - splash.png               ruleta sobre el fondo oscuro de la app

import { writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

const APP_BG = '#020617';

const DEFS = `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0F172A"/><stop offset="1" stop-color="#0B1120"/>
  </linearGradient>
  <filter id="neon" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="6" result="b1"/>
    <feGaussianBlur stdDeviation="14" result="b2"/>
    <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="3" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>`;

// La ruleta completa (sectores alternos, aro con brillo neón verde y mancuerna central), centrada en 256,256 con radio 190.
// La variante clara (tema Claro) usa un verde más oscuro y la mancuerna oscura, sin brillo, para leerse sobre fondo claro.
const wheelShapes = ({ green = '#10B981', dumbbell = '#FFFFFF', ringGlow = 'url(#neon)', dumbbellGlow = 'url(#soft)' } = {}) => `
  <g opacity="0.2" fill="${green}">
    <path d="M256,66 A190,190 0 0,1 390.35,121.65 L337.28,174.72 A115,115 0 0,0 256,141 Z"/>
    <path d="M446,256 A190,190 0 0,1 390.35,390.35 L337.28,337.28 A115,115 0 0,0 371,256 Z"/>
    <path d="M256,446 A190,190 0 0,1 121.65,390.35 L174.72,337.28 A115,115 0 0,0 256,371 Z"/>
    <path d="M66,256 A190,190 0 0,1 121.65,121.65 L174.72,174.72 A115,115 0 0,0 141,256 Z"/>
  </g>
  <g filter="${ringGlow}" stroke="${green}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="256" cy="256" r="190" opacity="0.95"/>
    <circle cx="256" cy="256" r="115" opacity="0.95"/>
    <line x1="256" y1="66" x2="256" y2="141"/>
    <line x1="390.35" y1="121.65" x2="337.28" y2="174.72"/>
    <line x1="446" y1="256" x2="371" y2="256"/>
    <line x1="390.35" y1="390.35" x2="337.28" y2="337.28"/>
    <line x1="256" y1="446" x2="256" y2="371"/>
    <line x1="121.65" y1="390.35" x2="174.72" y2="337.28"/>
    <line x1="66" y1="256" x2="141" y2="256"/>
    <line x1="121.65" y1="121.65" x2="174.72" y2="174.72"/>
  </g>
  <g filter="${dumbbellGlow}" fill="${dumbbell}">
    <rect x="206" y="247" width="100" height="18" rx="9"/>
    <rect x="200" y="221" width="18" height="70" rx="6"/>
    <rect x="294" y="221" width="18" height="70" rx="6"/>
    <rect x="176" y="231" width="18" height="50" rx="5"/>
    <rect x="318" y="231" width="18" height="50" rx="5"/>
  </g>`;

const WHEEL = wheelShapes();
const WHEEL_LIGHT = wheelShapes({ green: '#047857', dumbbell: '#0F172A', ringGlow: 'none', dumbbellGlow: 'none' });

const svg = (body, { bg = '', size = 512, extra = '' } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">${DEFS}${bg}${extra}${body}</svg>`;

// dy desplaza la ruleta en vertical (0 la deja con su circunferencia centrada en el lienzo)
const wheelScaled = (s, dy = 0) => `<g transform="translate(256,${256 + dy}) scale(${s}) translate(-256,-256)">${WHEEL}</g>`;

const BG_ROUNDED = '<rect width="512" height="512" rx="112" fill="url(#bg)"/>';
const BG_FULL = '<rect width="512" height="512" fill="url(#bg)"/>';

const outputs = {
  logo: svg(wheelScaled(1), { bg: BG_ROUNDED }),
  iconOnly: svg(wheelScaled(1), { bg: BG_FULL }),
  foreground: svg(wheelScaled(1)),
  background: svg('', { bg: BG_FULL }),
  wheelOnly: svg(WHEEL),
  wheelLight: svg(WHEEL_LIGHT),
};

mkdirSync('assets', { recursive: true });
mkdirSync('public', { recursive: true });
writeFileSync('assets/logo.svg', outputs.logo);
writeFileSync('public/favicon.svg', outputs.logo);
writeFileSync('public/logo-mark.svg', outputs.wheelOnly);
writeFileSync('public/logo-light.svg', outputs.wheelLight);

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
