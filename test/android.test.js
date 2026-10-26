import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';

// El código nativo de Android propio (MainActivity, el plugin AppBars y la pantalla de arranque) está escrito en Kotlin
describe('código nativo de Android', () => {
  it('es todo Kotlin: no queda Java propio en la app', () => {
    const files = readdirSync('android/app/src', { recursive: true }).map(String);
    expect(files.filter(f => f.endsWith('.java'))).toEqual([]);
    expect(files).toContain('main/kotlin/eus/jabibi/gymroul/MainActivity.kt');
    expect(files).toContain('main/kotlin/eus/jabibi/gymroul/AppBarsPlugin.kt');
    expect(files).toContain('main/kotlin/eus/jabibi/gymroul/SplashOverlay.kt');
  });

  it('todo lo que la web pide al plugin AppBars existe en AppBarsPlugin.kt', () => {
    const plugin = readFileSync('android/app/src/main/kotlin/eus/jabibi/gymroul/AppBarsPlugin.kt', 'utf8');
    const methods = new Set([...plugin.matchAll(/@PluginMethod\s+fun (\w+)/g)].map(m => m[1]));
    const used = new Set();
    for (const file of readdirSync('src').filter(f => f.endsWith('.js'))) {
      for (const m of readFileSync(`src/${file}`, 'utf8').matchAll(/AppBars\.(\w+)\(/g)) used.add(m[1]);
    }
    used.delete('addListener'); // lo trae Capacitor, no el plugin
    expect([...used].length).toBeGreaterThan(0);
    for (const name of used) expect(methods, `AppBars.${name} no está en AppBarsPlugin.kt`).toContain(name);
  });

  it('la pantalla de arranque nativa tiene los logos y las fuentes que usa', () => {
    const splash = readFileSync('android/app/src/main/kotlin/eus/jabibi/gymroul/SplashOverlay.kt', 'utf8');
    const res = readdirSync('android/app/src/main/res', { recursive: true }).map(String);
    for (const [, name] of splash.matchAll(/R\.drawable\.(\w+)/g)) expect(res, name).toContain(`drawable-nodpi/${name}.png`);
    for (const [, name] of splash.matchAll(/R\.font\.(\w+)/g)) expect(res, name).toContain(`font/${name}.ttf`);
    expect(splash).toContain('PointedIO');
  });

  // Un logo en la pantalla de arranque del sistema (que lo coloca entre las barras y con otro tamaño) saltaría al aparecer el de SplashOverlay
  it('la pantalla de arranque del sistema no lleva logo: solo SplashOverlay lo pinta', () => {
    const res = 'android/app/src/main/res';
    const styles = readFileSync(`${res}/values/styles.xml`, 'utf8');
    expect(styles).toContain('windowSplashScreenAnimatedIcon">@drawable/splash_icon<');
    for (const file of ['splash.xml', 'splash_icon.xml']) {
      const xml = readFileSync(`${res}/drawable/${file}`, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
      expect(xml, file).not.toMatch(/splash_logo|<bitmap|<vector|<inset/);
    }
    expect(readFileSync(`${res}/drawable/splash_icon.xml`, 'utf8')).toContain('@android:color/transparent');
    const files = readdirSync(res, { recursive: true }).map(String);
    expect(files.filter(f => /(^|\/)splash_logo\.png$/.test(f))).toEqual([]);
  });

  // La pantalla de arranque está escrita en dos sitios (la web, en HTML, y Android, en Kotlin): al cambiar una hay que cambiar la otra
  it('la pantalla de arranque de la web y la de Android llevan la misma firma, y la web se oculta en la app', () => {
    const html = readFileSync('index.html', 'utf8');
    const splash = readFileSync('android/app/src/main/kotlin/eus/jabibi/gymroul/SplashOverlay.kt', 'utf8');
    const block = html.match(/<div id="bootSplash"[\s\S]*?<\/p>/)?.[0] ?? '';
    for (const text of ['from', 'PointedIO']) {
      expect(block, `index.html: ${text}`).toContain(`>${text}<`);
      expect(splash, `SplashOverlay.kt: ${text}`).toContain(`"${text}"`);
    }
    expect(block).toContain('w-36 h-36'); // 144 px, como los 144 dp de SplashOverlay.kt
    expect(splash).toContain('dp(144)');
    expect(readFileSync('src/style.css', 'utf8')).toContain('html.native #bootSplash { display: none; }');
    expect(readFileSync('public/theme-init.js', 'utf8')).toContain("classList.add('native')");
  });
});
