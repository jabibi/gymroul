// Textos de la ficha de Google Play por idioma (fuente única de store/<idioma>/textos/*.txt y del
// texto del gráfico de funciones). Límites de Play: título 30, descripción corta 80, descripción
// completa 4000 y novedades 500 caracteres; el test los comprueba.
//
//   node scripts/build-store-assets.mjs     (genera los .txt, los gráficos y las capturas)

/** Código de idioma de la app -> carpeta / idioma de Play Console y nombre que muestra la consola. */
export const STORE_LOCALES = [
  { app: 'en', play: 'en-US', name: 'Inglés (Estados Unidos)' },
  { app: 'en-GB', play: 'en-GB', name: 'Inglés (Reino Unido)' },
  { app: 'es', play: 'es-ES', name: 'Español (España)' },
  { app: 'es-419', play: 'es-419', name: 'Español (Latinoamérica)' },
  { app: 'eu', play: 'eu-ES', name: 'Euskera' },
  { app: 'gl', play: 'gl-ES', name: 'Gallego' },
  { app: 'ca', play: 'ca', name: 'Catalán' },
  { app: 'fr', play: 'fr-FR', name: 'Francés (Francia)' },
  { app: 'fr-CA', play: 'fr-CA', name: 'Francés (Canadá)' },
  { app: 'pt-BR', play: 'pt-BR', name: 'Portugués (Brasil)' },
  { app: 'pt-PT', play: 'pt-PT', name: 'Portugués (Portugal)' },
];

export const LIMITS = { title: 30, short: 80, full: 4000, notes: 500 };

