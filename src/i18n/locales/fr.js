// Français (les espaces insécables avant ! ? : sont écrites  )
export default {
  strings: {
    'app.title': 'GymRoulette - Workout Generator',

    'header.sound': 'Activer ou couper le son',
    'header.history': "Ouvrir l'historique",
    'header.settings': 'Ouvrir les réglages',

    'live.drag': 'Fais glisser la roue pour la faire tourner',
    'live.configure': 'Configurer la roue',
    'wheel.aria': "Roue d'exercices : fais-la tourner avec le bouton ci-dessous ou fais-la glisser",
    'wheel.centerAria': 'Faire tourner la roue',
    'wheel.center': 'TOURNER',
    'wheel.setup': 'Réglages',
    'spin.button': 'LANCER LA ROUE !',

    'result.badge': 'EXERCICE CHOISI !',
    'result.reps': 'répétitions',
    'result.skip': 'Passer ce défi',
    'result.done': 'Terminé !',
    'result.share': 'Partager le défi',
    'share.text': 'Mon défi GymRoulette : {challenge} ! Fais tourner la roue et entraîne-toi aussi : {url}',
    'share.saved': 'Image téléchargée',
    'share.failed': 'Impossible de partager le défi',
    'share.preparing': 'Préparation de ton image…',
    'share.cancel': 'Annuler',

    'history.title': 'Historique de la séance',
    'history.close': "Fermer l'historique",
    'history.empty': "Tu n'as encore enregistré aucun exercice. Lance la roue !",
    'history.total': 'Terminés pendant la séance : {n}',
    'history.done': 'Terminé !',
    'history.clear': "Effacer l'historique",

    'config.title': 'Réglages de la roue',
    'config.close': 'Fermer les réglages',
    'config.intro': 'Active ou désactive des exercices, règle la plage de répétitions de chacun, ou crée-les et supprime-les :',
    'config.reps': 'Répétitions',
    'config.repsMin': 'Min.',
    'config.repsMax': 'Max.',
    'config.repsRange': '{min}–{max} rép.',
    'config.editReps': 'Modifier les répétitions de {name}',
    'config.repsSave': 'Enregistrer',
    'config.add': 'Ajouter',
    'config.exercises': 'Exercices',
    'config.exsAll': 'Tous',
    'config.exsNone': 'Aucun',
    'config.addExercise': 'Ajouter un nouvel exercice :',
    'config.namePlaceholder': 'Nom (ex. : Gainage)',
    'config.shortPlaceholder': 'Nom court',
    'config.chooseIcon': 'Choisir une icône',
    'config.create': 'Créer',
    'config.searchPlaceholder': 'Rechercher : yoga, karaté, boxe, haltères…',
    'config.searchAria': 'Rechercher une icône',
    'config.noIcons': 'Aucune icône ne correspond à la recherche',
    'config.privacy': 'Politique de confidentialité',
    'config.credits': 'Crédits',
    'config.apply': 'Enregistrer les modifications',
    'config.language': 'Langue',
    'config.deleteExercise': 'Supprimer {name}',
    'exercise.burpee': 'Burpees',
    'exercise.burpee.short': 'Burpees',
    'exercise.lunge': 'Fentes',
    'exercise.lunge.short': 'Fentes',
    'exercise.pushup': 'Pompes',
    'exercise.pushup.short': 'Pompes',
    'exercise.squat': 'Squats',
    'exercise.squat.short': 'Squats',
    'exercise.climbers': 'Mountain climbers',
    'exercise.climbers.short': 'Climbers',
    'exercise.splitjump': 'Fentes sautées',
    'exercise.splitjump.short': 'Fentes saut.',

    'error.nameRequired': "Saisis un nom pour l'exercice",
    'error.iconRequired': 'Choisis une icône dans la liste',
    'error.duplicateExercise': 'Un exercice nommé « {name} » existe déjà',
    'error.maxExercises': 'Maximum {max} exercices',
    'error.repRange': 'Saisis un nombre entre 1 et {max}',
    'error.repMinMax': 'Le minimum ne peut pas dépasser le maximum',
    'error.maxLength': 'Maximum {max} caractères',

    'config.commitment': 'Engagement de confidentialité',
    'commitment.intro': 'GymRoulette est un logiciel éthique et souverain : il fait ce que tu lui demandes, et rien de plus.',
    'commitment.offline.title': '100 % hors ligne',
    'commitment.offline.text': 'Fonctionne sans connexion. L’appli ne demande même pas l’autorisation Internet.',
    'commitment.noTrackers.title': 'Aucun traceur',
    'commitment.noTrackers.text': 'Aucun outil d’analyse, aucune bibliothèque de suivi et aucun profil.',
    'commitment.noAds.title': 'Aucune publicité',
    'commitment.noAds.text': 'Aucune annonce et aucun réseau publicitaire.',
    'commitment.yourData.title': 'Tes données t’appartiennent',
    'commitment.yourData.text': 'Tout ce que tu crées reste sur ton appareil. Si tu supprimes l’appli ou ses données, il ne reste aucune trace dans le cloud.',
    'commitment.noScripts.title': 'Zéro script externe',
    'commitment.noScripts.text': 'Tout le code est dans l’appli. Rien n’est chargé depuis d’autres serveurs.',
    'commitment.policy': 'Lire la politique de confidentialité complète',

    'doc.privacy': 'Politique de confidentialité',
    'doc.credits': 'Crédits et licences',
    'doc.close': 'Fermer',
  },

  groups: {
    strength: 'Force et poids',
    calisthenics: 'Callisthénie et gymnastique',
    cardio: 'Cardio et endurance',
    martial: 'Arts martiaux et combat',
    mindbody: 'Corps et esprit',
    sports: 'Sports',
    outdoor: 'Eau, montagne et plein air',
    challenges: 'Obstacles et défis',
  },

  icons: `
dumbbell | Haltère | poids salle musculation force
kettlebell | Kettlebell | poids russe crossfit swing
weight-lifter | Haltérophilie | barre développé crossfit arraché épaulé
lift-up | Soulever | développé militaire jerk barre haut
lift-down | Charge basse | soulevé de terre deadlift squat barre
weight | Poids | disque charge kilos
bench | Banc | développé couché rowing
anvil | Enclume | force puissance strongman
hammer | Marteau | masse crossfit frappe pneu
tire | Pneu | tire flip crossfit strongman retournement
sandbag | Sac de sable | sandbag hyrox fentes sac charge
arm-flex | Biceps | bras curl muscle force
arm | Bras | triceps épaules dips
leg | Jambes | squat fentes fessiers quadriceps
boulder | Rocher | pierre atlas stone strongman
rock | Pierre | atlas stone ocr charge
gymnastics | Gymnastique | callisthénie acrobatie
muscle-up | Muscle-up | tractions barre callisthénie pull-up
pull | Traction | tractions rowing pull-up callisthénie
pushup | Pompes | push-up pushup sol pectoraux triceps callisthénie dips
plank | Gainage | planche core abdos isométrique sol callisthénie
situp | Abdominaux | sit-up crunch core sol callisthénie
burpee | Burpee | saut sol hiit crossfit cardio
climbers | Mountain climbers | grimpeurs genoux cardio core sol hiit crossfit
squat | Squat | air squat jambes fessiers quadriceps callisthénie
push | Pousser | poussée mur traîneau sled push
cartwheel | Roue | acrobatie gymnastique
handsup | Bras levés | étirement développé overhead
balance | Équilibre | handstand poirier planche core
jump-rope | Corde à sauter | sauter double unders crossfit
jump | Saut | box jump sauts burpee broad jumps split jumps pliométrie
ladder | Échelle | agilité grimper ocr
stairs | Escaliers | monter marches gradins cardio
rope | Corde | battle rope grimper cordes crossfit ocr
run | Course | courir running footing
run-fast | Course rapide | sprint vitesse grimpeurs mountain climbers
sprint | Sprint | vitesse séries athlétisme
walk | Marche | fentes lunges promenade
hiking | Randonnée | montagne trekking marche
sneaker | Baskets | courir running chaussures
footprint | Pas | empreintes marche promenade
bike | Vélo | cyclisme spinning cardio
bike-fast | Vélo rapide | assault bike vitesse
rowing | Rameur | ramer ergomètre hyrox crossfit
skierg | Ski de fond | skierg hyrox ski ergomètre
heart-pulse | Pulsations | cardio cœur santé
fire | Feu | burpee intense brûler calories hiit
bolt | Éclair | explosif puissance énergie rapide
timer | Chronomètre | temps isométrique gainage emom
hourglass | Minuteur | tabata intervalles repos
infinity | Infini | amrap sans arrêt endurance
repeat | Séries | répétitions circuit tours
karate | Karaté | kimono dojo arts martiaux judo taekwondo
boxing | Boxe | gant sparring kickboxing
mma | MMA | arts martiaux mixtes combat
high-kick | Coup de pied haut | taekwondo kickboxing karaté coups de pied
kick | Coup de pied | frappe kickboxing muay thai
punch | Coup de poing | frappe boxe direct
punching-bag | Sac de frappe | frappes entraînement boxe
fist | Poing | kung fu karaté force
ninja | Ninja | arts martiaux ninjutsu agilité
sword | Épées | kendo escrime combat
fencing | Escrime | épée fleuret
shield | Défense | autodéfense protection
yoga | Yoga | asanas étirements souplesse pilates
meditation | Méditation | respiration pleine conscience relaxation
lotus | Lotus | yoga méditation zen
yin-yang | Yin yang | tai chi taichi équilibre qi gong
spa | Détente | pilates stretching récupération bien-être
flower | Fleur | pilates yoga calme
tortoise | Tortue | lent tai chi contrôle tempo
hand-heart | Bien-être | santé soin respiration
soccer | Football | ballon foot
basketball | Basket-ball | basket ballon wall ball
volleyball | Volley-ball | volley ballon
tennis | Tennis | raquette balle padel
table-tennis | Tennis de table | ping-pong
badminton | Badminton | raquette volant
rugby | Rugby | ballon
football | Football américain | ballon
handball | Handball | ballon
baseball | Baseball | batte balle
golf | Golf | club balle
hockey | Hockey | crosse palet
bowling | Bowling | boule quilles
archery | Tir à l'arc | cible visée précision
target | Cible | objectif précision défi
skate | Skateboard | planche trottinette
roller-skate | Patin à roulettes | patins roller
swim | Natation | nager piscine crawl
pool | Piscine | eau nager aquagym
waves | Vagues | eau mer aquagym
surf | Surf | vagues planche
kayak | Kayak | pirogue pagaie rame
sailing | Voile | bateau
diving | Plongée | apnée plongée sous-marine
climbing | Escalade | grimper roche bloc ocr
terrain | Montagne | trail côtes randonnée
ski | Ski | neige alpin
snowboard | Snowboard | neige planche
sled | Traîneau | sled push pull hyrox traction poussée
horse | Équitation | cheval hippisme
fence | Barrière | obstacle ocr saut mur
flag | Arrivée | ligne d'arrivée course ocr hyrox
trophy | Trophée | défi spécial champion
medal | Médaille | réussite récompense
dice | Dés | hasard aléatoire surprise
star | Étoile | favori spécial
rocket | Fusée | explosif décollage puissance
tractor | Tracteur | traction pneu strongman
`,
};
