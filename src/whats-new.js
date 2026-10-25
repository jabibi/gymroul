// @ts-check
// Aviso de novedades al abrir la app: sale una sola vez por versión de novedades, tanto a quien la actualiza como a quien la
// abre por primera vez (el aviso lleva un acceso directo a Apariencia, útil para quien llega nuevo).
//
// Al sacar una versión con cambios que merezcan aviso: sube WHATS_NEW_VERSION y reescribe los textos whatsnew.* (en todos
// los idiomas). Una versión sin cambios que contar no toca nada y no vuelve a mostrar el aviso.

import { readStorage, writeStorage } from './store.js';

/** Versión a la que se refieren los textos whatsnew.*; se muestra en el título */
export const WHATS_NEW_VERSION = '1.19';

const KEY_SEEN = 'gym_whatsnew_seen';

/** ¿Hay que enseñar las novedades? Sí si no se han visto todavía (una instalación nueva tampoco las ha visto). */
export function shouldShowWhatsNew() {
  return readStorage(KEY_SEEN, /** @type {string} */ (''), v => typeof v === 'string') !== WHATS_NEW_VERSION;
}

export function markWhatsNewSeen() {
  writeStorage(KEY_SEEN, WHATS_NEW_VERSION);
}
