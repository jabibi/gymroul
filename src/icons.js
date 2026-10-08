// @ts-check
// Catálogo cerrado de iconos para los ejercicios. El usuario solo puede elegir uno de esta lista.
// Las etiquetas visibles y las palabras clave de búsqueda NO están aquí: viven en cada idioma
// (src/i18n/locales/*.js, tabla "icons") para poder traducirlas.
//
// Cada entrada lleva la clase de @iconify/tailwind ESCRITA COMPLETA (prefijo icon, el conjunto y el nombre entre corchetes, separados por dos guiones):
// Tailwind solo genera el CSS de las clases que aparecen literalmente en el código fuente, así
// que no pueden construirse dinámicamente. Cada icono se compila a una máscara CSS (sin red).
//
// Conjuntos: Material Design Icons (mdi, Apache-2.0), Game Icons (game-icons, CC BY 3.0, ver
// public/credits.html) y pictogramas propios (gymroul, src/custom-icons.js).

/**
 * @typedef {{ id: string, cls: string }} IconDef
 * @typedef {{ id: string, icons: IconDef[] }} IconGroup
 */

/** @type {IconGroup[]} */
export const ICON_GROUPS = [
  {
    id: 'strength',
    icons: [
      { id: 'dumbbell', cls: 'icon-[mdi--dumbbell]' },
      { id: 'kettlebell', cls: 'icon-[mdi--kettlebell]' },
      { id: 'weight-lifter', cls: 'icon-[mdi--weight-lifter]' },
      { id: 'lift-up', cls: 'icon-[game-icons--weight-lifting-up]' },
      { id: 'lift-down', cls: 'icon-[game-icons--weight-lifting-down]' },
      { id: 'weight', cls: 'icon-[mdi--weight]' },
      { id: 'bench', cls: 'icon-[mdi--bench-back]' },
      { id: 'anvil', cls: 'icon-[mdi--anvil]' },
      { id: 'hammer', cls: 'icon-[mdi--hammer]' },
      { id: 'tire', cls: 'icon-[mdi--tire]' },
      { id: 'sandbag', cls: 'icon-[game-icons--gym-bag]' },
      { id: 'arm-flex', cls: 'icon-[mdi--arm-flex]' },
      { id: 'arm', cls: 'icon-[game-icons--arm]' },
      { id: 'leg', cls: 'icon-[game-icons--leg]' },
      { id: 'boulder', cls: 'icon-[game-icons--falling-boulder]' },
      { id: 'rock', cls: 'icon-[game-icons--rock]' },
    ],
  },
  {
    id: 'calisthenics',
    icons: [
      { id: 'gymnastics', cls: 'icon-[mdi--gymnastics]' },
      { id: 'muscle-up', cls: 'icon-[game-icons--muscle-up]' },
      { id: 'pull', cls: 'icon-[game-icons--pull]' },
      { id: 'pushup', cls: 'icon-[gymroul--pushup]' },
      { id: 'plank', cls: 'icon-[gymroul--plank]' },
      { id: 'situp', cls: 'icon-[gymroul--situp]' },
      { id: 'burpee', cls: 'icon-[gymroul--burpee]' },
      { id: 'climbers', cls: 'icon-[gymroul--climbers]' },
      { id: 'squat', cls: 'icon-[gymroul--squat]' },
      { id: 'push', cls: 'icon-[game-icons--push]' },
      { id: 'cartwheel', cls: 'icon-[game-icons--cartwheel]' },
      { id: 'handsup', cls: 'icon-[mdi--human-handsup]' },
      { id: 'balance', cls: 'icon-[game-icons--body-balance]' },
      { id: 'jump-rope', cls: 'icon-[mdi--jump-rope]' },
      { id: 'jump', cls: 'icon-[game-icons--jump-across]' },
      { id: 'ladder', cls: 'icon-[mdi--ladder]' },
      { id: 'stairs', cls: 'icon-[mdi--stairs-up]' },
      { id: 'rope', cls: 'icon-[game-icons--rope-coil]' },
    ],
  },
  {
    id: 'cardio',
    icons: [
      { id: 'run', cls: 'icon-[mdi--run]' },
      { id: 'run-fast', cls: 'icon-[mdi--run-fast]' },
      { id: 'sprint', cls: 'icon-[game-icons--sprint]' },
      { id: 'walk', cls: 'icon-[mdi--walk]' },
      { id: 'hiking', cls: 'icon-[mdi--hiking]' },
      { id: 'sneaker', cls: 'icon-[mdi--shoe-sneaker]' },
      { id: 'footprint', cls: 'icon-[mdi--shoe-print]' },
      { id: 'bike', cls: 'icon-[mdi--bike]' },
      { id: 'bike-fast', cls: 'icon-[mdi--bike-fast]' },
      { id: 'rowing', cls: 'icon-[mdi--rowing]' },
      { id: 'skierg', cls: 'icon-[mdi--ski-cross-country]' },
      { id: 'heart-pulse', cls: 'icon-[mdi--heart-pulse]' },
      { id: 'fire', cls: 'icon-[mdi--fire]' },
      { id: 'bolt', cls: 'icon-[mdi--lightning-bolt]' },
      { id: 'timer', cls: 'icon-[mdi--timer]' },
      { id: 'hourglass', cls: 'icon-[mdi--timer-sand]' },
      { id: 'infinity', cls: 'icon-[mdi--infinity]' },
      { id: 'repeat', cls: 'icon-[mdi--repeat]' },
    ],
  },
  {
    id: 'martial',
    icons: [
      { id: 'karate', cls: 'icon-[mdi--karate]' },
      { id: 'boxing', cls: 'icon-[mdi--boxing-glove]' },
      { id: 'mma', cls: 'icon-[mdi--mixed-martial-arts]' },
      { id: 'high-kick', cls: 'icon-[game-icons--high-kick]' },
      { id: 'kick', cls: 'icon-[game-icons--soccer-kick]' },
      { id: 'punch', cls: 'icon-[game-icons--punch]' },
      { id: 'punching-bag', cls: 'icon-[game-icons--punching-bag]' },
      { id: 'fist', cls: 'icon-[game-icons--fist]' },
      { id: 'ninja', cls: 'icon-[mdi--ninja]' },
      { id: 'sword', cls: 'icon-[mdi--sword-cross]' },
      { id: 'fencing', cls: 'icon-[mdi--fencing]' },
      { id: 'shield', cls: 'icon-[mdi--shield]' },
    ],
  },
  {
    id: 'mindbody',
    icons: [
      { id: 'yoga', cls: 'icon-[mdi--yoga]' },
      { id: 'meditation', cls: 'icon-[mdi--meditation]' },
      { id: 'lotus', cls: 'icon-[game-icons--lotus-flower]' },
      { id: 'yin-yang', cls: 'icon-[mdi--yin-yang]' },
      { id: 'spa', cls: 'icon-[mdi--spa]' },
      { id: 'flower', cls: 'icon-[mdi--flower]' },
      { id: 'tortoise', cls: 'icon-[mdi--tortoise]' },
      { id: 'hand-heart', cls: 'icon-[mdi--hand-heart]' },
    ],
  },
  {
    id: 'sports',
    icons: [
      { id: 'soccer', cls: 'icon-[mdi--soccer]' },
      { id: 'basketball', cls: 'icon-[mdi--basketball]' },
      { id: 'volleyball', cls: 'icon-[mdi--volleyball]' },
      { id: 'tennis', cls: 'icon-[mdi--tennis]' },
      { id: 'table-tennis', cls: 'icon-[mdi--table-tennis]' },
      { id: 'badminton', cls: 'icon-[mdi--badminton]' },
      { id: 'rugby', cls: 'icon-[mdi--rugby]' },
      { id: 'football', cls: 'icon-[mdi--football]' },
      { id: 'handball', cls: 'icon-[mdi--handball]' },
      { id: 'baseball', cls: 'icon-[mdi--baseball]' },
      { id: 'golf', cls: 'icon-[mdi--golf]' },
      { id: 'hockey', cls: 'icon-[mdi--hockey-sticks]' },
      { id: 'bowling', cls: 'icon-[mdi--bowling]' },
      { id: 'archery', cls: 'icon-[game-icons--archery-target]' },
      { id: 'target', cls: 'icon-[mdi--target]' },
      { id: 'skate', cls: 'icon-[mdi--skate]' },
      { id: 'roller-skate', cls: 'icon-[mdi--roller-skate]' },
    ],
  },
  {
    id: 'outdoor',
    icons: [
      { id: 'swim', cls: 'icon-[mdi--swim]' },
      { id: 'pool', cls: 'icon-[mdi--pool]' },
      { id: 'waves', cls: 'icon-[mdi--waves]' },
      { id: 'surf', cls: 'icon-[mdi--surfing]' },
      { id: 'kayak', cls: 'icon-[mdi--kayaking]' },
      { id: 'sailing', cls: 'icon-[mdi--sail-boat]' },
      { id: 'diving', cls: 'icon-[mdi--diving-scuba]' },
      { id: 'climbing', cls: 'icon-[game-icons--mountain-climbing]' },
      { id: 'terrain', cls: 'icon-[mdi--terrain]' },
      { id: 'ski', cls: 'icon-[mdi--ski]' },
      { id: 'snowboard', cls: 'icon-[mdi--snowboard]' },
      { id: 'sled', cls: 'icon-[mdi--sledding]' },
      { id: 'horse', cls: 'icon-[mdi--horse-variant-fast]' },
    ],
  },
  {
    id: 'challenges',
    icons: [
      { id: 'fence', cls: 'icon-[mdi--fence]' },
      { id: 'flag', cls: 'icon-[mdi--flag-checkered]' },
      { id: 'trophy', cls: 'icon-[mdi--trophy]' },
      { id: 'medal', cls: 'icon-[mdi--medal]' },
      { id: 'dice', cls: 'icon-[mdi--dice-multiple]' },
      { id: 'star', cls: 'icon-[mdi--star]' },
      { id: 'rocket', cls: 'icon-[mdi--rocket-launch]' },
      { id: 'tractor', cls: 'icon-[mdi--tractor]' },
    ],
  },
];

