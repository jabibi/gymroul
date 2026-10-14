// Català
export default {
  strings: {
    'app.title': 'GymRoulette - Workout Generator',

    'header.sound': 'Activa o desactiva el so',
    'header.history': "Obre l'historial",
    'header.settings': 'Obre la configuració',

    'live.drag': 'Arrossega la ruleta per girar',
    'live.configure': 'Configura la ruleta',
    'wheel.aria': "Ruleta d'exercicis: gira-la amb el botó de sota o arrossega-la",
    'wheel.centerAria': 'Gira la ruleta',
    'wheel.center': 'GIRA',
    'wheel.setup': 'Configura',
    'spin.button': 'GIRA LA RULETA!',

    'result.badge': 'EXERCICI SELECCIONAT!',
    'result.skip': 'Salta aquest repte',
    'result.done': 'Completat!',
    'result.share': 'Comparteix el repte',
    'share.text': 'El meu repte de GymRoulette: {challenge}. Gira la ruleta i entrena tu també: {url}',
    'share.saved': 'Imatge baixada',
    'share.failed': 'No s\'ha pogut compartir el repte',
    'share.preparing': 'Preparant la teva imatge…',
    'share.cancel': 'Cancel·la',

    'history.title': 'Historial de la sessió',
    'history.close': "Tanca l'historial",
    'history.empty': 'Encara no has registrat cap exercici avui. Gira la ruleta!',
    'history.total': 'Completats a la sessió: {n}',
    'history.done': 'Completat!',
    'history.clear': "Esborra l'historial",

    'config.title': 'Configuració de la ruleta',
    'config.close': 'Tanca la configuració',
    'config.intro': 'Activa, crea o elimina repeticions i exercicis:',
    'config.reps': 'Repeticions',
    'config.repsAll': 'Totes',
    'config.repsNone': 'Cap',
    'config.repPlaceholder': 'Ex.: 15',
    'config.add': 'Afegeix',
    'config.exercises': 'Exercicis',
    'config.exsAll': 'Tots',
    'config.exsNone': 'Cap',
    'config.addExercise': 'Afegeix un exercici nou:',
    'config.namePlaceholder': 'Nom (ex.: Planxa)',
    'config.shortPlaceholder': 'Nom curt',
    'config.chooseIcon': 'Tria una icona',
    'config.create': 'Crea',
    'config.searchPlaceholder': 'Cerca: ioga, karate, boxa, pesos…',
    'config.searchAria': 'Cerca una icona',
    'config.noIcons': 'No hi ha icones per a aquesta cerca',
    'config.privacy': 'Política de privadesa',
    'config.credits': 'Crèdits',
    'config.apply': 'Desa els canvis',
    'config.language': 'Idioma',
    'config.repLabel': '{n} reps',
    'config.deleteRep': 'Elimina {n} repeticions',
    'config.deleteExercise': 'Elimina {name}',

    'error.nameRequired': "Escriu un nom per a l'exercici",
    'error.iconRequired': 'Tria una icona de la llista',
    'error.duplicateExercise': 'Ja existeix un exercici anomenat "{name}"',
    'error.maxExercises': 'Màxim {max} exercicis',
    'error.repRange': 'Introdueix un número entre 1 i {max}',
    'error.duplicateRep': 'Ja existeix la repetició {n}',
    'error.maxReps': 'Màxim {max} repeticions',

    'config.commitment': 'Compromís de privadesa',
    'commitment.intro': 'GymRoulette és programari ètic i sobirà: fa el que li demanes i res més.',
    'commitment.offline.title': '100% sense connexió',
    'commitment.offline.text': 'Funciona sense connexió. L\'app ni tan sols demana el permís d\'Internet.',
    'commitment.noTrackers.title': 'Sense rastrejadors',
    'commitment.noTrackers.text': 'Sense analítiques, sense biblioteques de seguiment i sense perfils.',
    'commitment.noAds.title': 'Sense publicitat',
    'commitment.noAds.text': 'Sense anuncis ni xarxes publicitàries.',
    'commitment.yourData.title': 'Les teves dades són teves',
    'commitment.yourData.text': 'Tot el que crees es queda al teu dispositiu. Si esborres l\'app o les seves dades, no queda cap rastre al núvol.',
    'commitment.noScripts.title': 'Zero scripts externs',
    'commitment.noScripts.text': 'Tot el codi va dins de l\'app. No es carrega res d\'altres servidors.',
    'commitment.policy': 'Llegeix la política de privadesa completa',

    'doc.privacy': 'Política de privadesa',
    'doc.credits': 'Crèdits i llicències',
    'doc.close': 'Tanca',
  },

  groups: {
    strength: 'Força i pesos',
    calisthenics: 'Calistènia i gimnàstica',
    cardio: 'Cardio i resistència',
    martial: 'Arts marcials i combat',
    mindbody: 'Ment i cos',
    sports: 'Esports',
    outdoor: 'Aigua, muntanya i aire lliure',
    challenges: 'Obstacles i reptes',
  },

  icons: `
dumbbell | Manuelles | pesos gimnàs musculació força
kettlebell | Kettlebell | pesa russa crossfit swing
weight-lifter | Halterofília | aixecament barra press crossfit snatch clean
lift-up | Aixecar pes | press militar jerk barra amunt
lift-down | Pes avall | pes mort deadlift esquat barra
weight | Pes | disc càrrega quilos
bench | Banc | press banc rem
anvil | Enclusa | força potència strongman
hammer | Martell | sledgehammer crossfit cop pneumàtic
tire | Pneumàtic | tire flip crossfit strongman volteig
sandbag | Sac de sorra | sandbag hyrox lunges bossa càrrega
arm-flex | Bíceps | braços curl múscul força
arm | Braç | tríceps espatlles fons
leg | Cames | esquat squat gambada glutis quàdriceps
boulder | Roca | pedra atlas stone strongman
rock | Pedra | atlas stone ocr càrrega
gymnastics | Gimnàstica | calistènia acrobàcia
muscle-up | Muscle-up | dominades barra calistènia pull-up
pull | Estirada | dominades rem pull-up calistènia
pushup | Flexions | push-up pushup terra pit tríceps calistènia fons
plank | Planxa | core abdominals isomètric terra calistènia
situp | Abdominals | sit-up crunch core terra calistènia
burpee | Burpee | salt terra hiit crossfit cardio
climbers | Mountain climbers | escaladors genolls cardio core terra hiit crossfit
squat | Esquat | air squat cames glutis quàdriceps calistènia
push | Empènyer | empenta paret trineu sled push mur
cartwheel | Roda | acrobàcia gimnàstica
handsup | Braços amunt | estirament press overhead
balance | Equilibri | handstand paret planxa core
jump-rope | Corda de saltar | saltar double unders crossfit
jump | Salt | box jump salts burpee broad jumps split jumps pliometria
ladder | Escala | agilitat enfilar ocr
stairs | Escales | pujar graons graderia cardio
rope | Corda | battle rope enfilar cordes crossfit ocr
run | Córrer | cursa running trot
run-fast | Cursa ràpida | sprint velocitat escaladors mountain climbers
sprint | Esprint | velocitat sèries atletisme
walk | Caminar | gambades lunges marxa passejada
hiking | Excursionisme | muntanya trekking caminada
sneaker | Vambes | córrer running calçat
footprint | Passos | petjades marxa caminada
bike | Bicicleta | ciclisme spinning cardio
bike-fast | Ciclisme ràpid | assault bike velocitat
rowing | Rem | remar ergòmetre hyrox crossfit
skierg | Esquí de fons | skierg hyrox esquí ergòmetre
heart-pulse | Pulsacions | cardio cor salut
fire | Foc | burpee intens cremar calories hiit
bolt | Llamp | explosiu potència energia ràpid
timer | Cronòmetre | temps isomètric planxa emom
hourglass | Temporitzador | tabata intervals descans
infinity | Infinit | amrap sense parar resistència
repeat | Sèries | repeticions circuit rondes
karate | Karate | quimono dojo arts marcials judo taekwondo
boxing | Boxa | guant sparring kickboxing
mma | MMA | arts marcials mixtes lluita combat
high-kick | Puntada alta | taekwondo kickboxing karate puntades
kick | Puntada | cop kickboxing muay thai
punch | Cop de puny | cop boxa directe
punching-bag | Sac de boxa | cops entrenament boxa
fist | Puny | kung fu karate força
ninja | Ninja | arts marcials ninjutsu agilitat
sword | Espases | kendo esgrima lluita
fencing | Esgrima | espasa florete
shield | Defensa | autodefensa protecció
yoga | Ioga | yoga asanes estirament flexibilitat pilates
meditation | Meditació | respiració mindfulness relaxació
lotus | Lotus | ioga yoga meditació zen
yin-yang | Yin yang | tai-txi tai chi taichi equilibri qigong
spa | Relaxació | pilates stretching recuperació benestar
flower | Flor | pilates ioga calma
tortoise | Tortuga | lent tai chi control tempo
hand-heart | Benestar | salut cura respiració
soccer | Futbol | pilota futbol
basketball | Bàsquet | bàsquet pilota wall ball
volleyball | Voleibol | vòlei pilota
tennis | Tennis | raqueta pilota pàdel
table-tennis | Tennis taula | ping pong
badminton | Bàdminton | raqueta volant
rugby | Rugbi | pilota
football | Futbol americà | pilota
handball | Handbol | pilota
baseball | Beisbol | bat pilota
golf | Golf | pal bola
hockey | Hoquei | pal disc
bowling | Bitlles | bola
archery | Tir amb arc | diana punteria precisió
target | Diana | objectiu precisió repte
skate | Monopatí | skate patinet
roller-skate | Patinatge | patins
swim | Natació | nedar piscina crol
pool | Piscina | aigua nedar aquagym
waves | Ones | aigua mar aquagym
surf | Surf | ones taula
kayak | Caiac | piragua rem
sailing | Vela | vaixell
diving | Busseig | apnea submarinisme
climbing | Escalada | enfilar roca boulder ocr
terrain | Muntanya | trail pujades excursionisme
ski | Esquí | neu alpí
snowboard | Snowboard | neu taula
sled | Trineu | sled push pull hyrox arrossegament empenta
horse | Hípica | cavall equitació
fence | Tanca | obstacle ocr salt mur
flag | Meta | final cursa ocr hyrox arribada
trophy | Trofeu | repte especial campió
medal | Medalla | assoliment premi
dice | Daus | atzar aleatori sorpresa
star | Estrella | preferit especial
rocket | Coet | explosiu enlairament potència
tractor | Tractor | arrossegament pneumàtic strongman
`,
};
