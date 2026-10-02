// @ts-check
// Catálogo cerrado de iconos para los ejercicios. El usuario solo puede elegir uno de esta lista.
//
// Cada entrada lleva la clase de @iconify/tailwind ESCRITA COMPLETA (icon-[conjunto--nombre]):
// Tailwind solo genera el CSS de las clases que aparecen literalmente en el código fuente, así
// que no pueden construirse dinámicamente. Cada icono se compila a una máscara CSS (sin red).
//
// Conjuntos: Material Design Icons (mdi, Apache-2.0), Game Icons (game-icons, CC BY 3.0, ver
// public/creditos.html) y pictogramas propios (gymroul, src/custom-icons.js).

/**
 * @typedef {{ id: string, cls: string, label: string, keywords: string }} IconDef
 * @typedef {{ name: string, icons: IconDef[] }} IconGroup
 */

/** @type {IconGroup[]} */
export const ICON_GROUPS = [
  {
    name: 'Fuerza y pesas',
    icons: [
      { id: 'dumbbell', cls: 'icon-[mdi--dumbbell]', label: 'Mancuerna', keywords: 'pesas gimnasio musculacion fuerza' },
      { id: 'kettlebell', cls: 'icon-[mdi--kettlebell]', label: 'Kettlebell', keywords: 'pesa rusa crossfit swing' },
      { id: 'weight-lifter', cls: 'icon-[mdi--weight-lifter]', label: 'Halterofilia', keywords: 'levantamiento barra press crossfit snatch clean' },
      { id: 'lift-up', cls: 'icon-[game-icons--weight-lifting-up]', label: 'Levantar peso', keywords: 'press militar jerk barra arriba' },
      { id: 'lift-down', cls: 'icon-[game-icons--weight-lifting-down]', label: 'Peso abajo', keywords: 'peso muerto deadlift sentadilla barra' },
      { id: 'weight', cls: 'icon-[mdi--weight]', label: 'Peso', keywords: 'disco carga kilos' },
      { id: 'bench', cls: 'icon-[mdi--bench-back]', label: 'Banco', keywords: 'press banca remo' },
      { id: 'anvil', cls: 'icon-[mdi--anvil]', label: 'Yunque', keywords: 'fuerza potencia strongman' },
      { id: 'hammer', cls: 'icon-[mdi--hammer]', label: 'Martillo', keywords: 'sledgehammer crossfit golpeo neumatico' },
      { id: 'tire', cls: 'icon-[mdi--tire]', label: 'Neumático', keywords: 'tire flip crossfit strongman volteo' },
      { id: 'sandbag', cls: 'icon-[game-icons--gym-bag]', label: 'Saco de arena', keywords: 'sandbag hyrox lunges bolsa carga' },
      { id: 'arm-flex', cls: 'icon-[mdi--arm-flex]', label: 'Bíceps', keywords: 'brazos curl musculo fuerza' },
      { id: 'arm', cls: 'icon-[game-icons--arm]', label: 'Brazo', keywords: 'triceps hombros fondos' },
      { id: 'leg', cls: 'icon-[game-icons--leg]', label: 'Piernas', keywords: 'sentadilla squat zancada gluteos cuadriceps' },
      { id: 'boulder', cls: 'icon-[game-icons--falling-boulder]', label: 'Roca', keywords: 'piedra atlas stone strongman' },
      { id: 'rock', cls: 'icon-[game-icons--rock]', label: 'Piedra', keywords: 'atlas stone ocr carga' },
    ],
  },
  {
    name: 'Calistenia y gimnasia',
    icons: [
      { id: 'gymnastics', cls: 'icon-[mdi--gymnastics]', label: 'Gimnasia', keywords: 'calistenia acrobacia' },
      { id: 'muscle-up', cls: 'icon-[game-icons--muscle-up]', label: 'Muscle-up', keywords: 'dominadas barra calistenia pull-up' },
      { id: 'pull', cls: 'icon-[game-icons--pull]', label: 'Tirón', keywords: 'dominadas remo pull-up calistenia' },
      { id: 'pushup', cls: 'icon-[gymroul--pushup]', label: 'Flexiones', keywords: 'push-up pushup suelo pecho triceps calistenia fondos' },
      { id: 'plank', cls: 'icon-[gymroul--plank]', label: 'Plancha', keywords: 'core abdominales isometrico suelo calistenia' },
      { id: 'situp', cls: 'icon-[gymroul--situp]', label: 'Abdominales', keywords: 'sit-up crunch core suelo calistenia' },
      { id: 'burpee', cls: 'icon-[gymroul--burpee]', label: 'Burpee', keywords: 'salto suelo hiit crossfit cardio' },
      { id: 'climbers', cls: 'icon-[gymroul--climbers]', label: 'Mountain climbers', keywords: 'escaladores escalador rodillas cardio core suelo hiit crossfit' },
      { id: 'squat', cls: 'icon-[gymroul--squat]', label: 'Sentadilla', keywords: 'air squat piernas gluteos cuadriceps calistenia' },
      { id: 'push', cls: 'icon-[game-icons--push]', label: 'Empujar', keywords: 'empuje pared trineo sled push muro' },
      { id: 'cartwheel', cls: 'icon-[game-icons--cartwheel]', label: 'Voltereta', keywords: 'rueda acrobacia gimnasia' },
      { id: 'handsup', cls: 'icon-[mdi--human-handsup]', label: 'Brazos arriba', keywords: 'estiramiento press overhead' },
      { id: 'balance', cls: 'icon-[game-icons--body-balance]', label: 'Equilibrio', keywords: 'handstand pino plancha core' },
      { id: 'jump-rope', cls: 'icon-[mdi--jump-rope]', label: 'Comba', keywords: 'cuerda saltar double unders crossfit' },
      { id: 'jump', cls: 'icon-[game-icons--jump-across]', label: 'Salto', keywords: 'box jump saltos burpee broad jumps split jumps pliometria' },
      { id: 'ladder', cls: 'icon-[mdi--ladder]', label: 'Escalera', keywords: 'agilidad trepa ocr' },
      { id: 'stairs', cls: 'icon-[mdi--stairs-up]', label: 'Escaleras', keywords: 'subir peldanos gradas cardio' },
      { id: 'rope', cls: 'icon-[game-icons--rope-coil]', label: 'Cuerda', keywords: 'battle rope trepa cuerdas crossfit ocr' },
    ],
  },
  {
    name: 'Cardio y resistencia',
    icons: [
      { id: 'run', cls: 'icon-[mdi--run]', label: 'Correr', keywords: 'carrera running trote' },
      { id: 'run-fast', cls: 'icon-[mdi--run-fast]', label: 'Carrera rápida', keywords: 'sprint velocidad escaladores mountain climbers' },
      { id: 'sprint', cls: 'icon-[game-icons--sprint]', label: 'Sprint', keywords: 'velocidad series atletismo' },
      { id: 'walk', cls: 'icon-[mdi--walk]', label: 'Caminar', keywords: 'zancadas lunges marcha paseo' },
      { id: 'hiking', cls: 'icon-[mdi--hiking]', label: 'Senderismo', keywords: 'montana trekking caminata' },
      { id: 'sneaker', cls: 'icon-[mdi--shoe-sneaker]', label: 'Zapatillas', keywords: 'correr running calzado' },
      { id: 'footprint', cls: 'icon-[mdi--shoe-print]', label: 'Pasos', keywords: 'huellas marcha caminata' },
      { id: 'bike', cls: 'icon-[mdi--bike]', label: 'Bicicleta', keywords: 'ciclismo spinning cardio' },
      { id: 'bike-fast', cls: 'icon-[mdi--bike-fast]', label: 'Ciclismo rápido', keywords: 'assault bike velocidad' },
      { id: 'rowing', cls: 'icon-[mdi--rowing]', label: 'Remo', keywords: 'remar ergometro hyrox crossfit' },
      { id: 'skierg', cls: 'icon-[mdi--ski-cross-country]', label: 'Esquí de fondo', keywords: 'skierg hyrox esqui ergometro' },
      { id: 'heart-pulse', cls: 'icon-[mdi--heart-pulse]', label: 'Pulsaciones', keywords: 'cardio corazon salud' },
      { id: 'fire', cls: 'icon-[mdi--fire]', label: 'Fuego', keywords: 'burpee intenso quemar calorias hiit' },
      { id: 'bolt', cls: 'icon-[mdi--lightning-bolt]', label: 'Rayo', keywords: 'explosivo potencia energia rapido' },
      { id: 'timer', cls: 'icon-[mdi--timer]', label: 'Cronómetro', keywords: 'tiempo isometrico plancha emom' },
      { id: 'hourglass', cls: 'icon-[mdi--timer-sand]', label: 'Temporizador', keywords: 'tabata intervalos descanso' },
      { id: 'infinity', cls: 'icon-[mdi--infinity]', label: 'Infinito', keywords: 'amrap sin parar resistencia' },
      { id: 'repeat', cls: 'icon-[mdi--repeat]', label: 'Series', keywords: 'repeticiones circuito rondas' },
    ],
  },
  {
    name: 'Artes marciales y combate',
    icons: [
      { id: 'karate', cls: 'icon-[mdi--karate]', label: 'Karate', keywords: 'kimono dojo artes marciales judo taekwondo' },
      { id: 'boxing', cls: 'icon-[mdi--boxing-glove]', label: 'Boxeo', keywords: 'guante sparring kickboxing' },
      { id: 'mma', cls: 'icon-[mdi--mixed-martial-arts]', label: 'MMA', keywords: 'artes marciales mixtas lucha combate' },
      { id: 'high-kick', cls: 'icon-[game-icons--high-kick]', label: 'Patada alta', keywords: 'taekwondo kickboxing karate patadas' },
      { id: 'kick', cls: 'icon-[game-icons--soccer-kick]', label: 'Patada', keywords: 'golpeo kickboxing muay thai' },
      { id: 'punch', cls: 'icon-[game-icons--punch]', label: 'Puñetazo', keywords: 'golpe boxeo directo' },
      { id: 'punching-bag', cls: 'icon-[game-icons--punching-bag]', label: 'Saco de boxeo', keywords: 'golpeo entrenamiento boxeo' },
      { id: 'fist', cls: 'icon-[game-icons--fist]', label: 'Puño', keywords: 'kung fu karate fuerza' },
      { id: 'ninja', cls: 'icon-[mdi--ninja]', label: 'Ninja', keywords: 'artes marciales ninjutsu agilidad' },
      { id: 'sword', cls: 'icon-[mdi--sword-cross]', label: 'Espadas', keywords: 'kendo esgrima lucha' },
      { id: 'fencing', cls: 'icon-[mdi--fencing]', label: 'Esgrima', keywords: 'espada florete' },
      { id: 'shield', cls: 'icon-[mdi--shield]', label: 'Defensa', keywords: 'autodefensa proteccion' },
    ],
  },
  {
    name: 'Mente y cuerpo',
    icons: [
      { id: 'yoga', cls: 'icon-[mdi--yoga]', label: 'Yoga', keywords: 'asanas estiramiento flexibilidad pilates' },
      { id: 'meditation', cls: 'icon-[mdi--meditation]', label: 'Meditación', keywords: 'respiracion mindfulness relajacion' },
      { id: 'lotus', cls: 'icon-[game-icons--lotus-flower]', label: 'Loto', keywords: 'yoga meditacion zen' },
      { id: 'yin-yang', cls: 'icon-[mdi--yin-yang]', label: 'Yin yang', keywords: 'tai chi taichi equilibrio qigong' },
      { id: 'spa', cls: 'icon-[mdi--spa]', label: 'Relajación', keywords: 'pilates stretching recuperacion bienestar' },
      { id: 'flower', cls: 'icon-[mdi--flower]', label: 'Flor', keywords: 'pilates yoga calma' },
      { id: 'tortoise', cls: 'icon-[mdi--tortoise]', label: 'Tortuga', keywords: 'lento tai chi control tempo' },
      { id: 'hand-heart', cls: 'icon-[mdi--hand-heart]', label: 'Bienestar', keywords: 'salud cuidado respiracion' },
    ],
  },
  {
    name: 'Deportes',
    icons: [
      { id: 'soccer', cls: 'icon-[mdi--soccer]', label: 'Fútbol', keywords: 'balon futbol' },
      { id: 'basketball', cls: 'icon-[mdi--basketball]', label: 'Baloncesto', keywords: 'basket balon wall ball' },
      { id: 'volleyball', cls: 'icon-[mdi--volleyball]', label: 'Voleibol', keywords: 'voley balon' },
      { id: 'tennis', cls: 'icon-[mdi--tennis]', label: 'Tenis', keywords: 'raqueta pelota padel' },
      { id: 'table-tennis', cls: 'icon-[mdi--table-tennis]', label: 'Tenis de mesa', keywords: 'ping pong' },
      { id: 'badminton', cls: 'icon-[mdi--badminton]', label: 'Bádminton', keywords: 'raqueta volante' },
      { id: 'rugby', cls: 'icon-[mdi--rugby]', label: 'Rugby', keywords: 'balon' },
      { id: 'football', cls: 'icon-[mdi--football]', label: 'Fútbol americano', keywords: 'balon' },
      { id: 'handball', cls: 'icon-[mdi--handball]', label: 'Balonmano', keywords: 'balon' },
      { id: 'baseball', cls: 'icon-[mdi--baseball]', label: 'Béisbol', keywords: 'bate pelota' },
      { id: 'golf', cls: 'icon-[mdi--golf]', label: 'Golf', keywords: 'palo bola' },
      { id: 'hockey', cls: 'icon-[mdi--hockey-sticks]', label: 'Hockey', keywords: 'palo disco' },
      { id: 'bowling', cls: 'icon-[mdi--bowling]', label: 'Bolos', keywords: 'bola' },
      { id: 'archery', cls: 'icon-[game-icons--archery-target]', label: 'Tiro con arco', keywords: 'diana puntería precision' },
      { id: 'target', cls: 'icon-[mdi--target]', label: 'Diana', keywords: 'objetivo precision reto' },
      { id: 'skate', cls: 'icon-[mdi--skate]', label: 'Skate', keywords: 'patinete monopatin' },
      { id: 'roller-skate', cls: 'icon-[mdi--roller-skate]', label: 'Patinaje', keywords: 'patines' },
    ],
  },
  {
    name: 'Agua, montaña y aire libre',
    icons: [
      { id: 'swim', cls: 'icon-[mdi--swim]', label: 'Natación', keywords: 'nadar piscina crol' },
      { id: 'pool', cls: 'icon-[mdi--pool]', label: 'Piscina', keywords: 'agua nadar aquagym' },
      { id: 'waves', cls: 'icon-[mdi--waves]', label: 'Olas', keywords: 'agua mar aquagym' },
      { id: 'surf', cls: 'icon-[mdi--surfing]', label: 'Surf', keywords: 'olas tabla' },
      { id: 'kayak', cls: 'icon-[mdi--kayaking]', label: 'Kayak', keywords: 'piragua remo' },
      { id: 'sailing', cls: 'icon-[mdi--sail-boat]', label: 'Vela', keywords: 'barco' },
      { id: 'diving', cls: 'icon-[mdi--diving-scuba]', label: 'Buceo', keywords: 'apnea submarinismo' },
      { id: 'climbing', cls: 'icon-[game-icons--mountain-climbing]', label: 'Escalada', keywords: 'trepar roca boulder ocr' },
      { id: 'terrain', cls: 'icon-[mdi--terrain]', label: 'Montaña', keywords: 'trail cuestas senderismo' },
      { id: 'ski', cls: 'icon-[mdi--ski]', label: 'Esquí', keywords: 'nieve alpino' },
      { id: 'snowboard', cls: 'icon-[mdi--snowboard]', label: 'Snowboard', keywords: 'nieve tabla' },
      { id: 'sled', cls: 'icon-[mdi--sledding]', label: 'Trineo', keywords: 'sled push pull hyrox arrastre empuje' },
      { id: 'horse', cls: 'icon-[mdi--horse-variant-fast]', label: 'Hípica', keywords: 'caballo equitacion' },
    ],
  },
  {
    name: 'Obstáculos y retos',
    icons: [
      { id: 'fence', cls: 'icon-[mdi--fence]', label: 'Valla', keywords: 'obstaculo ocr salto muro' },
      { id: 'flag', cls: 'icon-[mdi--flag-checkered]', label: 'Meta', keywords: 'final carrera ocr hyrox llegada' },
      { id: 'trophy', cls: 'icon-[mdi--trophy]', label: 'Trofeo', keywords: 'reto especial campeon' },
      { id: 'medal', cls: 'icon-[mdi--medal]', label: 'Medalla', keywords: 'logro premio' },
      { id: 'dice', cls: 'icon-[mdi--dice-multiple]', label: 'Dados', keywords: 'azar aleatorio sorpresa' },
      { id: 'star', cls: 'icon-[mdi--star]', label: 'Estrella', keywords: 'favorito especial' },
      { id: 'rocket', cls: 'icon-[mdi--rocket-launch]', label: 'Cohete', keywords: 'explosivo despegue potencia' },
      { id: 'tractor', cls: 'icon-[mdi--tractor]', label: 'Tractor', keywords: 'arrastre neumatico strongman' },
    ],
  },
];

/** Lista plana de todos los iconos */
export const ICONS = ICON_GROUPS.flatMap(g => g.icons);

export const DEFAULT_ICON = 'dumbbell';

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

/** Quita tildes y pasa a minúsculas para buscar sin importar acentos. */
export const normalizeText = (/** @type {string} */ text) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/**
 * Iconos que coinciden con un texto de búsqueda (nombre o palabras clave), sin acentos.
 * @param {string} query
 */
export function searchIcons(query) {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return ICONS;
  return ICONS.filter(icon => {
    const haystack = normalizeText(`${icon.label} ${icon.keywords}`);
    return terms.every(t => haystack.includes(t));
  });
}