export const LISTINGS = {
  en: {
    title: 'GymRoulette',
    short: 'Spin the wheel and get a random exercise challenge for your workout.',
    banner: { line1: 'Spin the wheel', line2: 'and get training!', tagline: 'Random exercises to challenge you every day', button: 'SPIN THE WHEEL!' },
    notes: `What's new:
• Now in English, Español, Euskara, Galego, Català, Français and Português.
• New logo and green look across the app.
• 100+ exercise icons with search, including new ones for push-ups, plank, burpee and mountain climbers.
• Vibration when your result comes up.
• The back gesture goes to the previous screen instead of closing the app.
• The keyboard no longer covers input fields.
• Bug fixes and improvements.`,
    full: `Can't decide what to train today? Spin the wheel and let GymRoulette choose for you.

GymRoulette is an exercise wheel: each segment combines a number of reps with an exercise (for example, “20 Burpee”), and when you spin it, it gives you a random challenge to train at home, at the gym or outdoors. Made to add variety to your sessions, for circuits, for challenges with friends, and for anyone who wants to work out without overthinking it.

HOW IT WORKS
• Tap “Spin the wheel” or fling the wheel with your finger.
• When it stops, you see your challenge: reps and exercise.
• Mark it as done or skip it and spin again.
• Check the history for the challenges you completed during the session.

YOU DECIDE WHAT'S ON THE WHEEL
• Turn the exercises and reps you want on or off.
• Create your own exercises with a name, a short name and an icon.
• Add or remove reps to adjust the difficulty.
• The wheel adapts to your settings, which are saved on your device.

MORE THAN 100 ICONS FOR YOUR EXERCISES
Choose from more than 100 icons across many disciplines, with search: strength and weights, calisthenics, cardio, yoga, pilates, tai chi, boxing, karate and other martial arts, hyrox, crossfit, obstacle races, sports, water and mountain. Includes our own pictograms for push-ups, plank, sit-ups, burpee, squat and mountain climbers.

IN YOUR LANGUAGE
English, Español, Euskara, Galego, Català, Français and Português (Brasil and Portugal). The app follows your phone's language, and you can change it in Settings.

NICE DETAILS
• Wheel sounds and vibration when the result comes up.
• A dark design that's easy on the eyes at the gym.
• No sign-up or user accounts.
• No ads.
• Works offline.

PRIVACY
Your settings are stored only on your device. To use the app you need to accept Google Analytics, which measures anonymously how the app is used. You can read the privacy policy inside the app and withdraw your consent from Settings.

Spin the wheel and let's train!`,
  },

  es: {
    title: 'GymRoulette',
    short: 'Gira la ruleta y recibe un reto de ejercicio al azar para tu entrenamiento.',
    banner: { line1: '¡Gira la ruleta', line2: 'y a entrenar!', tagline: 'Ejercicios aleatorios para retarte cada día', button: '¡GIRAR RULETA!' },
    notes: `Novedades:
• Ahora disponible en español, English, Euskara, Galego, Català, Français y Português.
• Nuevo logo y nuevo estilo verde en toda la app.
• Más de 100 iconos para tus ejercicios con buscador, incluidos nuevos de flexiones, plancha, burpee y mountain climbers.
• La app vibra al salir el resultado.
• El gesto Atrás vuelve a la pantalla anterior en lugar de cerrar la app.
• El teclado ya no tapa los campos al crear ejercicios.
• Correcciones de errores y mejoras de rendimiento.`,
    full: `¿Sin ganas de decidir qué entrenar hoy? Gira la ruleta y deja que GymRoulette elija por ti.

GymRoulette es una ruleta de ejercicios: cada sector combina un número de repeticiones con un ejercicio (por ejemplo, «20 Burpee») y, al girarla, te propone un reto aleatorio para entrenar en casa, en el gimnasio o al aire libre. Pensada para dar variedad a tus sesiones, para circuitos, para retos con amigos y para quien quiere entrenar sin complicarse.

CÓMO FUNCIONA
• Pulsa «Girar ruleta» o lanza la ruleta con el dedo.
• Cuando se detiene, ves tu reto: repeticiones y ejercicio.
• Márcalo como completado o sáltalo y vuelve a girar.
• Consulta en el historial los retos que has completado en la sesión.

TÚ DECIDES QUÉ HAY EN LA RULETA
• Activa o desactiva los ejercicios y las repeticiones que quieras.
• Crea tus propios ejercicios con nombre, nombre corto e icono.
• Añade o elimina repeticiones para ajustar la dificultad.
• La ruleta se adapta a tu configuración y se guarda en tu dispositivo.

MÁS DE 100 ICONOS PARA TUS EJERCICIOS
Elige entre más de 100 iconos de muchas disciplinas, con buscador: fuerza y pesas, calistenia, cardio, yoga, pilates, tai chi, boxeo, karate y otras artes marciales, hyrox, crossfit, carreras de obstáculos, deportes, agua y montaña. Incluye pictogramas propios de flexiones, plancha, abdominales, burpee, sentadilla y mountain climbers.

EN TU IDIOMA
English, Español, Euskara, Galego, Català, Français y Português (Brasil y Portugal). La app sigue el idioma de tu móvil y puedes cambiarlo en Configuración.

DETALLES QUE SE AGRADECEN
• Sonido de ruleta y vibración al salir el resultado.
• Diseño oscuro y cómodo para usar en el gimnasio.
• Sin registro ni cuentas de usuario.
• Sin anuncios.
• Funciona sin conexión.

PRIVACIDAD
Tu configuración se guarda únicamente en tu dispositivo. Para usar la aplicación es necesario aceptar el uso de Google Analytics, que mide de forma anónima cómo se utiliza la aplicación. Puedes consultar la política de privacidad dentro de la app y retirar tu consentimiento desde Configuración.

¡Gira la ruleta y a entrenar!`,
  },

  eu: {
    title: 'GymRoulette',
    short: 'Biratu gurpila eta jaso ausazko ariketa-erronka bat zure entrenamendurako.',
    banner: { line1: 'Biratu gurpila', line2: 'eta entrenatzera!', tagline: 'Ausazko ariketak egunero zure burua probatzeko', button: 'BIRATU GURPILA!' },
    notes: `Berritasunak:
• Orain English, Español, Euskara, Galego, Català, Français eta Português hizkuntzetan.
• Logo berria eta estilo berdea.
• 100 ikono baino gehiago zure ariketetarako, bilatzailearekin; flexioenak, plantxarenak, burpee-renak eta mountain climbers-enak barne.
• Aplikazioak bibratzen du emaitza ateratzen denean.
• Atzera keinuak aurreko pantailara itzultzen zaitu, aplikazioa itxi beharrean.
• Teklatuak ez ditu jada eremuak estaltzen.
• Akatsen zuzenketak eta hobekuntzak.`,
    full: `Ez dakizu gaur zer entrenatu? Biratu gurpila eta utzi GymRoulette-ri zure ordez aukeratzen.

GymRoulette ariketen gurpila da: sektore bakoitzak errepikapen kopuru bat ariketa batekin uztartzen du (adibidez, «20 Burpee»), eta biratzean ausazko erronka bat proposatzen dizu etxean, gimnasioan edo kanpoan entrenatzeko. Zure saioei aniztasuna emateko pentsatua dago, zirkuituetarako, lagunekin erronkak egiteko eta konplikatu gabe entrenatu nahi duenarentzat.

NOLA FUNTZIONATZEN DU
• Sakatu «Biratu gurpila» edo bota gurpila hatzarekin.
• Gelditzen denean, zure erronka ikusiko duzu: errepikapenak eta ariketa.
• Markatu egin duzula edo saltatu eta biratu berriro.
• Begiratu historian saioan zehar egin dituzun erronkak.

ZUK ERABAKITZEN DUZU ZER DAGOEN GURPILEAN
• Aktibatu edo desaktibatu nahi dituzun ariketak eta errepikapenak.
• Sortu zure ariketak izenarekin, izen laburrarekin eta ikonoarekin.
• Gehitu edo kendu errepikapenak zailtasuna doitzeko.
• Gurpila zure konfiguraziora egokitzen da, eta zure gailuan gordetzen da.

100 IKONO BAINO GEHIAGO ZURE ARIKETETARAKO
Aukeratu 100 ikono baino gehiagoren artean, disziplina askotakoak eta bilatzailearekin: indarra eta pisuak, kalistenia, kardioa, yoga, pilates, tai chi, boxeoa, karatea eta beste borroka-arte batzuk, hyrox, crossfit, oztopo-lasterketak, kirolak, ura eta mendia. Flexioen, plantxaren, abdominalen, burpee-ren, squat-aren eta mountain climbers-en piktograma propioak ditu.

ZURE HIZKUNTZAN
English, Español, Euskara, Galego, Català, Français eta Português (Brasil eta Portugal). Aplikazioa zure telefonoaren hizkuntzara egokitzen da, eta Ezarpenetan alda dezakezu.

XEHETASUN POLITAK
• Gurpilaren soinuak eta bibrazioa emaitza ateratzen denean.
• Diseinu iluna, gimnasioan begientzat erosoa.
• Izen-emate edo erabiltzaile-konturik gabe.
• Iragarkirik gabe.
• Konexiorik gabe ere funtzionatzen du.

PRIBATUTASUNA
Zure ezarpenak zure gailuan soilik gordetzen dira. Aplikazioa erabiltzeko Google Analytics onartu behar da, aplikazioa nola erabiltzen den modu anonimoan neurtzen duena. Pribatutasun-politika aplikazioaren barruan kontsulta dezakezu eta zure baimena Ezarpenetatik kendu.

Biratu gurpila eta entrenatzera!`,
  },

  gl: {
    title: 'GymRoulette',
    short: 'Xira a ruleta e recibe un reto de exercicio ao chou para o teu adestramento.',
    banner: { line1: 'Xira a ruleta', line2: 'e a adestrar!', tagline: 'Exercicios aleatorios para retarte cada día', button: 'XIRAR A RULETA!' },
    notes: `Novidades:
• Agora dispoñible en English, Español, Euskara, Galego, Català, Français e Português.
• Novo logo e novo estilo verde en toda a app.
• Máis de 100 iconas para os teus exercicios con buscador, incluídas novas de flexións, prancha, burpee e mountain climbers.
• A app vibra ao saír o resultado.
• O xesto Atrás volve á pantalla anterior en lugar de pechar a app.
• O teclado xa non tapa os campos ao crear exercicios.
• Corrección de erros e melloras de rendemento.`,
    full: `Sen ganas de decidir que adestrar hoxe? Xira a ruleta e deixa que GymRoulette escolla por ti.

GymRoulette é unha ruleta de exercicios: cada sector combina un número de repeticións cun exercicio (por exemplo, «20 Burpee») e, ao xirala, proponche un reto aleatorio para adestrar na casa, no ximnasio ou ao aire libre. Pensada para darlle variedade ás túas sesións, para circuítos, para retos con amizades e para quen quere adestrar sen complicarse.

COMO FUNCIONA
• Preme «Xirar a ruleta» ou lanza a ruleta co dedo.
• Cando se detén, ves o teu reto: repeticións e exercicio.
• Márcao como completado ou sáltao e volve xirar.
• Consulta no historial os retos que completaches na sesión.

TI DECIDES QUE HAI NA RULETA
• Activa ou desactiva os exercicios e as repeticións que queiras.
• Crea os teus propios exercicios con nome, nome curto e icona.
• Engade ou elimina repeticións para axustar a dificultade.
• A ruleta adáptase á túa configuración, que se garda no teu dispositivo.

MÁIS DE 100 ICONAS PARA OS TEUS EXERCICIOS
Escolle entre máis de 100 iconas de moitas disciplinas, con buscador: forza e pesas, calistenia, cardio, yoga, pilates, tai chi, boxeo, karate e outras artes marciais, hyrox, crossfit, carreiras de obstáculos, deportes, auga e montaña. Inclúe pictogramas propios de flexións, prancha, abdominais, burpee, agachamento e mountain climbers.

NO TEU IDIOMA
English, Español, Euskara, Galego, Català, Français e Português (Brasil e Portugal). A app segue o idioma do teu móbil e podes cambialo en Configuración.

DETALLES QUE SE AGRADECEN
• Son de ruleta e vibración ao saír o resultado.
• Deseño escuro e cómodo para usar no ximnasio.
• Sen rexistro nin contas de usuario.
• Sen anuncios.
• Funciona sen conexión.

PRIVACIDADE
A túa configuración gárdase unicamente no teu dispositivo. Para usar a aplicación é necesario aceptar o uso de Google Analytics, que mide de forma anónima como se utiliza a aplicación. Podes consultar a política de privacidade dentro da app e retirar o teu consentimento desde Configuración.

Xira a ruleta e a adestrar!`,
  },

  ca: {
    title: 'GymRoulette',
    short: "Gira la ruleta i rep un repte d'exercici a l'atzar per al teu entrenament.",
    banner: { line1: 'Gira la ruleta', line2: 'i a entrenar!', tagline: 'Exercicis aleatoris per reptar-te cada dia', button: 'GIRA LA RULETA!' },
    notes: `Novetats:
• Ara disponible en English, Español, Euskara, Galego, Català, Français i Português.
• Nou logo i nou estil verd a tota l'app.
• Més de 100 icones per als teus exercicis amb cercador, incloses noves de flexions, planxa, burpee i mountain climbers.
• L'app vibra quan surt el resultat.
• El gest Enrere torna a la pantalla anterior en lloc de tancar l'app.
• El teclat ja no tapa els camps en crear exercicis.
• Correcció d'errors i millores de rendiment.`,
    full: `No tens ganes de decidir què entrenar avui? Gira la ruleta i deixa que GymRoulette triï per tu.

GymRoulette és una ruleta d'exercicis: cada sector combina un nombre de repeticions amb un exercici (per exemple, «20 Burpee») i, en girar-la, et proposa un repte aleatori per entrenar a casa, al gimnàs o a l'aire lliure. Pensada per donar varietat a les teves sessions, per a circuits, per a reptes amb amics i per a qui vol entrenar sense complicar-se.

COM FUNCIONA
• Prem «Gira la ruleta» o llança la ruleta amb el dit.
• Quan s'atura, veus el teu repte: repeticions i exercici.
• Marca'l com a completat o salta'l i torna a girar.
• Consulta a l'historial els reptes que has completat a la sessió.

TU DECIDEIXES QUÈ HI HA A LA RULETA
• Activa o desactiva els exercicis i les repeticions que vulguis.
• Crea els teus propis exercicis amb nom, nom curt i icona.
• Afegeix o elimina repeticions per ajustar la dificultat.
• La ruleta s'adapta a la teva configuració, que es desa al teu dispositiu.

MÉS DE 100 ICONES PER ALS TEUS EXERCICIS
Tria entre més de 100 icones de moltes disciplines, amb cercador: força i pesos, calistènia, cardio, ioga, pilates, tai-txi, boxa, karate i altres arts marcials, hyrox, crossfit, curses d'obstacles, esports, aigua i muntanya. Inclou pictogrames propis de flexions, planxa, abdominals, burpee, esquat i mountain climbers.

EN EL TEU IDIOMA
English, Español, Euskara, Galego, Català, Français i Português (Brasil i Portugal). L'app segueix l'idioma del teu mòbil i el pots canviar a Configuració.

DETALLS QUE S'AGRAEIXEN
• So de ruleta i vibració quan surt el resultat.
• Disseny fosc i còmode per fer servir al gimnàs.
• Sense registre ni comptes d'usuari.
• Sense anuncis.
• Funciona sense connexió.

PRIVADESA
La teva configuració es desa únicament al teu dispositiu. Per utilitzar l'aplicació cal acceptar l'ús de Google Analytics, que mesura de manera anònima com s'utilitza l'aplicació. Pots consultar la política de privadesa dins de l'app i retirar el teu consentiment des de Configuració.

Gira la ruleta i a entrenar!`,
  },

  fr: {
    title: 'GymRoulette',
    short: "Fais tourner la roue et reçois un défi d'exercice au hasard pour t'entraîner.",
    banner: { line1: 'Lance la roue', line2: "et c'est parti !", tagline: 'Des exercices au hasard pour te défier chaque jour', button: 'LANCER LA ROUE !' },
    notes: `Nouveautés :
• Désormais en English, Español, Euskara, Galego, Català, Français et Português.
• Nouveau logo et nouveau style vert.
• Plus de 100 icônes pour tes exercices avec recherche, dont de nouvelles pour les pompes, le gainage, le burpee et les mountain climbers.
• L'application vibre quand le résultat apparaît.
• Le geste Retour revient à l'écran précédent au lieu de fermer l'application.
• Le clavier ne cache plus les champs.
• Corrections de bugs et améliorations.`,
    full: `Pas envie de décider quoi t'entraîner aujourd'hui ? Fais tourner la roue et laisse GymRoulette choisir pour toi.

GymRoulette est une roue d'exercices : chaque secteur associe un nombre de répétitions à un exercice (par exemple « 20 Burpee ») et, quand tu la fais tourner, elle te propose un défi au hasard pour t'entraîner à la maison, en salle ou en plein air. Pensée pour varier tes séances, pour des circuits, des défis entre amis et pour tous ceux qui veulent s'entraîner sans se compliquer la vie.

COMMENT ÇA MARCHE
• Appuie sur « Lancer la roue » ou lance-la d'un geste du doigt.
• Quand elle s'arrête, tu vois ton défi : répétitions et exercice.
• Marque-le comme terminé ou passe-le et relance la roue.
• Consulte l'historique des défis terminés pendant la séance.

C'EST TOI QUI CHOISIS CE QUI EST SUR LA ROUE
• Active ou désactive les exercices et les répétitions que tu veux.
• Crée tes propres exercices avec un nom, un nom court et une icône.
• Ajoute ou supprime des répétitions pour régler la difficulté.
• La roue s'adapte à tes réglages, enregistrés sur ton appareil.

PLUS DE 100 ICÔNES POUR TES EXERCICES
Choisis parmi plus de 100 icônes de nombreuses disciplines, avec recherche : force et poids, callisthénie, cardio, yoga, pilates, tai chi, boxe, karaté et autres arts martiaux, hyrox, crossfit, courses d'obstacles, sports, eau et montagne. Avec des pictogrammes originaux pour les pompes, le gainage, les abdominaux, le burpee, le squat et les mountain climbers.

DANS TA LANGUE
English, Español, Euskara, Galego, Català, Français et Português (Brasil et Portugal). L'application suit la langue de ton téléphone et tu peux la changer dans les Réglages.

DE BONS PETITS DÉTAILS
• Sons de la roue et vibration à l'apparition du résultat.
• Un design sombre, agréable à l'œil en salle.
• Sans inscription ni compte utilisateur.
• Sans publicité.
• Fonctionne hors connexion.

CONFIDENTIALITÉ
Tes réglages sont enregistrés uniquement sur ton appareil. Pour utiliser l'application, il faut accepter Google Analytics, qui mesure de façon anonyme l'utilisation de l'application. Tu peux consulter la politique de confidentialité dans l'application et retirer ton consentement depuis les Réglages.

Lance la roue et c'est parti !`,
  },

  'pt-BR': {
    title: 'GymRoulette',
    short: 'Gire a roleta e receba um desafio de exercício aleatório para o seu treino.',
    banner: { line1: 'Gire a roleta', line2: 'e vá treinar!', tagline: 'Exercícios aleatórios para te desafiar todo dia', button: 'GIRAR ROLETA!' },
    notes: `Novidades:
• Agora em English, Español, Euskara, Galego, Català, Français e Português.
• Novo logo e novo visual verde em todo o app.
• Mais de 100 ícones para seus exercícios com busca, incluindo novos de flexões, prancha, burpee e mountain climbers.
• O app vibra quando o resultado aparece.
• O gesto de voltar retorna à tela anterior em vez de fechar o app.
• O teclado não cobre mais os campos.
• Correções de erros e melhorias.`,
    full: `Sem vontade de decidir o que treinar hoje? Gire a roleta e deixe o GymRoulette escolher por você.

O GymRoulette é uma roleta de exercícios: cada setor combina um número de repetições com um exercício (por exemplo, “20 Burpee”) e, ao girá-la, propõe um desafio aleatório para treinar em casa, na academia ou ao ar livre. Pensada para dar variedade aos seus treinos, para circuitos, desafios com amigos e para quem quer treinar sem complicação.

COMO FUNCIONA
• Toque em “Girar roleta” ou lance a roleta com o dedo.
• Quando ela para, você vê o seu desafio: repetições e exercício.
• Marque como concluído ou pule e gire de novo.
• Veja no histórico os desafios que você concluiu na sessão.

VOCÊ DECIDE O QUE ENTRA NA ROLETA
• Ative ou desative os exercícios e as repetições que quiser.
• Crie seus próprios exercícios com nome, nome curto e ícone.
• Adicione ou remova repetições para ajustar a dificuldade.
• A roleta se adapta às suas configurações, que ficam salvas no seu dispositivo.

MAIS DE 100 ÍCONES PARA SEUS EXERCÍCIOS
Escolha entre mais de 100 ícones de muitas modalidades, com busca: força e pesos, calistenia, cardio, yoga, pilates, tai chi, boxe, caratê e outras artes marciais, hyrox, crossfit, corridas de obstáculos, esportes, água e montanha. Inclui pictogramas próprios de flexões, prancha, abdominais, burpee, agachamento e mountain climbers.

NO SEU IDIOMA
English, Español, Euskara, Galego, Català, Français e Português (Brasil e Portugal). O app segue o idioma do seu celular e você pode mudá-lo em Configurações.

DETALHES QUE FAZEM DIFERENÇA
• Som da roleta e vibração quando o resultado aparece.
• Visual escuro e confortável para usar na academia.
• Sem cadastro nem contas de usuário.
• Sem anúncios.
• Funciona sem conexão.

PRIVACIDADE
Suas configurações ficam salvas apenas no seu dispositivo. Para usar o aplicativo é preciso aceitar o Google Analytics, que mede de forma anônima como o app é usado. Você pode ler a política de privacidade dentro do app e retirar seu consentimento em Configurações.

Gire a roleta e vá treinar!`,
  },

  'pt-PT': {
    title: 'GymRoulette',
    short: 'Gira a roleta e recebe um desafio de exercício aleatório para o teu treino.',
    banner: { line1: 'Gira a roleta', line2: 'e vai treinar!', tagline: 'Exercícios aleatórios para te desafiares todos os dias', button: 'GIRAR ROLETA!' },
    notes: `Novidades:
• Agora em English, Español, Euskara, Galego, Català, Français e Português.
• Novo logótipo e novo estilo verde em toda a aplicação.
• Mais de 100 ícones para os teus exercícios com pesquisa, incluindo novos de flexões, prancha, burpee e mountain climbers.
• A aplicação vibra quando aparece o resultado.
• O gesto de voltar atrás regressa ao ecrã anterior em vez de fechar a aplicação.
• O teclado já não tapa os campos.
• Correções de erros e melhorias.`,
    full: `Sem vontade de decidir o que treinar hoje? Gira a roleta e deixa o GymRoulette escolher por ti.

O GymRoulette é uma roleta de exercícios: cada setor combina um número de repetições com um exercício (por exemplo, “20 Burpee”) e, ao girá-la, propõe-te um desafio aleatório para treinares em casa, no ginásio ou ao ar livre. Pensada para dar variedade aos teus treinos, para circuitos, desafios com amigos e para quem quer treinar sem complicações.

COMO FUNCIONA
• Toca em “Girar roleta” ou lança a roleta com o dedo.
• Quando pára, vês o teu desafio: repetições e exercício.
• Marca-o como concluído ou salta-o e gira outra vez.
• Consulta no histórico os desafios que concluíste na sessão.

TU DECIDES O QUE ENTRA NA ROLETA
• Ativa ou desativa os exercícios e as repetições que quiseres.
• Cria os teus próprios exercícios com nome, nome curto e ícone.
• Adiciona ou remove repetições para ajustar a dificuldade.
• A roleta adapta-se às tuas definições, que ficam guardadas no teu dispositivo.

MAIS DE 100 ÍCONES PARA OS TEUS EXERCÍCIOS
Escolhe entre mais de 100 ícones de muitas modalidades, com pesquisa: força e pesos, calistenia, cardio, yoga, pilates, tai chi, boxe, karaté e outras artes marciais, hyrox, crossfit, corridas de obstáculos, desportos, água e montanha. Inclui pictogramas próprios de flexões, prancha, abdominais, burpee, agachamento e mountain climbers.

NO TEU IDIOMA
English, Español, Euskara, Galego, Català, Français e Português (Brasil e Portugal). A aplicação segue o idioma do teu telemóvel e podes alterá-lo em Definições.

DETALHES QUE FAZEM DIFERENÇA
• Som da roleta e vibração quando aparece o resultado.
• Visual escuro e confortável para usar no ginásio.
• Sem registo nem contas de utilizador.
• Sem anúncios.
• Funciona sem ligação.

PRIVACIDADE
As tuas definições ficam guardadas apenas no teu dispositivo. Para utilizar a aplicação é necessário aceitar o Google Analytics, que mede de forma anónima como a aplicação é utilizada. Podes ler a política de privacidade dentro da aplicação e retirar o teu consentimento em Definições.

Gira a roleta e vai treinar!`,
  },

  // El inglés británico usa el mismo texto: no hay palabras del listado que cambien entre variantes
  'en-GB': null,
};
LISTINGS['en-GB'] = LISTINGS.en;

/** Deriva una variante regional de un listado cambiando palabras o signos (en todos sus textos y en el del gráfico). */
function adapt(listing, pairs) {
  const apply = text => pairs.reduce((out, [from, to]) => out.split(from).join(to), text);
  return {
    ...listing,
    short: apply(listing.short),
    full: apply(listing.full),
    notes: apply(listing.notes),
    banner: Object.fromEntries(Object.entries(listing.banner).map(([key, value]) => [key, apply(value)])),
  };
}

// Español de Latinoamérica: "presiona/agrega" y "celular"
LISTINGS['es-419'] = adapt(LISTINGS.es, [['Pulsa', 'Presiona'], ['Añade', 'Agrega'], ['tu móvil', 'tu celular']]);

// Francés de Canadá: sin espacio antes de « ! » y « ? », y "paramètres" en lugar de "réglages"
LISTINGS['fr-CA'] = adapt(LISTINGS.fr, [['\u00a0!', '!'], [' !', '!'], ['\u00a0?', '?'], [' ?', '?'], ['Réglages', 'Paramètres']]);
