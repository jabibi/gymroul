import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import en from '../src/i18n/locales/en.js';

// Que el marcado y el código sigan conectados: al quitar o renombrar un botón, un id o una clave, falla un test
// en vez de romperse la app al pulsarlo.

const html = readFileSync('index.html', 'utf8');
const sources = Object.fromEntries(readdirSync('src').filter(f => f.endsWith('.js')).map(f => [f, readFileSync(`src/${f}`, 'utf8')]));
const code = [...Object.values(sources), readFileSync('src/i18n/index.js', 'utf8')].join('\n');

describe('acciones (data-action)', () => {
  const main = sources['main.js'];
  const handlers = new Set([...main.slice(main.indexOf('const actions'), main.indexOf('// Delegación de eventos')).matchAll(/^\s*'([a-z-]+)':/gm)].map(m => m[1]));
  // Las del marcado de index.html y las que ui.js genera por código
  const used = new Set([...(html + sources['ui.js']).matchAll(/data-action=\\?"?([a-z-]+)/g)].map(m => m[1]));

  it('todas las acciones del marcado tienen su manejador', () => {
    expect(used.size).toBeGreaterThan(20);
    expect([...used].filter(a => !handlers.has(a))).toEqual([]);
  });

  it('ningún manejador se queda sin botón', () => {
    expect([...handlers].filter(a => !used.has(a))).toEqual([]);
  });
});

describe('elementos por id', () => {
  it('todo id que busca el código existe en index.html', () => {
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
    const missing = [];
    for (const [file, src] of Object.entries(sources)) {
      for (const m of src.matchAll(/(?:\$|getElementById)\('([A-Za-z0-9_-]+)'\)/g)) if (!ids.has(m[1])) missing.push(`${file}: ${m[1]}`);
    }
    expect(missing).toEqual([]);
  });
});

describe('claves de traducción', () => {
  it('ninguna clave de en.js se queda sin usar', () => {
    // Los nombres de los ejercicios por defecto se piden por clave compuesta (exercise.<clave>, ver exercise-names.js)
    const unused = Object.keys(en.strings).filter(k => !k.startsWith('exercise.') && !code.includes(`'${k}'`) && !html.includes(`"${k}"`));
    expect(unused).toEqual([]);
  });
});

describe('teclado en el navegador', () => {
  it('el teclado redimensiona la página (Chrome en Android lo pone encima por defecto y tapaba el panel de nuevo ejercicio)', () => {
    expect(html).toMatch(/<meta name="viewport"[^>]*interactive-widget=resizes-content/);
  });
});

describe('pantallas bajas', () => {
  it('la actividad de Android va bloqueada en vertical', () => {
    const manifest = readFileSync('android/app/src/main/AndroidManifest.xml', 'utf8');
    expect(manifest).toContain('android:screenOrientation="portrait"');
  });

  it('toda ventana con tarjeta limita su altura (si no, en una pantalla baja quedan botones fuera de alcance)', () => {
    const html = readFileSync('index.html', 'utf8');
    const cards = [...html.matchAll(/<div [^>]*class="[^"]*glass-card[^"]*"[^>]*>/g)].map(m => m[0]).filter(tag => /rounded-(t-)?3xl/.test(tag));
    // tarjetas de ventana: resultado, historial, novedades, ajustes, nuevo ejercicio, compromiso de privacidad y la de «preparando imagen» (pequeña)
    expect(cards.length).toBeGreaterThanOrEqual(7);
    for (const tag of cards) {
      if (/share-wheel|max-w-xs/.test(tag)) continue; // la de compartir solo lleva una ruleta de carga y un botón
      expect(tag).toMatch(/max-h-\[/);
    }
    expect(html.match(/<div [^>]*id="resultCard"[^>]*>/)?.[0]).toMatch(/overflow-y-auto/);
  });
});
