// Português (Brasil) — base do português; pt-PT herda deste e redefine só o que muda.
export default {
  strings: {
    'app.title': 'GymRoulette - Gasteiz Trainning',

    'header.sound': 'Ativar ou desativar o som',
    'header.history': 'Abrir histórico',
    'header.settings': 'Abrir configurações',

    'live.drag': 'Arraste a roleta para girar',
    'live.configure': 'Configurar a roleta',
    'wheel.aria': 'Roleta de exercícios: gire com o botão abaixo ou arraste',
    'wheel.centerAria': 'Girar a roleta',
    'wheel.center': 'GIRAR',
    'wheel.setup': 'Configurar',
    'spin.button': 'GIRAR ROLETA!',

    'result.badge': 'EXERCÍCIO SELECIONADO!',
    'result.desc': 'Ótimo desafio! Faça {reps} repetições de {exercise} com técnica perfeita.',
    'result.skip': 'Pular este desafio',
    'result.done': 'Concluído!',

    'history.title': 'Histórico da sessão',
    'history.close': 'Fechar histórico',
    'history.empty': 'Você ainda não registrou exercícios hoje. Gire a roleta!',
    'history.total': 'Concluídos na sessão: {n}',
    'history.done': 'Concluído!',
    'history.clear': 'Limpar histórico',

    'config.title': 'Configuração da roleta',
    'config.close': 'Fechar configurações',
    'config.intro': 'Ative, crie ou exclua repetições e exercícios:',
    'config.reps': 'Repetições',
    'config.repsAll': 'Todas',
    'config.repsNone': 'Nenhuma',
    'config.repPlaceholder': 'Ex.: 15',
    'config.add': 'Adicionar',
    'config.exercises': 'Exercícios',
    'config.exsAll': 'Todos',
    'config.exsNone': 'Nenhum',
    'config.addExercise': 'Adicionar novo exercício:',
    'config.namePlaceholder': 'Nome (ex.: Prancha)',
    'config.shortPlaceholder': 'Nome curto',
    'config.chooseIcon': 'Escolher ícone',
    'config.create': 'Criar',
    'config.searchPlaceholder': 'Buscar: yoga, hyrox, boxe, pesos…',
    'config.searchAria': 'Buscar ícone',
    'config.noIcons': 'Nenhum ícone encontrado para essa busca',
    'config.privacy': 'Política de privacidade',
    'config.credits': 'Créditos',
    'config.apply': 'Salvar alterações',
    'config.language': 'Idioma',
    'config.repLabel': '{n} reps',
    'config.deleteRep': 'Excluir {n} repetições',
    'config.deleteExercise': 'Excluir {name}',

    'error.nameRequired': 'Digite um nome para o exercício',
    'error.iconRequired': 'Escolha um ícone da lista',
    'error.duplicateExercise': 'Já existe um exercício chamado "{name}"',
    'error.maxExercises': 'Máximo de {max} exercícios',
    'error.repRange': 'Digite um número entre 1 e {max}',
    'error.duplicateRep': 'A repetição {n} já existe',
    'error.maxReps': 'Máximo de {max} repetições',

    'intro.skip': 'Pular',
    'intro.next': 'Próximo',
    'intro.start': 'Começar',
    'intro.steps': 'Introdução',
    'intro.how.title': 'Como a roleta funciona',
    'intro.how.spin': 'Toque em “Girar roleta” ou lance a roleta com o dedo.',
    'intro.how.result': 'Quando parar, você recebe um desafio: algumas repetições de um exercício.',
    'intro.how.done': 'Marque como concluído ou pule, e gire novamente.',
    'intro.private.title': 'Offline e privado',
    'intro.private.offline': 'Funciona totalmente offline.',
    'intro.private.noAds': 'Sem anúncios.',
    'intro.private.noTrackers': 'Sem rastreadores: nada sai do seu dispositivo.',
    'intro.private.noCookies': 'Sem cookies desnecessários.',
    'intro.private.noLocation': 'Sem acesso à sua localização.',

    'doc.privacy': 'Política de privacidade',
    'doc.credits': 'Créditos e licenças',
    'doc.close': 'Fechar',
  },

  groups: {
    strength: 'Força e pesos',
    calisthenics: 'Calistenia e ginástica',
    cardio: 'Cardio e resistência',
    martial: 'Artes marciais e combate',
    mindbody: 'Mente e corpo',
    sports: 'Esportes',
    outdoor: 'Água, montanha e ao ar livre',
    challenges: 'Obstáculos e desafios',
  },

  icons: `
dumbbell | Halter | pesos academia musculação força
kettlebell | Kettlebell | peso russo crossfit swing
weight-lifter | Levantamento de peso | barra supino crossfit arranco arremesso
lift-up | Levantar peso | desenvolvimento militar jerk barra cima
lift-down | Peso abaixo | levantamento terra deadlift agachamento barra
weight | Peso | anilha carga quilos
bench | Banco | supino remada
anvil | Bigorna | força potência strongman
hammer | Martelo | marreta crossfit golpe pneu
tire | Pneu | tire flip crossfit strongman virada
sandbag | Saco de areia | sandbag hyrox avanços bolsa carga
arm-flex | Bíceps | braços rosca músculo força
arm | Braço | tríceps ombros mergulho
leg | Pernas | agachamento squat avanço glúteos quadríceps
boulder | Rocha | pedra atlas stone strongman
rock | Pedra | atlas stone ocr carga
gymnastics | Ginástica | calistenia acrobacia
muscle-up | Muscle-up | barra fixa calistenia pull-up
pull | Puxada | barra fixa remada pull-up calistenia
pushup | Flexões | flexão de braço push-up pushup chão peito tríceps calistenia
plank | Prancha | core abdominais isométrico chão calistenia
situp | Abdominais | sit-up crunch core chão calistenia
burpee | Burpee | salto chão hiit crossfit cardio
climbers | Mountain climbers | escaladores joelhos cardio core chão hiit crossfit
squat | Agachamento | air squat pernas glúteos quadríceps calistenia
push | Empurrar | empurrão parede trenó sled push muro
cartwheel | Estrela | estrelinha acrobacia ginástica
handsup | Braços para cima | alongamento desenvolvimento overhead
balance | Equilíbrio | handstand bananeira prancha core
jump-rope | Corda de pular | pular corda double unders crossfit
jump | Salto | box jump saltos burpee broad jumps split jumps pliometria
ladder | Escada | agilidade escalada ocr
stairs | Escadas | subir degraus arquibancada cardio
rope | Corda | battle rope escalada cordas crossfit ocr
run | Correr | corrida running trote
run-fast | Corrida rápida | sprint velocidade escaladores mountain climbers
sprint | Sprint | velocidade séries atletismo
walk | Caminhar | avanços lunges marcha passeio
hiking | Trilha | montanha trekking caminhada
sneaker | Tênis | correr running calçado
footprint | Passos | pegadas marcha caminhada
bike | Bicicleta | ciclismo spinning cardio
bike-fast | Ciclismo rápido | assault bike velocidade
rowing | Remo | remar ergômetro hyrox crossfit
skierg | Esqui nórdico | skierg hyrox esqui ergômetro
heart-pulse | Batimentos | cardio coração saúde
fire | Fogo | burpee intenso queimar calorias hiit
bolt | Raio | explosivo potência energia rápido
timer | Cronômetro | tempo isométrico prancha emom
hourglass | Temporizador | tabata intervalos descanso
infinity | Infinito | amrap sem parar resistência
repeat | Séries | repetições circuito rodadas
karate | Caratê | quimono dojo artes marciais judô taekwondo
boxing | Boxe | luva sparring kickboxing
mma | MMA | artes marciais mistas luta combate
high-kick | Chute alto | taekwondo kickboxing caratê chutes
kick | Chute | golpe kickboxing muay thai
punch | Soco | golpe boxe direto
punching-bag | Saco de pancada | golpes treino boxe
fist | Punho | kung fu caratê força
ninja | Ninja | artes marciais ninjutsu agilidade
sword | Espadas | kendo esgrima luta
fencing | Esgrima | espada florete
shield | Defesa | autodefesa proteção
yoga | Yoga | asanas alongamento flexibilidade pilates
meditation | Meditação | respiração mindfulness relaxamento
lotus | Lótus | yoga meditação zen
yin-yang | Yin yang | tai chi taichi equilíbrio qigong
spa | Relaxamento | pilates stretching recuperação bem-estar
flower | Flor | pilates yoga calma
tortoise | Tartaruga | lento tai chi controle tempo
hand-heart | Bem-estar | saúde cuidado respiração
soccer | Futebol | bola
basketball | Basquete | cesta bola wall ball
volleyball | Vôlei | voleibol bola
tennis | Tênis | raquete bola padel
table-tennis | Tênis de mesa | ping pong
badminton | Badminton | raquete peteca
rugby | Rúgbi | bola
football | Futebol americano | bola
handball | Handebol | bola
baseball | Beisebol | taco bola
golf | Golfe | taco bola
hockey | Hóquei | taco disco
bowling | Boliche | bola
archery | Tiro com arco | alvo mira precisão
target | Alvo | objetivo precisão desafio
skate | Skate | patinete skatista
roller-skate | Patinação | patins
swim | Natação | nadar piscina crawl
pool | Piscina | água nadar hidroginástica
waves | Ondas | água mar hidroginástica
surf | Surfe | ondas prancha
kayak | Caiaque | canoa remo
sailing | Vela | barco
diving | Mergulho | apneia snorkel
climbing | Escalada | subir rocha boulder ocr
terrain | Montanha | trail subidas trilha
ski | Esqui | neve alpino
snowboard | Snowboard | neve prancha
sled | Trenó | sled push pull hyrox arrasto empurrão
horse | Hipismo | cavalo equitação
fence | Cerca | obstáculo ocr salto muro
flag | Chegada | linha de chegada corrida ocr hyrox
trophy | Troféu | desafio especial campeão
medal | Medalha | conquista prêmio
dice | Dados | sorte aleatório surpresa
star | Estrela | favorito especial
rocket | Foguete | explosivo decolagem potência
tractor | Trator | arrasto pneu strongman
`,
};
