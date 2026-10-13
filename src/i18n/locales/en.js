// English — source of truth and fallback for every other language.
export default {
  strings: {
    'app.title': 'GymRoulette - Workout Generator',

    'header.sound': 'Turn sound on or off',
    'header.history': 'Open history',
    'header.settings': 'Open settings',

    'live.drag': 'Drag the wheel to spin',
    'live.configure': 'Set up the wheel',
    'wheel.aria': 'Exercise wheel: spin it with the button below or drag it',
    'wheel.centerAria': 'Spin the wheel',
    'wheel.center': 'SPIN',
    'wheel.setup': 'Setup',
    'spin.button': 'SPIN THE WHEEL!',

    'result.badge': 'EXERCISE SELECTED!',
    'result.skip': 'Skip this challenge',
    'result.done': 'Done!',
    'result.share': 'Share challenge',
    'share.text': 'My GymRoulette challenge: {challenge}! Spin the wheel and train too: {url}',
    'share.saved': 'Image downloaded',
    'share.failed': 'Could not share the challenge',
    'share.preparing': 'Preparing your image…',
    'share.cancel': 'Cancel',

    'history.title': 'Session history',
    'history.close': 'Close history',
    'history.empty': 'No exercises logged yet. Spin the wheel!',
    'history.total': 'Completed this session: {n}',
    'history.done': 'Done!',
    'history.clear': 'Clear history',

    'config.title': 'Wheel settings',
    'config.close': 'Close settings',
    'config.intro': 'Turn reps and exercises on or off, or create and delete them:',
    'config.reps': 'Reps',
    'config.repsAll': 'All',
    'config.repsNone': 'None',
    'config.repPlaceholder': 'E.g. 15',
    'config.add': 'Add',
    'config.exercises': 'Exercises',
    'config.exsAll': 'All',
    'config.exsNone': 'None',
    'config.addExercise': 'Add a new exercise:',
    'config.namePlaceholder': 'Name (e.g. Plank)',
    'config.shortPlaceholder': 'Short name',
    'config.chooseIcon': 'Choose icon',
    'config.create': 'Create',
    'config.searchPlaceholder': 'Search: yoga, hyrox, boxing, weights…',
    'config.searchAria': 'Search icon',
    'config.noIcons': 'No icons match your search',
    'config.privacy': 'Privacy policy',
    'config.credits': 'Credits',
    'config.apply': 'Save changes',
    'config.language': 'Language',
    'config.repLabel': '{n} reps',
    'config.deleteRep': 'Delete {n} reps',
    'config.deleteExercise': 'Delete {name}',

    'error.nameRequired': 'Enter a name for the exercise',
    'error.iconRequired': 'Choose an icon from the list',
    'error.duplicateExercise': 'There is already an exercise called "{name}"',
    'error.maxExercises': 'Maximum {max} exercises',
    'error.repRange': 'Enter a number between 1 and {max}',
    'error.duplicateRep': 'Repetition {n} already exists',
    'error.maxReps': 'Maximum {max} rep options',

    'config.commitment': 'Privacy commitment',
    'commitment.intro': 'GymRoulette is ethical, sovereign software: it does what you ask and nothing else.',
    'commitment.offline.title': '100% offline',
    'commitment.offline.text': 'It works without a connection. The app does not even request Internet permission.',
    'commitment.noTrackers.title': 'No trackers',
    'commitment.noTrackers.text': 'No analytics, no tracking libraries and no profiles.',
    'commitment.noAds.title': 'No ads',
    'commitment.noAds.text': 'No ads and no ad networks.',
    'commitment.yourData.title': 'Your data is yours',
    'commitment.yourData.text': 'Everything you create stays on your device. If you delete the app or its data, no trace is left in the cloud.',
    'commitment.noScripts.title': 'Zero external scripts',
    'commitment.noScripts.text': 'All the code is inside the app. Nothing is loaded from other servers.',
    'commitment.policy': 'Read the full privacy policy',

    'doc.privacy': 'Privacy policy',
    'doc.credits': 'Credits and licenses',
    'doc.close': 'Close',
  },

  groups: {
    strength: 'Strength and weights',
    calisthenics: 'Calisthenics and gymnastics',
    cardio: 'Cardio and endurance',
    martial: 'Martial arts and combat',
    mindbody: 'Mind and body',
    sports: 'Sports',
    outdoor: 'Water, mountain and outdoors',
    challenges: 'Obstacles and challenges',
  },

  icons: `
dumbbell | Dumbbell | weights gym bodybuilding strength
kettlebell | Kettlebell | russian weight crossfit swing
weight-lifter | Weightlifting | barbell press crossfit snatch clean
lift-up | Lift weight | overhead press military jerk barbell up
lift-down | Weight down | deadlift squat barbell lower
weight | Weight | plate load kilos
bench | Bench | bench press row
anvil | Anvil | strength power strongman
hammer | Hammer | sledgehammer crossfit strike tire
tire | Tire | tire flip crossfit strongman
sandbag | Sandbag | hyrox lunges bag carry
arm-flex | Biceps | arms curl muscle strength
arm | Arm | triceps shoulders dips
leg | Legs | squat lunge glutes quads
boulder | Boulder | stone atlas strongman
rock | Stone | atlas stone ocr carry
gymnastics | Gymnastics | calisthenics acrobatics
muscle-up | Muscle-up | pull-up bar calisthenics chin-up
pull | Pull | pull-up row calisthenics
pushup | Push-ups | pushup floor chest triceps calisthenics dips
plank | Plank | core abs isometric floor calisthenics
situp | Sit-ups | crunch abs core floor calisthenics
burpee | Burpee | jump floor hiit crossfit cardio
climbers | Mountain climbers | knees cardio core floor hiit crossfit
squat | Squat | air squat legs glutes quads calisthenics
push | Push | wall sled push
cartwheel | Cartwheel | acrobatics gymnastics
handsup | Arms up | stretch overhead press
balance | Balance | handstand plank core
jump-rope | Jump rope | skipping double unders crossfit
jump | Jump | box jump burpee broad jumps split jumps plyometrics
ladder | Ladder | agility climb ocr
stairs | Stairs | climb steps cardio
rope | Rope | battle rope climb crossfit ocr
run | Run | running jog race
run-fast | Fast run | sprint speed mountain climbers
sprint | Sprint | speed intervals athletics
walk | Walk | lunges march stroll
hiking | Hiking | mountain trekking walk
sneaker | Sneakers | running shoes
footprint | Footsteps | footprints march walk
bike | Bike | cycling spinning cardio
bike-fast | Fast cycling | assault bike speed
rowing | Rowing | row ergometer hyrox crossfit
skierg | Cross-country ski | skierg hyrox ski ergometer
heart-pulse | Heart rate | cardio heart health
fire | Fire | burpee intense burn calories hiit
bolt | Lightning | explosive power energy fast
timer | Stopwatch | time isometric plank emom
hourglass | Timer | tabata intervals rest
infinity | Infinity | amrap non-stop endurance
repeat | Sets | reps circuit rounds
karate | Karate | kimono dojo martial arts judo taekwondo
boxing | Boxing | glove sparring kickboxing
mma | MMA | mixed martial arts fighting combat
high-kick | High kick | taekwondo kickboxing karate kicks
kick | Kick | striking kickboxing muay thai
punch | Punch | strike boxing jab
punching-bag | Punching bag | striking training boxing
fist | Fist | kung fu karate strength
ninja | Ninja | martial arts ninjutsu agility
sword | Swords | kendo fencing fight
fencing | Fencing | sword foil
shield | Defense | self-defense protection
yoga | Yoga | asanas stretching flexibility pilates
meditation | Meditation | breathing mindfulness relaxation
lotus | Lotus | yoga meditation zen
yin-yang | Yin yang | tai chi taichi balance qigong
spa | Relaxation | pilates stretching recovery wellness
flower | Flower | pilates yoga calm
tortoise | Tortoise | slow tai chi control tempo
hand-heart | Wellness | health care breathing
soccer | Soccer | ball football
basketball | Basketball | basket ball wall ball
volleyball | Volleyball | ball
tennis | Tennis | racket ball padel
table-tennis | Table tennis | ping pong
badminton | Badminton | racket shuttlecock
rugby | Rugby | ball
football | American football | ball
handball | Handball | ball
baseball | Baseball | bat ball
golf | Golf | club ball
hockey | Hockey | stick puck
bowling | Bowling | ball
archery | Archery | target aim precision
target | Target | goal precision challenge
skate | Skateboard | skateboard scooter
roller-skate | Roller skating | skates
swim | Swimming | swim pool crawl
pool | Pool | water swim aqua
waves | Waves | water sea aqua
surf | Surf | waves board
kayak | Kayak | canoe paddle row
sailing | Sailing | boat
diving | Diving | scuba freediving snorkel
climbing | Climbing | rock boulder ocr
terrain | Mountain | trail hills hiking
ski | Ski | snow alpine
snowboard | Snowboard | snow board
sled | Sled | sled push pull hyrox drag
horse | Horse riding | horse equestrian
fence | Fence | obstacle ocr jump wall
flag | Finish | finish line race ocr hyrox
trophy | Trophy | challenge special champion
medal | Medal | achievement prize
dice | Dice | random chance surprise
star | Star | favorite special
rocket | Rocket | explosive launch power
tractor | Tractor | drag tire strongman
`,
};
