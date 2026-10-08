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
      ['p', 'That removes everything the app stores about you. Since version 1.13 the app collects nothing else.'],

      ['h2', '2. Analytics data from earlier versions (Google Analytics)'],
      ['p', 'Versions of the app before 1.13 offered optional Google Analytics. If you accepted it back then, Google may still keep usage data associated with an anonymous identifier of your installation (no new data is collected since version 1.13). To request its deletion:'],
      ['ol', [
        `Write to ${mailWithSubject('Data deletion - GymRoulette')} with the subject "Data deletion - GymRoulette".`,
        'State your device model, Android version and the approximate dates you used the app.',
        'We will reply within one month.',
      ]],
      ['p', 'Because the identifier is anonymous and not linked to your identity, in some cases it may not be possible to locate your specific data. In that case, the data is deleted automatically when the retention period shown below ends.'],

      ['h2', '3. What is deleted and what is kept'],
      ['table', ['Data', 'What happens', 'Time frame'], [
        ['Wheel settings (on your device)', 'Deleted when you clear data or uninstall', 'Immediate'],
        ['Installation identifier, device data, approximate location and usage events (Google Analytics, earlier versions only)', 'Deleted on your request when they can be located; otherwise deleted automatically', 'Reply within one month; 14-month maximum retention'],
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
      ['p', 'Con eso se elimina todo lo que la aplicación guarda sobre ti. Desde la versión 1.13 la aplicación no recopila nada más.'],

      ['h2', '2. Datos de analítica de versiones anteriores (Google Analytics)'],
      ['p', 'Las versiones de la aplicación anteriores a la 1.13 ofrecían Google Analytics de forma opcional. Si lo aceptaste entonces, Google puede seguir conservando datos de uso asociados a un identificador anónimo de tu instalación (desde la versión 1.13 no se recopilan datos nuevos). Para solicitar su eliminación:'],
      ['ol', [
        `Escribe a ${mailWithSubject('Eliminación de datos - GymRoulette')} con el asunto "Eliminación de datos - GymRoulette".`,
        'Indica el modelo de dispositivo, la versión de Android y las fechas aproximadas en las que usaste la aplicación.',
        'Responderemos en un plazo máximo de un mes.',
      ]],
      ['p', 'Como el identificador es anónimo y no está vinculado a tu identidad, en algunos casos puede no ser posible localizar tus datos concretos. En ese supuesto, los datos se eliminan automáticamente al terminar el periodo de retención indicado abajo.'],

      ['h2', '3. Qué se elimina y qué se conserva'],
      ['table', ['Datos', 'Qué ocurre', 'Plazo'], [
        ['Configuración de la ruleta (en tu dispositivo)', 'Se elimina al borrar los datos o desinstalar', 'Inmediato'],
        ['Identificador de instalación, datos del dispositivo, ubicación aproximada y eventos de uso (Google Analytics, solo versiones anteriores)', 'Se eliminan a petición tuya cuando se puedan localizar; si no, se eliminan automáticamente', 'Respuesta en un mes; retención máxima de 14 meses'],
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
      ['p', 'Horrek aplikazioak zutaz gordetzen duen guztia ezabatzen du. 1.13 bertsiotik aurrera aplikazioak ez du beste ezer biltzen.'],

      ['h2', '2. Aurreko bertsioetako analitika-datuak (Google Analytics)'],
      ['p', 'Aplikazioaren 1.13 baino lehenagoko bertsioek Google Analytics eskaintzen zuten, aukeran. Orduan onartu bazenuen, Google-k zure instalazioaren identifikatzaile anonimo bati lotutako erabilera-datuak gorde ditzake oraindik (1.13 bertsiotik aurrera ez da datu berririk biltzen). Ezabatzea eskatzeko:'],
      ['ol', [
        `Idatzi ${mailWithSubject('Datuen ezabaketa - GymRoulette')} helbidera "Datuen ezabaketa - GymRoulette" gaiarekin.`,
        'Adierazi zure gailuaren eredua, Android bertsioa eta aplikazioa gutxi gorabehera noiz erabili zenuen.',
        'Hilabeteko gehieneko epean erantzungo dugu.',
      ]],
      ['p', 'Identifikatzailea anonimoa denez eta zure identitatera lotuta ez dagoenez, kasu batzuetan agian ezingo dira zure datu zehatzak aurkitu. Kasu horretan, datuak automatikoki ezabatzen dira behean adierazitako atxikitze-epea amaitzean.'],

      ['h2', '3. Zer ezabatzen den eta zer gordetzen den'],
      ['table', ['Datuak', 'Zer gertatzen da', 'Epea'], [
        ['Gurpilaren konfigurazioa (zure gailuan)', 'Datuak garbitzean edo desinstalatzean ezabatzen da', 'Berehala'],
        ['Instalazioaren identifikatzailea, gailuaren datuak, gutxi gorabeherako kokapena eta erabilera-gertaerak (Google Analytics, aurreko bertsioetan soilik)', 'Zuk eskatuta ezabatzen dira aurkitu ahal direnean; bestela, automatikoki ezabatzen dira', 'Erantzuna hilabete batean; gehienez 14 hilabeteko atxikitzea'],
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
      ['p', 'Iso elimina todo o que a aplicación garda sobre ti. Desde a versión 1.13 a aplicación non recolle nada máis.'],

      ['h2', '2. Datos de analítica de versións anteriores (Google Analytics)'],
      ['p', 'As versións da aplicación anteriores á 1.13 ofrecían Google Analytics de forma opcional. Se o aceptaches entón, Google aínda pode conservar datos de uso asociados a un identificador anónimo da túa instalación (desde a versión 1.13 non se recolle ningún dato novo). Para solicitar a súa eliminación:'],
      ['ol', [
        `Escribe a ${mailWithSubject('Eliminación de datos - GymRoulette')} co asunto "Eliminación de datos - GymRoulette".`,
        'Indica o modelo de dispositivo, a versión de Android e as datas aproximadas nas que usaches a aplicación.',
        'Responderemos nun prazo máximo dun mes.',
      ]],
      ['p', 'Como o identificador é anónimo e non está vinculado á túa identidade, nalgúns casos pode non ser posible localizar os teus datos concretos. Nese caso, os datos elimínanse automaticamente ao terminar o período de retención indicado abaixo.'],

      ['h2', '3. Que se elimina e que se conserva'],
      ['table', ['Datos', 'Que ocorre', 'Prazo'], [
        ['Configuración da ruleta (no teu dispositivo)', 'Elimínase ao borrar os datos ou desinstalar', 'Inmediato'],
        ['Identificador de instalación, datos do dispositivo, localización aproximada e eventos de uso (Google Analytics, só versións anteriores)', 'Elimínanse a petición túa cando se poidan localizar; se non, elimínanse automaticamente', 'Resposta nun mes; retención máxima de 14 meses'],
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
      ['p', 'Això elimina tot el que l\'aplicació desa sobre tu. Des de la versió 1.13 l\'aplicació no recopila res més.'],

      ['h2', '2. Dades d\'analítica de versions anteriors (Google Analytics)'],
      ['p', 'Les versions de l\'aplicació anteriors a la 1.13 oferien Google Analytics de manera opcional. Si el vas acceptar llavors, Google encara pot conservar dades d\'ús associades a un identificador anònim de la teva instal·lació (des de la versió 1.13 no es recopila cap dada nova). Per sol·licitar-ne l\'eliminació:'],
      ['ol', [
        `Escriu a ${mailWithSubject('Eliminació de dades - GymRoulette')} amb l'assumpte "Eliminació de dades - GymRoulette".`,
        'Indica el model de dispositiu, la versió d\'Android i les dates aproximades en què vas utilitzar l\'aplicació.',
        'Respondrem en un termini màxim d\'un mes.',
      ]],
      ['p', 'Com que l\'identificador és anònim i no està vinculat a la teva identitat, en alguns casos pot no ser possible localitzar les teves dades concretes. En aquest cas, les dades s\'eliminen automàticament en acabar el període de retenció indicat a sota.'],

      ['h2', '3. Què s\'elimina i què es conserva'],
      ['table', ['Dades', 'Què passa', 'Termini'], [
        ['Configuració de la ruleta (al teu dispositiu)', 'S\'elimina en esborrar les dades o desinstal·lar', 'Immediat'],
        ['Identificador d\'instal·lació, dades del dispositiu, ubicació aproximada i esdeveniments d\'ús (Google Analytics, només versions anteriors)', 'S\'eliminen a petició teva quan es puguin localitzar; si no, s\'eliminen automàticament', 'Resposta en un mes; retenció màxima de 14 mesos'],
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
      ['p', 'Cela supprime tout ce que l\'application enregistre à ton sujet. Depuis la version 1.13, l\'application ne collecte rien d\'autre.'],

      ['h2', '2. Données d\'analyse des versions précédentes (Google Analytics)'],
      ['p', 'Les versions de l\'application antérieures à la 1.13 proposaient Google Analytics en option. Si tu l\'avais accepté à l\'époque, Google peut encore conserver des données d\'utilisation associées à un identifiant anonyme de ton installation (aucune nouvelle donnée n\'est collectée depuis la version 1.13). Pour en demander la suppression :'],
      ['ol', [
        `Écris à ${mailWithSubject('Suppression des données - GymRoulette')} avec l'objet « Suppression des données - GymRoulette ».`,
        'Indique le modèle de ton appareil, la version d\'Android et les dates approximatives auxquelles tu as utilisé l\'application.',
        'Nous répondrons dans un délai maximum d\'un mois.',
      ]],
      ['p', 'L\'identifiant étant anonyme et non lié à ton identité, il peut arriver qu\'il soit impossible de localiser tes données précises. Dans ce cas, les données sont supprimées automatiquement à la fin de la durée de conservation indiquée ci-dessous.'],

      ['h2', '3. Ce qui est supprimé et ce qui est conservé'],
      ['table', ['Données', 'Ce qui se passe', 'Délai'], [
        ['Configuration de la roue (sur ton appareil)', 'Supprimée lorsque tu effaces les données ou désinstalles l\'application', 'Immédiat'],
        ['Identifiant d\'installation, données de l\'appareil, localisation approximative et événements d\'utilisation (Google Analytics, versions précédentes uniquement)', 'Supprimés à ta demande lorsqu\'ils peuvent être localisés ; sinon, supprimés automatiquement', 'Réponse sous un mois ; conservation maximale de 14 mois'],
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
      ['p', 'Isso remove tudo o que o aplicativo guarda sobre você. Desde a versão 1.13 o aplicativo não coleta mais nada.'],

      ['h2', '2. Dados de análise de versões anteriores (Google Analytics)'],
      ['p', 'As versões do aplicativo anteriores à 1.13 ofereciam o Google Analytics opcional. Se você o aceitou na época, o Google ainda pode manter dados de uso associados a um identificador anônimo da sua instalação (nenhum dado novo é coletado desde a versão 1.13). Para solicitar a exclusão:'],
      ['ol', [
        `Escreva para ${mailWithSubject('Exclusão de dados - GymRoulette')} com o assunto "Exclusão de dados - GymRoulette".`,
        'Informe o modelo do dispositivo, a versão do Android e as datas aproximadas em que você usou o aplicativo.',
        'Responderemos em até um mês.',
      ]],
      ['p', 'Como o identificador é anônimo e não está vinculado à sua identidade, em alguns casos pode não ser possível localizar seus dados específicos. Nesse caso, os dados são excluídos automaticamente ao fim do período de retenção indicado abaixo.'],

      ['h2', '3. O que é excluído e o que é mantido'],
      ['table', ['Dados', 'O que acontece', 'Prazo'], [
        ['Configuração da roleta (no seu dispositivo)', 'Excluída ao limpar os dados ou desinstalar', 'Imediato'],
        ['Identificador de instalação, dados do dispositivo, localização aproximada e eventos de uso (Google Analytics, somente versões anteriores)', 'Excluídos a seu pedido quando puderem ser localizados; caso contrário, excluídos automaticamente', 'Resposta em um mês; retenção máxima de 14 meses'],
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
      ['p', 'Isto remove tudo o que a aplicação guarda sobre ti. Desde a versão 1.13 a aplicação não recolhe mais nada.'],

      ['h2', '2. Dados de análise de versões anteriores (Google Analytics)'],
      ['p', 'As versões da aplicação anteriores à 1.13 ofereciam o Google Analytics opcional. Se o aceitaste na altura, a Google ainda pode manter dados de utilização associados a um identificador anónimo da tua instalação (não é recolhido nenhum dado novo desde a versão 1.13). Para solicitar a sua eliminação:'],
      ['ol', [
        `Escreve para ${mailWithSubject('Eliminação de dados - GymRoulette')} com o assunto "Eliminação de dados - GymRoulette".`,
        'Indica o modelo do dispositivo, a versão do Android e as datas aproximadas em que utilizaste a aplicação.',
        'Responderemos no prazo máximo de um mês.',
      ]],
      ['p', 'Como o identificador é anónimo e não está associado à tua identidade, em alguns casos pode não ser possível localizar os teus dados concretos. Nesse caso, os dados são eliminados automaticamente no fim do período de retenção indicado abaixo.'],

      ['h2', '3. O que é eliminado e o que é conservado'],
      ['table', ['Dados', 'O que acontece', 'Prazo'], [
        ['Configuração da roleta (no teu dispositivo)', 'Eliminada ao limpar os dados ou desinstalar', 'Imediato'],
        ['Identificador de instalação, dados do dispositivo, localização aproximada e eventos de utilização (Google Analytics, apenas versões anteriores)', 'Eliminados a teu pedido quando for possível localizá-los; caso contrário, eliminados automaticamente', 'Resposta num mês; retenção máxima de 14 meses'],
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
      ['p', 'Damit wird alles entfernt, was die App über dich speichert. Seit Version 1.13 erfasst die App nichts weiter.'],

      ['h2', '2. Analysedaten früherer Versionen (Google Analytics)'],
      ['p', 'Versionen der App vor 1.13 boten optional Google Analytics an. Wenn du es damals akzeptiert hast, kann Google weiterhin Nutzungsdaten speichern, die mit einer anonymen Kennung deiner Installation verknüpft sind (seit Version 1.13 werden keine neuen Daten erfasst). So beantragst du ihre Löschung:'],
      ['ol', [
        `Schreibe an ${mailWithSubject('Löschung von Daten - GymRoulette')} mit dem Betreff „Löschung von Daten - GymRoulette“.`,
        'Gib dein Gerätemodell, die Android-Version und den ungefähren Zeitraum an, in dem du die App genutzt hast.',
        'Wir antworten innerhalb von höchstens einem Monat.',
      ]],
      ['p', 'Da die Kennung anonym und nicht mit deiner Identität verknüpft ist, lassen sich deine konkreten Daten in manchen Fällen möglicherweise nicht auffinden. In diesem Fall werden die Daten automatisch gelöscht, wenn die unten angegebene Speicherdauer endet.'],

      ['h2', '3. Was gelöscht und was aufbewahrt wird'],
      ['table', ['Daten', 'Was passiert', 'Frist'], [
        ['Einstellungen des Rads (auf deinem Gerät)', 'Werden beim Löschen der Daten oder Deinstallieren gelöscht', 'Sofort'],
        ['Installationskennung, Gerätedaten, ungefährer Standort und Nutzungsereignisse (Google Analytics, nur frühere Versionen)', 'Werden auf deinen Antrag gelöscht, wenn sie sich auffinden lassen; andernfalls automatisch gelöscht', 'Antwort innerhalb eines Monats; maximale Speicherdauer von 14 Monaten'],
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
      ['p', 'Questo elimina tutto ciò che l\'app memorizza su di te. Dalla versione 1.13 l\'app non raccoglie nient\'altro.'],

      ['h2', '2. Dati di analisi delle versioni precedenti (Google Analytics)'],
      ['p', 'Le versioni dell\'app precedenti alla 1.13 offrivano Google Analytics facoltativo. Se lo hai accettato all\'epoca, Google può ancora conservare dati di utilizzo associati a un identificatore anonimo della tua installazione (dalla versione 1.13 non viene raccolto alcun nuovo dato). Per richiederne l\'eliminazione:'],
      ['ol', [
        `Scrivi a ${mailWithSubject('Eliminazione dei dati - GymRoulette')} con l'oggetto «Eliminazione dei dati - GymRoulette».`,
        'Indica il modello del dispositivo, la versione di Android e le date approssimative in cui hai usato l\'app.',
        'Risponderemo entro un mese al massimo.',
      ]],
      ['p', 'Poiché l\'identificatore è anonimo e non è collegato alla tua identità, in alcuni casi potrebbe non essere possibile individuare i tuoi dati specifici. In tal caso, i dati vengono eliminati automaticamente al termine del periodo di conservazione indicato di seguito.'],

      ['h2', '3. Cosa viene eliminato e cosa viene conservato'],
      ['table', ['Dati', 'Cosa succede', 'Tempi'], [
        ['Impostazioni della ruota (sul tuo dispositivo)', 'Eliminate quando cancelli i dati o disinstalli l\'app', 'Immediato'],
        ['Identificatore di installazione, dati del dispositivo, posizione approssimativa ed eventi di utilizzo (Google Analytics, solo versioni precedenti)', 'Eliminati su tua richiesta quando è possibile individuarli; altrimenti eliminati automaticamente', 'Risposta entro un mese; conservazione massima di 14 mesi'],
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
      ['p', 'Spowoduje to usunięcie wszystkiego, co aplikacja przechowuje o Użytkowniku. Od wersji 1.13 aplikacja nie zbiera niczego więcej.'],

      ['h2', '2. Dane analityczne z wcześniejszych wersji (Google Analytics)'],
      ['p', 'Wersje aplikacji sprzed 1.13 oferowały opcjonalne Google Analytics. Jeśli Użytkownik wyraził wówczas na nie zgodę, Google może nadal przechowywać dane o użytkowaniu powiązane z anonimowym identyfikatorem jego instalacji (od wersji 1.13 nie są zbierane żadne nowe dane). Aby zażądać ich usunięcia:'],
      ['ol', [
        `Prosimy napisać na adres ${mailWithSubject('Usuwanie danych - GymRoulette')} z tematem „Usuwanie danych - GymRoulette”.`,
        'Prosimy podać model urządzenia, wersję Androida i przybliżone daty korzystania z aplikacji.',
        'Odpowiemy w ciągu miesiąca.',
      ]],
      ['p', 'Ponieważ identyfikator jest anonimowy i nie jest powiązany z tożsamością Użytkownika, w niektórych przypadkach odnalezienie jego konkretnych danych może nie być możliwe. W takim razie dane zostaną usunięte automatycznie po upływie okresu przechowywania podanego poniżej.'],

      ['h2', '3. Co jest usuwane, a co przechowywane'],
      ['table', ['Dane', 'Co się dzieje', 'Termin'], [
        ['Ustawienia koła (na urządzeniu Użytkownika)', 'Usuwane po wyczyszczeniu danych lub odinstalowaniu', 'Natychmiast'],
        ['Identyfikator instalacji, dane urządzenia, przybliżona lokalizacja i zdarzenia użytkowania (Google Analytics, tylko wcześniejsze wersje)', 'Usuwane na wniosek, jeśli można je odnaleźć; w przeciwnym razie usuwane automatycznie', 'Odpowiedź w ciągu miesiąca; maksymalny okres przechowywania 14 miesięcy'],
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
      ['p', 'بذلك يُحذف كل ما يحفظه التطبيق عنك. ومنذ الإصدار 1.13 لا يجمع التطبيق أي بيانات أخرى.'],

      ['h2', '2. بيانات التحليلات من الإصدارات السابقة (Google Analytics)'],
      ['p', 'كانت الإصدارات السابقة للإصدار 1.13 من التطبيق توفّر Google Analytics بشكل اختياري. إذا وافقت عليه حينها، فقد تظل Google تحتفظ ببيانات استخدام مرتبطة بمعرّف مجهول لتثبيتك (ومنذ الإصدار 1.13 لا تُجمع أي بيانات جديدة). لطلب حذفها:'],
      ['ol', [
        `راسل ${mailWithSubject('حذف البيانات - GymRoulette')} مع كتابة «حذف البيانات - GymRoulette» في عنوان الرسالة.`,
        'اذكر طراز جهازك وإصدار Android والتواريخ التقريبية التي استخدمت فيها التطبيق.',
        'سنرد خلال مدة أقصاها شهر واحد.',
      ]],
      ['p', 'بما أن المعرّف مجهول وغير مرتبط بهويتك، فقد لا يكون من الممكن في بعض الحالات تحديد بياناتك بعينها. وفي هذه الحالة تُحذف البيانات تلقائيًا عند انتهاء مدة الاحتفاظ المذكورة أدناه.'],

      ['h2', '3. ما يُحذف وما يُحتفظ به'],
      ['table', ['البيانات', 'ما الذي يحدث', 'المدة'], [
        ['إعدادات العجلة (على جهازك)', 'تُحذف عند مسح البيانات أو إلغاء التثبيت', 'فوري'],
        ['معرّف التثبيت وبيانات الجهاز والموقع التقريبي وأحداث الاستخدام (Google Analytics، الإصدارات السابقة فقط)', 'تُحذف بناءً على طلبك متى أمكن تحديدها، وإلا فتُحذف تلقائيًا', 'الرد خلال شهر؛ ومدة الاحتفاظ القصوى 14 شهرًا'],
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
      ['p', 'इससे वह सब हट जाता है जो ऐप आपके बारे में सहेजता है। संस्करण 1.13 से ऐप इसके अलावा कुछ और इकट्ठा नहीं करता।'],

      ['h2', '2. पुराने संस्करणों का एनालिटिक्स डेटा (Google Analytics)'],
      ['p', 'ऐप के 1.13 से पहले के संस्करणों में वैकल्पिक Google Analytics उपलब्ध था। यदि आपने तब उसे स्वीकार किया था, तो Google के पास अब भी आपके इंस्टॉलेशन के एक गुमनाम पहचानकर्ता से जुड़ा उपयोग डेटा हो सकता है (संस्करण 1.13 से कोई नया डेटा इकट्ठा नहीं होता)। उसे मिटाने का अनुरोध करने के लिए:'],
      ['ol', [
        `${mailWithSubject('डेटा मिटाना - GymRoulette')} पर विषय "डेटा मिटाना - GymRoulette" के साथ लिखें।`,
        'अपने डिवाइस का मॉडल, Android संस्करण और ऐप इस्तेमाल करने की अनुमानित तारीख़ें बताएँ।',
        'हम एक महीने के भीतर उत्तर देंगे।',
      ]],
      ['p', 'चूँकि पहचानकर्ता गुमनाम है और आपकी पहचान से जुड़ा नहीं है, कुछ मामलों में आपका विशिष्ट डेटा ढूँढना संभव नहीं हो सकता। ऐसे में, नीचे दी गई अवधि पूरी होने पर डेटा अपने-आप मिट जाता है।'],

      ['h2', '3. क्या मिटाया जाता है और क्या रखा जाता है'],
      ['table', ['डेटा', 'क्या होता है', 'समय-सीमा'], [
        ['चक्र की सेटिंग (आपके डिवाइस पर)', 'डेटा साफ़ करने या अनइंस्टॉल करने पर मिट जाती है', 'तुरंत'],
        ['इंस्टॉलेशन पहचानकर्ता, डिवाइस डेटा, अनुमानित लोकेशन और उपयोग की घटनाएँ (Google Analytics, केवल पुराने संस्करण)', 'अनुरोध पर मिटाया जाता है यदि मिल जाए; अन्यथा अपने-आप मिट जाता है', 'एक महीने के भीतर उत्तर; अधिकतम 14 महीने तक रखा जाता है'],
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
      ['p', 'Bu işlem, uygulamanın sizinle ilgili sakladığı her şeyi kaldırır. 1.13 sürümünden itibaren uygulama başka hiçbir şey toplamaz.'],

      ['h2', '2. Önceki sürümlerden analiz verileri (Google Analytics)'],
      ['p', 'Uygulamanın 1.13\'ten önceki sürümleri isteğe bağlı Google Analytics sunuyordu. O zaman kabul ettiyseniz Google, kurulumunuzun anonim bir tanımlayıcısıyla ilişkili kullanım verilerini hâlâ saklıyor olabilir (1.13 sürümünden bu yana yeni veri toplanmamaktadır). Silinmesini talep etmek için:'],
      ['ol', [
        `${mailWithSubject('Veri silme - GymRoulette')} adresine "Veri silme - GymRoulette" konusuyla yazın.`,
        'Cihaz modelinizi, Android sürümünüzü ve uygulamayı yaklaşık hangi tarihlerde kullandığınızı belirtin.',
        'Bir ay içinde yanıt vereceğiz.',
      ]],
      ['p', 'Tanımlayıcı anonim olduğundan ve kimliğinizle ilişkilendirilmediğinden, bazı durumlarda size ait verileri bulmak mümkün olmayabilir. Bu durumda veriler, aşağıda belirtilen saklama süresi sona erdiğinde otomatik olarak silinir.'],

      ['h2', '3. Nelerin silindiği ve nelerin saklandığı'],
      ['table', ['Veri', 'Ne olur', 'Süre'], [
        ['Çark ayarları (cihazınızda)', 'Verileri temizlediğinizde veya uygulamayı kaldırdığınızda silinir', 'Anında'],
        ['Kurulum tanımlayıcısı, cihaz verileri, yaklaşık konum ve kullanım olayları (Google Analytics, yalnızca önceki sürümler)', 'Bulunabiliyorsa talebiniz üzerine silinir; aksi halde otomatik olarak silinir', 'Bir ay içinde yanıt; en fazla 14 ay saklama'],
        ['E-postanızın ve talebinizin kopyası', 'Yalnızca talebi işleme almak ve işleme alındığını kanıtlamak için gereken süre boyunca saklanır', 'Çözüldükten sonra en fazla 12 ay'],
      ]],
      ['p', 'Verilerinizin nasıl işlendiği hakkında daha fazla bilgi için <a href="privacy.html">Gizlilik politikası</a> sayfasına bakın.'],
    ],
  },

};
