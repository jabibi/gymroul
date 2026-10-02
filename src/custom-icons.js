// @ts-check
// Pictogramas propios (conjunto "gymroul") para ejercicios de suelo que no existen en MDI ni Game Icons.
// Vista lateral, trazo redondeado y cabeza rellena. Las usa @iconify/tailwind como cualquier otro
// conjunto: clase icon-[gymroul--nombre]. Se importa desde tailwind.config.js, por eso no depende
// de nada del navegador.

// Atributos comunes del trazo; el grosor va aparte para no repetir el atributo (un SVG con
// atributos duplicados es XML inválido y el navegador no lo pinta).
const LINE = 'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';
const STROKE = `${LINE} stroke-width="2.4"`;
const GROUND = `<path ${LINE} stroke-width="1.6" d="M2.5 20h19"/>`;

/** @type {import('@iconify/types').IconifyJSON} */
export const GYMROUL_ICONS = {
  prefix: 'gymroul',
  width: 24,
  height: 24,
  icons: {
    // Flexiones: cuerpo en diagonal, brazo vertical apoyado en el suelo
    pushup: { body: `<circle cx="4.6" cy="9.2" r="2" fill="currentColor"/><path ${STROKE} d="M7.6 11 21 16M8.6 11.5v7.3"/>${GROUND}` },
    // Plancha: antebrazo apoyado y cuerpo recto
    plank: { body: `<circle cx="4.4" cy="11" r="2" fill="currentColor"/><path ${STROKE} d="M7.6 13.2 21 16.2M7.4 13.8v4.6h3.6"/>${GROUND}` },
    // Abdominales: tronco incorporado desde el suelo, rodillas flexionadas
    situp: { body: `<circle cx="7.4" cy="5.6" r="2" fill="currentColor"/><path ${STROKE} d="M7 8.8 10.2 15.6H17.6M17.6 15.6 20 10.4M7.2 9.2l3.8 1.2"/>${GROUND}` },
    // Burpee: salto con los brazos arriba y los pies en el aire
    burpee: { body: `<circle cx="12" cy="3.8" r="2" fill="currentColor"/><path ${STROKE} d="M12 7.2V13M12 8.6 7.6 5.2M12 8.6l4.4-3.4M12 13l-3.4 5M12 13l3.4 5"/>${GROUND}` },
    // Sentadilla: muslos horizontales, brazos al frente
    squat: { body: `<circle cx="9.6" cy="4.4" r="2" fill="currentColor"/><path ${STROKE} d="M9.8 7.6 8.2 13 14.6 13.4 14 19.4M9.6 9.2l7 .4"/>${GROUND}` },
  },
};
