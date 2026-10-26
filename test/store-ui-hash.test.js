import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { uiHash, normalize, HASH_FILE } from '../scripts/store-ui-hash.mjs';

describe('huella de la interfaz de las capturas de Play', () => {
  it('es estable entre llamadas y tiene 64 caracteres hexadecimales', () => {
    const hash = uiHash();
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(uiHash()).toBe(hash);
  });

  it('la última generación de las capturas dejó guardada su huella (store/.ui-hash)', () => {
    expect(existsSync(HASH_FILE)).toBe(true);
    expect(readFileSync(HASH_FILE, 'utf8').trim()).toMatch(/^[0-9a-f]{64}$/);
  });

  describe('ignora lo que no cambia el aspecto, y solo eso', () => {
    const js = `// aviso\nexport const RATIO = 0.85; /* ajuste */\nexport const url = 'http://a.b/*no*/';\n`;

    it('JavaScript: comentarios, formato y líneas en blanco', () => {
      const reformateado = `export   const RATIO = 0.85;\n\n\n// otro comentario\n/** doc */\nexport const url = "http://a.b/*no*/";`;
      expect(normalize('a.js', reformateado)).toBe(normalize('a.js', js));
    });

    it('JavaScript: un cambio de valor o de texto sí cuenta, y un «//» dentro de un texto no es un comentario', () => {
      expect(normalize('a.js', js.replace('0.85', '0.86'))).not.toBe(normalize('a.js', js));
      expect(normalize('a.js', js.replace('a.b', 'a.c'))).not.toBe(normalize('a.js', js));
      expect(normalize('a.js', "export const t = 'a // b';")).not.toBe(normalize('a.js', "export const t = 'a';"));
    });

    it('CSS: comentarios y espacio en blanco; un cambio de regla sí cuenta', () => {
      const css = `.a { color: red; }\n/* nota */\n.b { width: 10px; }\n`;
      expect(normalize('a.css', `\n\n.a {\n  color: red;\n}\n.b { width: 10px; } /* otra */`)).toBe(normalize('a.css', css));
      expect(normalize('a.css', css.replace('10px', '11px'))).not.toBe(normalize('a.css', css));
    });

    it('HTML: comentarios y espacio en blanco; un cambio de texto o de clases sí cuenta', () => {
      const html = `<!-- cabecera -->\n<p class="a b">Hola</p>\n`;
      expect(normalize('a.html', `\n<p class="a b">Hola</p>\n\n<!-- otro -->`)).toBe(normalize('a.html', html));
      expect(normalize('a.html', html.replace('Hola', 'Adiós'))).not.toBe(normalize('a.html', html));
      expect(normalize('a.html', html.replace('a b', 'a c'))).not.toBe(normalize('a.html', html));
    });

    it('otros archivos (SVG) se leen tal cual', () => {
      expect(normalize('logo.svg', '<svg><!-- x --></svg>')).toBe('<svg><!-- x --></svg>');
    });
  });
});
