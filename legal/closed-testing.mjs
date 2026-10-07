// Página de invitación a la prueba cerrada de Google Play (closed-testing.html).
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
    ['step', 'Download and install the app', `<p>Once you are in the group, use <strong>the same Google account</strong> to access the store and download GymRoulette on your Android device.</p>${btnPlay('📱 Download on Google Play')}${tip('Tip: the first time you open the app, a short introduction explains how the wheel works. You can skip it at any time with “Skip”.')}`],
    ['step', 'Try it for 14 days', '<p>Google requires thorough testing for new developer accounts. It is essential that you keep the app installed and use it on and off for at least 14 consecutive days.</p>'],
    ['step', 'Give us your feedback and report bugs', `<p>The goal of this phase is to find bugs and improve. Share your experience and tell us what works well and what doesn't:</p><ul><li>Leaving your comments and rating directly on <strong>Google Play</strong>.</li><li>Sending an email to: ${mail}.</li></ul>`],
    ['thanks', 'Thank you so much for your time and help!'],
  ] },

  es: { title: 'Pruebas cerradas - GymRoulette', blocks: [
    ['h1', '¡Ayúdame a probar GymRoulette!'],
    ['lead', 'Sigue estos pasos para unirte al programa de pruebas cerradas de 14 días en Google Play y ayudarnos a publicar la app.'],
    ['step', 'Únete al grupo de testers', `<p>Para tener acceso a la descarga, primero debes unirte a nuestro grupo de Google. Asegúrate de hacerlo con la cuenta de Google que usas habitualmente en tu móvil.</p>${btnGroup('👉 Ir al Grupo de Google')}${joinHint('En la página del grupo, pulsa el botón <strong>«Unirse al grupo»</strong>, junto al nombre del grupo, arriba. Se ve así (el texto puede variar ligeramente según el idioma de tu cuenta de Google):', 'Unirse al grupo')}`],
    ['step', 'Descarga e instala la app', `<p>Una vez dentro del grupo, usa <strong>la misma cuenta de Google</strong> para acceder a la tienda y descargar GymRoulette en tu dispositivo Android.</p>${btnPlay('📱 Descargar en Google Play')}${tip('Consejo: al abrir la app por primera vez verás una breve introducción que explica cómo funciona la ruleta. Puedes saltarla cuando quieras con «Saltar».')}`],
    ['step', 'Pruébala durante 14 días', '<p>Google exige un test riguroso para las nuevas cuentas de desarrollador. Es imprescindible que mantengas la app instalada y la utilices de forma intermitente durante al menos 14 días consecutivos.</p>'],
    ['step', 'Danos tu opinión y reporta errores', `<p>El objetivo de esta fase es encontrar fallos y mejorar. Comparte tu experiencia, dinos qué funciona bien y qué falla:</p><ul><li>Dejando tus comentarios y valoración directamente en <strong>Google Play</strong>.</li><li>Enviando un correo electrónico a: ${mail}.</li></ul>`],
    ['thanks', '¡Muchas gracias por tu tiempo y colaboración!'],
  ] },

  eu: { title: 'Proba itxiak - GymRoulette', blocks: [
    ['h1', 'Lagun nazazu GymRoulette probatzen!'],
    ['lead', 'Jarraitu urrats hauei Google Play-ko 14 eguneko proba itxien programan sartzeko eta aplikazioa argitaratzen laguntzeko.'],
    ['step', 'Sartu probatzaileen taldean', `<p>Deskargatzeko sarbidea izateko, lehenik gure Google taldera batu behar zara. Ziurtatu zure telefonoan ohi erabiltzen duzun Google kontuarekin egiten duzula.</p>${btnGroup('👉 Joan Google taldera')}${joinHint('Taldearen orrian, sakatu <strong>«Batu taldera»</strong> botoia, goiko aldean, taldearen izenaren ondoan. Honela ikusten da (testua apur bat alda daiteke zure Google kontuaren hizkuntzaren arabera):', 'Batu taldera')}`],
    ['step', 'Deskargatu eta instalatu aplikazioa', `<p>Taldean sartu eta gero, erabili <strong>Google kontu bera</strong> dendara sartzeko eta GymRoulette zure Android gailuan deskargatzeko.</p>${btnPlay('📱 Deskargatu Google Play-n')}${tip('Aholkua: aplikazioa lehen aldiz irekitzean sarrera labur bat ikusiko duzu, gurpila nola funtzionatzen duen azaltzeko. Edonoiz salta dezakezu «Saltatu» botoiarekin.')}`],
    ['step', 'Probatu ezazu 14 egunez', '<p>Google-k proba zorrotza eskatzen die garatzaile-kontu berriei. Ezinbestekoa da aplikazioa instalatuta edukitzea eta tarteka erabiltzea, gutxienez 14 egun jarraian.</p>'],
    ['step', 'Eman iezaguzu zure iritzia eta jakinarazi akatsak', `<p>Fase honen helburua akatsak aurkitzea eta hobetzea da. Partekatu zure esperientzia eta esan zer dabilen ondo eta zer ez:</p><ul><li>Zure iruzkinak eta balorazioa zuzenean <strong>Google Play</strong>-n utziz.</li><li>Posta elektroniko bat bidaliz helbide honetara: ${mail}.</li></ul>`],
    ['thanks', 'Mila esker zure denborarengatik eta laguntzagatik!'],
  ] },

  gl: { title: 'Probas pechadas - GymRoulette', blocks: [
    ['h1', 'Axúdame a probar GymRoulette!'],
    ['lead', 'Segue estes pasos para unirte ao programa de probas pechadas de 14 días en Google Play e axudarnos a publicar a app.'],
    ['step', 'Únete ao grupo de probadores', `<p>Para ter acceso á descarga, primeiro debes unirte ao noso grupo de Google. Asegúrate de facelo coa conta de Google que usas habitualmente no teu móbil.</p>${btnGroup('👉 Ir ao grupo de Google')}${joinHint('Na páxina do grupo, preme o botón <strong>«Unirse ao grupo»</strong>, xunto ao nome do grupo, na parte superior. Vese así (o texto pode variar lixeiramente segundo o idioma da túa conta de Google):', 'Unirse ao grupo')}`],
    ['step', 'Descarga e instala a app', `<p>Unha vez dentro do grupo, usa <strong>a mesma conta de Google</strong> para acceder á tenda e descargar GymRoulette no teu dispositivo Android.</p>${btnPlay('📱 Descargar en Google Play')}${tip('Consello: ao abrir a app por primeira vez verás unha breve introdución que explica como funciona a ruleta. Podes saltala cando queiras con «Saltar».')}`],
    ['step', 'Próbaa durante 14 días', '<p>Google esixe unha proba rigorosa ás contas de desenvolvedor novas. É imprescindible que manteñas a app instalada e a utilices de forma intermitente durante polo menos 14 días consecutivos.</p>'],
    ['step', 'Dános a túa opinión e informa de erros', `<p>O obxectivo desta fase é atopar fallos e mellorar. Comparte a túa experiencia e dinos que funciona ben e que falla:</p><ul><li>Deixando os teus comentarios e valoración directamente en <strong>Google Play</strong>.</li><li>Enviando un correo electrónico a: ${mail}.</li></ul>`],
    ['thanks', 'Moitas grazas polo teu tempo e colaboración!'],
  ] },

  ca: { title: 'Proves tancades - GymRoulette', blocks: [
    ['h1', 'Ajuda\'m a provar GymRoulette!'],
    ['lead', 'Segueix aquests passos per unir-te al programa de proves tancades de 14 dies a Google Play i ajudar-nos a publicar l\'app.'],
    ['step', 'Uneix-te al grup de provadors', `<p>Per tenir accés a la descàrrega, primer t'has d'unir al nostre grup de Google. Assegura't de fer-ho amb el compte de Google que fas servir habitualment al teu mòbil.</p>${btnGroup('👉 Ves al grup de Google')}${joinHint('A la pàgina del grup, prem el botó <strong>«Uneix-te al grup»</strong>, al costat del nom del grup, a la part superior. Es veu així (el text pot variar lleugerament segons l\'idioma del teu compte de Google):', 'Uneix-te al grup')}`],
    ['step', 'Descarrega i instal·la l\'app', `<p>Un cop dins del grup, fes servir <strong>el mateix compte de Google</strong> per accedir a la botiga i descarregar GymRoulette al teu dispositiu Android.</p>${btnPlay('📱 Descarrega a Google Play')}${tip('Consell: en obrir l\'app per primera vegada veuràs una breu introducció que explica com funciona la ruleta. Pots saltar-la quan vulguis amb «Salta».')}`],
    ['step', 'Prova-la durant 14 dies', '<p>Google exigeix una prova rigorosa als comptes de desenvolupador nous. És imprescindible que mantinguis l\'app instal·lada i l\'utilitzis de manera intermitent durant almenys 14 dies consecutius.</p>'],
    ['step', 'Dona\'ns la teva opinió i informa d\'errors', `<p>L'objectiu d'aquesta fase és trobar errors i millorar. Comparteix la teva experiència i digue'ns què funciona bé i què falla:</p><ul><li>Deixant els teus comentaris i valoració directament a <strong>Google Play</strong>.</li><li>Enviant un correu electrònic a: ${mail}.</li></ul>`],
    ['thanks', 'Moltes gràcies pel teu temps i la teva col·laboració!'],
  ] },

  fr: { title: 'Tests fermés - GymRoulette', blocks: [
    ['h1', 'Aide-moi à tester GymRoulette !'],
    ['lead', 'Suis ces étapes pour rejoindre le programme de tests fermés de 14 jours sur Google Play et nous aider à publier l\'application.'],
    ['step', 'Rejoins le groupe de testeurs', `<p>Pour avoir accès au téléchargement, tu dois d'abord rejoindre notre groupe Google. Fais-le avec le compte Google que tu utilises habituellement sur ton téléphone.</p>${btnGroup('👉 Aller au groupe Google')}${joinHint('Sur la page du groupe, appuie sur le bouton <strong>« Rejoindre le groupe »</strong>, à côté du nom du groupe, en haut. Il ressemble à ceci (le texte peut varier légèrement selon la langue de ton compte Google) :', 'Rejoindre le groupe')}`],
    ['step', 'Télécharge et installe l\'application', `<p>Une fois dans le groupe, utilise <strong>le même compte Google</strong> pour accéder au store et télécharger GymRoulette sur ton appareil Android.</p>${btnPlay('📱 Télécharger sur Google Play')}${tip('Astuce : à la première ouverture de l\'application, une courte introduction explique comment fonctionne la roue. Tu peux la passer à tout moment avec « Passer ».')}`],
    ['step', 'Teste-la pendant 14 jours', '<p>Google exige un test rigoureux pour les nouveaux comptes développeur. Il est indispensable que tu gardes l\'application installée et que tu l\'utilises de temps en temps pendant au moins 14 jours consécutifs.</p>'],
    ['step', 'Donne-nous ton avis et signale les bugs', `<p>L'objectif de cette phase est de trouver des défauts et de s'améliorer. Partage ton expérience et dis-nous ce qui fonctionne bien et ce qui ne va pas :</p><ul><li>En laissant tes commentaires et ta note directement sur <strong>Google Play</strong>.</li><li>En envoyant un e-mail à : ${mail}.</li></ul>`],
    ['thanks', 'Merci beaucoup pour ton temps et ta collaboration !'],
  ] },

  'pt-BR': { title: 'Testes fechados - GymRoulette', blocks: [
    ['h1', 'Me ajude a testar o GymRoulette!'],
    ['lead', 'Siga estes passos para entrar no programa de testes fechados de 14 dias no Google Play e nos ajudar a publicar o app.'],
    ['step', 'Entre no grupo de testadores', `<p>Para ter acesso ao download, primeiro você precisa entrar no nosso grupo do Google. Faça isso com a conta do Google que você usa normalmente no celular.</p>${btnGroup('👉 Ir para o grupo do Google')}${joinHint('Na página do grupo, toque no botão <strong>“Participar do grupo”</strong>, ao lado do nome do grupo, no topo. Ele tem esta aparência (o texto pode variar um pouco conforme o idioma da sua conta do Google):', 'Participar do grupo')}`],
    ['step', 'Baixe e instale o app', `<p>Depois de entrar no grupo, use <strong>a mesma conta do Google</strong> para acessar a loja e baixar o GymRoulette no seu dispositivo Android.</p>${btnPlay('📱 Baixar no Google Play')}${tip('Dica: ao abrir o app pela primeira vez, você verá uma breve introdução que explica como a roleta funciona. Você pode pular a qualquer momento com “Pular”.')}`],
    ['step', 'Teste por 14 dias', '<p>O Google exige um teste rigoroso para contas de desenvolvedor novas. É imprescindível que você mantenha o app instalado e o use de vez em quando por pelo menos 14 dias consecutivos.</p>'],
    ['step', 'Dê sua opinião e relate erros', `<p>O objetivo desta fase é encontrar falhas e melhorar. Compartilhe sua experiência e diga o que funciona bem e o que falha:</p><ul><li>Deixando seus comentários e avaliação diretamente no <strong>Google Play</strong>.</li><li>Enviando um e-mail para: ${mail}.</li></ul>`],
    ['thanks', 'Muito obrigado pelo seu tempo e pela sua colaboração!'],
  ] },

  'pt-PT': { title: 'Testes fechados - GymRoulette', blocks: [
    ['h1', 'Ajuda-me a testar o GymRoulette!'],
    ['lead', 'Segue estes passos para aderires ao programa de testes fechados de 14 dias no Google Play e nos ajudares a publicar a aplicação.'],
    ['step', 'Adere ao grupo de testadores', `<p>Para teres acesso à transferência, primeiro tens de aderir ao nosso grupo do Google. Faz isso com a conta Google que costumas usar no telemóvel.</p>${btnGroup('👉 Ir para o grupo do Google')}${joinHint('Na página do grupo, toca no botão <strong>“Aderir ao grupo”</strong>, junto ao nome do grupo, no topo. Tem este aspeto (o texto pode variar ligeiramente consoante o idioma da tua conta Google):', 'Aderir ao grupo')}`],
    ['step', 'Transfere e instala a aplicação', `<p>Depois de entrares no grupo, usa <strong>a mesma conta Google</strong> para aceder à loja e transferir o GymRoulette para o teu dispositivo Android.</p>${btnPlay('📱 Transferir no Google Play')}${tip('Dica: ao abrir a aplicação pela primeira vez, verás uma breve introdução que explica como funciona a roleta. Podes saltá-la a qualquer momento com “Saltar”.')}`],
    ['step', 'Testa-a durante 14 dias', '<p>A Google exige um teste rigoroso para contas de programador novas. É indispensável que mantenhas a aplicação instalada e a utilizes de vez em quando durante pelo menos 14 dias consecutivos.</p>'],
    ['step', 'Dá-nos a tua opinião e comunica erros', `<p>O objetivo desta fase é encontrar falhas e melhorar. Partilha a tua experiência e diz-nos o que funciona bem e o que falha:</p><ul><li>Deixando os teus comentários e avaliação diretamente no <strong>Google Play</strong>.</li><li>Enviando um e-mail para: ${mail}.</li></ul>`],
    ['thanks', 'Muito obrigado pelo teu tempo e pela tua colaboração!'],
  ] },

  de: { title: 'Geschlossener Test - GymRoulette', blocks: [
    ['h1', 'Hilf mir, GymRoulette zu testen!'],
    ['lead', 'Folge diesen Schritten, um am 14-tägigen geschlossenen Test auf Google Play teilzunehmen und uns bei der Veröffentlichung der App zu helfen.'],
    ['step', 'Tritt der Testergruppe bei', `<p>Um Zugriff auf den Download zu erhalten, musst du zuerst unserer Google-Gruppe beitreten. Verwende dafür das Google-Konto, das du normalerweise auf deinem Handy nutzt.</p>${btnGroup('👉 Zur Google-Gruppe')}${joinHint('Klicke auf der Gruppenseite oben neben dem Gruppennamen auf die Schaltfläche <strong>„Gruppe beitreten“</strong>. So sieht sie aus (der Text kann je nach Sprache deines Google-Kontos leicht abweichen):', 'Gruppe beitreten')}`],
    ['step', 'Lade die App herunter und installiere sie', `<p>Sobald du in der Gruppe bist, verwende <strong>dasselbe Google-Konto</strong>, um den Store zu öffnen und GymRoulette auf dein Android-Gerät herunterzuladen.</p>${btnPlay('📱 Bei Google Play herunterladen')}${tip('Tipp: Beim ersten Öffnen der App erklärt eine kurze Einführung, wie das Rad funktioniert. Du kannst sie jederzeit mit „Überspringen“ überspringen.')}`],
    ['step', 'Teste sie 14 Tage lang', '<p>Google verlangt für neue Entwicklerkonten einen gründlichen Test. Es ist unerlässlich, dass du die App installiert lässt und sie mit Unterbrechungen mindestens 14 Tage in Folge nutzt.</p>'],
    ['step', 'Gib uns Feedback und melde Fehler', `<p>Ziel dieser Phase ist es, Fehler zu finden und die App zu verbessern. Teile deine Erfahrungen und sag uns, was gut funktioniert und was nicht:</p><ul><li>Indem du deine Kommentare und Bewertung direkt auf <strong>Google Play</strong> hinterlässt.</li><li>Indem du eine E-Mail sendest an: ${mail}.</li></ul>`],
    ['thanks', 'Vielen Dank für deine Zeit und deine Unterstützung!'],
  ] },

  it: { title: 'Test chiuso - GymRoulette', blocks: [
    ['h1', 'Aiutami a testare GymRoulette!'],
    ['lead', 'Segui questi passaggi per partecipare al programma di test chiuso di 14 giorni su Google Play e aiutarci a pubblicare l\'app.'],
    ['step', 'Unisciti al gruppo di tester', `<p>Per avere accesso al download, devi prima unirti al nostro gruppo Google. Usa l'account Google che utilizzi di solito sul tuo telefono.</p>${btnGroup('👉 Vai al gruppo Google')}${joinHint('Nella pagina del gruppo, premi il pulsante <strong>«Partecipa al gruppo»</strong>, accanto al nome del gruppo, in alto. Appare così (il testo può variare leggermente a seconda della lingua del tuo account Google):', 'Partecipa al gruppo')}`],
    ['step', 'Scarica e installa l\'app', `<p>Una volta entrato nel gruppo, usa <strong>lo stesso account Google</strong> per accedere allo store e scaricare GymRoulette sul tuo dispositivo Android.</p>${btnPlay('📱 Scarica su Google Play')}${tip('Suggerimento: alla prima apertura dell\'app vedrai una breve introduzione che spiega come funziona la ruota. Puoi saltarla in qualsiasi momento con «Salta».')}`],
    ['step', 'Provala per 14 giorni', '<p>Google richiede un test rigoroso per i nuovi account sviluppatore. È indispensabile che tu mantenga l\'app installata e la usi in modo saltuario per almeno 14 giorni consecutivi.</p>'],
    ['step', 'Dacci la tua opinione e segnala gli errori', `<p>L'obiettivo di questa fase è trovare difetti e migliorare. Condividi la tua esperienza e dicci cosa funziona bene e cosa no:</p><ul><li>Lasciando i tuoi commenti e la tua valutazione direttamente su <strong>Google Play</strong>.</li><li>Inviando un'e-mail a: ${mail}.</li></ul>`],
    ['thanks', 'Grazie mille per il tuo tempo e la tua collaborazione!'],
  ] },
  pl: { title: 'Testy zamknięte - GymRoulette', blocks: [
    ['h1', 'Pomóż mi testować GymRoulette!'],
    ['lead', 'Wykonaj te kroki, aby dołączyć do 14-dniowego programu testów zamkniętych w Google Play i pomóc nam opublikować aplikację.'],
    ['step', 'Dołącz do grupy testerów', `<p>Aby uzyskać dostęp do pobrania, musisz najpierw dołączyć do naszej grupy Google. Zrób to na koncie Google, którego zwykle używasz w telefonie.</p>${btnGroup('👉 Przejdź do grupy Google')}${joinHint('Na stronie grupy kliknij przycisk <strong>„Dołącz do grupy”</strong>, obok nazwy grupy u góry. Wygląda tak (napis może się nieznacznie różnić w zależności od języka twojego konta Google):', 'Dołącz do grupy')}`],
    ['step', 'Pobierz i zainstaluj aplikację', `<p>Gdy już będziesz w grupie, użyj <strong>tego samego konta Google</strong>, aby wejść do sklepu i pobrać GymRoulette na swoje urządzenie z Androidem.</p>${btnPlay('📱 Pobierz w Google Play')}${tip('Wskazówka: przy pierwszym uruchomieniu aplikacji zobaczysz krótkie wprowadzenie wyjaśniające, jak działa koło. Możesz je w każdej chwili pominąć przyciskiem „Pomiń”.')}`],
    ['step', 'Testuj ją przez 14 dni', '<p>Google wymaga gruntownych testów dla nowych kont deweloperskich. Konieczne jest, abyś zachował aplikację zainstalowaną i korzystał z niej od czasu do czasu przez co najmniej 14 kolejnych dni.</p>'],
    ['step', 'Podziel się opinią i zgłaszaj błędy', `<p>Celem tego etapu jest znalezienie błędów i ulepszenie aplikacji. Podziel się swoimi wrażeniami i napisz, co działa dobrze, a co nie:</p><ul><li>Zostawiając komentarz i ocenę bezpośrednio w <strong>Google Play</strong>.</li><li>Wysyłając e-mail na adres: ${mail}.</li></ul>`],
    ['thanks', 'Bardzo dziękujemy za twój czas i pomoc!'],
  ] },

  hi: { title: 'क्लोज़्ड टेस्टिंग - GymRoulette', blocks: [
    ['h1', 'GymRoulette को टेस्ट करने में मेरी मदद करें!'],
    ['lead', 'Google Play पर 14 दिन के क्लोज़्ड टेस्टिंग प्रोग्राम से जुड़ने और ऐप प्रकाशित करने में हमारी मदद करने के लिए इन चरणों का पालन करें।'],
    ['step', 'टेस्टर ग्रुप से जुड़ें', `<p>डाउनलोड तक पहुँचने के लिए आपको पहले हमारे Google ग्रुप से जुड़ना होगा। ऐसा उसी Google अकाउंट से करें जिसे आप आमतौर पर अपने फ़ोन में इस्तेमाल करते हैं।</p>${btnGroup('👉 Google ग्रुप पर जाएँ')}${joinHint('ग्रुप के पेज पर, सबसे ऊपर ग्रुप के नाम के पास दिए <strong>“ग्रुप से जुड़ें”</strong> बटन को दबाएँ। यह ऐसा दिखता है (आपके Google अकाउंट की भाषा के अनुसार शब्द थोड़े अलग हो सकते हैं):', 'ग्रुप से जुड़ें')}`],
    ['step', 'ऐप डाउनलोड और इंस्टॉल करें', `<p>ग्रुप में शामिल होने के बाद, <strong>उसी Google अकाउंट</strong> से स्टोर खोलें और अपने Android डिवाइस पर GymRoulette डाउनलोड करें।</p>${btnPlay('📱 Google Play पर डाउनलोड करें')}${tip('सुझाव: ऐप पहली बार खोलने पर एक छोटा परिचय दिखेगा जो बताता है कि चक्र कैसे काम करता है। आप इसे कभी भी “छोड़ें” से छोड़ सकते हैं।')}`],
    ['step', '14 दिन तक आज़माएँ', '<p>Google नए डेवलपर अकाउंट के लिए गहन टेस्टिंग की माँग करता है। यह ज़रूरी है कि आप ऐप को इंस्टॉल रखें और कम से कम लगातार 14 दिन तक बीच-बीच में उसका उपयोग करते रहें।</p>'],
    ['step', 'हमें अपनी राय दें और गड़बड़ियाँ बताएँ', `<p>इस चरण का लक्ष्य गड़बड़ियाँ ढूँढना और सुधार करना है। अपना अनुभव साझा करें और बताएँ कि क्या अच्छा चलता है और क्या नहीं:</p><ul><li><strong>Google Play</strong> पर सीधे अपनी टिप्पणी और रेटिंग देकर।</li><li>इस पते पर ईमेल भेजकर: ${mail}।</li></ul>`],
    ['thanks', 'आपके समय और सहयोग के लिए बहुत-बहुत धन्यवाद!'],
  ] },

  tr: { title: 'Kapalı Test - GymRoulette', blocks: [
    ['h1', 'GymRoulette\'i test etmeme yardım et!'],
    ['lead', 'Google Play\'deki 14 günlük kapalı test programına katılmak ve uygulamayı yayınlamamıza yardımcı olmak için şu adımları izle.'],
    ['step', 'Test kullanıcıları grubuna katıl', `<p>İndirmeye erişmek için önce Google grubumuza katılman gerekiyor. Bunu telefonunda normalde kullandığın Google hesabıyla yaptığından emin ol.</p>${btnGroup('👉 Google Grubuna git')}${joinHint('Grup sayfasında, üstteki grup adının yanında bulunan <strong>“Gruba katıl”</strong> düğmesine tıkla. Şöyle görünür (etiket, Google dil ayarına göre biraz değişebilir):', 'Gruba katıl')}`],
    ['step', 'Uygulamayı indir ve yükle', `<p>Gruba girdikten sonra mağazaya erişmek ve GymRoulette\'i Android cihazına indirmek için <strong>aynı Google hesabını</strong> kullan.</p>${btnPlay('📱 Google Play\'den indir')}${tip('İpucu: Uygulamayı ilk kez açtığında çarkın nasıl çalıştığını anlatan kısa bir tanıtım görürsün. İstediğin zaman “Geç” ile atlayabilirsin.')}`],
    ['step', '14 gün boyunca dene', '<p>Google, yeni geliştirici hesapları için kapsamlı test şartı koşuyor. Uygulamayı yüklü tutman ve en az 14 gün üst üste ara ara kullanman çok önemli.</p>'],
    ['step', 'Geri bildirim ver ve hataları bildir', `<p>Bu aşamanın amacı hataları bulmak ve geliştirmek. Deneyimini paylaş, neyin iyi çalıştığını ve neyin çalışmadığını bize söyle:</p><ul><li>Yorumlarını ve puanını doğrudan <strong>Google Play</strong>'e bırakarak.</li><li>Şu adrese e-posta göndererek: ${mail}.</li></ul>`],
    ['thanks', 'Zamanın ve yardımın için çok teşekkürler!'],
  ] },

};