/** Lista plana de todos los iconos */
export const ICONS = ICON_GROUPS.flatMap(g => g.icons);

export const DEFAULT_ICON = 'dumbbell';

import { iconSearchText } from './i18n/index.js';

const byId = new Map(ICONS.map(i => [i.id, i]));

/** @param {unknown} id */
export const isValidIcon = id => typeof id === 'string' && byId.has(id);

/**
 * Devuelve el id si pertenece al catálogo; en cualquier otro caso el icono por defecto.
 * @param {unknown} id
 */
export const normalizeIcon = id => (isValidIcon(id) ? /** @type {string} */ (id) : DEFAULT_ICON);

/** @param {unknown} id */
export const getIcon = id => /** @type {IconDef} */ (byId.get(normalizeIcon(id)));

/**
 * Traducción de los nombres de Font Awesome usados antes de existir el catálogo.
 * @type {Record<string, string>}
 */
export const LEGACY_ICON_MAP = {
  'fa-dumbbell': 'dumbbell',
  'fa-fire': 'fire',
  'fa-person-running': 'run',
  'fa-person-walking': 'walk',
  'fa-child-reaching': 'pushup',
  'fa-bolt': 'bolt',
  'fa-angles-up': 'jump',
  'fa-heart-pulse': 'heart-pulse',
  'fa-stopwatch': 'timer',
  'fa-trophy': 'trophy',
};

