// Deutsch (Alemania, trato informal con "du")
export default {
  strings: {
    'app.title': 'GymRoulette - Workout Generator',

    'header.sound': 'Ton ein- oder ausschalten',
    'header.history': 'Verlauf öffnen',
    'header.settings': 'Einstellungen öffnen',

    'live.drag': 'Zieh am Rad, um es zu drehen',
    'live.configure': 'Rad einrichten',
    'wheel.aria': 'Übungsrad: dreh es mit der Schaltfläche darunter oder zieh daran',
    'wheel.centerAria': 'Rad drehen',
    'wheel.center': 'DREHEN',
    'wheel.setup': 'Einrichten',
    'spin.button': 'RAD DREHEN!',

    'result.badge': 'ÜBUNG GEWÄHLT!',
    'result.desc': 'Starke Herausforderung! Mach {reps} Wiederholungen {exercise} mit perfekter Technik.',
    'result.skip': 'Diese Herausforderung überspringen',
    'result.done': 'Geschafft!',

    'history.title': 'Trainingsverlauf',
    'history.close': 'Verlauf schließen',
    'history.empty': 'Noch keine Übungen erfasst. Dreh das Rad!',
    'history.total': 'In diesem Training geschafft: {n}',
    'history.done': 'Geschafft!',
    'history.clear': 'Verlauf löschen',

    'config.title': 'Rad-Einstellungen',
    'config.close': 'Einstellungen schließen',
    'config.intro': 'Schalte Wiederholungen und Übungen ein oder aus, oder lege sie neu an und lösche sie:',
    'config.reps': 'Wiederholungen',
    'config.repsAll': 'Alle',
    'config.repsNone': 'Keine',
    'config.repPlaceholder': 'z. B. 15',
    'config.add': 'Hinzufügen',
    'config.exercises': 'Übungen',
    'config.exsAll': 'Alle',
    'config.exsNone': 'Keine',
    'config.addExercise': 'Neue Übung hinzufügen:',
    'config.namePlaceholder': 'Name (z. B. Plank)',
    'config.shortPlaceholder': 'Kurzname',
    'config.chooseIcon': 'Symbol wählen',
    'config.create': 'Erstellen',
    'config.searchPlaceholder': 'Suche: Yoga, Hyrox, Boxen, Gewichte…',
    'config.searchAria': 'Symbol suchen',
    'config.noIcons': 'Keine Symbole zu deiner Suche gefunden',
    'config.privacy': 'Datenschutzerklärung',
    'config.credits': 'Danksagungen',
    'config.apply': 'Änderungen speichern',
    'config.language': 'Sprache',
    'config.repLabel': '{n} Wdh.',
    'config.deleteRep': '{n} Wiederholungen löschen',
    'config.deleteExercise': '{name} löschen',

    'error.nameRequired': 'Gib einen Namen für die Übung ein',
    'error.iconRequired': 'Wähle ein Symbol aus der Liste',
    'error.duplicateExercise': 'Es gibt bereits eine Übung namens „{name}“',
    'error.maxExercises': 'Höchstens {max} Übungen',
    'error.repRange': 'Gib eine Zahl zwischen 1 und {max} ein',
    'error.duplicateRep': '{n} Wiederholungen gibt es schon',
    'error.maxReps': 'Höchstens {max} Wiederholungsoptionen',

    'intro.skip': 'Überspringen',
    'intro.next': 'Weiter',
    'intro.start': 'Los geht’s',
    'intro.steps': 'Einführung',
    'intro.how.title': 'So funktioniert das Rad',
    'intro.how.spin': 'Tippe auf „RAD DREHEN!“ oder wirf das Rad mit dem Finger an.',
    'intro.how.result': 'Wenn es stehen bleibt, bekommst du eine Herausforderung: ein paar Wiederholungen einer Übung.',
    'intro.how.done': 'Hak sie als geschafft ab oder überspringe sie und dreh erneut.',
    'intro.private.title': 'Offline und privat',
    'intro.private.offline': 'Funktioniert komplett offline.',
    'intro.private.noAds': 'Keine Werbung.',
    'intro.private.noTrackers': 'Keine Tracker: Nichts verlässt dein Gerät.',
    'intro.private.noCookies': 'Keine unnötigen Cookies.',
    'intro.private.noLocation': 'Kein Zugriff auf deinen Standort.',

    'doc.privacy': 'Datenschutzerklärung',
    'doc.credits': 'Danksagungen und Lizenzen',
    'doc.close': 'Schließen',
  },

  groups: {
    strength: 'Kraft und Gewichte',
    calisthenics: 'Calisthenics und Turnen',
    cardio: 'Cardio und Ausdauer',
    martial: 'Kampfsport und Kampfkunst',
    mindbody: 'Geist und Körper',
    sports: 'Sportarten',
    outdoor: 'Wasser, Berge und Natur',
    challenges: 'Hindernisse und Challenges',
  },

  icons: `
dumbbell | Kurzhantel | gewichte hantel fitnessstudio muskelaufbau bodybuilding kraft gym
kettlebell | Kettlebell | kugelhantel russisch crossfit schwung swing
weight-lifter | Gewichtheben | langhantel drücken crossfit reißen stoßen
lift-up | Gewicht stemmen | überkopf drücken schulterdrücken langhantel hoch
lift-down | Gewicht senken | kreuzheben kniebeuge langhantel ablegen
weight | Gewicht | scheibe hantelscheibe last kilos
bench | Bank | bankdrücken rudern hantelbank
anvil | Amboss | kraft power strongman
hammer | Hammer | vorschlaghammer crossfit schlagen reifen
tire | Reifen | reifen kippen wenden crossfit strongman
sandbag | Sandsack | hyrox ausfallschritte tragen sack
arm-flex | Bizeps | arme curl muskel kraft armbeuger
arm | Arm | trizeps schultern dips
leg | Beine | kniebeuge ausfallschritt gesäß po quadrizeps
boulder | Felsbrocken | stein atlas strongman findling
rock | Stein | atlasstein ocr tragen
gymnastics | Turnen | calisthenics akrobatik gymnastik
muscle-up | Muscle-up | klimmzug stange calisthenics reck
pull | Ziehen | klimmzug rudern calisthenics
pushup | Liegestütze | liegestütz boden brust trizeps calisthenics dips
plank | Unterarmstütz | plank planke rumpf bauch isometrisch boden calisthenics
situp | Sit-ups | crunch bauch rumpf boden calisthenics bauchpresse
burpee | Burpee | sprung boden hiit crossfit cardio
climbers | Mountain Climbers | bergsteiger knie cardio rumpf boden hiit crossfit
squat | Kniebeuge | squat beine gesäß po quadrizeps calisthenics
push | Schieben | wand schlitten drücken
cartwheel | Rad schlagen | radschlag akrobatik turnen
handsup | Arme hoch | dehnen strecken überkopf drücken
balance | Gleichgewicht | balance handstand plank rumpf
jump-rope | Springseil | seilspringen double unders crossfit
jump | Sprung | boxsprung burpee weitsprung ausfallsprung plyometrie hüpfen
ladder | Leiter | koordinationsleiter beweglichkeit klettern ocr
stairs | Treppe | stufen treppensteigen klettern cardio
rope | Seil | kampfseil battle rope klettern tau crossfit ocr
run | Laufen | joggen rennen lauf
run-fast | Schnell laufen | sprint tempo schnell mountain climbers
sprint | Sprint | tempo intervalle leichtathletik
walk | Gehen | ausfallschritte marsch spazieren
hiking | Wandern | berge trekking gehen bergwandern
sneaker | Sneaker | laufschuhe turnschuhe schuhe
footprint | Fußspuren | fußabdrücke schritte marsch gehen
bike | Fahrrad | radfahren rad spinning cardio
bike-fast | Schnell radeln | assault bike airbike tempo
rowing | Rudern | ruderergometer ergometer hyrox crossfit
skierg | Skilanglauf | skierg langlauf hyrox ski ergometer
heart-pulse | Herzfrequenz | puls cardio herz gesundheit
fire | Feuer | burpee intensiv verbrennen kalorien hiit
bolt | Blitz | explosiv power energie schnell
timer | Stoppuhr | zeit isometrisch plank emom
hourglass | Timer | sanduhr tabata intervalle pause
infinity | Unendlich | amrap nonstop ausdauer
repeat | Sätze | wiederholungen zirkel runden durchgänge
karate | Karate | kimono dojo kampfsport judo taekwondo
boxing | Boxen | handschuh sparring kickboxen
mma | MMA | mixed martial arts kämpfen kampf
high-kick | Hoher Tritt | taekwondo kickboxen karate tritte kicks
kick | Tritt | kick kickboxen muay thai
punch | Schlag | schlagen boxen jab gerade
punching-bag | Boxsack | schlagen training boxen sandsack
fist | Faust | kung fu karate kraft
ninja | Ninja | kampfkunst ninjutsu beweglichkeit
sword | Schwerter | schwert kendo fechten kampf
fencing | Fechten | degen florett säbel
shield | Verteidigung | schild selbstverteidigung schutz
yoga | Yoga | asanas dehnen beweglichkeit flexibilität pilates
meditation | Meditation | atmung achtsamkeit entspannung
lotus | Lotus | yoga meditation zen
yin-yang | Yin und Yang | tai chi taichi gleichgewicht qigong
spa | Entspannung | pilates dehnen erholung wellness regeneration
flower | Blume | pilates yoga ruhe
tortoise | Schildkröte | langsam tai chi kontrolle tempo
hand-heart | Wohlbefinden | gesundheit pflege atmung
soccer | Fußball | ball kicken
basketball | Basketball | korbball ball wall ball
volleyball | Volleyball | ball
tennis | Tennis | schläger ball padel
table-tennis | Tischtennis | pingpong ping pong
badminton | Badminton | schläger federball
rugby | Rugby | ball
football | American Football | ball
handball | Handball | ball
baseball | Baseball | schläger ball
golf | Golf | schläger ball
hockey | Hockey | schläger puck eishockey
bowling | Bowling | kegeln ball
archery | Bogenschießen | ziel zielen präzision bogen
target | Zielscheibe | ziel präzision challenge
skate | Skateboard | skaten roller
roller-skate | Rollschuhlaufen | rollschuhe inliner skates
swim | Schwimmen | schwimmbad kraulen
pool | Schwimmbad | pool wasser schwimmen aqua
waves | Wellen | wasser meer aqua
surf | Surfen | wellen brett
kayak | Kajak | kanu paddeln rudern
sailing | Segeln | boot segelboot
diving | Tauchen | gerätetauchen freitauchen schnorcheln
climbing | Klettern | fels bouldern ocr
terrain | Berg | trail hügel wandern gebirge
ski | Ski | schnee alpin skifahren
snowboard | Snowboard | schnee brett snowboarden
sled | Schlitten | schlitten schieben ziehen hyrox
horse | Reiten | pferd reitsport
fence | Zaun | hindernis ocr springen wand
flag | Ziel | ziellinie rennen ocr hyrox flagge
trophy | Pokal | trophäe challenge besonders champion
medal | Medaille | erfolg preis auszeichnung
dice | Würfel | zufall glück überraschung
star | Stern | favorit besonders
rocket | Rakete | explosiv start power
tractor | Traktor | ziehen reifen strongman
`,
};
