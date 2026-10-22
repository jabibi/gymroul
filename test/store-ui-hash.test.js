import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { uiHash, HASH_FILE } from '../scripts/store-ui-hash.mjs';

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
});
