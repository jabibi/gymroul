// Español
export default {
  strings: {
    'app.title': 'GymRoulette - Workout Generator',

    'header.sound': 'Activar o desactivar el sonido',
    'header.history': 'Abrir historial',
    'header.settings': 'Abrir configuración',

    'live.drag': 'Arrastra la ruleta para girar',
    'live.configure': 'Configurar ruleta',
    'wheel.aria': 'Ruleta de ejercicios: gírala con el botón de abajo o arrástrala',
    'wheel.centerAria': 'Girar la ruleta',
    'wheel.center': 'GIRAR',
    'wheel.setup': 'Configurar',
    'spin.button': '¡GIRAR RULETA!',

    'result.badge': '¡EJERCICIO SELECCIONADO!',
    'result.desc': '¡Excelente reto! Realiza {reps} repeticiones de {exercise} con perfecta técnica.',
    'result.skip': 'Saltar este reto',
    'result.done': '¡Completado!',

    'history.title': 'Historial de sesión',
    'history.close': 'Cerrar historial',
    'history.empty': 'Aún no has registrado ejercicios hoy. ¡Gira la ruleta!',
    'history.total': 'Completados en la sesión: {n}',
    'history.done': '¡Completado!',
    'history.clear': 'Limpiar historial',

    'config.title': 'Configuración de la ruleta',
    'config.close': 'Cerrar configuración',
    'config.intro': 'Activa, crea o elimina repeticiones y ejercicios:',
    'config.reps': 'Repeticiones',
    'config.repsAll': 'Todas',
    'config.repsNone': 'Ninguna',
    'config.repPlaceholder': 'Ej: 15',
    'config.add': 'Añadir',
    'config.exercises': 'Ejercicios',
    'config.exsAll': 'Todos',
    'config.exsNone': 'Ninguno',
    'config.addExercise': 'Añadir nuevo ejercicio:',
    'config.namePlaceholder': 'Nombre (ej: Plancha)',
    'config.shortPlaceholder': 'Nombre corto',
    'config.chooseIcon': 'Elegir icono',
    'config.create': 'Crear',
    'config.searchPlaceholder': 'Buscar: yoga, hyrox, boxeo, pesas…',
    'config.searchAria': 'Buscar icono',
    'config.noIcons': 'No hay iconos para esa búsqueda',
    'config.privacy': 'Política de privacidad',
    'config.credits': 'Créditos',
    'config.apply': 'Guardar cambios',
    'config.language': 'Idioma',
    'config.repLabel': '{n} reps',
    'config.deleteRep': 'Eliminar {n} repeticiones',
    'config.deleteExercise': 'Eliminar {name}',

    'error.nameRequired': 'Escribe un nombre para el ejercicio',
    'error.iconRequired': 'Elige un icono de la lista',
    'error.duplicateExercise': 'Ya existe un ejercicio llamado "{name}"',
    'error.maxExercises': 'Máximo {max} ejercicios',
    'error.repRange': 'Introduce un número entre 1 y {max}',
    'error.duplicateRep': 'Ya existe la repetición {n}',
    'error.maxReps': 'Máximo {max} repeticiones',

    'config.commitment': 'Compromiso de privacidad',
    'commitment.intro': 'GymRoulette es software ético y soberano: hace lo que le pides y nada más.',
    'commitment.offline.title': 'Sin conexión (100% offline)',
    'commitment.offline.text': 'Funciona sin conexión. La app ni siquiera pide el permiso de Internet.',
    'commitment.noTrackers.title': 'Sin rastreadores',
    'commitment.noTrackers.text': 'Sin analíticas, sin librerías de seguimiento y sin perfiles.',
    'commitment.noAds.title': 'Sin publicidad',
    'commitment.noAds.text': 'Sin anuncios ni redes publicitarias.',
    'commitment.yourData.title': 'Tus datos son tuyos',
    'commitment.yourData.text': 'Todo lo que creas se queda en tu dispositivo. Si borras la app o sus datos, no queda ningún rastro en la nube.',
    'commitment.noScripts.title': 'Cero scripts externos',
    'commitment.noScripts.text': 'Todo el código va dentro de la app. No se carga nada de otros servidores.',
    'commitment.policy': 'Leer la política de privacidad completa',

    'doc.privacy': 'Política de privacidad',
    'doc.credits': 'Créditos y licencias',
    'doc.close': 'Cerrar',
  },

  groups: {
    strength: 'Fuerza y pesas',
    calisthenics: 'Calistenia y gimnasia',
    cardio: 'Cardio y resistencia',
    martial: 'Artes marciales y combate',
    mindbody: 'Mente y cuerpo',
    sports: 'Deportes',
    outdoor: 'Agua, montaña y aire libre',
    challenges: 'Obstáculos y retos',
  },

  icons: `
dumbbell | Mancuerna | pesas gimnasio musculacion fuerza
kettlebell | Kettlebell | pesa rusa crossfit swing
weight-lifter | Halterofilia | levantamiento barra press crossfit snatch clean
lift-up | Levantar peso | press militar jerk barra arriba
lift-down | Peso abajo | peso muerto deadlift sentadilla barra
weight | Peso | disco carga kilos
bench | Banco | press banca remo
anvil | Yunque | fuerza potencia strongman
hammer | Martillo | sledgehammer crossfit golpeo neumatico
tire | Neumático | tire flip crossfit strongman volteo
sandbag | Saco de arena | sandbag hyrox lunges bolsa carga
arm-flex | Bíceps | brazos curl musculo fuerza
arm | Brazo | triceps hombros fondos
leg | Piernas | sentadilla squat zancada gluteos cuadriceps
boulder | Roca | piedra atlas stone strongman
rock | Piedra | atlas stone ocr carga
gymnastics | Gimnasia | calistenia acrobacia
muscle-up | Muscle-up | dominadas barra calistenia pull-up
pull | Tirón | dominadas remo pull-up calistenia
pushup | Flexiones | push-up pushup suelo pecho triceps calistenia fondos
plank | Plancha | core abdominales isometrico suelo calistenia
situp | Abdominales | sit-up crunch core suelo calistenia
burpee | Burpee | salto suelo hiit crossfit cardio
climbers | Mountain climbers | escaladores escalador rodillas cardio core suelo hiit crossfit
squat | Sentadilla | air squat piernas gluteos cuadriceps calistenia
push | Empujar | empuje pared trineo sled push muro
cartwheel | Voltereta | rueda acrobacia gimnasia
handsup | Brazos arriba | estiramiento press overhead
balance | Equilibrio | handstand pino plancha core
jump-rope | Comba | cuerda saltar double unders crossfit
jump | Salto | box jump saltos burpee broad jumps split jumps pliometria
ladder | Escalera | agilidad trepa ocr
stairs | Escaleras | subir peldanos gradas cardio
rope | Cuerda | battle rope trepa cuerdas crossfit ocr
run | Correr | carrera running trote
run-fast | Carrera rápida | sprint velocidad escaladores mountain climbers
sprint | Sprint | velocidad series atletismo
walk | Caminar | zancadas lunges marcha paseo
hiking | Senderismo | montana trekking caminata
sneaker | Zapatillas | correr running calzado
footprint | Pasos | huellas marcha caminata
bike | Bicicleta | ciclismo spinning cardio
bike-fast | Ciclismo rápido | assault bike velocidad
rowing | Remo | remar ergometro hyrox crossfit
skierg | Esquí de fondo | skierg hyrox esqui ergometro
heart-pulse | Pulsaciones | cardio corazon salud
fire | Fuego | burpee intenso quemar calorias hiit
bolt | Rayo | explosivo potencia energia rapido
timer | Cronómetro | tiempo isometrico plancha emom
hourglass | Temporizador | tabata intervalos descanso
infinity | Infinito | amrap sin parar resistencia
repeat | Series | repeticiones circuito rondas
karate | Karate | kimono dojo artes marciales judo taekwondo
boxing | Boxeo | guante sparring kickboxing
mma | MMA | artes marciales mixtas lucha combate
high-kick | Patada alta | taekwondo kickboxing karate patadas
kick | Patada | golpeo kickboxing muay thai
punch | Puñetazo | golpe boxeo directo
punching-bag | Saco de boxeo | golpeo entrenamiento boxeo
fist | Puño | kung fu karate fuerza
ninja | Ninja | artes marciales ninjutsu agilidad
sword | Espadas | kendo esgrima lucha
fencing | Esgrima | espada florete
shield | Defensa | autodefensa proteccion
yoga | Yoga | asanas estiramiento flexibilidad pilates
meditation | Meditación | respiracion mindfulness relajacion
lotus | Loto | yoga meditacion zen
yin-yang | Yin yang | tai chi taichi equilibrio qigong
spa | Relajación | pilates stretching recuperacion bienestar
flower | Flor | pilates yoga calma
tortoise | Tortuga | lento tai chi control tempo
hand-heart | Bienestar | salud cuidado respiracion
soccer | Fútbol | balon futbol
basketball | Baloncesto | basket balon wall ball
volleyball | Voleibol | voley balon
tennis | Tenis | raqueta pelota padel
table-tennis | Tenis de mesa | ping pong
badminton | Bádminton | raqueta volante
rugby | Rugby | balon
football | Fútbol americano | balon
handball | Balonmano | balon
baseball | Béisbol | bate pelota
golf | Golf | palo bola
hockey | Hockey | palo disco
bowling | Bolos | bola
archery | Tiro con arco | diana puntería precision
target | Diana | objetivo precision reto
skate | Skate | patinete monopatin
roller-skate | Patinaje | patines
swim | Natación | nadar piscina crol
pool | Piscina | agua nadar aquagym
waves | Olas | agua mar aquagym
surf | Surf | olas tabla
kayak | Kayak | piragua remo
sailing | Vela | barco
diving | Buceo | apnea submarinismo
climbing | Escalada | trepar roca boulder ocr
terrain | Montaña | trail cuestas senderismo
ski | Esquí | nieve alpino
snowboard | Snowboard | nieve tabla
sled | Trineo | sled push pull hyrox arrastre empuje
horse | Hípica | caballo equitacion
fence | Valla | obstaculo ocr salto muro
flag | Meta | final carrera ocr hyrox llegada
trophy | Trofeo | reto especial campeon
medal | Medalla | logro premio
dice | Dados | azar aleatorio sorpresa
star | Estrella | favorito especial
rocket | Cohete | explosivo despegue potencia
tractor | Tractor | arrastre neumatico strongman
`,
};
