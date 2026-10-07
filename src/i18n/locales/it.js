// Italiano (gli spazi non separabili non servono: in italiano la punteggiatura va attaccata)
export default {
  strings: {
    'app.title': 'GymRoulette - Gasteiz Trainning',

    'header.sound': 'Attiva o disattiva il suono',
    'header.history': 'Apri la cronologia',
    'header.settings': 'Apri le impostazioni',

    'live.drag': 'Trascina la ruota per farla girare',
    'live.configure': 'Configura la ruota',
    'wheel.aria': 'Ruota degli esercizi: falla girare con il pulsante qui sotto o trascinala',
    'wheel.centerAria': 'Gira la ruota',
    'wheel.center': 'GIRA',
    'wheel.setup': 'Impostazioni',
    'spin.button': 'GIRA LA RUOTA!',

    'result.badge': 'ESERCIZIO SCELTO!',
    'result.desc': 'Grande sfida! Fai {reps} ripetizioni di {exercise} con una tecnica perfetta.',
    'result.skip': 'Salta questa sfida',
    'result.done': 'Fatto!',

    'history.title': 'Cronologia della sessione',
    'history.close': 'Chiudi la cronologia',
    'history.empty': 'Nessun esercizio registrato. Gira la ruota!',
    'history.total': 'Completati in questa sessione: {n}',
    'history.done': 'Fatto!',
    'history.clear': 'Cancella la cronologia',

    'config.title': 'Impostazioni della ruota',
    'config.close': 'Chiudi le impostazioni',
    'config.intro': 'Attiva o disattiva ripetizioni ed esercizi, oppure creali ed eliminali:',
    'config.reps': 'Ripetizioni',
    'config.repsAll': 'Tutte',
    'config.repsNone': 'Nessuna',
    'config.repPlaceholder': 'Es. 15',
    'config.add': 'Aggiungi',
    'config.exercises': 'Esercizi',
    'config.exsAll': 'Tutti',
    'config.exsNone': 'Nessuno',
    'config.addExercise': 'Aggiungi un nuovo esercizio:',
    'config.namePlaceholder': 'Nome (es. Plank)',
    'config.shortPlaceholder': 'Nome breve',
    'config.chooseIcon': 'Scegli l’icona',
    'config.create': 'Crea',
    'config.searchPlaceholder': 'Cerca: yoga, hyrox, boxe, pesi…',
    'config.searchAria': 'Cerca un’icona',
    'config.noIcons': 'Nessuna icona corrisponde alla ricerca',
    'config.privacy': 'Informativa sulla privacy',
    'config.credits': 'Crediti',
    'config.apply': 'Salva le modifiche',
    'config.language': 'Lingua',
    'config.repLabel': '{n} rip.',
    'config.deleteRep': 'Elimina {n} ripetizioni',
    'config.deleteExercise': 'Elimina {name}',

    'error.nameRequired': 'Inserisci un nome per l’esercizio',
    'error.iconRequired': 'Scegli un’icona dall’elenco',
    'error.duplicateExercise': 'Esiste già un esercizio chiamato «{name}»',
    'error.maxExercises': 'Massimo {max} esercizi',
    'error.repRange': 'Inserisci un numero tra 1 e {max}',
    'error.duplicateRep': '{n} ripetizioni esistono già',
    'error.maxReps': 'Massimo {max} opzioni di ripetizioni',

    'intro.skip': 'Salta',
    'intro.next': 'Avanti',
    'intro.start': 'Inizia',
    'intro.steps': 'Introduzione',
    'intro.how.title': 'Come funziona la ruota',
    'intro.how.spin': 'Tocca «Gira la ruota» oppure lancia la ruota con il dito.',
    'intro.how.result': 'Quando si ferma, ottieni una sfida: alcune ripetizioni di un esercizio.',
    'intro.how.done': 'Segnala come fatta o saltala, poi gira di nuovo.',
    'intro.private.title': 'Offline e privata',
    'intro.private.offline': 'Funziona completamente offline.',
    'intro.private.noAds': 'Nessuna pubblicità.',
    'intro.private.noTrackers': 'Nessun tracker: nulla lascia il tuo dispositivo.',
    'intro.private.noCookies': 'Nessun cookie non necessario.',
    'intro.private.noLocation': 'Nessun accesso alla tua posizione.',

    'doc.privacy': 'Informativa sulla privacy',
    'doc.credits': 'Crediti e licenze',
    'doc.close': 'Chiudi',
  },

  groups: {
    strength: 'Forza e pesi',
    calisthenics: 'Calisthenics e ginnastica',
    cardio: 'Cardio e resistenza',
    martial: 'Arti marziali e combattimento',
    mindbody: 'Mente e corpo',
    sports: 'Sport',
    outdoor: 'Acqua, montagna e outdoor',
    challenges: 'Ostacoli e sfide',
  },

  icons: `
dumbbell | Manubrio | pesi palestra bodybuilding forza
kettlebell | Kettlebell | peso russo crossfit swing
weight-lifter | Sollevamento pesi | bilanciere distensione crossfit strappo slancio
lift-up | Solleva | military press push press girata bilanciere alto
lift-down | Peso in basso | stacco da terra deadlift squat bilanciere abbassare
weight | Peso | disco carico chili
bench | Panca | panca piana distensioni rematore
anvil | Incudine | forza potenza strongman
hammer | Martello | mazza crossfit colpo gomma
tire | Pneumatico | gomma tire flip crossfit strongman ribaltamento
sandbag | Sacco di sabbia | sandbag hyrox affondi sacco trasporto
arm-flex | Bicipite | braccia curl muscolo forza
arm | Braccio | tricipite spalle dip
leg | Gambe | squat affondi glutei quadricipiti
boulder | Masso | pietra atlas strongman
rock | Pietra | atlas stone ocr trasporto
gymnastics | Ginnastica | calisthenics acrobatica corpo libero
muscle-up | Muscle-up | trazioni sbarra calisthenics pull-up
pull | Trazione | trazioni rematore pull-up calisthenics
pushup | Flessioni | piegamenti push-up pushup pavimento petto tricipiti calisthenics dip
plank | Plank | core addominali isometrico pavimento calisthenics
situp | Addominali | sit-up crunch core pavimento calisthenics
burpee | Burpee | salto pavimento hiit crossfit cardio
climbers | Mountain climbers | scalatore ginocchia cardio core pavimento hiit crossfit
squat | Squat | accosciata gambe glutei quadricipiti calisthenics
push | Spinta | spingere muro slitta sled push
cartwheel | Ruota | acrobatica ginnastica rovesciata
handsup | Braccia in alto | stretching allungamento overhead distensione
balance | Equilibrio | handstand verticale plank core
jump-rope | Corda per saltare | saltare salto con la corda double unders crossfit
jump | Salto | box jump burpee broad jumps split jumps pliometria
ladder | Scala | agilità arrampicata ocr
stairs | Scale | salire gradini cardio
rope | Corda | battle rope arrampicata fune crossfit ocr
run | Corsa | correre running jogging
run-fast | Corsa veloce | sprint velocità mountain climbers
sprint | Sprint | velocità ripetute atletica
walk | Camminata | affondi lunges passeggiata marcia
hiking | Escursionismo | montagna trekking camminata
sneaker | Scarpe da ginnastica | correre running sneakers
footprint | Passi | impronte marcia passeggiata
bike | Bici | ciclismo spinning cardio
bike-fast | Bici veloce | assault bike velocità
rowing | Vogatore | remare ergometro hyrox crossfit
skierg | Sci di fondo | skierg hyrox sci ergometro
heart-pulse | Battito | cardio cuore salute frequenza cardiaca
fire | Fuoco | burpee intenso bruciare calorie hiit
bolt | Fulmine | esplosivo potenza energia veloce
timer | Cronometro | tempo isometrico plank emom
hourglass | Timer | tabata intervalli recupero pausa
infinity | Infinito | amrap senza sosta resistenza
repeat | Serie | ripetizioni circuito giri
karate | Karate | kimono dojo arti marziali judo taekwondo
boxing | Boxe | guantoni sparring kickboxing pugilato
mma | MMA | arti marziali miste lotta combattimento
high-kick | Calcio alto | taekwondo kickboxing karate calci
kick | Calcio | colpo kickboxing muay thai
punch | Pugno | colpo boxe jab
punching-bag | Sacco da boxe | colpi allenamento boxe pugilato
fist | Pugno chiuso | kung fu karate forza
ninja | Ninja | arti marziali ninjutsu agilità
sword | Spade | kendo scherma lotta
fencing | Scherma | spada fioretto
shield | Difesa | autodifesa protezione
yoga | Yoga | asana stretching flessibilità pilates
meditation | Meditazione | respirazione mindfulness rilassamento
lotus | Loto | yoga meditazione zen
yin-yang | Yin yang | tai chi taichi equilibrio qigong
spa | Relax | pilates stretching recupero benessere
flower | Fiore | pilates yoga calma
tortoise | Tartaruga | lento tai chi controllo tempo
hand-heart | Benessere | salute cura respirazione
soccer | Calcio (pallone) | pallone calcio football
basketball | Basket | pallacanestro palla wall ball
volleyball | Pallavolo | volley palla
tennis | Tennis | racchetta palla padel
table-tennis | Ping pong | tennistavolo tennis da tavolo
badminton | Badminton | racchetta volano
rugby | Rugby | palla ovale
football | Football americano | palla
handball | Pallamano | palla
baseball | Baseball | mazza palla
golf | Golf | mazza palla
hockey | Hockey | bastone disco
bowling | Bowling | palla birilli
archery | Tiro con l'arco | bersaglio mira precisione
target | Bersaglio | obiettivo precisione sfida
skate | Skateboard | monopattino tavola
roller-skate | Pattini a rotelle | pattini roller pattinaggio
swim | Nuoto | nuotare piscina crawl stile libero
pool | Piscina | acqua nuotare acquagym
waves | Onde | acqua mare acquagym
surf | Surf | onde tavola
kayak | Kayak | canoa pagaia remare
sailing | Vela | barca
diving | Immersioni | subacquea apnea snorkeling
climbing | Arrampicata | roccia boulder ocr
terrain | Montagna | trail colline escursionismo
ski | Sci | neve alpino
snowboard | Snowboard | neve tavola
sled | Slitta | sled push pull hyrox trascinare
horse | Equitazione | cavallo cavalcare
fence | Recinzione | ostacolo ocr salto muro
flag | Traguardo | arrivo linea d'arrivo gara ocr hyrox
trophy | Trofeo | sfida speciale campione
medal | Medaglia | traguardo premio
dice | Dadi | caso casuale sorpresa
star | Stella | preferito speciale
rocket | Razzo | esplosivo lancio potenza
tractor | Trattore | trascinare gomma strongman
`,
};
