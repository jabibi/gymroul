// Français (Canada) — solo lo que difiere del francés de Francia (src/i18n/locales/fr.js).
// En Canadá no se deja espacio antes de « ! » y « ? » (sí antes de los dos puntos), y el vocabulario cambia
// ("paramètres", "courriel", "espadrilles", "soccer"). Se combina con fr.js en src/i18n/index.js.
export default {
  strings: {
    'header.settings': 'Ouvrir les paramètres',

    'wheel.setup': 'Paramètres',
    'spin.button': 'LANCER LA ROUE!',


    'result.badge': 'EXERCICE CHOISI!',
    'result.desc': 'Excellent défi! Fais {reps} répétitions de {exercise} avec une technique parfaite.',
    'result.done': 'Terminé!',
    'share.text': 'Mon défi GymRoulette : {challenge}! Fais tourner la roue et entraîne-toi aussi : {url}',

    'history.empty': "Tu n'as encore enregistré aucun exercice. Lance la roue!",
    'history.done': 'Terminé!',

    'config.title': 'Paramètres de la roue',
    'config.close': 'Fermer les paramètres',
  },

  groups: {},

  icons: `
sneaker | Espadrilles | courir running souliers chaussures
soccer | Soccer | ballon football
football | Football | ballon américain
plank | Planche | gainage core abdos isométrique sol callisthénie
timer | Chronomètre | temps isométrique planche emom
hourglass | Minuterie | tabata intervalles repos
pushup | Push-ups | pompes push-up pushup sol pectoraux triceps callisthénie dips
`,
};
