// Textos de la ficha de Google Play por idioma (fuente única de store/<idioma>/textos/*.txt y del
// texto del gráfico de funciones). Límites de Play: título 30, descripción corta 80, descripción
// completa 4000 y novedades 500 caracteres; el test los comprueba.
//
//   node scripts/build-store-assets.mjs     (genera los .txt, los gráficos y las capturas)

/** Código de idioma de la app -> carpeta / idioma de Play Console y nombre que muestra la consola. */
export const STORE_LOCALES = [
  { app: 'en', play: 'en-US', name: 'Inglés (Estados Unidos)' },
  { app: 'en-GB', play: 'en-GB', name: 'Inglés (Reino Unido)' },
  { app: 'en-AU', play: 'en-AU', name: 'Inglés (Australia)' },
  { app: 'es', play: 'es-ES', name: 'Español (España)' },
  { app: 'es-419', play: 'es-419', name: 'Español (Latinoamérica)' },
  { app: 'eu', play: 'eu-ES', name: 'Euskera' },
  { app: 'gl', play: 'gl-ES', name: 'Gallego' },
  { app: 'ca', play: 'ca', name: 'Catalán' },
  { app: 'fr', play: 'fr-FR', name: 'Francés (Francia)' },
  { app: 'fr-CA', play: 'fr-CA', name: 'Francés (Canadá)' },
  { app: 'de', play: 'de-DE', name: 'Alemán' },
  { app: 'it', play: 'it-IT', name: 'Italiano' },
  { app: 'pl', play: 'pl-PL', name: 'Polaco' },
  { app: 'hi', play: 'hi-IN', name: 'Hindi' },
  { app: 'tr', play: 'tr-TR', name: 'Turco' },
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
• Now also in Polski, हिन्दी, Türkçe and English (Australia).
• 100% offline: no analytics, no trackers and no Internet permission.
• New introduction on first launch: how the wheel works and what the app does (and doesn't do) with your data.
• Bug fixes and improvements.`,
    full: `Can't decide what to train today? Spin the wheel and let GymRoulette choose for you.

GymRoulette is an exercise wheel: each segment combines a number of reps with an exercise (for example, “20 Burpee”), and when you spin it, it gives you a random challenge to train at home, at the gym or outdoors. Made to add variety to your sessions, for circuits, for challenges with friends, and for anyone who wants to work out without overthinking it.

<b>HOW IT WORKS</b>
• Tap “Spin the wheel” or fling the wheel with your finger.
• When it stops, you see your challenge: reps and exercise.
• Mark it as done or skip it and spin again.
• Check the history for the challenges you completed during the session.

<b>YOU DECIDE WHAT'S ON THE WHEEL</b>
• Turn the exercises and reps you want on or off.
• Create your own exercises with a name, a short name and an icon.
• Add or remove reps to adjust the difficulty.
• The wheel adapts to your settings, which are saved on your device.

<b>MORE THAN 100 ICONS FOR YOUR EXERCISES</b>
Choose from more than 100 icons across many disciplines, with search: strength and weights, calisthenics, cardio, yoga, pilates, tai chi, boxing, karate and other martial arts, hyrox, crossfit, obstacle races, sports, water and mountain. Includes our own pictograms for push-ups, plank, sit-ups, burpee, squat and mountain climbers.

<b>IN YOUR LANGUAGE</b>
English (US, UK and Australia), Español (Spain and Latin America), Euskara, Galego, Català, Français (France and Canada), Deutsch, Italiano, Polski, हिन्दी, Türkçe and Português (Brasil and Portugal). The app follows your phone's language, and you can change it in Settings.

<b>NICE DETAILS</b>
• <b>Wheel sounds and vibration</b> when the result comes up.
• <b>A dark design</b> that's easy on the eyes at the gym.
• <b>No sign-up</b> or user accounts.
• <b>No ads.</b>
• <b>100% offline</b>: it doesn't need an Internet connection.
• <b>No trackers</b> and no unnecessary cookies, and it never asks for your location.

<b>PRIVACY</b>
GymRoulette is completely offline and collects no data: no analytics, no trackers, no ads and no access to your location. Your settings are stored only on your device. You can read the privacy policy inside the app.

Spin the wheel and let's train!`,
  },

  es: {
    title: 'GymRoulette',
    short: 'Gira la ruleta y recibe un reto de ejercicio al azar para tu entrenamiento.',
    banner: { line1: '¡Gira la ruleta', line2: 'y a entrenar!', tagline: 'Ejercicios aleatorios para retarte cada día', button: '¡GIRAR RULETA!' },
    notes: `Novedades:
• Ahora también en Polski, हिन्दी, Türkçe y English (Australia).
• 100 % sin conexión: sin analítica, sin rastreadores y sin permiso de Internet.
• Nueva introducción en la primera apertura: cómo funciona la ruleta y qué hace (y qué no hace) la app con tus datos.
• Correcciones de errores y mejoras.`,
    full: `¿Sin ganas de decidir qué entrenar hoy? Gira la ruleta y deja que GymRoulette elija por ti.

GymRoulette es una ruleta de ejercicios: cada sector combina un número de repeticiones con un ejercicio (por ejemplo, «20 Burpee») y, al girarla, te propone un reto aleatorio para entrenar en casa, en el gimnasio o al aire libre. Pensada para dar variedad a tus sesiones, para circuitos, para retos con amigos y para quien quiere entrenar sin complicarse.

<b>CÓMO FUNCIONA</b>
• Pulsa «Girar ruleta» o lanza la ruleta con el dedo.
• Cuando se detiene, ves tu reto: repeticiones y ejercicio.
• Márcalo como completado o sáltalo y vuelve a girar.
• Consulta en el historial los retos que has completado en la sesión.

<b>TÚ DECIDES QUÉ HAY EN LA RULETA</b>
• Activa o desactiva los ejercicios y las repeticiones que quieras.
• Crea tus propios ejercicios con nombre, nombre corto e icono.
• Añade o elimina repeticiones para ajustar la dificultad.
• La ruleta se adapta a tu configuración y se guarda en tu dispositivo.

<b>MÁS DE 100 ICONOS PARA TUS EJERCICIOS</b>
Elige entre más de 100 iconos de muchas disciplinas, con buscador: fuerza y pesas, calistenia, cardio, yoga, pilates, tai chi, boxeo, karate y otras artes marciales, hyrox, crossfit, carreras de obstáculos, deportes, agua y montaña. Incluye pictogramas propios de flexiones, plancha, abdominales, burpee, sentadilla y mountain climbers.

<b>EN TU IDIOMA</b>
English (EE. UU., Reino Unido y Australia), Español (España y Latinoamérica), Euskara, Galego, Català, Français (Francia y Canadá), Deutsch, Italiano, Polski, हिन्दी, Türkçe y Português (Brasil y Portugal). La app sigue el idioma de tu móvil y puedes cambiarlo en Configuración.

<b>DETALLES QUE SE AGRADECEN</b>
• <b>Sonido de ruleta y vibración</b> al salir el resultado.
• <b>Diseño oscuro</b> y cómodo para usar en el gimnasio.
• <b>Sin registro</b> ni cuentas de usuario.
• <b>Sin anuncios.</b>
• <b>100 % sin conexión</b>: no necesita conexión a Internet.
• <b>Sin rastreadores</b> ni cookies innecesarias, y nunca te pide la ubicación.

<b>PRIVACIDAD</b>
GymRoulette funciona totalmente sin conexión y no recopila ningún dato: sin analítica, sin rastreadores, sin anuncios y sin acceso a tu ubicación. Tu configuración se guarda únicamente en tu dispositivo. Puedes consultar la política de privacidad dentro de la app.

¡Gira la ruleta y a entrenar!`,
  },

  eu: {
    title: 'GymRoulette',
    short: 'Biratu gurpila eta jaso ausazko ariketa-erronka bat zure entrenamendurako.',
    banner: { line1: 'Biratu gurpila', line2: 'eta entrenatzera!', tagline: 'Ausazko ariketak egunero zure burua probatzeko', button: 'BIRATU GURPILA!' },
    notes: `Berritasunak:
• Orain Polski, हिन्दी, Türkçe eta English (Australia) hizkuntzetan ere.
• % 100 konexiorik gabe: analitikarik, aztarnarik eta Interneterako baimenik gabe.
• Sarrera berria lehen irekieran: gurpilak nola funtzionatzen duen eta aplikazioak zure datuekin zer egiten duen (eta zer ez).
• Akatsen zuzenketak eta hobekuntzak.`,
    full: `Ez dakizu gaur zer entrenatu? Biratu gurpila eta utzi GymRoulette-ri zure ordez aukeratzen.

GymRoulette ariketen gurpila da: sektore bakoitzak errepikapen kopuru bat ariketa batekin uztartzen du (adibidez, «20 Burpee»), eta biratzean ausazko erronka bat proposatzen dizu etxean, gimnasioan edo kanpoan entrenatzeko. Zure saioei aniztasuna emateko pentsatua dago, zirkuituetarako, lagunekin erronkak egiteko eta konplikatu gabe entrenatu nahi duenarentzat.

<b>NOLA FUNTZIONATZEN DU</b>
• Sakatu «Biratu gurpila» edo bota gurpila hatzarekin.
• Gelditzen denean, zure erronka ikusiko duzu: errepikapenak eta ariketa.
• Markatu egin duzula edo saltatu eta biratu berriro.
• Begiratu historian saioan zehar egin dituzun erronkak.

<b>ZUK ERABAKITZEN DUZU ZER DAGOEN GURPILEAN</b>
• Aktibatu edo desaktibatu nahi dituzun ariketak eta errepikapenak.
• Sortu zure ariketak izenarekin, izen laburrarekin eta ikonoarekin.
• Gehitu edo kendu errepikapenak zailtasuna doitzeko.
• Gurpila zure konfiguraziora egokitzen da, eta zure gailuan gordetzen da.

<b>100 IKONO BAINO GEHIAGO ZURE ARIKETETARAKO</b>
Aukeratu 100 ikono baino gehiagoren artean, disziplina askotakoak eta bilatzailearekin: indarra eta pisuak, kalistenia, kardioa, yoga, pilates, tai chi, boxeoa, karatea eta beste borroka-arte batzuk, hyrox, crossfit, oztopo-lasterketak, kirolak, ura eta mendia. Flexioen, plantxaren, abdominalen, burpee-ren, squat-aren eta mountain climbers-en piktograma propioak ditu.

<b>ZURE HIZKUNTZAN</b>
English (AEB, Erresuma Batua eta Australia), Español (Espainia eta Latinoamerika), Euskara, Galego, Català, Français (Frantzia eta Kanada), Deutsch, Italiano, Polski, हिन्दी, Türkçe eta Português (Brasil eta Portugal). Aplikazioa zure telefonoaren hizkuntzara egokitzen da, eta Ezarpenetan alda dezakezu.

<b>XEHETASUN POLITAK</b>
• <b>Gurpilaren soinuak eta bibrazioa</b> emaitza ateratzen denean.
• <b>Diseinu iluna</b>, gimnasioan begientzat erosoa.
• <b>Izen-emate edo erabiltzaile-konturik gabe</b>.
• <b>Iragarkirik gabe.</b>
• <b>% 100 konexiorik gabe</b>: ez du Interneteko konexiorik behar.
• <b>Aztarnarik gabe</b> eta beharrezkoak ez diren cookierik gabe, eta ez dizu inoiz kokapena eskatzen.

<b>PRIBATUTASUNA</b>
GymRoulette erabat konexiorik gabe dabil eta ez du daturik biltzen: analitikarik, aztarnarik, iragarkirik eta zure kokapenerako sarbiderik gabe. Zure ezarpenak zure gailuan soilik gordetzen dira. Pribatutasun-politika aplikazioaren barruan kontsulta dezakezu.

Biratu gurpila eta entrenatzera!`,
  },

  gl: {
    title: 'GymRoulette',
    short: 'Xira a ruleta e recibe un reto de exercicio ao chou para o teu adestramento.',
    banner: { line1: 'Xira a ruleta', line2: 'e a adestrar!', tagline: 'Exercicios aleatorios para retarte cada día', button: 'XIRAR A RULETA!' },
    notes: `Novidades:
• Agora tamén en Polski, हिन्दी, Türkçe e English (Australia).
• 100 % sen conexión: sen analítica, sen rastreadores e sen permiso de Internet.
• Nova introdución no primeiro inicio: como funciona a ruleta e que fai (e que non fai) a app cos teus datos.
• Corrección de erros e melloras.`,
    full: `Sen ganas de decidir que adestrar hoxe? Xira a ruleta e deixa que GymRoulette escolla por ti.

GymRoulette é unha ruleta de exercicios: cada sector combina un número de repeticións cun exercicio (por exemplo, «20 Burpee») e, ao xirala, proponche un reto aleatorio para adestrar na casa, no ximnasio ou ao aire libre. Pensada para darlle variedade ás túas sesións, para circuítos, para retos con amizades e para quen quere adestrar sen complicarse.

<b>COMO FUNCIONA</b>
• Preme «Xirar a ruleta» ou lanza a ruleta co dedo.
• Cando se detén, ves o teu reto: repeticións e exercicio.
• Márcao como completado ou sáltao e volve xirar.
• Consulta no historial os retos que completaches na sesión.

<b>TI DECIDES QUE HAI NA RULETA</b>
• Activa ou desactiva os exercicios e as repeticións que queiras.
• Crea os teus propios exercicios con nome, nome curto e icona.
• Engade ou elimina repeticións para axustar a dificultade.
• A ruleta adáptase á túa configuración, que se garda no teu dispositivo.

<b>MÁIS DE 100 ICONAS PARA OS TEUS EXERCICIOS</b>
Escolle entre máis de 100 iconas de moitas disciplinas, con buscador: forza e pesas, calistenia, cardio, yoga, pilates, tai chi, boxeo, karate e outras artes marciais, hyrox, crossfit, carreiras de obstáculos, deportes, auga e montaña. Inclúe pictogramas propios de flexións, prancha, abdominais, burpee, agachamento e mountain climbers.

<b>NO TEU IDIOMA</b>
English (EUA, Reino Unido e Australia), Español (España e Latinoamérica), Euskara, Galego, Català, Français (Francia e Canadá), Deutsch, Italiano, Polski, हिन्दी, Türkçe e Português (Brasil e Portugal). A app segue o idioma do teu móbil e podes cambialo en Configuración.

<b>DETALLES QUE SE AGRADECEN</b>
• <b>Son de ruleta e vibración</b> ao saír o resultado.
• <b>Deseño escuro</b> e cómodo para usar no ximnasio.
• <b>Sen rexistro</b> nin contas de usuario.
• <b>Sen anuncios.</b>
• <b>100 % sen conexión</b>: non necesita conexión a Internet.
• <b>Sen rastreadores</b> nin cookies innecesarias, e nunca che pide a localización.

<b>PRIVACIDADE</b>
GymRoulette funciona completamente sen conexión e non recolle ningún dato: sen analítica, sen rastreadores, sen anuncios e sen acceso á túa localización. A túa configuración gárdase unicamente no teu dispositivo. Podes consultar a política de privacidade dentro da app.

Xira a ruleta e a adestrar!`,
  },

  ca: {
    title: 'GymRoulette',
    short: "Gira la ruleta i rep un repte d'exercici a l'atzar per al teu entrenament.",
    banner: { line1: 'Gira la ruleta', line2: 'i a entrenar!', tagline: 'Exercicis aleatoris per reptar-te cada dia', button: 'GIRA LA RULETA!' },
    notes: `Novetats:
• Ara també en Polski, हिन्दी, Türkçe i English (Australia).
• 100 % sense connexió: sense analítica, sense rastrejadors i sense permís d'Internet.
• Nova introducció en el primer inici: com funciona la ruleta i què fa (i què no fa) l'app amb les teves dades.
• Correcció d'errors i millores.`,
    full: `No tens ganes de decidir què entrenar avui? Gira la ruleta i deixa que GymRoulette triï per tu.

GymRoulette és una ruleta d'exercicis: cada sector combina un nombre de repeticions amb un exercici (per exemple, «20 Burpee») i, en girar-la, et proposa un repte aleatori per entrenar a casa, al gimnàs o a l'aire lliure. Pensada per donar varietat a les teves sessions, per a circuits, per a reptes amb amics i per a qui vol entrenar sense complicar-se.

<b>COM FUNCIONA</b>
• Prem «Gira la ruleta» o llança la ruleta amb el dit.
• Quan s'atura, veus el teu repte: repeticions i exercici.
• Marca'l com a completat o salta'l i torna a girar.
• Consulta a l'historial els reptes que has completat a la sessió.

<b>TU DECIDEIXES QUÈ HI HA A LA RULETA</b>
• Activa o desactiva els exercicis i les repeticions que vulguis.
• Crea els teus propis exercicis amb nom, nom curt i icona.
• Afegeix o elimina repeticions per ajustar la dificultat.
• La ruleta s'adapta a la teva configuració, que es desa al teu dispositiu.

<b>MÉS DE 100 ICONES PER ALS TEUS EXERCICIS</b>
Tria entre més de 100 icones de moltes disciplines, amb cercador: força i pesos, calistènia, cardio, ioga, pilates, tai-txi, boxa, karate i altres arts marcials, hyrox, crossfit, curses d'obstacles, esports, aigua i muntanya. Inclou pictogrames propis de flexions, planxa, abdominals, burpee, esquat i mountain climbers.

<b>EN EL TEU IDIOMA</b>
English (EUA, Regne Unit i Austràlia), Español (Espanya i Llatinoamèrica), Euskara, Galego, Català, Français (França i Canadà), Deutsch, Italiano, Polski, हिन्दी, Türkçe i Português (Brasil i Portugal). L'app segueix l'idioma del teu mòbil i el pots canviar a Configuració.

<b>DETALLS QUE S'AGRAEIXEN</b>
• <b>So de ruleta i vibració</b> quan surt el resultat.
• <b>Disseny fosc</b> i còmode per fer servir al gimnàs.
• <b>Sense registre</b> ni comptes d'usuari.
• <b>Sense anuncis.</b>
• <b>100 % sense connexió</b>: no necessita connexió a Internet.
• <b>Sense rastrejadors</b> ni galetes innecessàries, i mai et demana la ubicació.

<b>PRIVADESA</b>
GymRoulette funciona completament sense connexió i no recopila cap dada: sense analítica, sense rastrejadors, sense anuncis i sense accés a la teva ubicació. La teva configuració es desa únicament al teu dispositiu. Pots consultar la política de privadesa dins de l'app.

Gira la ruleta i a entrenar!`,
  },

  fr: {
    title: 'GymRoulette',
    short: "Fais tourner la roue et reçois un défi d'exercice au hasard pour t'entraîner.",
    banner: { line1: 'Lance la roue', line2: "et c'est parti !", tagline: 'Des exercices au hasard pour te défier chaque jour', button: 'LANCER LA ROUE !' },
    notes: `Nouveautés :
• Désormais aussi en Polski, हिन्दी, Türkçe et English (Australie).
• 100 % hors connexion : sans analyse, sans traceurs et sans autorisation Internet.
• Nouvelle introduction au premier lancement : comment fonctionne la roue et ce que l'application fait (et ne fait pas) de tes données.
• Corrections de bugs et améliorations.`,
    full: `Pas envie de décider quoi t'entraîner aujourd'hui ? Fais tourner la roue et laisse GymRoulette choisir pour toi.

GymRoulette est une roue d'exercices : chaque secteur associe un nombre de répétitions à un exercice (par exemple « 20 Burpee ») et, quand tu la fais tourner, elle te propose un défi au hasard pour t'entraîner à la maison, en salle ou en plein air. Pensée pour varier tes séances, pour des circuits, des défis entre amis et pour tous ceux qui veulent s'entraîner sans se compliquer la vie.

<b>COMMENT ÇA MARCHE</b>
• Appuie sur « Lancer la roue » ou lance-la d'un geste du doigt.
• Quand elle s'arrête, tu vois ton défi : répétitions et exercice.
• Marque-le comme terminé ou passe-le et relance la roue.
• Consulte l'historique des défis terminés pendant la séance.

<b>C'EST TOI QUI CHOISIS CE QUI EST SUR LA ROUE</b>
• Active ou désactive les exercices et les répétitions que tu veux.
• Crée tes propres exercices avec un nom, un nom court et une icône.
• Ajoute ou supprime des répétitions pour régler la difficulté.
• La roue s'adapte à tes réglages, enregistrés sur ton appareil.

<b>PLUS DE 100 ICÔNES POUR TES EXERCICES</b>
Choisis parmi plus de 100 icônes de nombreuses disciplines, avec recherche : force et poids, callisthénie, cardio, yoga, pilates, tai chi, boxe, karaté et autres arts martiaux, hyrox, crossfit, courses d'obstacles, sports, eau et montagne. Avec des pictogrammes originaux pour les pompes, le gainage, les abdominaux, le burpee, le squat et les mountain climbers.

<b>DANS TA LANGUE</b>
English (États-Unis, Royaume-Uni et Australie), Español (Espagne et Amérique latine), Euskara, Galego, Català, Français (France et Canada), Deutsch, Italiano, Polski, हिन्दी, Türkçe et Português (Brasil et Portugal). L'application suit la langue de ton téléphone et tu peux la changer dans les Réglages.

<b>DE BONS PETITS DÉTAILS</b>
• <b>Sons de la roue et vibration</b> à l'apparition du résultat.
• <b>Un design sombre</b>, agréable à l'œil en salle.
• <b>Sans inscription</b> ni compte utilisateur.
• <b>Sans publicité.</b>
• <b>100 % hors connexion</b> : aucune connexion Internet nécessaire.
• <b>Sans traceurs</b> ni cookies superflus, et elle ne demande jamais ta localisation.

<b>CONFIDENTIALITÉ</b>
GymRoulette fonctionne entièrement hors connexion et ne collecte aucune donnée : pas d'analyse, pas de traceurs, pas de publicité et aucun accès à ta localisation. Tes réglages sont enregistrés uniquement sur ton appareil. Tu peux consulter la politique de confidentialité dans l'application.

Lance la roue et c'est parti !`,
  },

  de: {
    title: 'GymRoulette',
    short: 'Dreh das Rad und erhalte eine zufällige Übungsaufgabe für dein Training.',
    banner: { line1: 'Dreh das Rad', line2: 'und ab ins Training!', tagline: 'Zufällige Übungen, die dich jeden Tag fordern', button: 'RAD DREHEN!' },
    notes: `Neu in dieser Version:
• Jetzt auch in Polski, हिन्दी, Türkçe und English (Australien).
• 100 % offline: keine Analyse, keine Tracker und keine Internet-Berechtigung.
• Neue Einführung beim ersten Start: wie das Rad funktioniert und was die App mit deinen Daten macht (und was nicht).
• Fehlerbehebungen und Verbesserungen.`,
    full: `Keine Lust zu entscheiden, was du heute trainierst? Dreh das Rad und lass GymRoulette für dich wählen.

GymRoulette ist ein Übungsrad: Jedes Segment verbindet eine Anzahl Wiederholungen mit einer Übung (zum Beispiel „20 Burpee“) und gibt dir beim Drehen eine zufällige Aufgabe für dein Training zu Hause, im Fitnessstudio oder draußen. Gemacht, um Abwechslung in deine Einheiten zu bringen, für Zirkeltraining, für Challenges mit Freunden und für alle, die einfach trainieren wollen, ohne lange zu überlegen.

<b>SO FUNKTIONIERT'S</b>
• Tippe auf „Rad drehen“ oder wirf das Rad mit dem Finger an.
• Sobald es stehen bleibt, siehst du deine Aufgabe: Wiederholungen und Übung.
• Hake sie als erledigt ab oder überspring sie und dreh erneut.
• Im Verlauf siehst du die Aufgaben, die du in der Einheit geschafft hast.

<b>DU BESTIMMST, WAS AUF DEM RAD IST</b>
• Schalte die Übungen und Wiederholungen, die du willst, ein oder aus.
• Erstelle eigene Übungen mit Name, Kurzname und Symbol.
• Füge Wiederholungen hinzu oder entferne sie, um den Schwierigkeitsgrad anzupassen.
• Das Rad passt sich deinen Einstellungen an, die auf deinem Gerät gespeichert werden.

<b>ÜBER 100 SYMBOLE FÜR DEINE ÜBUNGEN</b>
Wähle mit Suchfunktion aus über 100 Symbolen aus vielen Disziplinen: Kraft und Gewichte, Calisthenics, Cardio, Yoga, Pilates, Tai-Chi, Boxen, Karate und andere Kampfkünste, Hyrox, CrossFit, Hindernisläufe, Sport, Wasser und Berge. Mit eigenen Piktogrammen für Liegestütze, Unterarmstütz, Sit-ups, Burpee, Kniebeuge und Mountain Climbers.

<b>IN DEINER SPRACHE</b>
English (USA, Großbritannien und Australien), Español (Spanien und Lateinamerika), Euskara, Galego, Català, Français (Frankreich und Kanada), Deutsch, Italiano, Polski, हिन्दी, Türkçe und Português (Brasil und Portugal). Die App folgt der Sprache deines Handys, und du kannst sie in den Einstellungen ändern.

<b>PRAKTISCHE DETAILS</b>
• <b>Raddrehgeräusche und Vibration</b>, wenn das Ergebnis erscheint.
• <b>Dunkles Design</b>, angenehm für die Augen im Fitnessstudio.
• <b>Ohne Registrierung</b> und ohne Benutzerkonten.
• <b>Ohne Werbung.</b>
• <b>100 % offline</b>: sie braucht keine Internetverbindung.
• <b>Keine Tracker</b> und keine unnötigen Cookies, und sie fragt nie nach deinem Standort.

<b>DATENSCHUTZ</b>
GymRoulette funktioniert vollständig offline und erfasst keine Daten: keine Analyse, keine Tracker, keine Werbung und kein Zugriff auf deinen Standort. Deine Einstellungen werden nur auf deinem Gerät gespeichert. Die Datenschutzerklärung findest du in der App.

Dreh das Rad und ab ins Training!`,
  },

  it: {
    title: 'GymRoulette',
    short: 'Gira la ruota e ricevi una sfida di esercizio casuale per il tuo allenamento.',
    banner: { line1: 'Gira la ruota', line2: 'e allenati!', tagline: 'Esercizi casuali per metterti alla prova ogni giorno', button: 'GIRA LA RUOTA!' },
    notes: `Novità:
• Ora anche in Polski, हिन्दी, Türkçe e English (Australia).
• 100% offline: nessuna analisi, nessun tracker e nessuna autorizzazione a Internet.
• Nuova introduzione al primo avvio: come funziona la ruota e cosa fa (e cosa non fa) l'app con i tuoi dati.
• Correzioni di errori e miglioramenti.`,
    full: `Non hai voglia di decidere cosa allenare oggi? Gira la ruota e lascia scegliere a GymRoulette.

GymRoulette è una ruota di esercizi: ogni settore abbina un numero di ripetizioni a un esercizio (per esempio «20 Burpee») e, quando la fai girare, ti propone una sfida casuale per allenarti a casa, in palestra o all'aperto. Pensata per dare varietà alle tue sessioni, per i circuiti, per le sfide con gli amici e per chi vuole allenarsi senza complicarsi la vita.

<b>COME FUNZIONA</b>
• Tocca «Gira la ruota» o lancia la ruota con il dito.
• Quando si ferma, vedi la tua sfida: ripetizioni ed esercizio.
• Segnala come completata oppure saltala e gira di nuovo.
• Consulta la cronologia per vedere le sfide completate durante la sessione.

<b>DECIDI TU COSA C'È SULLA RUOTA</b>
• Attiva o disattiva gli esercizi e le ripetizioni che vuoi.
• Crea i tuoi esercizi con nome, nome breve e icona.
• Aggiungi o rimuovi ripetizioni per regolare la difficoltà.
• La ruota si adatta alle tue impostazioni, che vengono salvate sul tuo dispositivo.

<b>OLTRE 100 ICONE PER I TUOI ESERCIZI</b>
Scegli tra più di 100 icone di tante discipline, con ricerca: forza e pesi, calisthenics, cardio, yoga, pilates, tai chi, boxe, karate e altre arti marziali, hyrox, crossfit, corse a ostacoli, sport, acqua e montagna. Include pittogrammi esclusivi per flessioni, plank, addominali, burpee, squat e mountain climber.

<b>NELLA TUA LINGUA</b>
English (USA, Regno Unito e Australia), Español (Spagna e America Latina), Euskara, Galego, Català, Français (Francia e Canada), Deutsch, Italiano, Polski, हिन्दी, Türkçe e Português (Brasile e Portogallo). L'app segue la lingua del tuo telefono e puoi cambiarla nelle Impostazioni.

<b>DETTAGLI CHE FANNO LA DIFFERENZA</b>
• <b>Suoni della ruota e vibrazione</b> quando esce il risultato.
• <b>Design scuro</b> e comodo per la palestra.
• <b>Senza registrazione</b> né account utente.
• <b>Senza pubblicità.</b>
• <b>100% offline</b>: non richiede una connessione a Internet.
• <b>Nessun tracker</b> e nessun cookie superfluo, e non chiede mai la tua posizione.

<b>PRIVACY</b>
GymRoulette è completamente offline e non raccoglie alcun dato: nessuna analisi, nessun tracker, nessuna pubblicità e nessun accesso alla tua posizione. Le tue impostazioni vengono salvate solo sul tuo dispositivo. Puoi leggere l'informativa sulla privacy nell'app.

Gira la ruota e allenati!`,
  },

  'pt-BR': {
    title: 'GymRoulette',
    short: 'Gire a roleta e receba um desafio de exercício aleatório para o seu treino.',
    banner: { line1: 'Gire a roleta', line2: 'e vá treinar!', tagline: 'Exercícios aleatórios para te desafiar todo dia', button: 'GIRAR ROLETA!' },
    notes: `Novidades:
• Agora também em Polski, हिन्दी, Türkçe e English (Australia).
• 100% offline: sem análise, sem rastreadores e sem permissão de Internet.
• Nova introdução na primeira abertura: como a roleta funciona e o que o app faz (e não faz) com seus dados.
• Correções de erros e melhorias.`,
    full: `Sem vontade de decidir o que treinar hoje? Gire a roleta e deixe o GymRoulette escolher por você.

O GymRoulette é uma roleta de exercícios: cada setor combina um número de repetições com um exercício (por exemplo, “20 Burpee”) e, ao girá-la, propõe um desafio aleatório para treinar em casa, na academia ou ao ar livre. Pensada para dar variedade aos seus treinos, para circuitos, desafios com amigos e para quem quer treinar sem complicação.

<b>COMO FUNCIONA</b>
• Toque em “Girar roleta” ou lance a roleta com o dedo.
• Quando ela para, você vê o seu desafio: repetições e exercício.
• Marque como concluído ou pule e gire de novo.
• Veja no histórico os desafios que você concluiu na sessão.

<b>VOCÊ DECIDE O QUE ENTRA NA ROLETA</b>
• Ative ou desative os exercícios e as repetições que quiser.
• Crie seus próprios exercícios com nome, nome curto e ícone.
• Adicione ou remova repetições para ajustar a dificuldade.
• A roleta se adapta às suas configurações, que ficam salvas no seu dispositivo.

<b>MAIS DE 100 ÍCONES PARA SEUS EXERCÍCIOS</b>
Escolha entre mais de 100 ícones de muitas modalidades, com busca: força e pesos, calistenia, cardio, yoga, pilates, tai chi, boxe, caratê e outras artes marciais, hyrox, crossfit, corridas de obstáculos, esportes, água e montanha. Inclui pictogramas próprios de flexões, prancha, abdominais, burpee, agachamento e mountain climbers.

<b>NO SEU IDIOMA</b>
English (EUA, Reino Unido e Austrália), Español (Espanha e América Latina), Euskara, Galego, Català, Français (França e Canadá), Deutsch, Italiano, Polski, हिन्दी, Türkçe e Português (Brasil e Portugal). O app segue o idioma do seu celular e você pode mudá-lo em Configurações.

<b>DETALHES QUE FAZEM DIFERENÇA</b>
• <b>Som da roleta e vibração</b> quando o resultado aparece.
• <b>Visual escuro</b> e confortável para usar na academia.
• <b>Sem cadastro</b> nem contas de usuário.
• <b>Sem anúncios.</b>
• <b>100% offline</b>: não precisa de conexão com a Internet.
• <b>Sem rastreadores</b> nem cookies desnecessários, e nunca pede a sua localização.

<b>PRIVACIDADE</b>
O GymRoulette é totalmente offline e não coleta nenhum dado: sem análise, sem rastreadores, sem anúncios e sem acesso à sua localização. Suas configurações ficam salvas apenas no seu dispositivo. Você pode ler a política de privacidade dentro do app.

Gire a roleta e vá treinar!`,
  },

  'pt-PT': {
    title: 'GymRoulette',
    short: 'Gira a roleta e recebe um desafio de exercício aleatório para o teu treino.',
    banner: { line1: 'Gira a roleta', line2: 'e vai treinar!', tagline: 'Exercícios aleatórios para te desafiares todos os dias', button: 'GIRAR ROLETA!' },
    notes: `Novidades:
• Agora também em Polski, हिन्दी, Türkçe e English (Australia).
• 100% offline: sem análise, sem rastreadores e sem permissão de Internet.
• Nova introdução na primeira abertura: como a roleta funciona e o que a aplicação faz (e não faz) com os teus dados.
• Correções de erros e melhorias.`,
    full: `Sem vontade de decidir o que treinar hoje? Gira a roleta e deixa o GymRoulette escolher por ti.

O GymRoulette é uma roleta de exercícios: cada setor combina um número de repetições com um exercício (por exemplo, “20 Burpee”) e, ao girá-la, propõe-te um desafio aleatório para treinares em casa, no ginásio ou ao ar livre. Pensada para dar variedade aos teus treinos, para circuitos, desafios com amigos e para quem quer treinar sem complicações.

<b>COMO FUNCIONA</b>
• Toca em “Girar roleta” ou lança a roleta com o dedo.
• Quando pára, vês o teu desafio: repetições e exercício.
• Marca-o como concluído ou salta-o e gira outra vez.
• Consulta no histórico os desafios que concluíste na sessão.

<b>TU DECIDES O QUE ENTRA NA ROLETA</b>
• Ativa ou desativa os exercícios e as repetições que quiseres.
• Cria os teus próprios exercícios com nome, nome curto e ícone.
• Adiciona ou remove repetições para ajustar a dificuldade.
• A roleta adapta-se às tuas definições, que ficam guardadas no teu dispositivo.

<b>MAIS DE 100 ÍCONES PARA OS TEUS EXERCÍCIOS</b>
Escolhe entre mais de 100 ícones de muitas modalidades, com pesquisa: força e pesos, calistenia, cardio, yoga, pilates, tai chi, boxe, karaté e outras artes marciais, hyrox, crossfit, corridas de obstáculos, desportos, água e montanha. Inclui pictogramas próprios de flexões, prancha, abdominais, burpee, agachamento e mountain climbers.

<b>NO TEU IDIOMA</b>
English (EUA, Reino Unido e Austrália), Español (Espanha e América Latina), Euskara, Galego, Català, Français (França e Canadá), Deutsch, Italiano, Polski, हिन्दी, Türkçe e Português (Brasil e Portugal). A aplicação segue o idioma do teu telemóvel e podes alterá-lo em Definições.

<b>DETALHES QUE FAZEM DIFERENÇA</b>
• <b>Som da roleta e vibração</b> quando aparece o resultado.
• <b>Visual escuro</b> e confortável para usar no ginásio.
• <b>Sem registo</b> nem contas de utilizador.
• <b>Sem anúncios.</b>
• <b>100% offline</b>: não precisa de ligação à Internet.
• <b>Sem rastreadores</b> nem cookies desnecessários, e nunca pede a tua localização.

<b>PRIVACIDADE</b>
O GymRoulette é totalmente offline e não recolhe quaisquer dados: sem análise, sem rastreadores, sem anúncios e sem acesso à tua localização. As tuas definições ficam guardadas apenas no teu dispositivo. Podes ler a política de privacidade dentro da aplicação.

Gira a roleta e vai treinar!`,
  },

  pl: {
    title: 'GymRoulette',
    short: 'Zakręć kołem i dostań losowe wyzwanie ćwiczeniowe do swojego treningu.',
    banner: { line1: 'Zakręć kołem', line2: 'i ruszaj na trening!', tagline: 'Losowe ćwiczenia, które rzucają ci wyzwanie każdego dnia', button: 'KRĘĆ KOŁEM!' },
    notes: `Co nowego:
• Teraz także w językach Polski, हिन्दी, Türkçe i English (Australia).
• 100% offline: bez analityki, bez trackerów i bez uprawnienia do Internetu.
• Nowe wprowadzenie przy pierwszym uruchomieniu: jak działa koło i co aplikacja robi (a czego nie robi) z twoimi danymi.
• Poprawki błędów i ulepszenia.`,
    full: `Nie wiesz, co dziś trenować? Zakręć kołem i pozwól, by GymRoulette wybrała za ciebie.

GymRoulette to koło ćwiczeń: każdy sektor łączy liczbę powtórzeń z ćwiczeniem (na przykład „20 Burpee”), a gdy je zakręcisz, wylosuje dla ciebie wyzwanie do wykonania w domu, na siłowni lub na świeżym powietrzu. Stworzona, by wnieść różnorodność do twoich treningów, do obwodów, do wyzwań ze znajomymi i dla każdego, kto chce poćwiczyć bez zbędnego główkowania.

<b>JAK TO DZIAŁA</b>
• Naciśnij „Zakręć kołem” albo szarpnij koło palcem.
• Gdy się zatrzyma, zobaczysz swoje wyzwanie: powtórzenia i ćwiczenie.
• Oznacz je jako zrobione albo pomiń i zakręć ponownie.
• W historii sprawdzisz wyzwania, które wykonałeś podczas sesji.

<b>TY DECYDUJESZ, CO JEST NA KOLE</b>
• Włączaj i wyłączaj ćwiczenia i powtórzenia, których chcesz.
• Twórz własne ćwiczenia z nazwą, krótką nazwą i ikoną.
• Dodawaj lub usuwaj powtórzenia, aby dostosować poziom trudności.
• Koło dopasowuje się do twoich ustawień, które są zapisywane na urządzeniu.

<b>PONAD 100 IKON DLA TWOICH ĆWICZEŃ</b>
Wybieraj spośród ponad 100 ikon z wielu dyscyplin, z wyszukiwarką: siła i ciężary, kalistenika, cardio, joga, pilates, tai chi, boks, karate i inne sztuki walki, hyrox, crossfit, biegi z przeszkodami, sporty, woda i góry. Zawiera nasze własne piktogramy pompek, deski, brzuszków, burpee, przysiadu i wspinaczki w podporze.

<b>W TWOIM JĘZYKU</b>
English (USA, Wielka Brytania i Australia), Español (Hiszpania i Ameryka Łacińska), Euskara, Galego, Català, Français (Francja i Kanada), Deutsch, Italiano, Polski, हिन्दी, Türkçe i Português (Brazylia i Portugalia). Aplikacja korzysta z języka telefonu, a zmienisz go w Ustawieniach.

<b>MIŁE SZCZEGÓŁY</b>
• <b>Dźwięki koła i wibracja</b> po wylosowaniu wyniku.
• <b>Ciemny wygląd</b>, wygodny dla oczu na siłowni.
• <b>Bez rejestracji</b> i kont użytkowników.
• <b>Bez reklam.</b>
• <b>100% offline</b>: nie potrzebuje połączenia z Internetem.
• <b>Bez trackerów</b> i zbędnych plików cookie, nigdy nie prosi o twoją lokalizację.

<b>PRYWATNOŚĆ</b>
GymRoulette działa całkowicie offline i nie zbiera żadnych danych: bez analityki, bez trackerów, bez reklam i bez dostępu do twojej lokalizacji. Twoje ustawienia są zapisywane wyłącznie na urządzeniu. Politykę prywatności przeczytasz w aplikacji.

Zakręć kołem i trenujemy!`,
  },

  hi: {
    title: 'GymRoulette',
    short: 'चक्र घुमाएँ और अपनी वर्कआउट के लिए कोई भी एक्सरसाइज़ चुनौती पाएँ।',
    banner: { line1: 'चक्र घुमाएँ', line2: 'और वर्कआउट करें!', tagline: 'हर दिन आपको चुनौती देने वाली रैंडम एक्सरसाइज़', button: 'चक्र घुमाएँ!' },
    notes: `नया क्या है:
• अब Polski, हिन्दी, Türkçe और English (Australia) में भी।
• 100% ऑफ़लाइन: कोई एनालिटिक्स नहीं, कोई ट्रैकर नहीं और इंटरनेट की अनुमति नहीं।
• पहली बार खोलने पर नया परिचय: चक्र कैसे काम करता है और ऐप आपके डेटा के साथ क्या करता है (और क्या नहीं करता)।
• गड़बड़ियाँ ठीक की गईं और सुधार।`,
    full: `आज क्या वर्कआउट करें, तय नहीं कर पा रहे? चक्र घुमाएँ और GymRoulette को आपके लिए चुनने दें।

GymRoulette एक्सरसाइज़ का चक्र है: हर खंड में रेप्स की एक संख्या और एक एक्सरसाइज़ होती है (जैसे “20 बर्पी”), और इसे घुमाने पर यह आपको घर पर, जिम में या खुली हवा में वर्कआउट करने के लिए कोई भी एक चुनौती देता है। इसे आपके सेशन में विविधता लाने, सर्किट, दोस्तों के साथ चुनौतियों और उन सभी के लिए बनाया गया है जो ज़्यादा सोचे बिना वर्कआउट करना चाहते हैं।

<b>यह कैसे काम करता है</b>
• “चक्र घुमाएँ” दबाएँ या उँगली से चक्र को घुमा दें।
• रुकने पर आपको अपनी चुनौती दिखती है: रेप्स और एक्सरसाइज़।
• उसे पूरा हुआ चिह्नित करें या छोड़ दें और फिर घुमाएँ।
• इतिहास में देखें कि सेशन में आपने कौन-सी चुनौतियाँ पूरी कीं।

<b>चक्र में क्या हो, यह आप तय करते हैं</b>
• जो एक्सरसाइज़ और रेप्स चाहें, उन्हें चालू या बंद करें।
• नाम, छोटे नाम और आइकन के साथ अपनी एक्सरसाइज़ बनाएँ।
• कठिनाई तय करने के लिए रेप्स जोड़ें या हटाएँ।
• चक्र आपकी सेटिंग के अनुसार बदल जाता है, जो आपके डिवाइस पर सहेजी जाती हैं।

<b>आपकी एक्सरसाइज़ के लिए 100 से ज़्यादा आइकन</b>
खोज की सुविधा के साथ कई विधाओं के 100 से ज़्यादा आइकन में से चुनें: स्ट्रेंथ और वेट, कैलिस्थेनिक्स, कार्डियो, योग, पिलाटीज़, ताई ची, बॉक्सिंग, कराटे और अन्य मार्शल आर्ट, हाइरॉक्स, क्रॉसफ़िट, बाधा दौड़, खेल, पानी और पहाड़। इसमें पुश-अप, प्लैंक, सिट-अप, बर्पी, स्क्वाट और माउंटेन क्लाइंबर के हमारे अपने चित्रसंकेत भी शामिल हैं।

<b>आपकी भाषा में</b>
English (US, UK और Australia), Español (Spain और Latin America), Euskara, Galego, Català, Français (France और Canada), Deutsch, Italiano, Polski, हिन्दी, Türkçe और Português (Brasil और Portugal)। ऐप आपके फ़ोन की भाषा के अनुसार चलता है, और आप उसे सेटिंग में बदल सकते हैं।

<b>कुछ अच्छी बातें</b>
• नतीजा आने पर <b>चक्र की आवाज़ और वाइब्रेशन</b>।
• <b>डार्क डिज़ाइन</b>, जो जिम में आँखों को आराम देता है।
• <b>साइन-अप नहीं</b> और कोई यूज़र अकाउंट नहीं।
• <b>कोई विज्ञापन नहीं।</b>
• <b>100% ऑफ़लाइन</b>: इसे इंटरनेट कनेक्शन की ज़रूरत नहीं।
• <b>कोई ट्रैकर नहीं</b> और कोई अनावश्यक कुकी नहीं, और यह आपकी लोकेशन कभी नहीं माँगता।

<b>गोपनीयता</b>
GymRoulette पूरी तरह ऑफ़लाइन है और कोई डेटा इकट्ठा नहीं करता: कोई एनालिटिक्स नहीं, कोई ट्रैकर नहीं, कोई विज्ञापन नहीं और आपकी लोकेशन तक कोई पहुँच नहीं। आपकी सेटिंग केवल आपके डिवाइस पर सहेजी जाती हैं। गोपनीयता नीति आप ऐप के अंदर पढ़ सकते हैं।

चक्र घुमाएँ और वर्कआउट करें!`,
  },

  tr: {
    title: 'GymRoulette',
    short: 'Çarkı çevir, antrenmanın için rastgele bir egzersiz meydan okuması al.',
    banner: { line1: 'Çarkı çevir', line2: 've antrenmana başla!', tagline: 'Seni her gün zorlayacak rastgele egzersizler', button: 'ÇARKI ÇEVİR!' },
    notes: `Yenilikler:
• Artık Polski, हिन्दी, Türkçe ve English (Australia) dillerinde de.
• %100 çevrimdışı: analiz yok, izleyici yok, İnternet izni yok.
• İlk açılışta yeni tanıtım: çarkın nasıl çalıştığı ve uygulamanın verilerinle neler yapıp neler yapmadığı.
• Hata düzeltmeleri ve iyileştirmeler.`,
    full: `Bugün ne çalışacağına karar veremiyor musun? Çarkı çevir, GymRoulette senin yerine seçsin.

GymRoulette bir egzersiz çarkıdır: her dilim bir tekrar sayısını bir egzersizle birleştirir (örneğin “20 Burpee”) ve çevirdiğinde sana evde, spor salonunda veya açık havada yapabileceğin rastgele bir meydan okuma sunar. Antrenmanlarına çeşitlilik katmak, devreler, arkadaşlarınla meydan okumalar ve fazla düşünmeden spor yapmak isteyen herkes için tasarlandı.

<b>NASIL ÇALIŞIR</b>
• “Çarkı çevir” düğmesine dokun ya da çarkı parmağınla fırlat.
• Çark durunca meydan okumanı görürsün: tekrar sayısı ve egzersiz.
• Tamamlandı olarak işaretle ya da geç ve yeniden çevir.
• Geçmişten oturum boyunca tamamladığın meydan okumalara göz at.

<b>ÇARKTA NELER OLACAĞINA SEN KARAR VERİRSİN</b>
• İstediğin egzersizleri ve tekrarları aç ya da kapat.
• Ad, kısa ad ve simgeyle kendi egzersizlerini oluştur.
• Zorluğu ayarlamak için tekrar ekle ya da çıkar.
• Çark ayarlarına uyum sağlar; ayarların cihazında saklanır.

<b>EGZERSİZLERİN İÇİN 100'DEN FAZLA SİMGE</b>
Aramalı simge listesinden birçok disiplin arasında seçim yap: kuvvet ve ağırlıklar, calisthenics, kardiyo, yoga, pilates, tai chi, boks, karate ve diğer dövüş sanatları, hyrox, crossfit, engelli koşular, sporlar, su ve dağ. Şınav, plank, mekik, burpee, squat ve mountain climbers için kendi piktogramlarımız da var.

<b>KENDİ DİLİNDE</b>
English (ABD, Birleşik Krallık ve Avustralya), Español (İspanya ve Latin Amerika), Euskara, Galego, Català, Français (Fransa ve Kanada), Deutsch, Italiano, Polski, हिन्दी, Türkçe ve Português (Brezilya ve Portekiz). Uygulama telefonunun diline uyar; dilini Ayarlar'dan değiştirebilirsin.

<b>GÜZEL DETAYLAR</b>
• Sonuç çıkınca <b>çark sesleri ve titreşim</b>.
• Spor salonunda gözlerini yormayan <b>koyu bir tasarım</b>.
• <b>Kayıt yok</b>, kullanıcı hesabı yok.
• <b>Reklam yok.</b>
• <b>%100 çevrimdışı</b>: İnternet bağlantısı gerektirmez.
• <b>İzleyici yok</b>, gereksiz çerez yok ve konumunu asla istemez.

<b>GİZLİLİK</b>
GymRoulette tamamen çevrimdışıdır ve hiçbir veri toplamaz: analiz yok, izleyici yok, reklam yok ve konumuna erişim yok. Ayarların yalnızca cihazında saklanır. Gizlilik politikasını uygulamanın içinden okuyabilirsin.

Çarkı çevir, antrenmana başlayalım!`,
  },

  // El inglés británico usa el mismo texto: no hay palabras del listado que cambien entre variantes
  'en-GB': null,
  'en-AU': null,
};
LISTINGS['en-GB'] = LISTINGS.en;
LISTINGS['en-AU'] = LISTINGS.en;

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
