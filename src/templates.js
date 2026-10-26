// @ts-check
// Plantillas del sistema: conjuntos de ejercicios ya preparados. No se pueden modificar ni borrar; solo cargarlas en la
// ruleta o copiarlas a las plantillas del usuario. Son datos puros, sin DOM ni almacenamiento.
//
// Los ejercicios del sistema tienen id propio y nombre inglés guardado (su identidad, igual que los seis por defecto) y se
// muestran traducidos con exerciseName (src/exercise-names.js, clave exercise.<clave>). El nombre de cada plantilla es la
// clave template.<clave> en cada idioma. Un ejercicio puede estar en varias plantillas (con rangos distintos).

/** @typedef {import('./wheel-math.js').Exercise} Exercise */

/**
 * Catálogo de ejercicios del sistema. Los ids '1' a '6' son los de la ruleta por defecto (no cambiar: están guardados en
 * los móviles de los usuarios); el icono es uno del catálogo cerrado de src/icons.js.
 * @type {{ id: string, slug: string, name: string, icon: string }[]}
 */
export const SYSTEM_EXERCISES = [
  { id: '1', slug: 'burpee', name: 'Burpee', icon: 'burpee' },
  { id: '2', slug: 'lunge', name: 'Lunge', icon: 'walk' },
  { id: '3', slug: 'pushup', name: 'Push-up', icon: 'pushup' },
  { id: '4', slug: 'squat', name: 'Air Squat', icon: 'squat' },
  { id: '5', slug: 'climbers', name: 'Mountain Climbers', icon: 'climbers' },
  { id: '6', slug: 'splitjump', name: 'Split Jumps', icon: 'jump' },
  // Cardio
  { id: '7', slug: 'jumpingjacks', name: 'Jumping Jacks', icon: 'handsup' },
  { id: '8', slug: 'highknees', name: 'High Knees', icon: 'run-fast' },
  { id: '9', slug: 'jumprope', name: 'Jump Rope', icon: 'jump-rope' },
  { id: '10', slug: 'skaters', name: 'Skaters', icon: 'sprint' },
  { id: '11', slug: 'buttkicks', name: 'Butt Kicks', icon: 'run' },
  // Con pesas
  { id: '12', slug: 'dumbbellpress', name: 'Dumbbell Press', icon: 'lift-up' },
  { id: '13', slug: 'gobletsquat', name: 'Goblet Squat', icon: 'weight' },
  { id: '14', slug: 'kettlebellswing', name: 'Kettlebell Swing', icon: 'kettlebell' },
  { id: '15', slug: 'dumbbellrow', name: 'Dumbbell Row', icon: 'pull' },
  { id: '16', slug: 'deadlift', name: 'Deadlift', icon: 'lift-down' },
  { id: '17', slug: 'overheadpress', name: 'Overhead Press', icon: 'weight-lifter' },
  // En casa y sin ruido
  { id: '18', slug: 'wallsit', name: 'Wall Sit', icon: 'bench' },
  { id: '19', slug: 'glutebridge', name: 'Glute Bridge', icon: 'yoga' },
  { id: '20', slug: 'deadbug', name: 'Dead Bug', icon: 'situp' },
  { id: '21', slug: 'birddog', name: 'Bird Dog', icon: 'balance' },
  { id: '22', slug: 'calfraises', name: 'Calf Raises', icon: 'footprint' },
  // Abdominales
  { id: '23', slug: 'superman', name: 'Superman', icon: 'gymnastics' },
  { id: '24', slug: 'heeltouches', name: 'Heel Touches', icon: 'situp' },
  { id: '25', slug: 'tuckups', name: 'Tuck-ups', icon: 'situp' },
  { id: '26', slug: 'russiantwists', name: 'Russian Twists', icon: 'repeat' },
  { id: '27', slug: 'crunch', name: 'Crunch', icon: 'situp' },
  { id: '28', slug: 'bicyclecrunch', name: 'Bicycle Crunch', icon: 'bike' },
  { id: '29', slug: 'flutterkicks', name: 'Flutter Kicks', icon: 'leg' },
  { id: '30', slug: 'forearmplank', name: 'Forearm Plank', icon: 'plank' },
];

/** @typedef {{ id: string, repsMin: number, repsMax: number }} TemplateEntry ejercicio del sistema (por id) con su rango en esa plantilla */
/** @typedef {{ slug: string, exercises: TemplateEntry[] }} SystemTemplate */

/**
 * Una entrada por id con el mismo rango para todas, salvo las que se indican.
 * @param {string[]} ids
 * @param {number} min
 * @param {number} max
 * @param {Record<string, [number, number]>} [own] rango propio por id
 * @returns {TemplateEntry[]}
 */
const entries = (ids, min, max, own = {}) =>
  ids.map(id => ({ id, repsMin: own[id]?.[0] ?? min, repsMax: own[id]?.[1] ?? max }));

/** @type {SystemTemplate[]} */
export const SYSTEM_TEMPLATES = [
  // La misma lista que trae la ruleta de fábrica
  { slug: 'bodyweight', exercises: entries(['1', '2', '3', '4', '5', '6'], 10, 60) },
  { slug: 'cardio', exercises: entries(['7', '5', '8', '9', '10', '11'], 20, 60, { 9: [30, 100], 10: [10, 40] }) },
  { slug: 'weights', exercises: entries(['12', '13', '14', '15', '16', '17'], 6, 12, { 14: [10, 20] }) },
  { slug: 'home', exercises: entries(['18', '30', '19', '20', '21', '22'], 10, 30, { 22: [15, 40] }) },
  { slug: 'abs', exercises: entries(['23', '24', '25', '26', '27', '28', '29', '30'], 10, 20, { 24: [20, 40], 26: [20, 40], 27: [15, 30], 28: [20, 40], 29: [20, 40], 30: [10, 30] }) },
];

/** @param {string} id */
export const systemExercise = id => SYSTEM_EXERCISES.find(e => e.id === id);

/**
 * Los ejercicios de una plantilla del sistema tal como quedan en el catálogo de la ruleta: con su id y su nombre inglés
 * (así siguen traduciéndose).
 * @param {SystemTemplate} template
 * @returns {Exercise[]}
 */
export function systemTemplateExercises(template) {
  return template.exercises.map(({ id, repsMin, repsMax }) => {
    const ex = /** @type {NonNullable<ReturnType<typeof systemExercise>>} */ (systemExercise(id));
    return { id: ex.id, name: ex.name, icon: ex.icon, repsMin, repsMax };
  });
}
