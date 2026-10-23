// Genera el logo de GymRoulette y los recursos que consume @capacitor/assets.
//
//   node scripts/build-icons.mjs        -> assets/*.png, public/favicon.svg, public/logo-mark.svg y public/logo-light.svg
//   npm run icons                       -> lo anterior + capacitor-assets generate --android
//
// Un único diseño (la ruleta, en verde neón sobre azul noche) con varias presentaciones:
//   - favicon.svg              cuadrado redondeado con el fondo oscuro (pestaña y páginas legales). No se escribe assets/logo.svg:
//                              con un logo suelto capacitor-assets genera además las pantallas de arranque PNG a pantalla completa
//   - logo-mark.svg            solo la ruleta, sin fondo (cabecera de la app, que ya pone el suyo)
//   - logo-light.svg           lo mismo con colores para fondo claro (cabecera con el tema Claro)
//   - icon-only.png            icono completo a sangre (lanzadores antiguos)
//   - icon-foreground.png      solo la ruleta, con la circunferencia centrada, sobre transparente (icono
//                              adaptativo; Android lo reduce al 66 % dentro de la zona segura)
//   - icon-background.png      solo el degradado de fondo (icono adaptativo)
//   - ic_launcher_monochrome.png  silueta de un solo color para los «iconos con tema» de Android 13 (res/drawable-nodpi); el
//                              sistema solo mira su transparencia y la tiñe con el color del fondo de pantalla del usuario
//   - splash_logo.png          logo de la pantalla de arranque de Android, claro y oscuro (res/drawable-nodpi y drawable-night-nodpi)

import { writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';


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
const wheelShapes = ({ green = '#10B981', dumbbell = '#FFFFFF', ringGlow = 'url(#neon)', dumbbellGlow = 'url(#soft)', sectors = null } = {}) => `
  <g opacity="${sectors ? 1 : 0.2}" fill="${green}">
    <path${sectors ? ` fill="${sectors[0]}"` : ''} d="M256,66 A190,190 0 0,1 390.35,121.65 L337.28,174.72 A115,115 0 0,0 256,141 Z"/>
    <path${sectors ? ` fill="${sectors[1]}"` : ''} d="M446,256 A190,190 0 0,1 390.35,390.35 L337.28,337.28 A115,115 0 0,0 371,256 Z"/>
    <path${sectors ? ` fill="${sectors[2]}"` : ''} d="M256,446 A190,190 0 0,1 121.65,390.35 L174.72,337.28 A115,115 0 0,0 256,371 Z"/>
    <path${sectors ? ` fill="${sectors[3]}"` : ''} d="M66,256 A190,190 0 0,1 121.65,121.65 L174.72,174.72 A115,115 0 0,0 141,256 Z"/>
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

// Silueta de un solo color para el icono monocromo: aros, radios y mancuerna a trazo grueso (20; con el 12 del icono normal
// se veía débil una vez reducida a la zona segura), sin brillos ni relleno de sectores.
const WHEEL_MONO = `
  <g stroke="#000" stroke-width="20" fill="none" stroke-linecap="round">
    <circle cx="256" cy="256" r="190"/>
    <circle cx="256" cy="256" r="115"/>
    <line x1="256" y1="66" x2="256" y2="141"/>
    <line x1="390.35" y1="121.65" x2="337.28" y2="174.72"/>
    <line x1="446" y1="256" x2="371" y2="256"/>
    <line x1="390.35" y1="390.35" x2="337.28" y2="337.28"/>
    <line x1="256" y1="446" x2="256" y2="371"/>
    <line x1="121.65" y1="390.35" x2="174.72" y2="337.28"/>
    <line x1="66" y1="256" x2="141" y2="256"/>
    <line x1="121.65" y1="121.65" x2="174.72" y2="174.72"/>
  </g>
  <g fill="#000">
    <rect x="206" y="245" width="100" height="22" rx="10"/>
    <rect x="198" y="217" width="22" height="78" rx="7"/>
    <rect x="292" y="217" width="22" height="78" rx="7"/>
    <rect x="170" y="229" width="22" height="54" rx="6"/>
    <rect x="320" y="229" width="22" height="54" rx="6"/>
  </g>`;
// Ruleta clara: sectores en los tonos cálidos pastel de la apariencia Claro (LIGHT_COLOR_PALETTE), aro esmeralda oscuro y mancuerna oscura
const WHEEL_LIGHT = wheelShapes({ green: '#047857', dumbbell: '#1C1917', ringGlow: 'none', dumbbellGlow: 'none', sectors: ['#fdba74', '#fde68a', '#fda4af', '#a7d8b4'] });

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
  // Lienzo del icono adaptativo (108 dp = 432 px); el margen del 16,7 % lo pone el XML, como en el primer plano
  monochrome: svg(WHEEL_MONO),
};

mkdirSync('assets', { recursive: true });
mkdirSync('public', { recursive: true });
writeFileSync('public/favicon.svg', outputs.logo);
writeFileSync('public/logo-mark.svg', outputs.wheelOnly);
writeFileSync('public/logo-light.svg', outputs.wheelLight);

const png = (name, source, size) => sharp(Buffer.from(source), { density: 300 }).resize(size, size).png().toFile(`assets/${name}.png`);

await Promise.all([
  png('icon-only', outputs.iconOnly, 1024),
  png('icon-foreground', outputs.foreground, 1024),
  png('icon-background', outputs.background, 1024),
]);

// Pantalla de arranque de Android: solo el logo, que res/drawable/splash.xml centra sobre el color de fondo de la app (claro u
// oscuro según el modo del sistema) sin estirarlo. Un PNG a pantalla completa se estiraba en los móviles alargados.
// Claro: la ruleta clara; oscuro (drawable-night-nodpi): la de siempre.
const RES = 'android/app/src/main/res';
for (const [dir, source] of [['drawable-nodpi', outputs.wheelLight], ['drawable-night-nodpi', outputs.wheelOnly]]) {
  mkdirSync(`${RES}/${dir}`, { recursive: true });
  await sharp(Buffer.from(source), { density: 300 }).resize(512, 512).png().toFile(`${RES}/${dir}/splash_logo.png`);
}

// Icono monocromo (Android 13 y posteriores): lo engancha fix-adaptive-icon.mjs en los XML del icono adaptativo
mkdirSync(`${RES}/drawable-nodpi`, { recursive: true });
await sharp(Buffer.from(outputs.monochrome), { density: 300 }).resize(432, 432).png().toFile(`${RES}/drawable-nodpi/ic_launcher_monochrome.png`);

console.log('Recursos generados en assets/ y public/favicon.svg');
