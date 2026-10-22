// Eliminación de datos (URL que se declara en Google Play). Mismo formato que privacy.mjs.
import { mailWithSubject, APP_ID, WEB } from './common.mjs';

export default {
  en: {
    title: 'Data Deletion - GymRoulette',
    blocks: [
      ['h1', 'Data Deletion - GymRoulette'],
      ['p', 'Last updated: October 2026'],
      ['p', `This page explains how to request deletion of the data associated with the <strong>GymRoulette</strong> app (Android, ${APP_ID}, and its web version), developed by Javier Melendez ("jabibi"). GymRoulette has no user accounts: no name, email or password is stored.`],

      ['h2', '1. Data stored on your device'],
      ['p', 'Your exercise and rep settings are stored only on your device and are never sent to our servers. To delete them:'],
      ['ol', [
        '<strong>Android:</strong> Settings &gt; Apps &gt; GymRoulette &gt; Storage &gt; <em>Clear data</em>, or uninstall the app.',
        `<strong>Web:</strong> clear the site data for ${WEB} in your browser settings.`,
      ]],
      ['p', 'That removes everything the app stores about you. The app collects nothing else.'],

      ['h2', '2. Contact'],
      ['p', `Write to ${mailWithSubject('Data deletion - GymRoulette')} with the subject "Data deletion - GymRoulette". We will reply within one month.`],

      ['h2', '3. What is deleted and what is kept'],
      ['table', ['Data', 'What happens', 'Time frame'], [
        ['Wheel settings and preferences (on your device)', 'Deleted when you clear data or uninstall', 'Immediate'],
        ['Copy of your email and request', 'Kept only as long as needed to handle the request and prove it was handled', 'Up to 12 months after it is resolved'],
      ]],
      ['p', 'More information on how your data is processed in the <a href="privacy.html">Privacy policy</a>.'],
    ],
  },

  es: {
    title: 'Eliminación de datos - GymRoulette',
    blocks: [
      ['h1', 'Eliminación de datos - GymRoulette'],
      ['p', 'Última actualización: octubre 2026'],
      ['p', `Esta página explica cómo solicitar la eliminación de los datos asociados a la aplicación <strong>GymRoulette</strong> (Android, ${APP_ID}, y su versión web), desarrollada por Javier Melendez ("jabibi"). GymRoulette no tiene cuentas de usuario: no se almacena ningún nombre, correo ni contraseña.`],

      ['h2', '1. Datos guardados en tu dispositivo'],
      ['p', 'Tu configuración de ejercicios y repeticiones se guarda solo en tu dispositivo y nunca se envía a nuestros servidores. Para eliminarla:'],
      ['ol', [
        '<strong>Android:</strong> Ajustes &gt; Aplicaciones &gt; GymRoulette &gt; Almacenamiento &gt; <em>Borrar datos</em>, o desinstala la aplicación.',
        `<strong>Web:</strong> borra los datos del sitio ${WEB} desde los ajustes de tu navegador.`,
      ]],
      ['p', 'Con eso se elimina todo lo que la aplicación guarda sobre ti. La aplicación no recopila nada más.'],

      ['h2', '2. Contacto'],
      ['p', `Escribe a ${mailWithSubject('Eliminación de datos - GymRoulette')} con el asunto "Eliminación de datos - GymRoulette". Responderemos en un plazo máximo de un mes.`],

      ['h2', '3. Qué se elimina y qué se conserva'],
      ['table', ['Datos', 'Qué ocurre', 'Plazo'], [
        ['Configuración de la ruleta y preferencias (en tu dispositivo)', 'Se elimina al borrar los datos o desinstalar', 'Inmediato'],
        ['Copia de tu correo y solicitud', 'Se conservan solo el tiempo necesario para atender la solicitud y acreditar su cumplimiento', 'Hasta 12 meses tras resolverla'],
      ]],
      ['p', 'Más información sobre el tratamiento de tus datos en la <a href="privacy.html">Política de privacidad</a>.'],
    ],
  },

  eu: {
    title: 'Datuen ezabaketa - GymRoulette',
    blocks: [
      ['h1', 'Datuen ezabaketa - GymRoulette'],
      ['p', 'Azken eguneratzea: 2026ko urria'],
      ['p', `Orri honek azaltzen du nola eskatu <strong>GymRoulette</strong> aplikazioari (Android, ${APP_ID}, eta bere web bertsioa) lotutako datuak ezabatzea; Javier Melendez-ek ("jabibi") garatua. GymRoulette-k ez du erabiltzaile-konturik: ez da izenik, posta elektronikorik edo pasahitzik gordetzen.`],

      ['h2', '1. Zure gailuan gordetako datuak'],
      ['p', 'Zure ariketen eta errepikapenen konfigurazioa zure gailuan soilik gordetzen da eta ez da inoiz gure zerbitzarietara bidaltzen. Ezabatzeko:'],
      ['ol', [
        '<strong>Android:</strong> Ezarpenak &gt; Aplikazioak &gt; GymRoulette &gt; Biltegiratzea &gt; <em>Garbitu datuak</em>, edo desinstalatu aplikazioa.',
        `<strong>Web:</strong> ezabatu ${WEB} guneko datuak zure nabigatzailearen ezarpenetatik.`,
      ]],
      ['p', 'Horrek aplikazioak zutaz gordetzen duen guztia ezabatzen du. Aplikazioak ez du beste ezer biltzen.'],

      ['h2', '2. Harremana'],
      ['p', `Idatzi ${mailWithSubject('Datuen ezabaketa - GymRoulette')} helbidera "Datuen ezabaketa - GymRoulette" gaiarekin. Hilabeteko gehieneko epean erantzungo dugu.`],

      ['h2', '3. Zer ezabatzen den eta zer gordetzen den'],
      ['table', ['Datuak', 'Zer gertatzen da', 'Epea'], [
        ['Gurpilaren konfigurazioa eta hobespenak (zure gailuan)', 'Datuak garbitzean edo desinstalatzean ezabatzen da', 'Berehala'],
        ['Zure posta elektronikoaren eta eskaeraren kopia', 'Eskaera bideratzeko eta bete dela frogatzeko behar den denboran soilik gordetzen dira', 'Ebatzi eta 12 hilabetera arte'],
      ]],
      ['p', 'Zure datuen tratamenduari buruzko informazio gehiago <a href="privacy.html">Pribatutasun-politikan</a>.'],
    ],
  },

  gl: {
    title: 'Eliminación de datos - GymRoulette',
    blocks: [
      ['h1', 'Eliminación de datos - GymRoulette'],
      ['p', 'Última actualización: outubro de 2026'],
      ['p', `Esta páxina explica como solicitar a eliminación dos datos asociados á aplicación <strong>GymRoulette</strong> (Android, ${APP_ID}, e a súa versión web), desenvolvida por Javier Melendez ("jabibi"). GymRoulette non ten contas de usuario: non se almacena ningún nome, correo nin contrasinal.`],

      ['h2', '1. Datos gardados no teu dispositivo'],
      ['p', 'A túa configuración de exercicios e repeticións gárdase só no teu dispositivo e nunca se envía aos nosos servidores. Para eliminala:'],
      ['ol', [
        '<strong>Android:</strong> Axustes &gt; Aplicacións &gt; GymRoulette &gt; Almacenamento &gt; <em>Borrar datos</em>, ou desinstala a aplicación.',
        `<strong>Web:</strong> borra os datos do sitio ${WEB} desde os axustes do teu navegador.`,
      ]],
      ['p', 'Iso elimina todo o que a aplicación garda sobre ti. A aplicación non recolle nada máis.'],

      ['h2', '2. Contacto'],
      ['p', `Escribe a ${mailWithSubject('Eliminación de datos - GymRoulette')} co asunto "Eliminación de datos - GymRoulette". Responderemos nun prazo máximo dun mes.`],

      ['h2', '3. Que se elimina e que se conserva'],
      ['table', ['Datos', 'Que ocorre', 'Prazo'], [
        ['Configuración da ruleta e preferencias (no teu dispositivo)', 'Elimínase ao borrar os datos ou desinstalar', 'Inmediato'],
        ['Copia do teu correo e solicitude', 'Consérvanse só o tempo necesario para atender a solicitude e acreditar o seu cumprimento', 'Ata 12 meses despois de resolvela'],
      ]],
      ['p', 'Máis información sobre o tratamento dos teus datos na <a href="privacy.html">Política de privacidade</a>.'],
    ],
  },

  ca: {
    title: 'Eliminació de dades - GymRoulette',
    blocks: [
      ['h1', 'Eliminació de dades - GymRoulette'],
      ['p', 'Darrera actualització: octubre de 2026'],
      ['p', `Aquesta pàgina explica com sol·licitar l'eliminació de les dades associades a l'aplicació <strong>GymRoulette</strong> (Android, ${APP_ID}, i la seva versió web), desenvolupada per Javier Melendez ("jabibi"). GymRoulette no té comptes d'usuari: no s'emmagatzema cap nom, correu ni contrasenya.`],

      ['h2', '1. Dades desades al teu dispositiu'],
      ['p', 'La teva configuració d\'exercicis i repeticions es desa només al teu dispositiu i mai no s\'envia als nostres servidors. Per eliminar-la:'],
      ['ol', [
        '<strong>Android:</strong> Configuració &gt; Aplicacions &gt; GymRoulette &gt; Emmagatzematge &gt; <em>Esborra les dades</em>, o desinstal·la l\'aplicació.',
        `<strong>Web:</strong> esborra les dades del lloc ${WEB} des de la configuració del teu navegador.`,
      ]],
      ['p', 'Això elimina tot el que l\'aplicació desa sobre tu. L\'aplicació no recopila res més.'],

      ['h2', '2. Contacte'],
      ['p', `Escriu a ${mailWithSubject('Eliminació de dades - GymRoulette')} amb l'assumpte "Eliminació de dades - GymRoulette". Respondrem en un termini màxim d\'un mes.`],

      ['h2', '3. Què s\'elimina i què es conserva'],
      ['table', ['Dades', 'Què passa', 'Termini'], [
        ['Configuració de la ruleta i preferències (al teu dispositiu)', 'S\'elimina en esborrar les dades o desinstal·lar', 'Immediat'],
        ['Còpia del teu correu i sol·licitud', 'Es conserven només el temps necessari per atendre la sol·licitud i acreditar-ne el compliment', 'Fins a 12 mesos després de resoldre-la'],
      ]],
      ['p', 'Més informació sobre el tractament de les teves dades a la <a href="privacy.html">Política de privadesa</a>.'],
    ],
  },

  fr: {
    title: 'Suppression des données - GymRoulette',
    blocks: [
      ['h1', 'Suppression des données - GymRoulette'],
      ['p', 'Dernière mise à jour : octobre 2026'],
      ['p', `Cette page explique comment demander la suppression des données associées à l'application <strong>GymRoulette</strong> (Android, ${APP_ID}, et sa version web), développée par Javier Melendez (« jabibi »). GymRoulette n'a pas de comptes utilisateur : aucun nom, e-mail ni mot de passe n'est enregistré.`],

      ['h2', '1. Données enregistrées sur ton appareil'],
      ['p', 'Ta configuration d\'exercices et de répétitions est enregistrée uniquement sur ton appareil et n\'est jamais envoyée à nos serveurs. Pour la supprimer :'],
      ['ol', [
        '<strong>Android :</strong> Paramètres &gt; Applications &gt; GymRoulette &gt; Stockage &gt; <em>Effacer les données</em>, ou désinstalle l\'application.',
        `<strong>Web :</strong> efface les données du site ${WEB} dans les paramètres de ton navigateur.`,
      ]],
      ['p', 'Cela supprime tout ce que l\'application enregistre à ton sujet. L\'application ne collecte rien d\'autre.'],

      ['h2', '2. Contact'],
      ['p', `Écris à ${mailWithSubject('Suppression des données - GymRoulette')} avec l'objet « Suppression des données - GymRoulette ». Nous répondrons dans un délai maximum d\'un mois.`],

      ['h2', '3. Ce qui est supprimé et ce qui est conservé'],
      ['table', ['Données', 'Ce qui se passe', 'Délai'], [
        ['Configuration de la roue et préférences (sur ton appareil)', 'Supprimée lorsque tu effaces les données ou désinstalles l\'application', 'Immédiat'],
        ['Copie de ton e-mail et de la demande', 'Conservées uniquement le temps nécessaire pour traiter la demande et prouver qu\'elle a été traitée', 'Jusqu\'à 12 mois après sa résolution'],
      ]],
      ['p', 'Plus d\'informations sur le traitement de tes données dans la <a href="privacy.html">Politique de confidentialité</a>.'],
    ],
  },

  'pt-BR': {
    title: 'Exclusão de dados - GymRoulette',
    blocks: [
      ['h1', 'Exclusão de dados - GymRoulette'],
      ['p', 'Última atualização: outubro de 2026'],
      ['p', `Esta página explica como solicitar a exclusão dos dados associados ao aplicativo <strong>GymRoulette</strong> (Android, ${APP_ID}, e sua versão web), desenvolvido por Javier Melendez ("jabibi"). O GymRoulette não tem contas de usuário: nenhum nome, e-mail ou senha é armazenado.`],

      ['h2', '1. Dados guardados no seu dispositivo'],
      ['p', 'A configuração dos seus exercícios e repetições é guardada apenas no seu dispositivo e nunca é enviada aos nossos servidores. Para excluí-la:'],
      ['ol', [
        '<strong>Android:</strong> Configurações &gt; Apps &gt; GymRoulette &gt; Armazenamento &gt; <em>Limpar dados</em>, ou desinstale o aplicativo.',
        `<strong>Web:</strong> apague os dados do site ${WEB} nas configurações do seu navegador.`,
      ]],
      ['p', 'Isso remove tudo o que o aplicativo guarda sobre você. O aplicativo não coleta mais nada.'],

      ['h2', '2. Kontakt'],
      ['p', `Escreva para ${mailWithSubject('Exclusão de dados - GymRoulette')} com o assunto "Exclusão de dados - GymRoulette". Responderemos em até um mês.`],

      ['h2', '3. O que é excluído e o que é mantido'],
      ['table', ['Dados', 'O que acontece', 'Prazo'], [
        ['Configuração da roleta e preferências (no seu dispositivo)', 'Excluída ao limpar os dados ou desinstalar', 'Imediato'],
        ['Cópia do seu e-mail e da solicitação', 'Mantidas apenas pelo tempo necessário para atender à solicitação e comprovar seu cumprimento', 'Até 12 meses após a resolução'],
      ]],
      ['p', 'Mais informações sobre o tratamento dos seus dados na <a href="privacy.html">Política de privacidade</a>.'],
    ],
  },

  'pt-PT': {
    title: 'Eliminação de dados - GymRoulette',
    blocks: [
      ['h1', 'Eliminação de dados - GymRoulette'],
      ['p', 'Última atualização: outubro de 2026'],
      ['p', `Esta página explica como solicitar a eliminação dos dados associados à aplicação <strong>GymRoulette</strong> (Android, ${APP_ID}, e a sua versão web), desenvolvida por Javier Melendez ("jabibi"). O GymRoulette não tem contas de utilizador: não é armazenado nenhum nome, e-mail ou palavra-passe.`],

      ['h2', '1. Dados guardados no teu dispositivo'],
      ['p', 'A configuração dos teus exercícios e repetições é guardada apenas no teu dispositivo e nunca é enviada para os nossos servidores. Para a eliminar:'],
      ['ol', [
        '<strong>Android:</strong> Definições &gt; Aplicações &gt; GymRoulette &gt; Armazenamento &gt; <em>Limpar dados</em>, ou desinstala a aplicação.',
        `<strong>Web:</strong> apaga os dados do site ${WEB} nas definições do teu navegador.`,
      ]],
      ['p', 'Isto remove tudo o que a aplicação guarda sobre ti. A aplicação não recolhe mais nada.'],

      ['h2', '2. Contatti'],
      ['p', `Escreve para ${mailWithSubject('Eliminação de dados - GymRoulette')} com o assunto "Eliminação de dados - GymRoulette". Responderemos no prazo máximo de um mês.`],

      ['h2', '3. O que é eliminado e o que é conservado'],
      ['table', ['Dados', 'O que acontece', 'Prazo'], [
        ['Configuração da roleta e preferências (no teu dispositivo)', 'Eliminada ao limpar os dados ou desinstalar', 'Imediato'],
        ['Cópia do teu e-mail e do pedido', 'Conservadas apenas pelo tempo necessário para tratar o pedido e comprovar o seu cumprimento', 'Até 12 meses após a resolução'],
      ]],
      ['p', 'Mais informações sobre o tratamento dos teus dados na <a href="privacy.html">Política de privacidade</a>.'],
    ],
  },

  de: {
    title: 'Löschung von Daten - GymRoulette',
    blocks: [
      ['h1', 'Löschung von Daten - GymRoulette'],
      ['p', 'Zuletzt aktualisiert: Oktober 2026'],
      ['p', `Diese Seite erklärt, wie du die Löschung der Daten beantragen kannst, die mit der App <strong>GymRoulette</strong> (Android, ${APP_ID}, und ihrer Webversion) verbunden sind, entwickelt von Javier Melendez („jabibi“). GymRoulette hat keine Benutzerkonten: Es werden weder Name noch E-Mail-Adresse noch Passwort gespeichert.`],

      ['h2', '1. Auf deinem Gerät gespeicherte Daten'],
      ['p', 'Deine Einstellungen für Übungen und Wiederholungen werden nur auf deinem Gerät gespeichert und nie an unsere Server gesendet. So löschst du sie:'],
      ['ol', [
        '<strong>Android:</strong> Einstellungen &gt; Apps &gt; GymRoulette &gt; Speicher &gt; <em>Daten löschen</em> oder deinstalliere die App.',
        `<strong>Web:</strong> Lösche die Daten der Website ${WEB} in den Einstellungen deines Browsers.`,
      ]],
      ['p', 'Damit wird alles entfernt, was die App über dich speichert. Die App erfasst nichts weiter.'],

      ['h2', '2. Contato'],
      ['p', `Schreibe an ${mailWithSubject('Löschung von Daten - GymRoulette')} mit dem Betreff „Löschung von Daten - GymRoulette“. Wir antworten innerhalb von höchstens einem Monat.`],

      ['h2', '3. Was gelöscht und was aufbewahrt wird'],
      ['table', ['Daten', 'Was passiert', 'Frist'], [
        ['Einstellungen des Rads und Präferenzen (auf deinem Gerät)', 'Werden beim Löschen der Daten oder Deinstallieren gelöscht', 'Sofort'],
        ['Kopie deiner E-Mail und deines Antrags', 'Werden nur so lange aufbewahrt, wie nötig, um den Antrag zu bearbeiten und die Bearbeitung nachzuweisen', 'Bis zu 12 Monate nach Abschluss'],
      ]],
      ['p', 'Weitere Informationen zur Verarbeitung deiner Daten findest du in der <a href="privacy.html">Datenschutzerklärung</a>.'],
    ],
  },

  it: {
    title: 'Eliminazione dei dati - GymRoulette',
    blocks: [
      ['h1', 'Eliminazione dei dati - GymRoulette'],
      ['p', 'Ultimo aggiornamento: ottobre 2026'],
      ['p', `Questa pagina spiega come richiedere l'eliminazione dei dati associati all'app <strong>GymRoulette</strong> (Android, ${APP_ID}, e la sua versione web), sviluppata da Javier Melendez («jabibi»). GymRoulette non ha account utente: non viene memorizzato alcun nome, e-mail o password.`],

      ['h2', '1. Dati salvati sul tuo dispositivo'],
      ['p', 'Le tue impostazioni di esercizi e ripetizioni sono salvate solo sul tuo dispositivo e non vengono mai inviate ai nostri server. Per eliminarle:'],
      ['ol', [
        '<strong>Android:</strong> Impostazioni &gt; App &gt; GymRoulette &gt; Spazio di archiviazione &gt; <em>Cancella dati</em>, oppure disinstalla l\'app.',
        `<strong>Web:</strong> cancella i dati del sito ${WEB} dalle impostazioni del tuo browser.`,
      ]],
      ['p', 'Questo elimina tutto ciò che l\'app memorizza su di te. L\'app non raccoglie nient\'altro.'],

      ['h2', '2. Contacto'],
      ['p', `Scrivi a ${mailWithSubject('Eliminazione dei dati - GymRoulette')} con l'oggetto «Eliminazione dei dati - GymRoulette». Risponderemo entro un mese al massimo.`],

      ['h2', '3. Cosa viene eliminato e cosa viene conservato'],
      ['table', ['Dati', 'Cosa succede', 'Tempi'], [
        ['Impostazioni della ruota e preferenze (sul tuo dispositivo)', 'Eliminate quando cancelli i dati o disinstalli l\'app', 'Immediato'],
        ['Copia della tua e-mail e della richiesta', 'Conservate solo per il tempo necessario a gestire la richiesta e dimostrare che è stata gestita', 'Fino a 12 mesi dopo la sua risoluzione'],
      ]],
      ['p', 'Maggiori informazioni sul trattamento dei tuoi dati nell\'<a href="privacy.html">Informativa sulla privacy</a>.'],
    ],
  },
  pl: {
    title: 'Usuwanie danych - GymRoulette',
    blocks: [
      ['h1', 'Usuwanie danych - GymRoulette'],
      ['p', 'Ostatnia aktualizacja: październik 2026'],
      ['p', `Ta strona wyjaśnia, jak zażądać usunięcia danych powiązanych z aplikacją <strong>GymRoulette</strong> (Android, ${APP_ID}, oraz jej wersją internetową), stworzoną przez Javiera Melendeza („jabibi”). GymRoulette nie ma kont użytkowników: nie jest przechowywane żadne imię i nazwisko, adres e-mail ani hasło.`],

      ['h2', '1. Dane przechowywane na urządzeniu Użytkownika'],
      ['p', 'Ustawienia ćwiczeń i powtórzeń są przechowywane wyłącznie na urządzeniu Użytkownika i nigdy nie są wysyłane na nasze serwery. Aby je usunąć:'],
      ['ol', [
        '<strong>Android:</strong> Ustawienia &gt; Aplikacje &gt; GymRoulette &gt; Pamięć &gt; <em>Wyczyść dane</em> lub odinstalowanie aplikacji.',
        `<strong>Internet:</strong> wyczyszczenie danych witryny ${WEB} w ustawieniach przeglądarki.`,
      ]],
      ['p', 'Spowoduje to usunięcie wszystkiego, co aplikacja przechowuje o Użytkowniku. Aplikacja nie zbiera niczego więcej.'],

      ['h2', '2. Kontakt'],
      ['p', `Prosimy napisać na adres ${mailWithSubject('Usuwanie danych - GymRoulette')} z tematem „Usuwanie danych - GymRoulette”. Odpowiemy w ciągu miesiąca.`],

      ['h2', '3. Co jest usuwane, a co przechowywane'],
      ['table', ['Dane', 'Co się dzieje', 'Termin'], [
        ['Ustawienia koła i preferencje (na urządzeniu Użytkownika)', 'Usuwane po wyczyszczeniu danych lub odinstalowaniu', 'Natychmiast'],
        ['Kopia wiadomości e-mail i wniosku', 'Przechowywana tylko tak długo, jak to konieczne do rozpatrzenia wniosku i udowodnienia jego rozpatrzenia', 'Do 12 miesięcy po jego rozstrzygnięciu'],
      ]],
      ['p', 'Więcej informacji o przetwarzaniu danych znajduje się w <a href="privacy.html">Polityce prywatności</a>.'],
    ],
  },

  ar: {
    title: 'حذف البيانات - GymRoulette',
    blocks: [
      ['h1', 'حذف البيانات - GymRoulette'],
      ['p', 'آخر تحديث: أكتوبر 2026'],
      ['p', `توضّح هذه الصفحة كيفية طلب حذف البيانات المرتبطة بتطبيق <strong>GymRoulette</strong> (Android، ${APP_ID}، ونسخته على الويب)، الذي طوّره Javier Melendez («jabibi»). لا يحتوي GymRoulette على حسابات مستخدمين: فلا يُخزَّن أي اسم أو بريد إلكتروني أو كلمة مرور.`],

      ['h2', '1. البيانات المخزَّنة على جهازك'],
      ['p', 'تُحفظ إعدادات التمارين والتكرارات لديك على جهازك فقط، ولا تُرسَل أبدًا إلى خوادمنا. لحذفها:'],
      ['ol', [
        '<strong>Android:</strong> الإعدادات &gt; التطبيقات &gt; GymRoulette &gt; التخزين &gt; <em>مسح البيانات</em>، أو ألغِ تثبيت التطبيق.',
        `<strong>الويب:</strong> امسح بيانات الموقع ${WEB} من إعدادات متصفحك.`,
      ]],
      ['p', 'بذلك يُحذف كل ما يحفظه التطبيق عنك. ولا يجمع التطبيق أي بيانات أخرى.'],

      ['h2', '2. التواصل'],
      ['p', `راسل ${mailWithSubject('حذف البيانات - GymRoulette')} مع كتابة «حذف البيانات - GymRoulette» في عنوان الرسالة. سنرد خلال مدة أقصاها شهر واحد.`],

      ['h2', '3. ما يُحذف وما يُحتفظ به'],
      ['table', ['البيانات', 'ما الذي يحدث', 'المدة'], [
        ['إعدادات العجلة والتفضيلات (على جهازك)', 'تُحذف عند مسح البيانات أو إلغاء التثبيت', 'فوري'],
        ['نسخة من رسالتك البريدية وطلبك', 'يُحتفظ بها فقط للمدة اللازمة لمعالجة الطلب وإثبات تنفيذه', 'حتى 12 شهرًا بعد البتّ فيه'],
      ]],
      ['p', 'لمزيد من المعلومات حول معالجة بياناتك، راجع <a href="privacy.html">سياسة الخصوصية</a>.'],
    ],
  },

  hi: {
    title: 'डेटा मिटाना - GymRoulette',
    blocks: [
      ['h1', 'डेटा मिटाना - GymRoulette'],
      ['p', 'अंतिम अपडेट: अक्टूबर 2026'],
      ['p', `यह पेज बताता है कि <strong>GymRoulette</strong> ऐप (Android, ${APP_ID}, और इसका वेब संस्करण) से जुड़ा डेटा मिटाने का अनुरोध कैसे करें। इसे Javier Melendez ("jabibi") ने बनाया है। GymRoulette में यूज़र अकाउंट नहीं हैं: कोई नाम, ईमेल या पासवर्ड सहेजा नहीं जाता।`],

      ['h2', '1. आपके डिवाइस पर सहेजा गया डेटा'],
      ['p', 'आपकी एक्सरसाइज़ और रेप्स की सेटिंग केवल आपके डिवाइस पर सहेजी जाती है और हमारे सर्वर को कभी नहीं भेजी जाती। उन्हें मिटाने के लिए:'],
      ['ol', [
        '<strong>Android:</strong> सेटिंग &gt; ऐप्स &gt; GymRoulette &gt; स्टोरेज &gt; <em>डेटा साफ़ करें</em>, या ऐप अनइंस्टॉल करें।',
        `<strong>वेब:</strong> अपने ब्राउज़र की सेटिंग में ${WEB} का साइट डेटा साफ़ करें।`,
      ]],
      ['p', 'इससे वह सब हट जाता है जो ऐप आपके बारे में सहेजता है। ऐप इसके अलावा कुछ और इकट्ठा नहीं करता।'],

      ['h2', '2. संपर्क'],
      ['p', `${mailWithSubject('डेटा मिटाना - GymRoulette')} पर विषय "डेटा मिटाना - GymRoulette" के साथ लिखें। हम एक महीने के भीतर उत्तर देंगे।`],

      ['h2', '3. क्या मिटाया जाता है और क्या रखा जाता है'],
      ['table', ['डेटा', 'क्या होता है', 'समय-सीमा'], [
        ['चक्र की सेटिंग और पसंद (आपके डिवाइस पर)', 'डेटा साफ़ करने या अनइंस्टॉल करने पर मिट जाती है', 'तुरंत'],
        ['आपके ईमेल और अनुरोध की प्रति', 'केवल उतने समय रखी जाती है जितना अनुरोध निपटाने और यह साबित करने के लिए ज़रूरी है कि वह निपटाया गया', 'निपटारे के बाद अधिकतम 12 महीने तक'],
      ]],
      ['p', 'आपका डेटा कैसे प्रोसेस होता है, इसकी अधिक जानकारी <a href="privacy.html">गोपनीयता नीति</a> में।'],
    ],
  },

  tr: {
    title: 'Veri Silme - GymRoulette',
    blocks: [
      ['h1', 'Veri Silme - GymRoulette'],
      ['p', 'Son güncelleme: Ekim 2026'],
      ['p', `Bu sayfa, Javier Melendez ("jabibi") tarafından geliştirilen <strong>GymRoulette</strong> uygulaması (Android, ${APP_ID} ve web sürümü) ile ilişkili verilerin silinmesinin nasıl talep edileceğini açıklar. GymRoulette'te kullanıcı hesabı yoktur: ad, e-posta veya parola saklanmaz.`],

      ['h2', '1. Cihazınızda saklanan veriler'],
      ['p', 'Egzersiz ve tekrar ayarlarınız yalnızca cihazınızda saklanır ve sunucularımıza hiç gönderilmez. Bunları silmek için:'],
      ['ol', [
        '<strong>Android:</strong> Ayarlar &gt; Uygulamalar &gt; GymRoulette &gt; Depolama &gt; <em>Verileri temizle</em> yolunu izleyin veya uygulamayı kaldırın.',
        `<strong>Web:</strong> tarayıcı ayarlarınızdan ${WEB} sitesinin verilerini temizleyin.`,
      ]],
      ['p', 'Bu işlem, uygulamanın sizinle ilgili sakladığı her şeyi kaldırır. Uygulama başka hiçbir şey toplamaz.'],

      ['h2', '2. İletişim'],
      ['p', `${mailWithSubject('Veri silme - GymRoulette')} adresine "Veri silme - GymRoulette" konusuyla yazın. Bir ay içinde yanıt vereceğiz.`],

      ['h2', '3. Nelerin silindiği ve nelerin saklandığı'],
      ['table', ['Veri', 'Ne olur', 'Süre'], [
        ['Çark ayarları ve tercihler (cihazınızda)', 'Verileri temizlediğinizde veya uygulamayı kaldırdığınızda silinir', 'Anında'],
        ['E-postanızın ve talebinizin kopyası', 'Yalnızca talebi işleme almak ve işleme alındığını kanıtlamak için gereken süre boyunca saklanır', 'Çözüldükten sonra en fazla 12 ay'],
      ]],
      ['p', 'Verilerinizin nasıl işlendiği hakkında daha fazla bilgi için <a href="privacy.html">Gizlilik politikası</a> sayfasına bakın.'],
    ],
  },

  nl: {
    title: 'Gegevens verwijderen - GymRoulette',
    blocks: [
      ['h1', 'Gegevens verwijderen - GymRoulette'],
      ['p', 'Laatst bijgewerkt: oktober 2026'],
      ['p', `Op deze pagina lees je hoe je kunt vragen om verwijdering van de gegevens die bij de app <strong>GymRoulette</strong> horen (Android, ${APP_ID}, en de webversie), ontwikkeld door Javier Melendez ("jabibi"). GymRoulette heeft geen gebruikersaccounts: er worden geen naam, e-mailadres of wachtwoord opgeslagen.`],

      ['h2', '1. Gegevens op je apparaat'],
      ['p', 'De instellingen van je oefeningen en herhalingen worden alleen op je apparaat opgeslagen en nooit naar onze servers gestuurd. Zo verwijder je ze:'],
      ['ol', [
        '<strong>Android:</strong> Instellingen &gt; Apps &gt; GymRoulette &gt; Opslag &gt; <em>Gegevens wissen</em>, of verwijder de app.',
        `<strong>Web:</strong> wis de sitegegevens van ${WEB} in de instellingen van je browser.`,
      ]],
      ['p', 'Daarmee verdwijnt alles wat de app over jou opslaat. De app verzamelt verder niets.'],

      ['h2', '2. Contact'],
      ['p', `Schrijf naar ${mailWithSubject('Gegevens verwijderen - GymRoulette')} met als onderwerp "Gegevens verwijderen - GymRoulette". We antwoorden binnen een maand.`],

      ['h2', '3. Wat wordt verwijderd en wat blijft bewaard'],
      ['table', ['Gegevens', 'Wat er gebeurt', 'Termijn'], [
        ['Instellingen van het rad en voorkeuren (op je apparaat)', 'Verwijderd zodra je de gegevens wist of de app verwijdert', 'Direct'],
        ['Kopie van je e-mail en verzoek', 'Alleen bewaard zolang nodig is om het verzoek af te handelen en aan te tonen dat dit is gebeurd', 'Tot 12 maanden nadat het is afgehandeld'],
      ]],
      ['p', 'Meer informatie over hoe je gegevens worden verwerkt vind je in het <a href="privacy.html">Privacybeleid</a>.'],
    ],
  },

  ja: {
    title: 'データ削除 - GymRoulette',
    blocks: [
      ['h1', 'データ削除 - GymRoulette'],
      ['p', '最終更新：2026年10月'],
      ['p', `このページでは、Javier Melendez（「jabibi」）が開発した<strong>GymRoulette</strong>アプリ（Android、${APP_ID}、およびそのウェブ版）に関連するデータの削除を依頼する方法を説明します。GymRouletteにはユーザーアカウントがなく、名前、メールアドレス、パスワードは保存されません。`],

      ['h2', '1. 端末に保存されているデータ'],
      ['p', 'エクササイズと回数の設定は端末内にのみ保存され、当方のサーバーに送信されることはありません。削除するには次の操作を行います。'],
      ['ol', [
        '<strong>Android：</strong>設定 &gt; アプリ &gt; GymRoulette &gt; ストレージ &gt; <em>データを消去</em>、またはアプリをアンインストールします。',
        `<strong>ウェブ：</strong>ブラウザの設定で ${WEB} のサイトデータを消去します。`,
      ]],
      ['p', 'これでアプリが保存するお客様に関する情報はすべて削除されます。アプリはそれ以外のものを一切収集していません。'],

      ['h2', '2. お問い合わせ'],
      ['p', `${mailWithSubject('Data deletion - GymRoulette')} 宛に、件名「Data deletion - GymRoulette」でメールを送ってください。 1か月以内に返信いたします。`],

      ['h2', '3. 削除されるものと保持されるもの'],
      ['table', ['データ', '対応', '期間'], [
        ['ルーレットの設定と環境設定（端末内）', 'データの消去またはアンインストールで削除', '即時'],
        ['お客様のメールとご依頼の控え', '依頼の対応と、対応したことの証明に必要な期間のみ保持', '解決後最長12か月'],
      ]],
      ['p', 'データの処理について詳しくは、<a href="privacy.html">プライバシーポリシー</a>をご覧ください。'],
    ],
  },

};
