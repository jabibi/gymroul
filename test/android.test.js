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
});
