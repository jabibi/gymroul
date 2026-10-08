// Français (les espaces insécables avant ! ? : sont écrites  )
export default {
  strings: {
    'app.title': 'GymRoulette - Gasteiz Trainning',

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
    'result.desc': 'Excellent défi ! Fais {reps} répétitions de {exercise} avec une technique parfaite.',
    'result.skip': 'Passer ce défi',
    'result.done': 'Terminé !',

    'history.title': 'Historique de la séance',
    'history.close': "Fermer l'historique",
    'history.empty': "Tu n'as encore enregistré aucun exercice. Lance la roue !",
    'history.total': 'Terminés pendant la séance : {n}',
    'history.done': 'Terminé !',
    'history.clear': "Effacer l'historique",

    'config.title': 'Réglages de la roue',
    'config.close': 'Fermer les réglages',
    'config.intro': 'Active, crée ou supprime des répétitions et des exercices :',
    'config.reps': 'Répétitions',
    'config.repsAll': 'Toutes',
    'config.repsNone': 'Aucune',
    'config.repPlaceholder': 'Ex. : 15',
    'config.add': 'Ajouter',
    'config.exercises': 'Exercices',
    'config.exsAll': 'Tous',
    'config.exsNone': 'Aucun',
    'config.addExercise': 'Ajouter un nouvel exercice :',
    'config.namePlaceholder': 'Nom (ex. : Gainage)',
    'config.shortPlaceholder': 'Nom court',
    'config.chooseIcon': 'Choisir une icône',
    'config.create': 'Créer',
    'config.searchPlaceholder': 'Rechercher : yoga, hyrox, boxe, haltères…',
    'config.searchAria': 'Rechercher une icône',
    'config.noIcons': 'Aucune icône ne correspond à la recherche',
    'config.privacy': 'Politique de confidentialité',
    'config.credits': 'Crédits',
    'config.apply': 'Enregistrer les modifications',
    'config.language': 'Langue',
    'config.repLabel': '{n} rép.',
    'config.deleteRep': 'Supprimer {n} répétitions',
    'config.deleteExercise': 'Supprimer {name}',

    'error.nameRequired': "Saisis un nom pour l'exercice",
    'error.iconRequired': 'Choisis une icône dans la liste',
    'error.duplicateExercise': 'Un exercice nommé « {name} » existe déjà',
    'error.maxExercises': 'Maximum {max} exercices',
    'error.repRange': 'Saisis un nombre entre 1 et {max}',
    'error.duplicateRep': 'La répétition {n} existe déjà',
    'error.maxReps': 'Maximum {max} répétitions',

    'intro.skip': 'Passer',
    'intro.next': 'Suivant',
    'intro.start': 'C’est parti',
    'intro.steps': 'Introduction',
    'intro.how.title': 'Comment fonctionne la roue',
    'intro.how.spin': 'Appuie sur « LANCER LA ROUE ! » ou lance la roue avec le doigt.',
    'intro.how.result': 'Quand elle s’arrête, tu obtiens un défi : quelques répétitions d’un exercice.',
    'intro.how.done': 'Marque-le comme terminé ou passe-le, puis relance la roue.',
    'intro.private.title': 'Hors ligne et privé',
    'intro.private.offline': 'Fonctionne entièrement hors ligne.',
    'intro.private.noAds': 'Aucune publicité.',
    'intro.private.noTrackers': 'Aucun traceur : rien ne quitte ton appareil.',
    'intro.private.noCookies': 'Aucun cookie inutile.',
    'intro.private.noLocation': 'Aucun accès à ta position.',

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