/**
 * Convierte un icono antiguo (fa-*, emoji o texto libre) a un id del catálogo.
 * @param {unknown} icon
 */
export const migrateLegacyIcon = icon =>
  isValidIcon(icon) ? /** @type {string} */ (icon) : normalizeIcon(typeof icon === 'string' ? LEGACY_ICON_MAP[icon] : undefined);

/**
 * Quita tildes y pasa a minúsculas para buscar sin importar acentos. En árabe también quita la vocalización,
 * el alargamiento (tatwil) y unifica las formas de alef (أ إ آ → ا), alef maqsura (ى → ي) y ta marbuta (ة → ه),
 * que se escriben de forma distinta según la persona sin cambiar la palabra.
 */
export const normalizeText = (/** @type {string} */ text) =>
  text.normalize('NFD')
    .replace(/[\u0300-\u036f\u064b-\u065f\u0670\u0640]/g, '')
    .replace(/\u0671/g, '\u0627').replace(/\u0649/g, '\u064a').replace(/\u0629/g, '\u0647')
    .toLowerCase();

/** Etiqueta de un icono en el idioma activo. */
export { iconLabel, groupName } from './i18n/index.js';

/** Texto buscable (etiquetas y palabras clave de todos los idiomas) normalizado, calculado una vez por icono. */
const searchIndex = new Map(ICONS.map(i => [i.id, normalizeText(iconSearchText(i.id))]));

/**
 * Iconos que coinciden con un texto de búsqueda en CUALQUIER idioma, sin distinguir acentos ni
 * mayúsculas: escribir «boxeo», «boxing» o «boxe» encuentra el mismo icono.
 * @param {string} query
 */
export function searchIcons(query) {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return ICONS;
  return ICONS.filter(icon => terms.every(t => (searchIndex.get(icon.id) ?? '').includes(t)));
}
