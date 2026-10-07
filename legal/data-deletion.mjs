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
      ['p', 'This also removes your Google Analytics choice and resets the app\'s anonymous identifier, so later usage data is not linked to earlier data.'],

      ['h2', '2. Analytics data (Google Analytics)'],
      ['p', 'If you accepted Google Analytics, Google may keep usage data associated with an anonymous identifier of your installation. To request its deletion:'],
      ['ol', [
        `Write to ${mailWithSubject('Data deletion - GymRoulette')} with the subject "Data deletion - GymRoulette".`,
        'State your device model, Android version and the approximate dates you used the app.',
        'We will reply within one month.',
      ]],
      ['p', 'Because the identifier is anonymous and not linked to your identity, in some cases it may not be possible to locate your specific data. In that case, the data is deleted automatically when the retention period shown below ends.'],

      ['h2', '3. What is deleted and what is kept'],
      ['table', ['Data', 'What happens', 'Time frame'], [
        ['Wheel settings (on your device)', 'Deleted when you clear data or uninstall', 'Immediate'],
        ['Installation identifier, device data, approximate location and usage events (Google Analytics)', 'Deleted on your request when they can be located; otherwise deleted automatically', 'Reply within one month; 14-month maximum retention'],
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
      ['p', 'Esto también elimina tu elección sobre Google Analytics y restablece el identificador anónimo de la aplicación, por lo que los datos de uso posteriores no se vinculan a los anteriores.'],

      ['h2', '2. Datos de analítica (Google Analytics)'],
      ['p', 'Si aceptaste Google Analytics, Google puede conservar datos de uso asociados a un identificador anónimo de tu instalación. Para solicitar su eliminación:'],
      ['ol', [
        `Escribe a ${mailWithSubject('Eliminación de datos - GymRoulette')} con el asunto "Eliminación de datos - GymRoulette".`,
        'Indica el modelo de dispositivo, la versión de Android y las fechas aproximadas en las que usaste la aplicación.',
        'Responderemos en un plazo máximo de un mes.',
      ]],
      ['p', 'Como el identificador es anónimo y no está vinculado a tu identidad, en algunos casos puede no ser posible localizar tus datos concretos. En ese supuesto, los datos se eliminan automáticamente al terminar el periodo de retención indicado abajo.'],

      ['h2', '3. Qué se elimina y qué se conserva'],
      ['table', ['Datos', 'Qué ocurre', 'Plazo'], [
        ['Configuración de la ruleta (en tu dispositivo)', 'Se elimina al borrar los datos o desinstalar', 'Inmediato'],
        ['Identificador de instalación, datos del dispositivo, ubicación aproximada y eventos de uso (Google Analytics)', 'Se eliminan a petición tuya cuando se puedan localizar; si no, se eliminan automáticamente', 'Respuesta en un mes; retención máxima de 14 meses'],
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
      ['p', 'Honek Google Analytics-i buruzko zure aukera ere ezabatzen du eta aplikazioaren identifikatzaile anonimoa berrezartzen du; beraz, geroko erabilera-datuak ez dira aurrekoei lotzen.'],

      ['h2', '2. Analitika-datuak (Google Analytics)'],
      ['p', 'Google Analytics onartu baduzu, Google-k zure instalazioaren identifikatzaile anonimo bati lotutako erabilera-datuak gorde ditzake. Ezabatzea eskatzeko:'],
      ['ol', [
        `Idatzi ${mailWithSubject('Datuen ezabaketa - GymRoulette')} helbidera "Datuen ezabaketa - GymRoulette" gaiarekin.`,
        'Adierazi zure gailuaren eredua, Android bertsioa eta aplikazioa gutxi gorabehera noiz erabili zenuen.',
        'Hilabeteko gehieneko epean erantzungo dugu.',
      ]],
      ['p', 'Identifikatzailea anonimoa denez eta zure identitatera lotuta ez dagoenez, kasu batzuetan agian ezingo dira zure datu zehatzak aurkitu. Kasu horretan, datuak automatikoki ezabatzen dira behean adierazitako atxikitze-epea amaitzean.'],

      ['h2', '3. Zer ezabatzen den eta zer gordetzen den'],
      ['table', ['Datuak', 'Zer gertatzen da', 'Epea'], [
        ['Gurpilaren konfigurazioa (zure gailuan)', 'Datuak garbitzean edo desinstalatzean ezabatzen da', 'Berehala'],
        ['Instalazioaren identifikatzailea, gailuaren datuak, gutxi gorabeherako kokapena eta erabilera-gertaerak (Google Analytics)', 'Zuk eskatuta ezabatzen dira aurkitu ahal direnean; bestela, automatikoki ezabatzen dira', 'Erantzuna hilabete batean; gehienez 14 hilabeteko atxikitzea'],
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
      ['p', 'Isto tamén elimina a túa elección sobre Google Analytics e restablece o identificador anónimo da aplicación, polo que os datos de uso posteriores non se vinculan aos anteriores.'],

      ['h2', '2. Datos de analítica (Google Analytics)'],
      ['p', 'Se aceptaches Google Analytics, Google pode conservar datos de uso asociados a un identificador anónimo da túa instalación. Para solicitar a súa eliminación:'],
      ['ol', [
        `Escribe a ${mailWithSubject('Eliminación de datos - GymRoulette')} co asunto "Eliminación de datos - GymRoulette".`,
        'Indica o modelo de dispositivo, a versión de Android e as datas aproximadas nas que usaches a aplicación.',
        'Responderemos nun prazo máximo dun mes.',
      ]],
      ['p', 'Como o identificador é anónimo e non está vinculado á túa identidade, nalgúns casos pode non ser posible localizar os teus datos concretos. Nese caso, os datos elimínanse automaticamente ao terminar o período de retención indicado abaixo.'],

      ['h2', '3. Que se elimina e que se conserva'],
      ['table', ['Datos', 'Que ocorre', 'Prazo'], [
        ['Configuración da ruleta (no teu dispositivo)', 'Elimínase ao borrar os datos ou desinstalar', 'Inmediato'],
        ['Identificador de instalación, datos do dispositivo, localización aproximada e eventos de uso (Google Analytics)', 'Elimínanse a petición túa cando se poidan localizar; se non, elimínanse automaticamente', 'Resposta nun mes; retención máxima de 14 meses'],
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
      ['p', 'Això també elimina la teva elecció sobre Google Analytics i restableix l\'identificador anònim de l\'aplicació, de manera que les dades d\'ús posteriors no es vinculen a les anteriors.'],

      ['h2', '2. Dades d\'analítica (Google Analytics)'],
      ['p', 'Si vas acceptar Google Analytics, Google pot conservar dades d\'ús associades a un identificador anònim de la teva instal·lació. Per sol·licitar-ne l\'eliminació:'],
      ['ol', [
        `Escriu a ${mailWithSubject('Eliminació de dades - GymRoulette')} amb l'assumpte "Eliminació de dades - GymRoulette".`,
        'Indica el model de dispositiu, la versió d\'Android i les dates aproximades en què vas utilitzar l\'aplicació.',
        'Respondrem en un termini màxim d\'un mes.',
      ]],
      ['p', 'Com que l\'identificador és anònim i no està vinculat a la teva identitat, en alguns casos pot no ser possible localitzar les teves dades concretes. En aquest cas, les dades s\'eliminen automàticament en acabar el període de retenció indicat a sota.'],

      ['h2', '3. Què s\'elimina i què es conserva'],
      ['table', ['Dades', 'Què passa', 'Termini'], [
        ['Configuració de la ruleta (al teu dispositiu)', 'S\'elimina en esborrar les dades o desinstal·lar', 'Immediat'],
        ['Identificador d\'instal·lació, dades del dispositiu, ubicació aproximada i esdeveniments d\'ús (Google Analytics)', 'S\'eliminen a petició teva quan es puguin localitzar; si no, s\'eliminen automàticament', 'Resposta en un mes; retenció màxima de 14 mesos'],
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
      ['p', 'Cela supprime aussi ton choix concernant Google Analytics et réinitialise l\'identifiant anonyme de l\'application ; les données d\'utilisation ultérieures ne sont donc pas liées aux précédentes.'],

      ['h2', '2. Données d\'analyse (Google Analytics)'],
      ['p', 'Si tu as accepté Google Analytics, Google peut conserver des données d\'utilisation associées à un identifiant anonyme de ton installation. Pour en demander la suppression :'],
      ['ol', [
        `Écris à ${mailWithSubject('Suppression des données - GymRoulette')} avec l'objet « Suppression des données - GymRoulette ».`,
        'Indique le modèle de ton appareil, la version d\'Android et les dates approximatives auxquelles tu as utilisé l\'application.',
        'Nous répondrons dans un délai maximum d\'un mois.',
      ]],
      ['p', 'L\'identifiant étant anonyme et non lié à ton identité, il peut arriver qu\'il soit impossible de localiser tes données précises. Dans ce cas, les données sont supprimées automatiquement à la fin de la durée de conservation indiquée ci-dessous.'],

      ['h2', '3. Ce qui est supprimé et ce qui est conservé'],
      ['table', ['Données', 'Ce qui se passe', 'Délai'], [
        ['Configuration de la roue (sur ton appareil)', 'Supprimée lorsque tu effaces les données ou désinstalles l\'application', 'Immédiat'],
        ['Identifiant d\'installation, données de l\'appareil, localisation approximative et événements d\'utilisation (Google Analytics)', 'Supprimés à ta demande lorsqu\'ils peuvent être localisés ; sinon, supprimés automatiquement', 'Réponse sous un mois ; conservation maximale de 14 mois'],
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
      ['p', 'Isso também remove sua escolha sobre o Google Analytics e redefine o identificador anônimo do aplicativo, de modo que os dados de uso posteriores não ficam vinculados aos anteriores.'],

      ['h2', '2. Dados de análise (Google Analytics)'],
      ['p', 'Se você aceitou o Google Analytics, o Google pode manter dados de uso associados a um identificador anônimo da sua instalação. Para solicitar a exclusão:'],
      ['ol', [
        `Escreva para ${mailWithSubject('Exclusão de dados - GymRoulette')} com o assunto "Exclusão de dados - GymRoulette".`,
        'Informe o modelo do dispositivo, a versão do Android e as datas aproximadas em que você usou o aplicativo.',
        'Responderemos em até um mês.',
      ]],
      ['p', 'Como o identificador é anônimo e não está vinculado à sua identidade, em alguns casos pode não ser possível localizar seus dados específicos. Nesse caso, os dados são excluídos automaticamente ao fim do período de retenção indicado abaixo.'],

      ['h2', '3. O que é excluído e o que é mantido'],
      ['table', ['Dados', 'O que acontece', 'Prazo'], [
        ['Configuração da roleta (no seu dispositivo)', 'Excluída ao limpar os dados ou desinstalar', 'Imediato'],
        ['Identificador de instalação, dados do dispositivo, localização aproximada e eventos de uso (Google Analytics)', 'Excluídos a seu pedido quando puderem ser localizados; caso contrário, excluídos automaticamente', 'Resposta em um mês; retenção máxima de 14 meses'],
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
      ['p', 'Isto também remove a tua escolha sobre o Google Analytics e repõe o identificador anónimo da aplicação, pelo que os dados de utilização posteriores não ficam associados aos anteriores.'],

      ['h2', '2. Dados de análise (Google Analytics)'],
      ['p', 'Se aceitaste o Google Analytics, a Google pode manter dados de utilização associados a um identificador anónimo da tua instalação. Para solicitar a sua eliminação:'],
      ['ol', [
        `Escreve para ${mailWithSubject('Eliminação de dados - GymRoulette')} com o assunto "Eliminação de dados - GymRoulette".`,
        'Indica o modelo do dispositivo, a versão do Android e as datas aproximadas em que utilizaste a aplicação.',
        'Responderemos no prazo máximo de um mês.',
      ]],
      ['p', 'Como o identificador é anónimo e não está associado à tua identidade, em alguns casos pode não ser possível localizar os teus dados concretos. Nesse caso, os dados são eliminados automaticamente no fim do período de retenção indicado abaixo.'],

      ['h2', '3. O que é eliminado e o que é conservado'],
      ['table', ['Dados', 'O que acontece', 'Prazo'], [
        ['Configuração da roleta (no teu dispositivo)', 'Eliminada ao limpar os dados ou desinstalar', 'Imediato'],
        ['Identificador de instalação, dados do dispositivo, localização aproximada e eventos de utilização (Google Analytics)', 'Eliminados a teu pedido quando for possível localizá-los; caso contrário, eliminados automaticamente', 'Resposta num mês; retenção máxima de 14 meses'],
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
      ['p', 'Dadurch wird auch deine Auswahl zu Google Analytics entfernt und die anonyme Kennung der App zurückgesetzt, sodass spätere Nutzungsdaten nicht mit früheren verknüpft werden.'],

      ['h2', '2. Analysedaten (Google Analytics)'],
      ['p', 'Wenn du Google Analytics akzeptiert hast, kann Google Nutzungsdaten speichern, die mit einer anonymen Kennung deiner Installation verknüpft sind. So beantragst du ihre Löschung:'],
      ['ol', [
        `Schreibe an ${mailWithSubject('Löschung von Daten - GymRoulette')} mit dem Betreff „Löschung von Daten - GymRoulette“.`,
        'Gib dein Gerätemodell, die Android-Version und den ungefähren Zeitraum an, in dem du die App genutzt hast.',
        'Wir antworten innerhalb von höchstens einem Monat.',
      ]],
      ['p', 'Da die Kennung anonym und nicht mit deiner Identität verknüpft ist, lassen sich deine konkreten Daten in manchen Fällen möglicherweise nicht auffinden. In diesem Fall werden die Daten automatisch gelöscht, wenn die unten angegebene Speicherdauer endet.'],

      ['h2', '3. Was gelöscht und was aufbewahrt wird'],
      ['table', ['Daten', 'Was passiert', 'Frist'], [
        ['Einstellungen des Rads (auf deinem Gerät)', 'Werden beim Löschen der Daten oder Deinstallieren gelöscht', 'Sofort'],
        ['Installationskennung, Gerätedaten, ungefährer Standort und Nutzungsereignisse (Google Analytics)', 'Werden auf deinen Antrag gelöscht, wenn sie sich auffinden lassen; andernfalls automatisch gelöscht', 'Antwort innerhalb eines Monats; maximale Speicherdauer von 14 Monaten'],
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
      ['p', 'Questo elimina anche la tua scelta su Google Analytics e reimposta l\'identificatore anonimo dell\'app, quindi i dati di utilizzo successivi non vengono collegati a quelli precedenti.'],

      ['h2', '2. Dati di analisi (Google Analytics)'],
      ['p', 'Se hai accettato Google Analytics, Google può conservare dati di utilizzo associati a un identificatore anonimo della tua installazione. Per richiederne l\'eliminazione:'],
      ['ol', [
        `Scrivi a ${mailWithSubject('Eliminazione dei dati - GymRoulette')} con l'oggetto «Eliminazione dei dati - GymRoulette».`,
        'Indica il modello del dispositivo, la versione di Android e le date approssimative in cui hai usato l\'app.',
        'Risponderemo entro un mese al massimo.',
      ]],
      ['p', 'Poiché l\'identificatore è anonimo e non è collegato alla tua identità, in alcuni casi potrebbe non essere possibile individuare i tuoi dati specifici. In tal caso, i dati vengono eliminati automaticamente al termine del periodo di conservazione indicato di seguito.'],

      ['h2', '3. Cosa viene eliminato e cosa viene conservato'],
      ['table', ['Dati', 'Cosa succede', 'Tempi'], [
        ['Impostazioni della ruota (sul tuo dispositivo)', 'Eliminate quando cancelli i dati o disinstalli l\'app', 'Immediato'],
        ['Identificatore di installazione, dati del dispositivo, posizione approssimativa ed eventi di utilizzo (Google Analytics)', 'Eliminati su tua richiesta quando è possibile individuarli; altrimenti eliminati automaticamente', 'Risposta entro un mese; conservazione massima di 14 mesi'],
        ['Copia della tua e-mail e della richiesta', 'Conservate solo per il tempo necessario a gestire la richiesta e dimostrare che è stata gestita', 'Fino a 12 mesi dopo la sua risoluzione'],
      ]],
      ['p', 'Maggiori informazioni sul trattamento dei tuoi dati nell\'<a href="privacy.html">Informativa sulla privacy</a>.'],
    ],
  },
};
