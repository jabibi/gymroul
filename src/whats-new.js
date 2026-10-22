// @ts-check
// Aviso de novedades al abrir la app tras actualizarla. Sale una sola vez por versión de novedades y no a quien acaba
// de instalar la app (ya ve la versión nueva; no hay nada que explicarle).
//
// Al sacar una versión con cambios que merezcan aviso: sube WHATS_NEW_VERSION y reescribe los textos whatsnew.* (en todos
// los idiomas). Una versión sin cambios que contar no toca nada y no vuelve a mostrar el aviso.

import { readStorage, writeStorage } from './store.js';

/** Versión a la que se refieren los textos whatsnew.*; se muestra en el título */
export const WHATS_NEW_VERSION = '1.18';

const KEY_SEEN = 'gym_whatsnew_seen';

/**
 * ¿Hay que enseñar las novedades? En una instalación nueva se da por vistas sin mostrarlas.
 * @param {boolean} freshInstall resultado de isFreshInstall(), consultado antes de migrate()
 */
export function shouldShowWhatsNew(freshInstall) {
  if (freshInstall) {
    markWhatsNewSeen();
    return false;
  }
  return readStorage(KEY_SEEN, /** @type {string} */ (''), v => typeof v === 'string') !== WHATS_NEW_VERSION;
}

export function markWhatsNewSeen() {
  writeStorage(KEY_SEEN, WHATS_NEW_VERSION);
}
