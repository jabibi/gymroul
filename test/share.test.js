import { describe, it, expect, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { CARD_THEMES, shareText, challengeLabel, shareChallenge, APP_URL, IMAGE_SIZE } from '../src/share.js';
import { THEMES } from '../src/theme.js';
import { LANGUAGES, setLanguage, DEFAULT_LANGUAGE, DICTIONARIES } from '../src/i18n/index.js';

const winner = { text: '20 Burpee', fullName: 'Burpee', reps: 20, exercise: 'Burpee', shortName: 'Burpee', color: '#22c55e', icon: 'burpee' };

afterEach(() => setLanguage(DEFAULT_LANGUAGE, { persist: false }));

describe('compartir el reto', () => {
  it('el reto es «repeticiones ejercicio» y el texto lleva el enlace a la ficha de Play', () => {
    expect(challengeLabel(winner)).toBe('20 Burpee');
    expect(APP_URL).toBe('https://play.google.com/store/apps/details?id=eus.jabibi.gymroul');
    for (const { code } of LANGUAGES) {
      setLanguage(code, { persist: false });
      const text = shareText(winner);
      expect(text, code).toContain('20 Burpee');
      expect(text, code).toContain(APP_URL);
      expect(text, code).not.toMatch(/\{\w+\}/);
    }
  });

  it('todos los idiomas traducen el botón y los avisos', () => {
    for (const { code } of LANGUAGES) {
      for (const key of ['result.share', 'share.text', 'share.saved', 'share.failed', 'share.preparing', 'share.cancel']) {
        expect(DICTIONARIES[code].strings[key] ?? DICTIONARIES.en.strings[key], `${code}:${key}`).toBeTruthy();
      }
    }
    for (const code of ['ar', 'ca', 'de', 'es', 'eu', 'fr', 'gl', 'hi', 'it', 'ja', 'nl', 'pl', 'pt-BR', 'tr']) {
      expect(DICTIONARIES[code].strings['result.share'], code).not.toBe(DICTIONARIES.en.strings['result.share']);
    }
  });

  it('la imagen es cuadrada', () => {
    expect(IMAGE_SIZE).toBe(1080);
  });

  it('si ya está cancelado no genera nada y devuelve «cancelled»', async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(shareChallenge(winner, { signal: controller.signal })).resolves.toBe('cancelled');
  });
});

describe('pantalla de carga al compartir', () => {
  const html = readFileSync('index.html', 'utf8');
  const main = readFileSync('src/main.js', 'utf8');
  const css = readFileSync('src/style.css', 'utf8');

  it('tapa la app, anuncia el estado y ofrece cancelar', () => {
    const overlay = html.slice(html.indexOf('id="shareLoading"'), html.indexOf('<!-- Mensajes breves -->'));
    expect(overlay).toContain('role="alertdialog"');
    expect(overlay).toContain('role="status"');
    expect(overlay).toContain('data-action="cancel-share"');
    expect(overlay).toContain('class="share-spinner"');
    expect(overlay).toMatch(/fixed inset-0/);
    expect(main).toMatch(/'cancel-share': \(\) => ui\.cancelShare\(\)/);
  });

  it('la ruleta de carga gira y respeta el movimiento reducido', () => {
    expect(css).toContain('.share-spinner');
    expect(css).toContain('@keyframes share-spin');
    expect(css).toMatch(/prefers-reduced-motion[\s\S]*share-spinner/);
  });

  it('cancelar suelta el control enseguida, para poder compartir de nuevo sin esperar', () => {
    const ui = readFileSync('src/ui.js', 'utf8');
    const cancel = ui.slice(ui.indexOf('export function cancelShare()'), ui.indexOf('export async function shareResult()'));
    expect(cancel).toContain('shareAbort?.abort()');
    expect(cancel).toContain('shareAbort = null');
    // Una ejecución cancelada que termina tarde no toca la pantalla de carga de la siguiente
    expect(ui).toMatch(/const current = \(\) => shareAbort === abort/);
    expect(ui).toMatch(/if \(current\(\)\) hideShareLoading\(\)/);
  });
});

describe('colores de la imagen compartida', () => {
  it('hay una paleta por cada apariencia y su logo existe', () => {
    for (const theme of THEMES) {
      expect(CARD_THEMES[theme]).toBeTruthy();
      expect(() => readFileSync(`public/${CARD_THEMES[theme].logo}`)).not.toThrow();
    }
  });

  it('el color de marca de cada apariencia coincide con el de src/style.css', () => {
    const css = readFileSync('src/style.css', 'utf8');
    const brand = { calm: css.match(/:root \{[^}]*--brand-500: ([\d ]+);/)?.[1], classic: css.match(/data-theme="classic"\] \{[^}]*--brand-500: ([\d ]+);/)?.[1], light: undefined };
    brand.light = brand.calm; // Claro comparte el color de marca de Oscuro (solo cambia el del texto)
    for (const theme of THEMES) expect(CARD_THEMES[theme].brand.replace(/, /g, ' ')).toBe(brand[theme]);
  });
});
