// Página de invitación a la prueba cerrada de Google Play (pruebas-cerradas.html).
// Bloques: ['h1', título], ['lead', introducción], ['step', título, cuerpo en HTML]... y ['thanks', despedida].
// El cuerpo de cada paso es HTML (párrafos, botones <a class="btn ...">, listas); se numeran solos.
import { CONTACT_EMAIL } from './common.mjs';

const GROUP_URL = 'https://groups.google.com/g/jabibi';
const PLAY_URL = 'https://play.google.com/store/apps/details?id=eus.jabibi.gymroul';

const btnGroup = label => `<p><a class="btn btn-light" href="${GROUP_URL}" target="_blank" rel="noopener noreferrer">${label}</a></p>`;
const btnPlay = label => `<p><a class="btn btn-primary" href="${PLAY_URL}" target="_blank" rel="noopener noreferrer">${label}</a></p>`;
const mail = `<a class="inline-link" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;
const tip = text => `<p class="tip">${text}</p>`;
/** Explica el botón de Google Groups y lo reproduce a modo de ejemplo (no es un enlace: aria-hidden y sin acción). */
const joinHint = (text, label) => `<p>${text}</p><p><span class="gg-btn" aria-hidden="true">${label}</span></p>`;

export default {
  en: { title: 'Closed Testing - GymRoulette', blocks: [
    ['h1', 'Help me test GymRoulette!'],
    ['lead', 'Follow these steps to join the 14-day closed testing program on Google Play and help us publish the app.'],
    ['step', 'Join the testers group', `<p>To get access to the download, you first need to join our Google group. Make sure you do it with the Google account you normally use on your phone.</p>${btnGroup('👉 Go to the Google Group')}${joinHint('On the group page, click the <strong>“Join group”</strong> button, next to the group name at the top. It looks like this (the label may vary slightly depending on your Google language):', 'Join group')}`],
    ['step', 'Download and install the app', `<p>Once you are in the group, use <strong>the same Google account</strong> to access the store and download GymRoulette on your Android device.</p>${btnPlay('📱 Download on Google Play')}${tip('Tip: the first time you open the app, a Google Analytics screen asks for your permission. Choose “Accept” or “Decline”: the app works either way.')}`],
    ['step', 'Try it for 14 days', '<p>Google requires thorough testing for new developer accounts. It is essential that you keep the app installed and use it on and off for at least 14 consecutive days.</p>'],
    ['step', 'Give us your feedback and report bugs', `<p>The goal of this phase is to find bugs and improve. Share your experience and tell us what works well and what doesn't:</p><ul><li>Leaving your comments and rating directly on <strong>Google Play</strong>.</li><li>Sending an email to: ${mail}.</li></ul>`],
    ['thanks', 'Thank you so much for your time and help!'],
  ] },

  es: { title: 'Pruebas cerradas - GymRoulette', blocks: [
    ['h1', '¡Ayúdame a probar GymRoulette!'],
    ['lead', 'Sigue estos pasos para unirte al programa de pruebas cerradas de 14 días en Google Play y ayudarnos a publicar la app.'],
    ['step', 'Únete al grupo de testers', `<p>Para tener acceso a la descarga, primero debes unirte a nuestro grupo de Google. Asegúrate de hacerlo con la cuenta de Google que usas habitualmente en tu móvil.</p>${btnGroup('👉 Ir al Grupo de Google')}${joinHint('En la página del grupo, pulsa el botón <strong>«Unirse al grupo»</strong>, junto al nombre del grupo, arriba. Se ve así (el texto puede variar ligeramente según el idioma de tu cuenta de Google):', 'Unirse al grupo')}`],
    ['step', 'Descarga e instala la app', `<p>Una vez dentro del grupo, usa <strong>la misma cuenta de Google</strong> para acceder a la tienda y descargar GymRoulette en tu dispositivo Android.</p>${btnPlay('📱 Descargar en Google Play')}${tip('Consejo: al abrir la app por primera vez verás una pantalla de Google Analytics. Elige «Aceptar» o «Rechazar»: la app funciona igual en ambos casos.')}`],
    ['step', 'Pruébala durante 14 días', '<p>Google exige un test riguroso para las nuevas cuentas de desarrollador. Es imprescindible que mantengas la app instalada y la utilices de forma intermitente durante al menos 14 días consecutivos.</p>'],
    ['step', 'Danos tu opinión y reporta errores', `<p>El objetivo de esta fase es encontrar fallos y mejorar. Comparte tu experiencia, dinos qué funciona bien y qué falla:</p><ul><li>Dejando tus comentarios y valoración directamente en <strong>Google Play</strong>.</li><li>Enviando un correo electrónico a: ${mail}.</li></ul>`],
    ['thanks', '¡Muchas gracias por tu tiempo y colaboración!'],
  ] },

  eu: { title: 'Proba itxiak - GymRoulette', blocks: [
    ['h1', 'Lagun nazazu GymRoulette probatzen!'],
    ['lead', 'Jarraitu urrats hauei Google Play-ko 14 eguneko proba itxien programan sartzeko eta aplikazioa argitaratzen laguntzeko.'],
    ['step', 'Sartu probatzaileen taldean', `<p>Deskargatzeko sarbidea izateko, lehenik gure Google taldera batu behar zara. Ziurtatu zure telefonoan ohi erabiltzen duzun Google kontuarekin egiten duzula.</p>${btnGroup('👉 Joan Google taldera')}${joinHint('Taldearen orrian, sakatu <strong>«Batu taldera»</strong> botoia, goiko aldean, taldearen izenaren ondoan. Honela ikusten da (testua apur bat alda daiteke zure Google kontuaren hizkuntzaren arabera):', 'Batu taldera')}`],
    ['step', 'Deskargatu eta instalatu aplikazioa', `<p>Taldean sartu eta gero, erabili <strong>Google kontu bera</strong> dendara sartzeko eta GymRoulette zure Android gailuan deskargatzeko.</p>${btnPlay('📱 Deskargatu Google Play-n')}${tip('Aholkua: aplikazioa lehen aldiz irekitzean Google Analytics pantaila bat ikusiko duzu. Aukeratu «Onartu» edo «Ukatu»: aplikazioak berdin funtzionatzen du bi kasuetan.')}`],
    ['step', 'Probatu ezazu 14 egunez', '<p>Google-k proba zorrotza eskatzen die garatzaile-kontu berriei. Ezinbestekoa da aplikazioa instalatuta edukitzea eta tarteka erabiltzea, gutxienez 14 egun jarraian.</p>'],
    ['step', 'Eman iezaguzu zure iritzia eta jakinarazi akatsak', `<p>Fase honen helburua akatsak aurkitzea eta hobetzea da. Partekatu zure esperientzia eta esan zer dabilen ondo eta zer ez:</p><ul><li>Zure iruzkinak eta balorazioa zuzenean <strong>Google Play</strong>-n utziz.</li><li>Posta elektroniko bat bidaliz helbide honetara: ${mail}.</li></ul>`],
    ['thanks', 'Mila esker zure denborarengatik eta laguntzagatik!'],
  ] },

  gl: { title: 'Probas pechadas - GymRoulette', blocks: [
    ['h1', 'Axúdame a probar GymRoulette!'],
    ['lead', 'Segue estes pasos para unirte ao programa de probas pechadas de 14 días en Google Play e axudarnos a publicar a app.'],
    ['step', 'Únete ao grupo de probadores', `<p>Para ter acceso á descarga, primeiro debes unirte ao noso grupo de Google. Asegúrate de facelo coa conta de Google que usas habitualmente no teu móbil.</p>${btnGroup('👉 Ir ao grupo de Google')}${joinHint('Na páxina do grupo, preme o botón <strong>«Unirse ao grupo»</strong>, xunto ao nome do grupo, na parte superior. Vese así (o texto pode variar lixeiramente segundo o idioma da túa conta de Google):', 'Unirse ao grupo')}`],
    ['step', 'Descarga e instala a app', `<p>Unha vez dentro do grupo, usa <strong>a mesma conta de Google</strong> para acceder á tenda e descargar GymRoulette no teu dispositivo Android.</p>${btnPlay('📱 Descargar en Google Play')}${tip('Consello: ao abrir a app por primeira vez verás unha pantalla de Google Analytics. Escolle «Aceptar» ou «Rexeitar»: a app funciona igual nos dous casos.')}`],
    ['step', 'Próbaa durante 14 días', '<p>Google esixe unha proba rigorosa ás contas de desenvolvedor novas. É imprescindible que manteñas a app instalada e a utilices de forma intermitente durante polo menos 14 días consecutivos.</p>'],
    ['step', 'Dános a túa opinión e informa de erros', `<p>O obxectivo desta fase é atopar fallos e mellorar. Comparte a túa experiencia e dinos que funciona ben e que falla:</p><ul><li>Deixando os teus comentarios e valoración directamente en <strong>Google Play</strong>.</li><li>Enviando un correo electrónico a: ${mail}.</li></ul>`],
    ['thanks', 'Moitas grazas polo teu tempo e colaboración!'],
  ] },

  ca: { title: 'Proves tancades - GymRoulette', blocks: [
    ['h1', 'Ajuda\'m a provar GymRoulette!'],
    ['lead', 'Segueix aquests passos per unir-te al programa de proves tancades de 14 dies a Google Play i ajudar-nos a publicar l\'app.'],
    ['step', 'Uneix-te al grup de provadors', `<p>Per tenir accés a la descàrrega, primer t'has d'unir al nostre grup de Google. Assegura't de fer-ho amb el compte de Google que fas servir habitualment al teu mòbil.</p>${btnGroup('👉 Ves al grup de Google')}${joinHint('A la pàgina del grup, prem el botó <strong>«Uneix-te al grup»</strong>, al costat del nom del grup, a la part superior. Es veu així (el text pot variar lleugerament segons l\'idioma del teu compte de Google):', 'Uneix-te al grup')}`],
    ['step', 'Descarrega i instal·la l\'app', `<p>Un cop dins del grup, fes servir <strong>el mateix compte de Google</strong> per accedir a la botiga i descarregar GymRoulette al teu dispositiu Android.</p>${btnPlay('📱 Descarrega a Google Play')}${tip('Consell: en obrir l\'app per primera vegada veuràs una pantalla de Google Analytics. Tria «Accepta» o «Rebutja»: l\'app funciona igual en tots dos casos.')}`],
    ['step', 'Prova-la durant 14 dies', '<p>Google exigeix una prova rigorosa als comptes de desenvolupador nous. És imprescindible que mantinguis l\'app instal·lada i l\'utilitzis de manera intermitent durant almenys 14 dies consecutius.</p>'],
    ['step', 'Dona\'ns la teva opinió i informa d\'errors', `<p>L'objectiu d'aquesta fase és trobar errors i millorar. Comparteix la teva experiència i digue'ns què funciona bé i què falla:</p><ul><li>Deixant els teus comentaris i valoració directament a <strong>Google Play</strong>.</li><li>Enviant un correu electrònic a: ${mail}.</li></ul>`],
    ['thanks', 'Moltes gràcies pel teu temps i la teva col·laboració!'],
  ] },

  fr: { title: 'Tests fermés - GymRoulette', blocks: [
    ['h1', 'Aide-moi à tester GymRoulette !'],
    ['lead', 'Suis ces étapes pour rejoindre le programme de tests fermés de 14 jours sur Google Play et nous aider à publier l\'application.'],
    ['step', 'Rejoins le groupe de testeurs', `<p>Pour avoir accès au téléchargement, tu dois d'abord rejoindre notre groupe Google. Fais-le avec le compte Google que tu utilises habituellement sur ton téléphone.</p>${btnGroup('👉 Aller au groupe Google')}${joinHint('Sur la page du groupe, appuie sur le bouton <strong>« Rejoindre le groupe »</strong>, à côté du nom du groupe, en haut. Il ressemble à ceci (le texte peut varier légèrement selon la langue de ton compte Google) :', 'Rejoindre le groupe')}`],
    ['step', 'Télécharge et installe l\'application', `<p>Une fois dans le groupe, utilise <strong>le même compte Google</strong> pour accéder au store et télécharger GymRoulette sur ton appareil Android.</p>${btnPlay('📱 Télécharger sur Google Play')}${tip('Astuce : à la première ouverture de l\'application, tu verras un écran Google Analytics. Choisis « Accepter » ou « Refuser » : l\'application fonctionne dans les deux cas.')}`],
    ['step', 'Teste-la pendant 14 jours', '<p>Google exige un test rigoureux pour les nouveaux comptes développeur. Il est indispensable que tu gardes l\'application installée et que tu l\'utilises de temps en temps pendant au moins 14 jours consécutifs.</p>'],
    ['step', 'Donne-nous ton avis et signale les bugs', `<p>L'objectif de cette phase est de trouver des défauts et de s'améliorer. Partage ton expérience et dis-nous ce qui fonctionne bien et ce qui ne va pas :</p><ul><li>En laissant tes commentaires et ta note directement sur <strong>Google Play</strong>.</li><li>En envoyant un e-mail à : ${mail}.</li></ul>`],
    ['thanks', 'Merci beaucoup pour ton temps et ta collaboration !'],
  ] },

  'pt-BR': { title: 'Testes fechados - GymRoulette', blocks: [
    ['h1', 'Me ajude a testar o GymRoulette!'],
    ['lead', 'Siga estes passos para entrar no programa de testes fechados de 14 dias no Google Play e nos ajudar a publicar o app.'],
    ['step', 'Entre no grupo de testadores', `<p>Para ter acesso ao download, primeiro você precisa entrar no nosso grupo do Google. Faça isso com a conta do Google que você usa normalmente no celular.</p>${btnGroup('👉 Ir para o grupo do Google')}${joinHint('Na página do grupo, toque no botão <strong>“Participar do grupo”</strong>, ao lado do nome do grupo, no topo. Ele tem esta aparência (o texto pode variar um pouco conforme o idioma da sua conta do Google):', 'Participar do grupo')}`],
    ['step', 'Baixe e instale o app', `<p>Depois de entrar no grupo, use <strong>a mesma conta do Google</strong> para acessar a loja e baixar o GymRoulette no seu dispositivo Android.</p>${btnPlay('📱 Baixar no Google Play')}${tip('Dica: ao abrir o app pela primeira vez, você verá uma tela do Google Analytics. Escolha “Aceitar” ou “Recusar”: o app funciona igual nos dois casos.')}`],
    ['step', 'Teste por 14 dias', '<p>O Google exige um teste rigoroso para contas de desenvolvedor novas. É imprescindível que você mantenha o app instalado e o use de vez em quando por pelo menos 14 dias consecutivos.</p>'],
    ['step', 'Dê sua opinião e relate erros', `<p>O objetivo desta fase é encontrar falhas e melhorar. Compartilhe sua experiência e diga o que funciona bem e o que falha:</p><ul><li>Deixando seus comentários e avaliação diretamente no <strong>Google Play</strong>.</li><li>Enviando um e-mail para: ${mail}.</li></ul>`],
    ['thanks', 'Muito obrigado pelo seu tempo e pela sua colaboração!'],
  ] },

  'pt-PT': { title: 'Testes fechados - GymRoulette', blocks: [
    ['h1', 'Ajuda-me a testar o GymRoulette!'],
    ['lead', 'Segue estes passos para aderires ao programa de testes fechados de 14 dias no Google Play e nos ajudares a publicar a aplicação.'],
    ['step', 'Adere ao grupo de testadores', `<p>Para teres acesso à transferência, primeiro tens de aderir ao nosso grupo do Google. Faz isso com a conta Google que costumas usar no telemóvel.</p>${btnGroup('👉 Ir para o grupo do Google')}${joinHint('Na página do grupo, toca no botão <strong>“Aderir ao grupo”</strong>, junto ao nome do grupo, no topo. Tem este aspeto (o texto pode variar ligeiramente consoante o idioma da tua conta Google):', 'Aderir ao grupo')}`],
    ['step', 'Transfere e instala a aplicação', `<p>Depois de entrares no grupo, usa <strong>a mesma conta Google</strong> para aceder à loja e transferir o GymRoulette para o teu dispositivo Android.</p>${btnPlay('📱 Transferir no Google Play')}${tip('Dica: ao abrir a aplicação pela primeira vez, verás um ecrã do Google Analytics. Escolhe “Aceitar” ou “Recusar”: a aplicação funciona igual nos dois casos.')}`],
    ['step', 'Testa-a durante 14 dias', '<p>A Google exige um teste rigoroso para contas de programador novas. É indispensável que mantenhas a aplicação instalada e a utilizes de vez em quando durante pelo menos 14 dias consecutivos.</p>'],
    ['step', 'Dá-nos a tua opinião e comunica erros', `<p>O objetivo desta fase é encontrar falhas e melhorar. Partilha a tua experiência e diz-nos o que funciona bem e o que falha:</p><ul><li>Deixando os teus comentários e avaliação diretamente no <strong>Google Play</strong>.</li><li>Enviando um e-mail para: ${mail}.</li></ul>`],
    ['thanks', 'Muito obrigado pelo teu tempo e pela tua colaboração!'],
  ] },
};
