import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';

// La app es totalmente offline y no recopila datos: estas pruebas evitan que vuelva a colarse una conexión
describe('app sin conexión ni seguimiento', () => {
  it('Android solo declara el permiso de vibración (sin Internet)', () => {
    const manifest = readFileSync('android/app/src/main/AndroidManifest.xml', 'utf8');
    const permissions = [...manifest.matchAll(/<uses-permission android:name="([^"]+)"/g)].map(m => m[1]);
    expect(permissions).toEqual(['android.permission.VIBRATE']);
  });

  it('Android prohíbe expresamente el tráfico sin cifrar', () => {
    const manifest = readFileSync('android/app/src/main/AndroidManifest.xml', 'utf8');
    expect(manifest).toContain('android:usesCleartextTraffic="false"');
    expect(manifest).toContain('android:networkSecurityConfig="@xml/network_security_config"');
    const config = readFileSync('android/app/src/main/res/xml/network_security_config.xml', 'utf8');
    expect(config).toContain('<base-config cleartextTrafficPermitted="false" />');
    expect(config).not.toContain('cleartextTrafficPermitted="true"');
  });

  it('la CSP solo permite recursos propios', () => {
    const html = readFileSync('index.html', 'utf8');
    const csp = html.match(/Content-Security-Policy" content="([^"]+)"/)?.[1] ?? '';
    expect(csp).not.toMatch(/https?:/);
    expect(csp).toContain("script-src 'self';");
    expect(csp).toContain("connect-src 'self';");
  });

  it('no queda la dependencia de Firebase ni ninguna importación suya', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    expect(Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })).not.toContain('firebase');
    for (const file of readdirSync('src', { recursive: true, withFileTypes: true }).filter(f => f.isFile() && f.name.endsWith('.js'))) {
      const source = readFileSync(`${file.parentPath}/${file.name}`, 'utf8');
      expect(source, file.name).not.toMatch(/firebase|google-analytics|googletagmanager|gtag/i);
    }
  });
});
