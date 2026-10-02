import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';
import { GYMROUL_ICONS } from '../src/custom-icons.js';
import { ICONS, ICON_GROUPS, DEFAULT_ICON, isValidIcon, normalizeIcon, migrateLegacyIcon, searchIcons, LEGACY_ICON_MAP } from '../src/icons.js';

const require = createRequire(import.meta.url);

describe('catálogo de iconos', () => {
  it('es amplio y sus ids son únicos', () => {
    expect(ICONS.length).toBeGreaterThanOrEqual(80);
    expect(new Set(ICONS.map(i => i.id)).size).toBe(ICONS.length);
    expect(ICON_GROUPS.every(g => g.icons.length > 0)).toBe(true);
  });

  it('cada clase existe de verdad en el paquete de iconos instalado', () => {
    for (const icon of ICONS) {
      const m = /^icon-\[(mdi|game-icons|gymroul)--(.+)\]$/.exec(icon.cls);
      expect(m, `${icon.id}: formato de clase`).not.toBeNull();
      const set = m[1] === 'gymroul' ? GYMROUL_ICONS : require(`@iconify-json/${m[1]}/icons.json`);
      expect(m[2] in set.icons || m[2] in (set.aliases ?? {}), `${icon.id}: ${m[1]}:${m[2]}`).toBe(true);
    }
  });

  it('el icono por defecto y los de la migración existen', () => {
    expect(isValidIcon(DEFAULT_ICON)).toBe(true);
    for (const id of Object.values(LEGACY_ICON_MAP)) expect(isValidIcon(id)).toBe(true);
  });

  it('solo valida ids del catálogo', () => {
    expect(isValidIcon('karate')).toBe(true);
    for (const bad of ['🔥', 'fa-fire', 'mdi:karate', '', null, undefined, 3]) expect(isValidIcon(bad)).toBe(false);
    expect(normalizeIcon('🔥')).toBe(DEFAULT_ICON);
  });

  it('migra iconos antiguos', () => {
    expect(migrateLegacyIcon('fa-person-running')).toBe('run');
    expect(migrateLegacyIcon('fa-bicycle')).toBe(DEFAULT_ICON);
    expect(migrateLegacyIcon('🏋️')).toBe(DEFAULT_ICON);
    expect(migrateLegacyIcon('yoga')).toBe('yoga');
  });

  it('cubre las disciplinas pedidas al buscar (sin distinguir acentos)', () => {
    for (const q of ['hyrox', 'yoga', 'pilates', 'calistenia', 'ocr', 'crossfit', 'karate', 'tai chi', 'boxeo', 'natación', 'escalada']) {
      expect(searchIcons(q).length, q).toBeGreaterThan(0);
    }
    expect(searchIcons('')).toHaveLength(ICONS.length);
    expect(searchIcons('zzzz')).toHaveLength(0);
  });
});

describe('pictogramas propios', () => {
  it('son SVG válidos: sin atributos repetidos en ningún elemento', () => {
    for (const [name, { body }] of Object.entries(GYMROUL_ICONS.icons)) {
      for (const tag of body.match(/<[^>]+>/g) ?? []) {
        const attrs = [...tag.matchAll(/\s([a-z-]+)=/g)].map(m => m[1]);
        expect(new Set(attrs).size, `${name}: ${tag}`).toBe(attrs.length);
      }
    }
  });
});
