// Corrige el icono adaptativo que genera @capacitor/assets.
//
// capacitor-assets mete el fondo y el primer plano en un <inset> del 16,7 %. Para el primer plano está bien (deja
// la ruleta dentro de la zona segura), pero el fondo tiene que cubrir todo el lienzo: con el inset queda un cuadrado
// de 71,9 dp y la máscara circular del lanzador es de 72 dp, así que sobra una rendija de menos de un píxel que, según
// el redondeo, se ve como una raya oscura en el borde inferior y derecho del círculo verde.
//
// También añade el <monochrome> (los «iconos con tema» de Android 13): capacitor-assets no lo genera y sobrescribe estos XML
// cada vez, así que se pone aquí. Con el mismo margen del 16,7 % que el primer plano.
//
//   npm run icons    (lo ejecuta después de capacitor-assets)

import { readFileSync, writeFileSync } from 'node:fs';

const DIR = 'android/app/src/main/res/mipmap-anydpi-v26';
const BACKGROUND_INSET = /<background>\s*<inset android:drawable="@mipmap\/ic_launcher_background" android:inset="[\d.]+%" \/>\s*<\/background>/;
const BACKGROUND_FULL = '<background android:drawable="@mipmap/ic_launcher_background" />';

const MONOCHROME = `    <monochrome>
        <inset android:drawable="@drawable/ic_launcher_monochrome" android:inset="16.7%" />
    </monochrome>`;

for (const file of ['ic_launcher.xml', 'ic_launcher_round.xml']) {
  const path = `${DIR}/${file}`;
  const xml = readFileSync(path, 'utf8');
  let fixed = xml;
  if (!fixed.includes(BACKGROUND_FULL)) {
    if (!BACKGROUND_INSET.test(fixed)) throw new Error(`${path}: no encuentro el fondo con inset; revisa el formato que genera capacitor-assets`);
    fixed = fixed.replace(BACKGROUND_INSET, BACKGROUND_FULL);
  }
  if (!fixed.includes('<monochrome>')) {
    if (!fixed.includes('</foreground>')) throw new Error(`${path}: no encuentro el primer plano; revisa el formato que genera capacitor-assets`);
    fixed = fixed.replace('</foreground>', `</foreground>\n${MONOCHROME}`);
  }
  if (fixed !== xml) writeFileSync(path, fixed);
}
console.log('Icono adaptativo: fondo a lienzo completo');
