// Português (Brasil) — base do português; pt-PT herda deste e redefine só o que muda.
export default {
  strings: {
    'app.title': 'GymRoulette',

    'header.sound': 'Ativar ou desativar o som',
    'header.history': 'Abrir histórico',
    'header.settings': 'Abrir configurações',
    'menu.sound': 'Som',
    'menu.history': 'Histórico',

    'live.drag': 'Arraste a roleta para girar',
    'live.configure': 'Editar a roleta',
    'wheel.aria': 'Roleta de exercícios: gire com o botão abaixo ou arraste',
    'wheel.centerAria': 'Girar a roleta',
    'wheel.center': 'Girar',
    'wheel.setup': 'Editar',
    'spin.button': 'Girar roleta',

    'result.badge': 'Exercício selecionado',
    'result.reps': 'repetições',
    'result.skip': 'Pular este desafio',
    'result.done': 'Concluído',
    'result.share': 'Compartilhar desafio',
    'share.text': 'Meu desafio do GymRoulette: {challenge}. Gire a roleta e treine também: {url}',
    'share.saved': 'Imagem baixada',
    'share.failed': 'Não foi possível compartilhar o desafio',
    'share.preparing': 'Preparando a imagem…',
    'share.cancel': 'Cancelar',

    'history.title': 'Histórico da sessão',
    'history.close': 'Fechar histórico',
    'history.empty': 'Você ainda não registrou exercícios hoje. Gire a roleta para começar.',
    'history.total': 'Exercícios: {n} · Repetições no total: {reps}',
    'history.clear': 'Limpar histórico',
    'history.clearConfirm': 'Toque de novo',

    'config.title': 'Editar a roleta',
    'config.close': 'Fechar configurações',
    'config.intro': 'Ative ou desative exercícios, defina o intervalo de repetições de cada um, ou crie e exclua exercícios. As alterações são salvas na hora.',
    'config.reps': 'Repetições',
    'config.repsMin': 'Mín.',
    'config.repsMax': 'Máx.',
    'config.repsRange': '{min}–{max} reps',
    'config.editReps': 'Editar repetições de {name}',
    'config.repsSave': 'Salvar',
    'config.exercises': 'Exercícios',
    'config.exsAll': 'Todos',
    'config.exsNone': 'Nenhum',
    'config.addExercise': 'Adicionar novo exercício',
    'config.namePlaceholder': 'Nome (ex.: Prancha)',
    'config.chooseIcon': 'Escolher ícone',
    'config.searchPlaceholder': 'Buscar: yoga, caratê, boxe, pesos…',
    'config.searchAria': 'Buscar ícone',
    'config.noIcons': 'Nenhum ícone encontrado para essa busca',
    'config.save': 'Salvar',
    'config.help': 'Ajuda',
    'config.language': 'Idioma',
    'settings.title': 'Configurações',
    'settings.back': 'Voltar',
    'settings.wheel': 'Editar a roleta',
    'settings.appearance': 'Aparência',
    'appearance.calm': 'Escuro',
    'appearance.calmDesc': 'Tons sóbrios na roleta e verde esmeralda, sobre fundo escuro.',
    'appearance.classic': 'Clássico',
    'appearance.classicDesc': 'O visual original: cores vivas na roleta e verde intenso.',
    'appearance.light': 'Claro',
    'appearance.lightDesc': 'Os mesmos tons sóbrios e o verde esmeralda, sobre fundo claro.',
    'appearance.system': 'Sistema',
    'appearance.systemDesc': 'Alterna entre Escuro e Claro conforme o seu dispositivo.',
    'whatsnew.title': 'Novidades da {version}',
    'whatsnew.look': 'Visão horizontal para tablets e aparelhos girados.',
    'whatsnew.settings': 'Roleta mais clara: nomes centralizados em cada setor e botão de girar mais legível.',
    'whatsnew.text': 'Histórico mais organizado e, ao apagar um exercício, dá para desfazer na própria linha.',
    'whatsnew.classicTitle': 'Prefere outra aparência?',
    'whatsnew.classicText': 'Agora o app acompanha o seu dispositivo por padrão. Abra {settings}, depois {appearance} e escolha {options} para voltar ao que preferir.',
    'whatsnew.classicButton': 'Mudar aparência',
    'whatsnew.close': 'Começar',
    'whatsnew.closeAria': 'Fechar novidades',
    'config.deleteExercise': 'Excluir {name}',
    'config.deleted': 'Exercício excluído',
    'config.undo': 'Desfazer',
    'exercise.burpee': 'Burpees',
    'exercise.lunge': 'Afundos',
    'exercise.pushup': 'Flexões',
    'exercise.squat': 'Agachamentos',
    'exercise.climbers': 'Escaladores',
    'exercise.splitjump': 'Afundos com salto',

    'error.nameRequired': 'Digite um nome para o exercício',
    'error.iconRequired': 'Escolha um ícone da lista',
    'error.duplicateExercise': 'Já existe um exercício chamado "{name}"',
    'error.maxExercises': 'Máximo de {max} exercícios',
    'error.repRange': 'Digite um número entre 1 e {max}',
    'error.repMinMax': 'O mínimo não pode ser maior que o máximo',
    'error.maxLength': 'Máximo de {max} caracteres',

    'config.commitment': 'Compromisso de privacidade',
    'settings.privacy': 'Privacidade',
    'settings.about': 'Sobre',
    'commitment.intro': 'O GymRoulette é um software ético e soberano: faz o que você pede e nada mais.',
    'commitment.offline.title': '100% offline',
    'commitment.offline.text': 'Funciona sem conexão. O app nem pede a permissão de Internet.',
    'commitment.noTrackers.title': 'Sem rastreadores',
    'commitment.noTrackers.text': 'Sem análises, sem bibliotecas de rastreamento e sem perfis.',
    'commitment.noAds.title': 'Sem publicidade',
    'commitment.noAds.text': 'Sem anúncios e sem redes de publicidade.',
    'commitment.yourData.title': 'Seus dados são seus',
    'commitment.yourData.text': 'Tudo o que você cria fica no seu dispositivo. Se você apagar o app ou os dados dele, não fica nenhum rastro na nuvem.',
    'commitment.noScripts.title': 'Zero scripts externos',
    'commitment.noScripts.text': 'Todo o código está dentro do app. Nada é carregado de outros servidores.',
    'commitment.policy': 'Ler a política de privacidade completa',

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
