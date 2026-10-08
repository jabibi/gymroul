// Política de privacidad. Un bloque es [tipo, contenido] ('table' lleva cabecera y filas).
// Si cambias algo, cámbialo en TODOS los idiomas: el test de paridad comprueba que tengan la misma estructura.
import { MAIL, AEPD, APP_ID, WEB } from './common.mjs';

const link = '<a href="data-deletion.html">data-deletion.html</a>';

export default {
  en: {
    title: 'Privacy Policy - GymRoulette',
    blocks: [
      ['h1', 'Privacy Policy - GymRoulette'],
      ['p', 'Last updated: October 2026'],
      ['p', `This policy describes what data the <strong>GymRoulette</strong> app (Android, identifier ${APP_ID}, and its web version at ${WEB}) processes and how it is used.`],
      ['p', '<strong>In short: GymRoulette works completely offline and does not collect, send or share any personal data.</strong>'],

      ['h2', '1. Data controller'],
      ['p', `Controller: Javier Melendez (independent developer, "jabibi").<br>Contact: ${MAIL}`],

      ['h2', '2. Data we process'],
      ['h3', '2.1 Data that stays on your device'],
      ['p', 'Your wheel settings (the exercises and reps you create or turn on) and the fact that you have already seen the introduction are stored only in your device\'s local storage (<code>localStorage</code>). The session history exists only in memory and is lost when you close the app. This data is not sent to any server, and you remove it by clearing the app\'s data or uninstalling it.'],
      ['h3', '2.2 No analytics, no trackers, no ads'],
      ['p', 'Since version 1.13 the app has no analytics or tracking tools of any kind: it does not include any third-party SDK, it shows no ads, it does not use advertising or tracking identifiers, and it does not use cookies beyond the local storage described above, which is strictly necessary for the app to work. The Android app does not connect to the Internet.'],
      ['p', 'GymRoulette does <strong>not</strong> collect your name, email address, contacts, photos, microphone, camera, location (not even approximate), or any health or fitness data. The app has no user accounts.'],
      ['h3', '2.3 Web version'],
      ['p', `If you use the web version at ${WEB}, the page is served by Firebase Hosting, a Google service. Like any web server, it may process technical data needed to deliver the page (such as your IP address and browser type) in its server logs. The web version itself does not collect any other data or load any third-party scripts.`],

      ['h2', '3. Legal basis'],
      ['p', 'The app does not process personal data, so there is nothing to consent to. Storing your settings in local storage is strictly necessary for the app to work. For the web version, the technical processing by the hosting provider is needed to deliver the page (legitimate interest, Article 6(1)(f) GDPR).'],

      ['h2', '4. Recipients and transfers'],
      ['p', 'The app does not send data to anyone, so there are no recipients or international transfers. We do not sell or share data with advertising networks, and we do not show ads.'],

      ['h2', '5. Retention'],
      ['p', 'Local data is kept until you delete it. Earlier versions of the app (before 1.13) offered an optional third-party usage statistics service. If you accepted it, the data it collected stays with that provider only for the service\'s retention period (at most 14 months) and is then deleted automatically; no new data has been collected since version 1.13.'],
      ['p', 'More information about how that provider handles that data is available in its privacy policy.'],

      ['h2', '6. Your rights'],
      ['p', `You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to the contact address above. Instructions for deleting your data are at ${link}. If you believe your rights have not been respected, you can lodge a complaint with your data protection authority (in Spain, the Spanish Data Protection Agency: ${AEPD}).`],
      ['p', 'If you used an earlier version with that optional usage statistics service and want its data deleted, we may ask you for the pseudonymous identifier of your installation to handle the request; you can also reset it by clearing the app\'s data or uninstalling it.'],

      ['h2', '7. Device permissions'],
      ['p', 'The app requests only one permission: <strong>vibration</strong> (for the wheel\'s effects). It is a normal permission that does not require your confirmation, and no information is collected through it. The app does not request Internet access or location. The device\'s audio is used only to play the wheel\'s sounds.'],

      ['h2', '8. Children'],
      ['p', 'GymRoulette is not directed at children under 14 and does not collect personal data from anyone, including minors. If you believe a minor has given us data, contact us and we will delete it.'],

      ['h2', '9. Security'],
      ['p', 'Your data never leaves your device, so it is protected by the operating system\'s app isolation. The web version is served over HTTPS.'],

      ['h2', '10. Changes to this policy'],
      ['p', 'If the policy changes, we will publish the new version at this same address and update the date shown at the top.'],
    ],
  },

  es: {
    title: 'Política de Privacidad - GymRoulette',
    blocks: [
      ['h1', 'Política de Privacidad - GymRoulette'],
      ['p', 'Última actualización: octubre 2026'],
      ['p', `Esta política describe qué datos trata la aplicación <strong>GymRoulette</strong> (Android, identificador ${APP_ID}, y su versión web en ${WEB}) y cómo se usan.`],
      ['p', '<strong>En resumen: GymRoulette funciona totalmente sin conexión y no recopila, envía ni comparte ningún dato personal.</strong>'],

      ['h2', '1. Responsable del tratamiento'],
      ['p', `Responsable: Javier Melendez (desarrollador independiente, "jabibi").<br>Contacto: ${MAIL}`],

      ['h2', '2. Datos que se tratan'],
      ['h3', '2.1 Datos que permanecen en tu dispositivo'],
      ['p', 'La configuración de la ruleta (ejercicios y repeticiones que creas o activas) y el hecho de que ya hayas visto la introducción se guardan únicamente en el almacenamiento local de tu dispositivo (<code>localStorage</code>). El historial de la sesión solo existe en memoria y se pierde al cerrar la aplicación. Estos datos no se envían a ningún servidor y los eliminas borrando los datos de la aplicación o desinstalándola.'],
      ['h3', '2.2 Sin analítica, sin rastreadores, sin anuncios'],
      ['p', 'Desde la versión 1.13 la aplicación no incluye ninguna herramienta de analítica ni de seguimiento: no incluye ningún SDK de terceros, no muestra anuncios, no usa identificadores publicitarios ni de seguimiento y no utiliza cookies más allá del almacenamiento local descrito arriba, que es estrictamente necesario para el funcionamiento de la app. La aplicación de Android no se conecta a Internet.'],
      ['p', 'GymRoulette <strong>no</strong> recopila nombre, correo electrónico, contactos, fotos, micrófono, cámara, ubicación (ni siquiera aproximada) ni ningún dato de salud o de condición física. La aplicación no tiene cuentas de usuario.'],
      ['h3', '2.3 Versión web'],
      ['p', `Si usas la versión web en ${WEB}, la página la sirve Firebase Hosting, un servicio de Google. Como cualquier servidor web, puede tratar en sus registros datos técnicos necesarios para entregar la página (como tu dirección IP y el tipo de navegador). La propia versión web no recopila ningún otro dato ni carga scripts de terceros.`],

      ['h2', '3. Base jurídica'],
      ['p', 'La aplicación no trata datos personales, por lo que no hay nada que consentir. El almacenamiento local de tu configuración es estrictamente necesario para el funcionamiento de la app. En la versión web, el tratamiento técnico del proveedor de alojamiento es necesario para entregar la página (interés legítimo, art. 6.1.f RGPD).'],

      ['h2', '4. Destinatarios y transferencias'],
      ['p', 'La aplicación no envía datos a nadie, por lo que no hay destinatarios ni transferencias internacionales. No vendemos ni compartimos datos con redes publicitarias, ni mostramos anuncios.'],

      ['h2', '5. Conservación'],
      ['p', 'Los datos locales se conservan hasta que los borres. Las versiones anteriores de la aplicación (anteriores a la 1.13) ofrecían de forma opcional un servicio de estadísticas de uso de un tercero. Si lo aceptaste, los datos que recopiló permanecen en ese proveedor solo durante el periodo de retención del servicio (como máximo 14 meses) y después se eliminan automáticamente; desde la versión 1.13 no se recopila ningún dato nuevo.'],
      ['p', 'Puedes consultar más información sobre cómo trata ese proveedor esos datos en su política de privacidad.'],

      ['h2', '6. Tus derechos'],
      ['p', `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a la dirección de contacto indicada arriba. Las instrucciones para eliminar tus datos están en ${link}. Si consideras que tus derechos no han sido atendidos, puedes reclamar ante la Agencia Española de Protección de Datos (${AEPD}).`],
      ['p', 'Si usaste una versión anterior con ese servicio opcional de estadísticas de uso y quieres que se eliminen sus datos, para atender la solicitud podríamos pedirte el identificador pseudónimo de tu instalación; puedes además restablecerlo borrando los datos de la aplicación o desinstalándola.'],

      ['h2', '7. Permisos del dispositivo'],
      ['p', 'La aplicación solo solicita un permiso: <strong>vibración</strong> (para los efectos de la ruleta). Es un permiso normal que no requiere tu confirmación y con él no se recopila ninguna información. La aplicación no solicita acceso a Internet ni a la ubicación. El audio del dispositivo se usa solo para reproducir los sonidos de la ruleta.'],

      ['h2', '8. Menores'],
      ['p', 'GymRoulette no está dirigida a menores de 14 años y no recopila datos personales de nadie, tampoco de menores. Si crees que un menor nos ha facilitado datos, contáctanos para eliminarlos.'],

      ['h2', '9. Seguridad'],
      ['p', 'Tus datos nunca salen de tu dispositivo, por lo que quedan protegidos por el aislamiento de aplicaciones del sistema operativo. La versión web se sirve mediante HTTPS.'],

      ['h2', '10. Cambios en esta política'],
      ['p', 'Si la política cambia, publicaremos la nueva versión en esta misma dirección y actualizaremos la fecha indicada al principio.'],
    ],
  },

  eu: {
    title: 'Pribatutasun-politika - GymRoulette',
    blocks: [
      ['h1', 'Pribatutasun-politika - GymRoulette'],
      ['p', 'Azken eguneratzea: 2026ko urria'],
      ['p', `Politika honek azaltzen du <strong>GymRoulette</strong> aplikazioak (Android, ${APP_ID} identifikatzailea, eta ${WEB} helbideko web bertsioa) zer datu tratatzen dituen eta nola erabiltzen diren.`],
      ['p', '<strong>Laburbilduz: GymRoulette erabat konexiorik gabe funtzionatzen du eta ez du datu pertsonalik biltzen, bidaltzen ez partekatzen.</strong>'],

      ['h2', '1. Tratamenduaren arduraduna'],
      ['p', `Arduraduna: Javier Melendez (garatzaile independentea, "jabibi").<br>Kontaktua: ${MAIL}`],

      ['h2', '2. Tratatzen diren datuak'],
      ['h3', '2.1 Zure gailuan geratzen diren datuak'],
      ['p', 'Gurpilaren konfigurazioa (sortzen edo aktibatzen dituzun ariketak eta errepikapenak) eta sarrera jada ikusi duzun informazioa zure gailuaren biltegiratze lokalean (<code>localStorage</code>) soilik gordetzen dira. Saioko historia memorian bakarrik dago eta aplikazioa ixtean galtzen da. Datu hauek ez dira inongo zerbitzaritara bidaltzen, eta aplikazioaren datuak ezabatuz edo desinstalatuz kentzen dituzu.'],
      ['h3', '2.2 Analitikarik, aztarnarik eta iragarkirik gabe'],
      ['p', '1.13 bertsiotik aurrera aplikazioak ez du inolako analitika- edo jarraipen-tresnarik: ez du hirugarrenen SDKrik barne hartzen, ez du iragarkirik erakusten, ez ditu publizitate- edo jarraipen-identifikatzaileak erabiltzen eta ez du cookierik erabiltzen goian azaldutako biltegiratze lokalaz harago, hori guztiz beharrezkoa baita aplikazioak funtziona dezan. Android aplikazioak ez du Internetera konektatzen.'],
      ['p', 'GymRoulette-k <strong>ez</strong> du biltzen izenik, posta elektronikorik, kontakturik, argazkirik, mikrofonorik, kamerarik, kokapenik (ezta gutxi gorabeherakoa ere) ezta osasun- edo kondizio fisikoko daturik ere. Aplikazioak ez du erabiltzaile-konturik.'],
      ['h3', '2.3 Web bertsioa'],
      ['p', `${WEB} helbideko web bertsioa erabiltzen baduzu, orria Firebase Hosting-ek zerbitzatzen du, Google-ren zerbitzu batek. Edozein web-zerbitzarik bezala, orria emateko behar diren datu teknikoak (zure IP helbidea eta nabigatzaile mota, adibidez) tratatu ditzake bere erregistroetan. Web bertsioak berak ez du beste daturik biltzen eta ez du hirugarrenen script-ik kargatzen.`],

      ['h2', '3. Oinarri juridikoa'],
      ['p', 'Aplikazioak ez du datu pertsonalik tratatzen, beraz ez dago ezertarako baimenik emateko. Zure ezarpenak biltegiratze lokalean gordetzea guztiz beharrezkoa da aplikazioak funtziona dezan. Web bertsioan, ostatatze-hornitzaileak egiten duen tratamendu teknikoa beharrezkoa da orria emateko (interes legitimoa, Datuak Babesteko Erregelamendu Orokorraren 6.1.f artikulua).'],

      ['h2', '4. Hartzaileak eta transferentziak'],
      ['p', 'Aplikazioak ez dio inori daturik bidaltzen, beraz ez dago hartzailerik ez nazioarteko transferentziarik. Ez ditugu datuak saltzen ez partekatzen publizitate-sareekin, eta ez ditugu iragarkirik erakusten.'],

      ['h2', '5. Kontserbazioa'],
      ['p', 'Datu lokalak zuk ezabatu arte gordetzen dira. Aplikazioaren aurreko bertsioek (1.13 baino lehenagokoek) hirugarren baten erabilera-estatistiken zerbitzu bat eskaintzen zuten, aukeran. Onartu baduzu, bildutako datuak hornitzaile horrengan geratzen dira soilik zerbitzuaren atxikitze-epean (gehienez 14 hilabete) eta, ondoren, automatikoki ezabatzen dira; 1.13 bertsiotik aurrera ez da datu berririk biltzen.'],
      ['p', 'Hornitzaile horrek datu horiek nola tratatzen dituen jakiteko informazio gehiago, haren pribatutasun-politikan.'],

      ['h2', '6. Zure eskubideak'],
      ['p', `Sarbide, zuzenketa, ezabatze, aurkaratze, murrizketa eta eramangarritasun eskubideak baliatu ditzakezu goian adierazitako kontaktu-helbidera idatziz. Zure datuak ezabatzeko argibideak ${link} orrian daude. Zure eskubideak bete ez direla uste baduzu, datuak babesteko zure agintaritzari erreklamazioa aurkez diezaiokezu (Espainian, Datuak Babesteko Espainiako Agentziari: ${AEPD}).`],
      ['p', 'erabilera-estatistiken aukerako zerbitzu hori duen aurreko bertsio bat erabili baduzu eta bere datuak ezabatzea nahi baduzu, eskaera bideratzeko zure instalazioaren identifikatzaile pseudonimoa eska diezazukegu; hura berrezar dezakezu ere aplikazioaren datuak ezabatuz edo desinstalatuz.'],

      ['h2', '7. Gailuaren baimenak'],
      ['p', 'Aplikazioak baimen bakarra eskatzen du: <strong>bibrazioa</strong> (gurpilaren efektuetarako). Baimen arrunta da, ez du zure berrespenik behar eta berarekin ez da informaziorik biltzen. Aplikazioak ez du Interneterako sarbiderik ez kokapenik eskatzen. Gailuaren audioa gurpilaren soinuak erreproduzitzeko soilik erabiltzen da.'],

      ['h2', '8. Adingabeak'],
      ['p', 'GymRoulette ez dago 14 urtetik beherakoei zuzendua eta ez du inorren datu pertsonalik biltzen, adingabeenik ere ez. Adingabe batek datuak eman dizkigula uste baduzu, jarri gurekin harremanetan ezabatzeko.'],

      ['h2', '9. Segurtasuna'],
      ['p', 'Zure datuak ez dira inoiz zure gailutik ateratzen, beraz sistema eragilearen aplikazioen isolamenduak babesten ditu. Web bertsioa HTTPS bidez zerbitzatzen da.'],

      ['h2', '10. Politika honen aldaketak'],
      ['p', 'Politika aldatzen bada, bertsio berria helbide honetan bertan argitaratuko dugu eta hasieran adierazitako data eguneratuko dugu.'],
    ],
  },

  gl: {
    title: 'Política de privacidade - GymRoulette',
    blocks: [
      ['h1', 'Política de privacidade - GymRoulette'],
      ['p', 'Última actualización: outubro de 2026'],
      ['p', `Esta política describe que datos trata a aplicación <strong>GymRoulette</strong> (Android, identificador ${APP_ID}, e a súa versión web en ${WEB}) e como se usan.`],
      ['p', '<strong>En resumo: GymRoulette funciona completamente sen conexión e non recolle, envía nin comparte ningún dato persoal.</strong>'],

      ['h2', '1. Responsable do tratamento'],
      ['p', `Responsable: Javier Melendez (desenvolvedor independente, "jabibi").<br>Contacto: ${MAIL}`],

      ['h2', '2. Datos que se tratan'],
      ['h3', '2.1 Datos que permanecen no teu dispositivo'],
      ['p', 'A configuración da ruleta (exercicios e repeticións que creas ou activas) e o feito de que xa viches a introdución gárdanse unicamente no almacenamento local do teu dispositivo (<code>localStorage</code>). O historial da sesión só existe na memoria e perdese ao pechar a aplicación. Estes datos non se envían a ningún servidor e elimínalos borrando os datos da aplicación ou desinstalándoa.'],
      ['h3', '2.2 Sen analítica, sen rastreadores, sen anuncios'],
      ['p', 'Desde a versión 1.13 a aplicación non ten ningunha ferramenta de analítica nin de seguimento: non inclúe ningún SDK de terceiros, non mostra anuncios, non usa identificadores publicitarios nin de seguimento e non usa cookies máis alá do almacenamento local descrito arriba, que é estritamente necesario para o funcionamento da app. A aplicación Android non se conecta a Internet.'],
      ['p', 'GymRoulette <strong>non</strong> recolle nome, correo electrónico, contactos, fotos, micrófono, cámara, localización (nin sequera aproximada) nin ningún dato de saúde ou de condición física. A aplicación non ten contas de usuario.'],
      ['h3', '2.3 Versión web'],
      ['p', `Se usas a versión web en ${WEB}, a páxina é servida por Firebase Hosting, un servizo de Google. Como calquera servidor web, pode tratar nos seus rexistros do servidor os datos técnicos necesarios para entregar a páxina (como o teu enderezo IP e o tipo de navegador). A propia versión web non recolle ningún outro dato nin carga scripts de terceiros.`],

      ['h2', '3. Base xurídica'],
      ['p', 'A aplicación non trata datos persoais, polo que non hai nada que consentir. O almacenamento local da túa configuración é estritamente necesario para o funcionamento da app. Na versión web, o tratamento técnico do provedor de aloxamento é necesario para entregar a páxina (interese lexítimo, art. 6.1.f RXPD).'],

      ['h2', '4. Destinatarios e transferencias'],
      ['p', 'A aplicación non envía datos a ninguén, polo que non hai destinatarios nin transferencias internacionais. Non vendemos nin compartimos datos con redes publicitarias, nin mostramos anuncios.'],

      ['h2', '5. Conservación'],
      ['p', 'Os datos locais consérvanse ata que os borres. As versións anteriores da aplicación (anteriores á 1.13) ofrecían de forma opcional un servizo de estatísticas de uso dun terceiro. Se o aceptaches, os datos que recolleu só permanecen nese provedor durante o período de retención do servizo (como máximo 14 meses) e despois elimínanse automaticamente; desde a versión 1.13 non se recolleu ningún dato novo.'],
      ['p', 'Podes consultar máis información sobre como trata ese provedor eses datos na súa política de privacidade.'],

      ['h2', '6. Os teus dereitos'],
      ['p', `Podes exercer os teus dereitos de acceso, rectificación, supresión, oposición, limitación e portabilidade escribindo ao enderezo de contacto indicado arriba. As instrucións para eliminar os teus datos están en ${link}. Se consideras que os teus dereitos non foron atendidos, podes reclamar ante a túa autoridade de protección de datos (en España, a Axencia Española de Protección de Datos: ${AEPD}).`],
      ['p', 'Se usaches unha versión anterior con ese servizo opcional de estatísticas de uso e queres que se eliminen os seus datos, para atender a solicitude poderiamos pedirche o identificador pseudónimo da túa instalación; podes ademais restablecelo borrando os datos da aplicación ou desinstalándoa.'],

      ['h2', '7. Permisos do dispositivo'],
      ['p', 'A aplicación só solicita un permiso: <strong>vibración</strong> (para os efectos da ruleta). É un permiso normal que non require a túa confirmación e con el non se recolle ningunha información. A aplicación non solicita acceso a Internet nin á localización. O audio do dispositivo úsase só para reproducir os sons da ruleta.'],

      ['h2', '8. Menores'],
      ['p', 'GymRoulette non está dirixida a menores de 14 anos e non recolle datos persoais de ninguén, menores incluídos. Se cres que un menor nos facilitou datos, contacta connosco para eliminalos.'],

      ['h2', '9. Seguridade'],
      ['p', 'Os teus datos nunca saen do teu dispositivo, polo que quedan protexidos polo illamento de aplicacións do sistema operativo. A versión web sérvese por HTTPS.'],

      ['h2', '10. Cambios nesta política'],
      ['p', 'Se a política cambia, publicaremos a nova versión neste mesmo enderezo e actualizaremos a data indicada ao principio.'],
    ],
  },

  ca: {
    title: 'Política de privadesa - GymRoulette',
    blocks: [
      ['h1', 'Política de privadesa - GymRoulette'],
      ['p', 'Darrera actualització: octubre de 2026'],
      ['p', `Aquesta política descriu quines dades tracta l'aplicació <strong>GymRoulette</strong> (Android, identificador ${APP_ID}, i la seva versió web a ${WEB}) i com s'utilitzen.`],
      ['p', '<strong>En resum: GymRoulette funciona completament sense connexió i no recopila, envia ni comparteix cap dada personal.</strong>'],

      ['h2', '1. Responsable del tractament'],
      ['p', `Responsable: Javier Melendez (desenvolupador independent, "jabibi").<br>Contacte: ${MAIL}`],

      ['h2', '2. Dades que es tracten'],
      ['h3', '2.1 Dades que es queden al teu dispositiu'],
      ['p', 'La configuració de la ruleta (exercicis i repeticions que crees o actives) i el fet que ja has vist la introducció es desen únicament a l\'emmagatzematge local del teu dispositiu (<code>localStorage</code>). L\'historial de la sessió només existeix a la memòria i es perd en tancar l\'aplicació. Aquestes dades no s\'envien a cap servidor i les elimines esborrant les dades de l\'aplicació o desinstal·lant-la.'],
      ['h3', '2.2 Sense analítica, sense rastrejadors, sense anuncis'],
      ['p', 'Des de la versió 1.13 l\'aplicació no té cap eina d\'analítica ni de seguiment: no inclou cap SDK de tercers, no mostra anuncis, no utilitza identificadors publicitaris ni de seguiment i no utilitza galetes més enllà de l\'emmagatzematge local descrit a dalt, que és estrictament necessari per al funcionament de l\'app. L\'aplicació Android no es connecta a Internet.'],
      ['p', 'GymRoulette <strong>no</strong> recopila nom, correu electrònic, contactes, fotos, micròfon, càmera, ubicació (ni tan sols aproximada) ni cap dada de salut o de condició física. L\'aplicació no té comptes d\'usuari.'],
      ['h3', '2.3 Versió web'],
      ['p', `Si utilitzes la versió web a ${WEB}, la pàgina és servida per Firebase Hosting, un servei de Google. Com qualsevol servidor web, pot tractar als seus registres del servidor les dades tècniques necessàries per lliurar la pàgina (com la teva adreça IP i el tipus de navegador). La versió web en si no recopila cap altra dada ni carrega scripts de tercers.`],

      ['h2', '3. Base jurídica'],
      ['p', 'L\'aplicació no tracta dades personals, de manera que no hi ha res a consentir. L\'emmagatzematge local de la teva configuració és estrictament necessari per al funcionament de l\'app. A la versió web, el tractament tècnic del proveïdor d\'allotjament és necessari per lliurar la pàgina (interès legítim, art. 6.1.f RGPD).'],

      ['h2', '4. Destinataris i transferències'],
      ['p', 'L\'aplicació no envia dades a ningú, de manera que no hi ha destinataris ni transferències internacionals. No venem ni compartim dades amb xarxes publicitàries, ni mostrem anuncis.'],

      ['h2', '5. Conservació'],
      ['p', 'Les dades locals es conserven fins que les esborris. Les versions anteriors de l\'aplicació (anteriors a la 1.13) oferien de manera opcional un servei d\'estadístiques d\'ús d\'un tercer. Si el vas acceptar, les dades que va recopilar només romanen en aquest proveïdor durant el període de retenció del servei (com a màxim 14 mesos) i després s\'eliminen automàticament; des de la versió 1.13 no s\'ha recopilat cap dada nova.'],
      ['p', 'Pots consultar més informació sobre com tracta aquest proveïdor aquestes dades a la seva política de privacitat.'],

      ['h2', '6. Els teus drets'],
      ['p', `Pots exercir els teus drets d'accés, rectificació, supressió, oposició, limitació i portabilitat escrivint a l'adreça de contacte indicada a dalt. Les instruccions per eliminar les teves dades són a ${link}. Si consideres que els teus drets no han estat atesos, pots reclamar davant la teva autoritat de protecció de dades (a Espanya, l'Agència Espanyola de Protecció de Dades: ${AEPD}).`],
      ['p', 'Si has utilitzat una versió anterior amb aquest servei opcional d\'estadístiques d\'ús i vols que se n\'eliminin les dades, per atendre la sol·licitud et podríem demanar l\'identificador pseudònim de la teva instal·lació; també el pots restablir esborrant les dades de l\'aplicació o desinstal·lant-la.'],

      ['h2', '7. Permisos del dispositiu'],
      ['p', 'L\'aplicació només sol·licita un permís: <strong>vibració</strong> (per als efectes de la ruleta). És un permís normal que no requereix la teva confirmació i amb ell no es recopila cap informació. L\'aplicació no sol·licita accés a Internet ni a la ubicació. L\'àudio del dispositiu només s\'utilitza per reproduir els sons de la ruleta.'],

      ['h2', '8. Menors'],
      ['p', 'GymRoulette no s\'adreça a menors de 14 anys i no recopila dades personals de ningú, inclosos els menors. Si creus que un menor ens ha facilitat dades, contacta amb nosaltres per eliminar-les.'],

      ['h2', '9. Seguretat'],
      ['p', 'Les teves dades no surten mai del teu dispositiu, de manera que queden protegides per l\'aïllament d\'aplicacions del sistema operatiu. La versió web es serveix per HTTPS.'],

      ['h2', '10. Canvis en aquesta política'],
      ['p', 'Si la política canvia, publicarem la nova versió en aquesta mateixa adreça i actualitzarem la data indicada al principi.'],
    ],
  },

  fr: {
    title: 'Politique de confidentialité - GymRoulette',
    blocks: [
      ['h1', 'Politique de confidentialité - GymRoulette'],
      ['p', 'Dernière mise à jour : octobre 2026'],
      ['p', `Cette politique décrit les données que traite l'application <strong>GymRoulette</strong> (Android, identifiant ${APP_ID}, et sa version web sur ${WEB}) et la façon dont elles sont utilisées.`],
      ['p', '<strong>En bref : GymRoulette fonctionne entièrement hors connexion et ne collecte, n\'envoie ni ne partage aucune donnée personnelle.</strong>'],

      ['h2', '1. Responsable du traitement'],
      ['p', `Responsable : Javier Melendez (développeur indépendant, « jabibi »).<br>Contact : ${MAIL}`],

      ['h2', '2. Données traitées'],
      ['h3', '2.1 Données qui restent sur ton appareil'],
      ['p', 'La configuration de la roue (les exercices et répétitions que tu crées ou actives) et le fait que tu aies déjà vu l\'introduction sont enregistrés uniquement dans le stockage local de ton appareil (<code>localStorage</code>). L\'historique de la séance n\'existe qu\'en mémoire et disparaît à la fermeture de l\'application. Ces données ne sont envoyées à aucun serveur et tu les supprimes en effaçant les données de l\'application ou en la désinstallant.'],
      ['h3', '2.2 Ni analyse, ni traceurs, ni publicité'],
      ['p', 'Depuis la version 1.13, l\'application ne contient aucun outil d\'analyse ou de suivi : elle n\'inclut aucun SDK tiers, n\'affiche pas de publicité, n\'utilise pas d\'identifiants publicitaires ou de suivi et n\'utilise pas de cookies en dehors du stockage local décrit ci-dessus, qui est strictement nécessaire au fonctionnement de l\'application. L\'application Android ne se connecte pas à Internet.'],
      ['p', 'GymRoulette ne collecte <strong>ni</strong> nom, adresse e-mail, contacts, photos, microphone, caméra, localisation (pas même approximative), ni aucune donnée de santé ou de condition physique. L\'application n\'a pas de comptes utilisateur.'],
      ['h3', '2.3 Version web'],
      ['p', `Si tu utilises la version web sur ${WEB}, la page est servie par Firebase Hosting, un service de Google. Comme tout serveur web, il peut traiter dans ses journaux les données techniques nécessaires à la diffusion de la page (comme ton adresse IP et le type de navigateur). La version web elle-même ne collecte aucune autre donnée et ne charge aucun script tiers.`],

      ['h2', '3. Base juridique'],
      ['p', 'L\'application ne traite pas de données personnelles : il n\'y a donc rien à consentir. Le stockage local de tes réglages est strictement nécessaire au fonctionnement de l\'application. Pour la version web, le traitement technique effectué par l\'hébergeur est nécessaire à la diffusion de la page (intérêt légitime, article 6, paragraphe 1, point f du RGPD).'],

      ['h2', '4. Destinataires et transferts'],
      ['p', 'L\'application n\'envoie de données à personne : il n\'y a donc ni destinataires ni transferts internationaux. Nous ne vendons ni ne partageons de données avec des réseaux publicitaires, et nous n\'affichons pas de publicité.'],

      ['h2', '5. Conservation'],
      ['p', 'Les données locales sont conservées jusqu\'à ce que tu les supprimes. Les versions précédentes de l\'application (avant la 1.13) proposaient en option un service tiers de statistiques d\'utilisation. Si tu l\'avais accepté, les données collectées ne restent chez ce fournisseur que pendant la durée de conservation du service (14 mois au maximum), puis sont supprimées automatiquement ; aucune nouvelle donnée n\'est collectée depuis la version 1.13.'],
      ['p', 'Tu peux trouver plus d\'informations sur le traitement de ces données par ce fournisseur dans sa politique de confidentialité.'],

      ['h2', '6. Tes droits'],
      ['p', `Tu peux exercer tes droits d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité en écrivant à l'adresse de contact indiquée ci-dessus. Les instructions pour supprimer tes données se trouvent sur ${link}. Si tu estimes que tes droits n'ont pas été respectés, tu peux introduire une réclamation auprès de ton autorité de protection des données (en France, la CNIL ; en Espagne, l'Agence espagnole de protection des données : ${AEPD}).`],
      ['p', 'Si tu as utilisé une version précédente avec ce service facultatif de statistiques d\'utilisation et souhaites que ses données soient supprimées, nous pourrions te demander l\'identifiant pseudonyme de ton installation pour traiter ta demande ; tu peux aussi le réinitialiser en effaçant les données de l\'application ou en la désinstallant.'],

      ['h2', '7. Autorisations de l\'appareil'],
      ['p', 'L\'application ne demande qu\'une seule autorisation : <strong>la vibration</strong> (pour les effets de la roue). C\'est une autorisation normale qui ne nécessite pas ta confirmation et aucune information n\'est collectée par son intermédiaire. L\'application ne demande ni accès à Internet ni localisation. Le son de l\'appareil sert uniquement à jouer les sons de la roue.'],

      ['h2', '8. Mineurs'],
      ['p', 'GymRoulette ne s\'adresse pas aux enfants de moins de 14 ans et ne collecte de données personnelles de personne, y compris des mineurs. Si tu penses qu\'un mineur nous a transmis des données, contacte-nous pour les supprimer.'],

      ['h2', '9. Sécurité'],
      ['p', 'Tes données ne quittent jamais ton appareil : elles sont protégées par l\'isolation des applications du système d\'exploitation. La version web est servie via HTTPS.'],

      ['h2', '10. Modifications de cette politique'],
      ['p', 'Si la politique change, nous publierons la nouvelle version à cette même adresse et mettrons à jour la date indiquée en haut.'],
    ],
  },

  de: {
    title: 'Datenschutzerklärung - GymRoulette',
    blocks: [
      ['h1', 'Datenschutzerklärung - GymRoulette'],
      ['p', 'Zuletzt aktualisiert: Oktober 2026'],
      ['p', `Diese Datenschutzerklärung beschreibt, welche Daten die App <strong>GymRoulette</strong> (Android, Kennung ${APP_ID}, und ihre Webversion unter ${WEB}) verarbeitet und wie sie verwendet werden.`],
      ['p', '<strong>Kurz gesagt: GymRoulette funktioniert vollständig offline und erfasst, sendet oder teilt keinerlei personenbezogene Daten.</strong>'],

      ['h2', '1. Verantwortlicher'],
      ['p', `Verantwortlicher: Javier Melendez (unabhängiger Entwickler, „jabibi“).<br>Kontakt: ${MAIL}`],

      ['h2', '2. Verarbeitete Daten'],
      ['h3', '2.1 Daten, die auf Ihrem Gerät bleiben'],
      ['p', 'Die Einstellungen Ihres Rads (die Übungen und Wiederholungen, die Sie erstellen oder aktivieren) und die Information, dass Sie die Einführung bereits gesehen haben, werden ausschließlich im lokalen Speicher Ihres Geräts (<code>localStorage</code>) abgelegt. Der Verlauf der Sitzung existiert nur im Arbeitsspeicher und geht beim Schließen der App verloren. Diese Daten werden an keinen Server gesendet; Sie entfernen sie, indem Sie die Daten der App löschen oder sie deinstallieren.'],
      ['h3', '2.2 Keine Analyse, keine Tracker, keine Werbung'],
      ['p', 'Seit Version 1.13 enthält die App keinerlei Analyse- oder Tracking-Werkzeuge: Sie enthält kein SDK von Drittanbietern, zeigt keine Werbung, verwendet keine Werbe- oder Tracking-Kennungen und nutzt keine Cookies über den oben beschriebenen lokalen Speicher hinaus, der für den Betrieb der App unbedingt erforderlich ist. Die Android-App stellt keine Verbindung zum Internet her.'],
      ['p', 'GymRoulette erfasst <strong>weder</strong> Ihren Namen, Ihre E-Mail-Adresse, Kontakte, Fotos, Mikrofon, Kamera, Standort (nicht einmal ungefähr) <strong>noch</strong> Gesundheits- oder Fitnessdaten. Die App hat keine Benutzerkonten.'],
      ['h3', '2.3 Webversion'],
      ['p', `Wenn Sie die Webversion unter ${WEB} nutzen, wird die Seite von Firebase Hosting, einem Dienst von Google, ausgeliefert. Wie jeder Webserver kann er in seinen Server-Logs technische Daten verarbeiten, die zur Auslieferung der Seite nötig sind (etwa Ihre IP-Adresse und den Browsertyp). Die Webversion selbst erfasst keine weiteren Daten und lädt keine Skripte von Drittanbietern.`],

      ['h2', '3. Rechtsgrundlage'],
      ['p', 'Die App verarbeitet keine personenbezogenen Daten, daher gibt es nichts, wozu eine Einwilligung nötig wäre. Die Speicherung Ihrer Einstellungen im lokalen Speicher ist für den Betrieb der App unbedingt erforderlich. Bei der Webversion ist die technische Verarbeitung durch den Hosting-Anbieter zur Auslieferung der Seite erforderlich (berechtigtes Interesse, Art. 6 Abs. 1 Buchst. f DSGVO).'],

      ['h2', '4. Empfänger und Übermittlungen'],
      ['p', 'Die App sendet keine Daten an Dritte, daher gibt es weder Empfänger noch internationale Übermittlungen. Wir verkaufen keine Daten und geben keine Daten an Werbenetzwerke weiter, und wir zeigen keine Werbung an.'],

      ['h2', '5. Speicherdauer'],
      ['p', 'Lokale Daten bleiben gespeichert, bis Sie sie löschen. Frühere Versionen der App (vor 1.13) boten optional einen Statistikdienst zur Nutzung von einem Drittanbieter an. Wenn Sie zugestimmt hatten, bleiben die dabei erfassten Daten nur für die Aufbewahrungsdauer des Dienstes (höchstens 14 Monate) bei diesem Anbieter und werden danach automatisch gelöscht; seit Version 1.13 werden keine neuen Daten mehr erfasst.'],
      ['p', 'Weitere Informationen dazu, wie dieser Anbieter diese Daten behandelt, finden Sie in dessen Datenschutzerklärung.'],

      ['h2', '6. Ihre Rechte'],
      ['p', `Sie können Ihre Rechte auf Auskunft, Berichtigung, Löschung, Widerspruch, Einschränkung und Datenübertragbarkeit ausüben, indem Sie an die oben genannte Kontaktadresse schreiben. Anleitungen zum Löschen Ihrer Daten finden Sie unter ${link}. Wenn Sie der Ansicht sind, dass Ihre Rechte nicht gewahrt wurden, können Sie sich bei Ihrer Datenschutzaufsichtsbehörde beschweren (in Spanien bei der Spanischen Datenschutzbehörde: ${AEPD}).`],
      ['p', 'Wenn Sie eine frühere Version mit diesem optionalen Statistikdienst zur Nutzung genutzt haben und möchten, dass deren Daten gelöscht werden, können wir Sie zur Bearbeitung der Anfrage um die pseudonyme Kennung Ihrer Installation bitten; Sie können sie auch zurücksetzen, indem Sie die Daten der App löschen oder sie deinstallieren.'],

      ['h2', '7. Geräteberechtigungen'],
      ['p', 'Die App fordert nur eine Berechtigung an: <strong>Vibration</strong> (für die Effekte des Rads). Sie ist eine normale Berechtigung, die Ihre Bestätigung nicht erfordert, und über sie werden keine Informationen erfasst. Die App fordert weder Internetzugriff noch Standort an. Die Audioausgabe des Geräts wird nur verwendet, um die Geräusche des Rads abzuspielen.'],

      ['h2', '8. Kinder'],
      ['p', 'GymRoulette richtet sich nicht an Kinder unter 14 Jahren und erfasst von niemandem personenbezogene Daten, auch nicht von Minderjährigen. Wenn Sie glauben, dass uns ein Minderjähriger Daten übermittelt hat, kontaktieren Sie uns, damit wir sie löschen.'],

      ['h2', '9. Sicherheit'],
      ['p', 'Ihre Daten verlassen Ihr Gerät nie und sind daher durch die Anwendungsisolierung des Betriebssystems geschützt. Die Webversion wird über HTTPS ausgeliefert.'],

      ['h2', '10. Änderungen dieser Datenschutzerklärung'],
      ['p', 'Wenn sich die Datenschutzerklärung ändert, veröffentlichen wir die neue Fassung unter derselben Adresse und aktualisieren das oben angegebene Datum.'],
    ],
  },

  it: {
    title: 'Informativa sulla privacy - GymRoulette',
    blocks: [
      ['h1', 'Informativa sulla privacy - GymRoulette'],
      ['p', 'Ultimo aggiornamento: ottobre 2026'],
      ['p', `Questa informativa descrive quali dati tratta l'app <strong>GymRoulette</strong> (Android, identificativo ${APP_ID}, e la sua versione web su ${WEB}) e come vengono utilizzati.`],
      ['p', '<strong>In breve: GymRoulette funziona completamente offline e non raccoglie, non invia né condivide alcun dato personale.</strong>'],

      ['h2', '1. Titolare del trattamento'],
      ['p', `Titolare: Javier Melendez (sviluppatore indipendente, «jabibi»).<br>Contatto: ${MAIL}`],

      ['h2', '2. Dati trattati'],
      ['h3', '2.1 Dati che restano sul tuo dispositivo'],
      ['p', 'Le impostazioni della ruota (gli esercizi e le ripetizioni che crei o attivi) e il fatto che tu abbia già visto l\'introduzione vengono salvati esclusivamente nella memoria locale del tuo dispositivo (<code>localStorage</code>). La cronologia della sessione esiste solo in memoria e va persa alla chiusura dell\'app. Questi dati non vengono inviati ad alcun server e li rimuovi cancellando i dati dell\'app o disinstallandola.'],
      ['h3', '2.2 Nessuna analisi, nessun tracker, nessuna pubblicità'],
      ['p', 'Dalla versione 1.13 l\'app non ha strumenti di analisi o di tracciamento di alcun tipo: non include alcun SDK di terze parti, non mostra annunci, non usa identificativi pubblicitari o di tracciamento e non usa cookie oltre alla memoria locale descritta sopra, strettamente necessaria per il funzionamento dell\'app. L\'app Android non si connette a Internet.'],
      ['p', 'GymRoulette <strong>non</strong> raccoglie il tuo nome, indirizzo e-mail, contatti, foto, microfono, fotocamera, posizione (nemmeno approssimativa) né alcun dato relativo alla salute o alla forma fisica. L\'app non ha account utente.'],
      ['h3', '2.3 Versione web'],
      ['p', `Se usi la versione web su ${WEB}, la pagina viene servita da Firebase Hosting, un servizio di Google. Come qualsiasi server web, può trattare nei propri registri del server i dati tecnici necessari per fornire la pagina (come il tuo indirizzo IP e il tipo di browser). La versione web non raccoglie di per sé altri dati né carica script di terze parti.`],

      ['h2', '3. Base giuridica'],
      ['p', 'L\'app non tratta dati personali, quindi non c\'è nulla a cui prestare consenso. La memorizzazione locale delle tue impostazioni è strettamente necessaria per il funzionamento dell\'app. Per la versione web, il trattamento tecnico da parte del fornitore di hosting è necessario per fornire la pagina (legittimo interesse, art. 6, par. 1, lett. f, del GDPR).'],

      ['h2', '4. Destinatari e trasferimenti'],
      ['p', 'L\'app non invia dati a nessuno, quindi non ci sono destinatari né trasferimenti internazionali. Non vendiamo né condividiamo dati con reti pubblicitarie e non mostriamo annunci.'],

      ['h2', '5. Conservazione'],
      ['p', 'I dati locali vengono conservati finché non li cancelli. Le versioni precedenti dell\'app (anteriori alla 1.13) offrivano in via facoltativa un servizio di statistiche di utilizzo di terze parti. Se lo hai accettato, i dati raccolti restano presso quel fornitore solo per il periodo di conservazione del servizio (al massimo 14 mesi) e poi vengono eliminati automaticamente; dalla versione 1.13 non viene raccolto alcun nuovo dato.'],
      ['p', 'Puoi trovare maggiori informazioni su come quel fornitore tratta tali dati nella sua informativa sulla privacy.'],

      ['h2', '6. I tuoi diritti'],
      ['p', `Puoi esercitare i tuoi diritti di accesso, rettifica, cancellazione, opposizione, limitazione e portabilità scrivendo all'indirizzo di contatto indicato sopra. Le istruzioni per eliminare i tuoi dati si trovano su ${link}. Se ritieni che i tuoi diritti non siano stati rispettati, puoi presentare un reclamo alla tua autorità di protezione dei dati (in Italia, il Garante per la protezione dei dati personali; in Spagna, l'Agenzia spagnola per la protezione dei dati: ${AEPD}).`],
      ['p', 'Se hai usato una versione precedente con quel servizio facoltativo di statistiche di utilizzo e vuoi che i relativi dati vengano eliminati, per gestire la richiesta potremmo chiederti l\'identificativo pseudonimo della tua installazione; puoi anche reimpostarlo cancellando i dati dell\'app o disinstallandola.'],

      ['h2', '7. Autorizzazioni del dispositivo'],
      ['p', 'L\'app richiede una sola autorizzazione: <strong>vibrazione</strong> (per gli effetti della ruota). È un\'autorizzazione normale che non richiede la tua conferma e tramite essa non viene raccolta alcuna informazione. L\'app non richiede l\'accesso a Internet né alla posizione. L\'audio del dispositivo viene usato solo per riprodurre i suoni della ruota.'],

      ['h2', '8. Minori'],
      ['p', 'GymRoulette non è rivolta ai minori di 14 anni e non raccoglie dati personali di nessuno, minori compresi. Se ritieni che un minore ci abbia fornito dei dati, contattaci e li elimineremo.'],

      ['h2', '9. Sicurezza'],
      ['p', 'I tuoi dati non lasciano mai il tuo dispositivo, quindi sono protetti dall\'isolamento delle app del sistema operativo. La versione web viene servita tramite HTTPS.'],

      ['h2', '10. Modifiche a questa informativa'],
      ['p', 'Se l\'informativa cambia, pubblicheremo la nuova versione allo stesso indirizzo e aggiorneremo la data indicata all\'inizio.'],
    ],
  },

  'pt-BR': {
    title: 'Política de Privacidade - GymRoulette',
    blocks: [
      ['h1', 'Política de Privacidade - GymRoulette'],
      ['p', 'Última atualização: outubro de 2026'],
      ['p', `Esta política descreve quais dados o aplicativo <strong>GymRoulette</strong> (Android, identificador ${APP_ID}, e sua versão web em ${WEB}) trata e como eles são usados.`],
      ['p', '<strong>Em resumo: o GymRoulette funciona totalmente offline e não coleta, envia nem compartilha nenhum dado pessoal.</strong>'],

      ['h2', '1. Controlador dos dados'],
      ['p', `Controlador: Javier Melendez (desenvolvedor independente, "jabibi").<br>Contato: ${MAIL}`],

      ['h2', '2. Dados tratados'],
      ['h3', '2.1 Dados que ficam no seu dispositivo'],
      ['p', 'A configuração da roleta (os exercícios e repetições que você cria ou ativa) e o fato de você já ter visto a introdução são guardados apenas no armazenamento local do seu dispositivo (<code>localStorage</code>). O histórico da sessão existe somente na memória e se perde ao fechar o aplicativo. Esses dados não são enviados a nenhum servidor e você os remove apagando os dados do aplicativo ou desinstalando-o.'],
      ['h3', '2.2 Sem análise, sem rastreadores, sem anúncios'],
      ['p', 'Desde a versão 1.13 o aplicativo não tem nenhuma ferramenta de análise ou rastreamento: não inclui nenhum SDK de terceiros, não exibe anúncios, não usa identificadores de publicidade ou rastreamento e não usa cookies além do armazenamento local descrito acima, que é estritamente necessário para o funcionamento do app. O aplicativo Android não se conecta à Internet.'],
      ['p', 'O GymRoulette <strong>não</strong> coleta nome, e-mail, contatos, fotos, microfone, câmera, localização (nem mesmo aproximada) nem qualquer dado de saúde ou condicionamento físico. O aplicativo não tem contas de usuário.'],
      ['h3', '2.3 Versão web'],
      ['p', `Se você usa a versão web em ${WEB}, a página é servida pelo Firebase Hosting, um serviço do Google. Como qualquer servidor web, ele pode tratar nos seus registros de servidor os dados técnicos necessários para entregar a página (como seu endereço IP e o tipo de navegador). A versão web em si não coleta nenhum outro dado nem carrega scripts de terceiros.`],

      ['h2', '3. Base legal'],
      ['p', 'O aplicativo não trata dados pessoais, portanto não há nada a consentir. O armazenamento local das suas configurações é estritamente necessário para o funcionamento do app. Na versão web, o tratamento técnico feito pelo provedor de hospedagem é necessário para entregar a página (legítimo interesse, art. 6.1.f do GDPR; no Brasil, art. 7º, IX, da LGPD).'],

      ['h2', '4. Destinatários e transferências'],
      ['p', 'O aplicativo não envia dados a ninguém, portanto não há destinatários nem transferências internacionais. Não vendemos nem compartilhamos dados com redes de publicidade e não exibimos anúncios.'],

      ['h2', '5. Retenção'],
      ['p', 'Os dados locais são mantidos até que você os apague. As versões anteriores do aplicativo (anteriores à 1.13) ofereciam, de forma opcional, um serviço de estatísticas de uso de terceiros. Se você o aceitou, os dados coletados ficam com esse provedor apenas pelo período de retenção do serviço (no máximo 14 meses) e depois são excluídos automaticamente; nenhum dado novo é coletado desde a versão 1.13.'],
      ['p', 'Você pode encontrar mais informações sobre como esse provedor trata esses dados na política de privacidade dele.'],

      ['h2', '6. Seus direitos'],
      ['p', `Você pode exercer seus direitos de acesso, retificação, exclusão, oposição, limitação e portabilidade escrevendo ao endereço de contato indicado acima. As instruções para excluir seus dados estão em ${link}. Se considerar que seus direitos não foram atendidos, você pode apresentar uma reclamação à autoridade de proteção de dados do seu país (no Brasil, a ANPD; na Espanha, a Agência Espanhola de Proteção de Dados: ${AEPD}).`],
      ['p', 'Se você usou uma versão anterior com esse serviço opcional de estatísticas de uso e quer que os dados dela sejam excluídos, para atender à solicitação podemos pedir o identificador pseudônimo da sua instalação; você também pode redefini-lo apagando os dados do aplicativo ou desinstalando-o.'],

      ['h2', '7. Permissões do dispositivo'],
      ['p', 'O aplicativo solicita apenas uma permissão: <strong>vibração</strong> (para os efeitos da roleta). É uma permissão normal que não exige sua confirmação e nenhuma informação é coletada por meio dela. O aplicativo não solicita acesso à Internet nem à localização. O áudio do dispositivo é usado apenas para reproduzir os sons da roleta.'],

      ['h2', '8. Menores'],
      ['p', 'O GymRoulette não é direcionado a menores de 14 anos e não coleta dados pessoais de ninguém, incluindo menores. Se acreditar que um menor nos forneceu dados, entre em contato para que os excluamos.'],

      ['h2', '9. Segurança'],
      ['p', 'Seus dados nunca saem do seu dispositivo, por isso ficam protegidos pelo isolamento de aplicativos do sistema operacional. A versão web é servida por HTTPS.'],

      ['h2', '10. Alterações nesta política'],
      ['p', 'Se a política mudar, publicaremos a nova versão neste mesmo endereço e atualizaremos a data indicada no início.'],
    ],
  },

  'pt-PT': {
    title: 'Política de Privacidade - GymRoulette',
    blocks: [
      ['h1', 'Política de Privacidade - GymRoulette'],
      ['p', 'Última atualização: outubro de 2026'],
      ['p', `Esta política descreve quais os dados que a aplicação <strong>GymRoulette</strong> (Android, identificador ${APP_ID}, e a sua versão web em ${WEB}) trata e como são utilizados.`],
      ['p', '<strong>Em resumo: o GymRoulette funciona totalmente offline e não recolhe, envia nem partilha quaisquer dados pessoais.</strong>'],

      ['h2', '1. Responsável pelo tratamento'],
      ['p', `Responsável: Javier Melendez (programador independente, "jabibi").<br>Contacto: ${MAIL}`],

      ['h2', '2. Dados tratados'],
      ['h3', '2.1 Dados que ficam no teu dispositivo'],
      ['p', 'A configuração da roleta (os exercícios e repetições que crias ou ativas) e o facto de já teres visto a introdução são guardados apenas no armazenamento local do teu dispositivo (<code>localStorage</code>). O histórico da sessão existe apenas na memória e perde-se ao fechar a aplicação. Estes dados não são enviados para nenhum servidor e removes-os apagando os dados da aplicação ou desinstalando-a.'],
      ['h3', '2.2 Sem análise, sem rastreadores, sem anúncios'],
      ['p', 'Desde a versão 1.13 a aplicação não tem nenhuma ferramenta de análise ou de rastreio: não inclui nenhum SDK de terceiros, não apresenta anúncios, não utiliza identificadores de publicidade ou de rastreio e não utiliza cookies para além do armazenamento local descrito acima, que é estritamente necessário para o funcionamento da aplicação. A aplicação Android não se liga à Internet.'],
      ['p', 'O GymRoulette <strong>não</strong> recolhe nome, e-mail, contactos, fotografias, microfone, câmara, localização (nem sequer aproximada) nem quaisquer dados de saúde ou de condição física. A aplicação não tem contas de utilizador.'],
      ['h3', '2.3 Versão web'],
      ['p', `Se utilizas a versão web em ${WEB}, a página é servida pelo Firebase Hosting, um serviço da Google. Como qualquer servidor web, pode tratar nos seus registos do servidor os dados técnicos necessários para entregar a página (como o teu endereço IP e o tipo de navegador). A versão web em si não recolhe quaisquer outros dados nem carrega scripts de terceiros.`],

      ['h2', '3. Base jurídica'],
      ['p', 'A aplicação não trata dados pessoais, pelo que não há nada a consentir. O armazenamento local das tuas definições é estritamente necessário para o funcionamento da aplicação. Na versão web, o tratamento técnico efetuado pelo fornecedor de alojamento é necessário para entregar a página (interesse legítimo, art. 6.º, n.º 1, alínea f), do RGPD).'],

      ['h2', '4. Destinatários e transferências'],
      ['p', 'A aplicação não envia dados a ninguém, pelo que não existem destinatários nem transferências internacionais. Não vendemos nem partilhamos dados com redes publicitárias e não apresentamos anúncios.'],

      ['h2', '5. Conservação'],
      ['p', 'Os dados locais são conservados até os apagares. As versões anteriores da aplicação (anteriores à 1.13) ofereciam, de forma opcional, um serviço de estatísticas de utilização de terceiros. Se o aceitaste, os dados recolhidos ficam com esse fornecedor apenas durante o período de retenção do serviço (no máximo 14 meses) e depois são eliminados automaticamente; não é recolhido nenhum dado novo desde a versão 1.13.'],
      ['p', 'Podes encontrar mais informações sobre como esse fornecedor trata esses dados na respetiva política de privacidade.'],

      ['h2', '6. Os teus direitos'],
      ['p', `Podes exercer os teus direitos de acesso, retificação, apagamento, oposição, limitação e portabilidade escrevendo para o endereço de contacto indicado acima. As instruções para eliminar os teus dados estão em ${link}. Se considerares que os teus direitos não foram respeitados, podes apresentar reclamação à autoridade de proteção de dados (em Portugal, a CNPD; em Espanha, a Agência Espanhola de Proteção de Dados: ${AEPD}).`],
      ['p', 'Se utilizaste uma versão anterior com esse serviço opcional de estatísticas de utilização e queres que os respetivos dados sejam eliminados, para dar resposta ao pedido poderemos solicitar-te o identificador pseudónimo da tua instalação; podes também repô-lo apagando os dados da aplicação ou desinstalando-a.'],

      ['h2', '7. Permissões do dispositivo'],
      ['p', 'A aplicação solicita apenas uma permissão: <strong>vibração</strong> (para os efeitos da roleta). É uma permissão normal que não requer a tua confirmação e não é recolhida qualquer informação através dela. A aplicação não solicita acesso à Internet nem à localização. O áudio do dispositivo é utilizado apenas para reproduzir os sons da roleta.'],

      ['h2', '8. Menores'],
      ['p', 'O GymRoulette não se destina a menores de 14 anos e não recolhe dados pessoais de ninguém, incluindo menores. Se achares que um menor nos forneceu dados, contacta-nos para que os eliminemos.'],

      ['h2', '9. Segurança'],
      ['p', 'Os teus dados nunca saem do teu dispositivo, pelo que ficam protegidos pelo isolamento de aplicações do sistema operativo. A versão web é servida por HTTPS.'],

      ['h2', '10. Alterações a esta política'],
      ['p', 'Se a política mudar, publicaremos a nova versão neste mesmo endereço e atualizaremos a data indicada no início.'],
    ],
  },
  pl: {
    title: 'Polityka prywatności - GymRoulette',
    blocks: [
      ['h1', 'Polityka prywatności - GymRoulette'],
      ['p', 'Ostatnia aktualizacja: październik 2026'],
      ['p', `Niniejsza polityka opisuje, jakie dane przetwarza aplikacja <strong>GymRoulette</strong> (Android, identyfikator ${APP_ID}, oraz jej wersja internetowa pod adresem ${WEB}) i w jaki sposób są one wykorzystywane.`],
      ['p', '<strong>W skrócie: GymRoulette działa całkowicie offline i nie zbiera, nie wysyła ani nie udostępnia żadnych danych osobowych.</strong>'],

      ['h2', '1. Administrator danych'],
      ['p', `Administrator: Javier Melendez (niezależny deweloper, „jabibi”).<br>Kontakt: ${MAIL}`],

      ['h2', '2. Przetwarzane dane'],
      ['h3', '2.1 Dane, które pozostają na urządzeniu Użytkownika'],
      ['p', 'Ustawienia koła (ćwiczenia i powtórzenia, które Użytkownik tworzy lub włącza) oraz informacja, że Użytkownik zobaczył już wprowadzenie, są zapisywane wyłącznie w pamięci lokalnej urządzenia (<code>localStorage</code>). Historia sesji istnieje tylko w pamięci i znika po zamknięciu aplikacji. Dane te nie są wysyłane na żaden serwer; Użytkownik usuwa je, czyszcząc dane aplikacji lub odinstalowując ją.'],
      ['h3', '2.2 Brak analityki, trackerów i reklam'],
      ['p', 'Od wersji 1.13 aplikacja nie zawiera żadnych narzędzi analitycznych ani śledzących: nie obejmuje żadnego zewnętrznego pakietu SDK, nie wyświetla reklam, nie używa identyfikatorów reklamowych ani śledzących i nie korzysta z plików cookie poza opisaną wyżej pamięcią lokalną, która jest niezbędna do działania aplikacji. Aplikacja na Androida nie łączy się z Internetem.'],
      ['p', 'GymRoulette <strong>nie</strong> zbiera imienia i nazwiska, adresu e-mail, kontaktów, zdjęć, mikrofonu, aparatu, lokalizacji (nawet przybliżonej) ani żadnych danych o zdrowiu czy kondycji. Aplikacja nie ma kont użytkowników.'],
      ['h3', '2.3 Wersja internetowa'],
      ['p', `Jeśli Użytkownik korzysta z wersji internetowej pod adresem ${WEB}, strona jest udostępniana przez Firebase Hosting, usługę Google. Jak każdy serwer internetowy, może on przetwarzać w dziennikach serwera dane techniczne potrzebne do dostarczenia strony (takie jak adres IP i typ przeglądarki). Sama wersja internetowa nie zbiera żadnych innych danych i nie ładuje skryptów podmiotów trzecich.`],

      ['h2', '3. Podstawa prawna'],
      ['p', 'Aplikacja nie przetwarza danych osobowych, więc nie ma czego akceptować. Zapisywanie ustawień w pamięci lokalnej jest niezbędne do działania aplikacji. W przypadku wersji internetowej przetwarzanie techniczne przez dostawcę hostingu jest potrzebne do dostarczenia strony (prawnie uzasadniony interes, art. 6 ust. 1 lit. f RODO).'],

      ['h2', '4. Odbiorcy i przekazywanie danych'],
      ['p', 'Aplikacja nie wysyła danych nikomu, więc nie ma odbiorców ani przekazywania danych do państw trzecich. Nie sprzedajemy danych ani nie udostępniamy ich sieciom reklamowym, a także nie wyświetlamy reklam.'],

      ['h2', '5. Okres przechowywania'],
      ['p', 'Dane lokalne są przechowywane do chwili ich usunięcia przez Użytkownika. Wcześniejsze wersje aplikacji (przed 1.13) oferowały opcjonalnie zewnętrzną usługę statystyk użytkowania. Jeśli Użytkownik wyraził na nią zgodę, zebrane dane pozostają u tego dostawcy wyłącznie przez okres przechowywania przewidziany przez usługę (maksymalnie 14 miesięcy), a następnie są usuwane automatycznie; od wersji 1.13 nie są zbierane żadne nowe dane.'],
      ['p', 'Więcej informacji o tym, jak ten dostawca przetwarza te dane, znajduje się w jego polityce prywatności.'],

      ['h2', '6. Prawa Użytkownika'],
      ['p', `Użytkownik może wykonywać swoje prawa dostępu, sprostowania, usunięcia, sprzeciwu, ograniczenia przetwarzania i przenoszenia danych, pisząc na powyższy adres kontaktowy. Instrukcje usuwania danych znajdują się pod adresem ${link}. Jeżeli Użytkownik uważa, że jego prawa nie zostały uszanowane, może złożyć skargę do organu ochrony danych (w Polsce jest to Prezes Urzędu Ochrony Danych Osobowych, UODO; w Hiszpanii: Hiszpańska Agencja Ochrony Danych, ${AEPD}).`],
      ['p', 'Jeśli Użytkownik korzystał z wcześniejszej wersji z opcjonalną usługą statystyk użytkowania i chce usunąć jej dane, możemy poprosić o pseudonimowy identyfikator jego instalacji, aby rozpatrzyć wniosek; można go także zresetować, czyszcząc dane aplikacji lub odinstalowując ją.'],

      ['h2', '7. Uprawnienia urządzenia'],
      ['p', 'Aplikacja żąda tylko jednego uprawnienia: <strong>wibracji</strong> (dla efektów koła). Jest to uprawnienie zwykłe, które nie wymaga potwierdzenia Użytkownika, a za jego pośrednictwem nie są zbierane żadne informacje. Aplikacja nie żąda dostępu do Internetu ani do lokalizacji. Dźwięk urządzenia jest używany wyłącznie do odtwarzania dźwięków koła.'],

      ['h2', '8. Dzieci'],
      ['p', 'GymRoulette nie jest skierowana do dzieci poniżej 14. roku życia i nie zbiera danych osobowych od nikogo, także od małoletnich. Jeśli Użytkownik uważa, że małoletni przekazał nam dane, prosimy o kontakt, a my je usuniemy.'],

      ['h2', '9. Bezpieczeństwo'],
      ['p', 'Dane Użytkownika nigdy nie opuszczają jego urządzenia, więc są chronione przez izolację aplikacji w systemie operacyjnym. Wersja internetowa jest udostępniana przez HTTPS.'],

      ['h2', '10. Zmiany w niniejszej polityce'],
      ['p', 'W razie zmiany polityki opublikujemy nową wersję pod tym samym adresem i zaktualizujemy datę podaną na górze.'],
    ],
  },

  ar: {
    title: 'سياسة الخصوصية - GymRoulette',
    blocks: [
      ['h1', 'سياسة الخصوصية - GymRoulette'],
      ['p', 'آخر تحديث: أكتوبر 2026'],
      ['p', `توضّح هذه السياسة البيانات التي يعالجها تطبيق <strong>GymRoulette</strong> (Android، المعرّف ${APP_ID}، ونسخته على الويب في ${WEB}) وكيفية استخدامها.`],
      ['p', '<strong>باختصار: يعمل GymRoulette دون اتصال بالإنترنت بالكامل، ولا يجمع أي بيانات شخصية ولا يرسلها ولا يشاركها.</strong>'],

      ['h2', '1. المسؤول عن البيانات'],
      ['p', `المسؤول: Javier Melendez (مطوّر مستقل، «jabibi»).<br>التواصل: ${MAIL}`],

      ['h2', '2. البيانات التي نعالجها'],
      ['h3', '2.1 بيانات تبقى على جهازك'],
      ['p', 'تُحفظ إعدادات العجلة لديك (التمارين والتكرارات التي تنشئها أو تفعّلها) وكونك قد شاهدت المقدمة في وحدة التخزين المحلية لجهازك فقط (<code>localStorage</code>). أما سجل الجلسة فيوجد في الذاكرة فقط ويضيع عند إغلاق التطبيق. لا تُرسَل هذه البيانات إلى أي خادم، ويمكنك إزالتها بمسح بيانات التطبيق أو بإلغاء تثبيته.'],
      ['h3', '2.2 لا تحليلات ولا أدوات تتبّع ولا إعلانات'],
      ['p', 'منذ الإصدار 1.13 لا يتضمن التطبيق أي أدوات تحليلات أو تتبّع من أي نوع: فهو لا يتضمن أي حزمة تطوير (SDK) من جهات خارجية، ولا يعرض إعلانات، ولا يستخدم معرّفات إعلانية أو معرّفات تتبّع، ولا يستخدم ملفات تعريف الارتباط باستثناء التخزين المحلي الموصوف أعلاه، وهو ضروري تمامًا لعمل التطبيق. ولا يتصل تطبيق Android بالإنترنت.'],
      ['p', 'لا يجمع GymRoulette <strong>أيًّا</strong> من اسمك أو عنوان بريدك الإلكتروني أو جهات اتصالك أو صورك أو الميكروفون أو الكاميرا أو موقعك (ولو التقريبي) أو أي بيانات صحية أو بدنية. ولا توجد في التطبيق حسابات مستخدمين.'],
      ['h3', '2.3 النسخة على الويب'],
      ['p', `إذا استخدمت النسخة على الويب في ${WEB}، فإن الصفحة تُقدَّم عبر Firebase Hosting، وهي خدمة من Google. وكأي خادم ويب، قد يعالج سجلّات خوادمه بيانات تقنية لازمة لتقديم الصفحة (مثل عنوان IP ونوع المتصفح). ولا تجمع النسخة على الويب نفسها أي بيانات أخرى ولا تحمّل أي سكربتات من جهات خارجية.`],

      ['h2', '3. الأساس القانوني'],
      ['p', 'لا يعالج التطبيق بيانات شخصية، ولذلك لا يوجد ما يستوجب الموافقة عليه. وحفظ إعداداتك في التخزين المحلي ضروري تمامًا لعمل التطبيق. أما في النسخة على الويب، فالمعالجة التقنية التي يجريها مزوّد الاستضافة لازمة لتقديم الصفحة (المصلحة المشروعة، المادة 6(1)(و) من اللائحة العامة لحماية البيانات GDPR).'],

      ['h2', '4. المستلمون ونقل البيانات'],
      ['p', 'لا يرسل التطبيق بيانات إلى أي جهة، ولذلك لا يوجد مستلمون ولا نقل دولي للبيانات. ونحن لا نبيع البيانات ولا نشاركها مع شبكات الإعلانات، ولا نعرض إعلانات.'],

      ['h2', '5. مدة الاحتفاظ'],
      ['p', 'تُحفظ البيانات المحلية إلى أن تحذفها. وكانت الإصدارات السابقة من التطبيق (قبل 1.13) توفّر بشكل اختياري خدمة إحصاءات استخدام من جهة خارجية. فإذا وافقت عليها، فإن البيانات التي جمعتها تبقى لدى ذلك المزوّد طوال مدة الاحتفاظ الخاصة بالخدمة فقط (14 شهرًا كحد أقصى) ثم تُحذف تلقائيًا؛ ولم تُجمع أي بيانات جديدة منذ الإصدار 1.13.'],
      ['p', 'يمكنك الاطلاع على مزيد من المعلومات حول كيفية تعامل ذلك المزوّد مع تلك البيانات في سياسة الخصوصية الخاصة به.'],

      ['h2', '6. حقوقك'],
      ['p', `يمكنك ممارسة حقوقك في الاطلاع والتصحيح والمحو والاعتراض والتقييد ونقل البيانات بمراسلتنا على عنوان التواصل المذكور أعلاه. وتجد تعليمات حذف بياناتك في ${link}. وإذا رأيت أن حقوقك لم تُحترم، فيمكنك تقديم شكوى إلى سلطة حماية البيانات في بلدك (في إسبانيا، الوكالة الإسبانية لحماية البيانات: ${AEPD}).`],
      ['p', 'إذا كنت قد استخدمت إصدارًا سابقًا يتضمن خدمة إحصاءات الاستخدام الاختيارية تلك وتريد حذف بياناته، فقد نطلب منك المعرّف المستعار لتثبيتك لمعالجة الطلب؛ ويمكنك أيضًا إعادة ضبطه بمسح بيانات التطبيق أو بإلغاء تثبيته.'],

      ['h2', '7. أذونات الجهاز'],
      ['p', 'لا يطلب التطبيق سوى إذن واحد: <strong>الاهتزاز</strong> (لمؤثرات العجلة). وهو إذن عادي لا يتطلب تأكيدك، ولا تُجمع أي معلومات من خلاله. ولا يطلب التطبيق الوصول إلى الإنترنت ولا إلى الموقع. ويُستخدم صوت الجهاز فقط لتشغيل أصوات العجلة.'],

      ['h2', '8. الأطفال'],
      ['p', 'GymRoulette غير موجَّه إلى الأطفال دون سن 14 عامًا، ولا يجمع بيانات شخصية من أي شخص، بمن فيهم القاصرون. وإذا رأيت أن قاصرًا قد زوّدنا ببيانات، فتواصل معنا وسنحذفها.'],

      ['h2', '9. الأمان'],
      ['p', 'لا تغادر بياناتك جهازك أبدًا، ولذلك فهي محمية بعزل التطبيقات الذي يوفّره نظام التشغيل. وتُقدَّم النسخة على الويب عبر HTTPS.'],

      ['h2', '10. التغييرات على هذه السياسة'],
      ['p', 'إذا تغيّرت السياسة، فسننشر النسخة الجديدة على العنوان نفسه ونحدّث التاريخ المعروض في أعلى الصفحة.'],
    ],
  },

  hi: {
    title: 'गोपनीयता नीति - GymRoulette',
    blocks: [
      ['h1', 'गोपनीयता नीति - GymRoulette'],
      ['p', 'अंतिम अपडेट: अक्टूबर 2026'],
      ['p', `यह नीति बताती है कि <strong>GymRoulette</strong> ऐप (Android, पहचानकर्ता ${APP_ID}, और ${WEB} पर इसका वेब संस्करण) कौन-सा डेटा प्रोसेस करता है और उसका उपयोग कैसे होता है।`],
      ['p', '<strong>संक्षेप में: GymRoulette पूरी तरह ऑफ़लाइन चलता है और कोई भी व्यक्तिगत डेटा न इकट्ठा करता है, न भेजता है, न साझा करता है।</strong>'],

      ['h2', '1. डेटा नियंत्रक'],
      ['p', `नियंत्रक: Javier Melendez (स्वतंत्र डेवलपर, "jabibi")।<br>संपर्क: ${MAIL}`],

      ['h2', '2. हम कौन-सा डेटा प्रोसेस करते हैं'],
      ['h3', '2.1 वह डेटा जो आपके डिवाइस पर ही रहता है'],
      ['p', 'आपके चक्र की सेटिंग (आपके बनाए या चालू किए हुए एक्सरसाइज़ और रेप्स) और यह जानकारी कि आप परिचय देख चुके हैं, केवल आपके डिवाइस की लोकल स्टोरेज (<code>localStorage</code>) में सहेजी जाती है। सेशन का इतिहास केवल मेमोरी में रहता है और ऐप बंद करते ही मिट जाता है। यह डेटा किसी सर्वर को नहीं भेजा जाता, और आप इसे ऐप का डेटा साफ़ करके या ऐप अनइंस्टॉल करके हटा सकते हैं।'],
      ['h3', '2.2 कोई एनालिटिक्स नहीं, कोई ट्रैकर नहीं, कोई विज्ञापन नहीं'],
      ['p', 'संस्करण 1.13 से ऐप में किसी भी तरह का एनालिटिक्स या ट्रैकिंग टूल नहीं है: इसमें कोई थर्ड-पार्टी SDK शामिल नहीं है, यह विज्ञापन नहीं दिखाता, विज्ञापन या ट्रैकिंग पहचानकर्ताओं का उपयोग नहीं करता, और ऊपर बताई गई लोकल स्टोरेज के अलावा कुकी का उपयोग नहीं करता, जो ऐप के चलने के लिए अत्यंत आवश्यक है। Android ऐप इंटरनेट से कनेक्ट नहीं होता।'],
      ['p', 'GymRoulette आपका नाम, ईमेल पता, संपर्क, फ़ोटो, माइक्रोफ़ोन, कैमरा, लोकेशन (अनुमानित भी नहीं), या स्वास्थ्य अथवा फ़िटनेस से जुड़ा कोई डेटा इकट्ठा <strong>नहीं</strong> करता। ऐप में यूज़र अकाउंट नहीं हैं।'],
      ['h3', '2.3 वेब संस्करण'],
      ['p', `यदि आप ${WEB} पर वेब संस्करण का उपयोग करते हैं, तो पेज Firebase Hosting से दिया जाता है, जो Google की एक सेवा है। किसी भी वेब सर्वर की तरह, यह पेज पहुँचाने के लिए ज़रूरी तकनीकी डेटा (जैसे आपका IP पता और ब्राउज़र का प्रकार) अपने सर्वर लॉग में प्रोसेस कर सकता है। वेब संस्करण स्वयं कोई अन्य डेटा इकट्ठा नहीं करता और कोई थर्ड-पार्टी स्क्रिप्ट लोड नहीं करता।`],

      ['h2', '3. कानूनी आधार'],
      ['p', 'ऐप व्यक्तिगत डेटा प्रोसेस नहीं करता, इसलिए किसी बात की सहमति देने की आवश्यकता नहीं है। आपकी सेटिंग को लोकल स्टोरेज में रखना ऐप के चलने के लिए अत्यंत आवश्यक है। वेब संस्करण के लिए, होस्टिंग प्रदाता द्वारा की जाने वाली तकनीकी प्रोसेसिंग पेज पहुँचाने के लिए ज़रूरी है (वैध हित, GDPR का अनुच्छेद 6(1)(f))।'],

      ['h2', '4. प्राप्तकर्ता और स्थानांतरण'],
      ['p', 'ऐप किसी को डेटा नहीं भेजता, इसलिए कोई प्राप्तकर्ता या अंतरराष्ट्रीय स्थानांतरण नहीं है। हम डेटा बेचते नहीं हैं और न ही उसे विज्ञापन नेटवर्क के साथ साझा करते हैं, और हम विज्ञापन नहीं दिखाते।'],

      ['h2', '5. डेटा कितने समय रखा जाता है'],
      ['p', 'लोकल डेटा तब तक रहता है जब तक आप उसे मिटा नहीं देते। ऐप के पुराने संस्करणों (1.13 से पहले) में किसी थर्ड-पार्टी की उपयोग-आँकड़ों की सेवा वैकल्पिक रूप से उपलब्ध थी। यदि आपने उसे स्वीकार किया था, तो उसके द्वारा इकट्ठा किया गया डेटा उस प्रदाता के पास केवल सेवा की प्रतिधारण अवधि (अधिकतम 14 महीने) तक रहता है और फिर अपने-आप मिट जाता है; संस्करण 1.13 से कोई नया डेटा इकट्ठा नहीं किया गया है।'],
      ['p', 'वह प्रदाता इस डेटा को कैसे संभालता है, इसकी अधिक जानकारी उसकी गोपनीयता नीति में मिल सकती है।'],

      ['h2', '6. आपके अधिकार'],
      ['p', `आप ऊपर दिए संपर्क पते पर लिखकर पहुँच, सुधार, मिटाने, आपत्ति, प्रतिबंध और पोर्टेबिलिटी के अपने अधिकारों का उपयोग कर सकते हैं। अपना डेटा मिटाने के निर्देश ${link} पर हैं। यदि आपको लगता है कि आपके अधिकारों का सम्मान नहीं किया गया, तो आप अपने डेटा संरक्षण प्राधिकरण में शिकायत दर्ज कर सकते हैं (स्पेन में, स्पैनिश डेटा संरक्षण एजेंसी: ${AEPD})।`],
      ['p', 'यदि आपने उपयोग-आँकड़ों की उस वैकल्पिक सेवा वाले किसी पुराने संस्करण का उपयोग किया था और उसका डेटा मिटवाना चाहते हैं, तो अनुरोध पर कार्रवाई के लिए हम आपसे आपके इंस्टॉलेशन का छद्मनामी पहचानकर्ता माँग सकते हैं; आप उसे ऐप का डेटा साफ़ करके या ऐप अनइंस्टॉल करके रीसेट भी कर सकते हैं।'],

      ['h2', '7. डिवाइस अनुमतियाँ'],
      ['p', 'ऐप केवल एक अनुमति माँगता है: <strong>वाइब्रेशन</strong> (चक्र के प्रभावों के लिए)। यह एक सामान्य अनुमति है जिसमें आपकी पुष्टि की आवश्यकता नहीं होती, और इससे कोई जानकारी इकट्ठा नहीं होती। ऐप इंटरनेट एक्सेस या लोकेशन की अनुमति नहीं माँगता। डिवाइस का ऑडियो केवल चक्र की आवाज़ें बजाने के लिए उपयोग होता है।'],

      ['h2', '8. बच्चे'],
      ['p', 'GymRoulette 14 वर्ष से कम उम्र के बच्चों के लिए नहीं है और किसी से भी, नाबालिगों सहित, व्यक्तिगत डेटा इकट्ठा नहीं करता। यदि आपको लगता है कि किसी नाबालिग ने हमें डेटा दिया है, तो हमसे संपर्क करें और हम उसे मिटा देंगे।'],

      ['h2', '9. सुरक्षा'],
      ['p', 'आपका डेटा कभी आपके डिवाइस से बाहर नहीं जाता, इसलिए वह ऑपरेटिंग सिस्टम के ऐप आइसोलेशन से सुरक्षित रहता है। वेब संस्करण HTTPS पर दिया जाता है।'],

      ['h2', '10. इस नीति में बदलाव'],
      ['p', 'यदि नीति बदलती है, तो हम नया संस्करण इसी पते पर प्रकाशित करेंगे और ऊपर दी गई तारीख अपडेट करेंगे।'],
    ],
  },

  tr: {
    title: 'Gizlilik Politikası - GymRoulette',
    blocks: [
      ['h1', 'Gizlilik Politikası - GymRoulette'],
      ['p', 'Son güncelleme: Ekim 2026'],
      ['p', `Bu politika, <strong>GymRoulette</strong> uygulamasının (Android, tanımlayıcı ${APP_ID} ve ${WEB} adresindeki web sürümü) hangi verileri işlediğini ve bunların nasıl kullanıldığını açıklar.`],
      ['p', '<strong>Kısaca: GymRoulette tamamen çevrimdışı çalışır ve hiçbir kişisel veriyi toplamaz, göndermez veya paylaşmaz.</strong>'],

      ['h2', '1. Veri sorumlusu'],
      ['p', `Sorumlu: Javier Melendez (bağımsız geliştirici, "jabibi").<br>İletişim: ${MAIL}`],

      ['h2', '2. İşlediğimiz veriler'],
      ['h3', '2.1 Cihazınızda kalan veriler'],
      ['p', 'Çark ayarlarınız (oluşturduğunuz veya etkinleştirdiğiniz egzersizler ve tekrarlar) ile tanıtımı daha önce gördüğünüz bilgisi yalnızca cihazınızın yerel depolama alanında (<code>localStorage</code>) saklanır. Oturum geçmişi yalnızca bellekte bulunur ve uygulamayı kapattığınızda kaybolur. Bu veriler hiçbir sunucuya gönderilmez; uygulamanın verilerini temizleyerek veya uygulamayı kaldırarak silebilirsiniz.'],
      ['h3', '2.2 Analiz, izleyici ve reklam yok'],
      ['p', '1.13 sürümünden itibaren uygulamada hiçbir türde analiz veya izleme aracı bulunmaz: herhangi bir üçüncü taraf SDK\'sı içermez, reklam göstermez, reklam veya izleme tanımlayıcıları kullanmaz ve uygulamanın çalışması için kesinlikle gerekli olan yukarıda açıklanan yerel depolama dışında çerez kullanmaz. Android uygulaması İnternet\'e bağlanmaz.'],
      ['p', 'GymRoulette adınızı, e-posta adresinizi, kişilerinizi, fotoğraflarınızı, mikrofonunuzu, kameranızı, konumunuzu (yaklaşık olarak bile) veya herhangi bir sağlık ya da fitness verinizi <strong>toplamaz</strong>. Uygulamada kullanıcı hesabı yoktur.'],
      ['h3', '2.3 Web sürümü'],
      ['p', `${WEB} adresindeki web sürümünü kullanırsanız sayfa, bir Google hizmeti olan Firebase Hosting tarafından sunulur. Her web sunucusunda olduğu gibi, sayfayı iletmek için gerekli teknik verileri (IP adresiniz ve tarayıcı türünüz gibi) sunucu günlüklerinde işleyebilir. Web sürümünün kendisi başka hiçbir veri toplamaz ve üçüncü taraf betik yüklemez.`],

      ['h2', '3. Hukuki dayanak'],
      ['p', 'Uygulama kişisel veri işlemediği için rıza gerektiren bir durum yoktur. Ayarlarınızın yerel depolama alanında saklanması uygulamanın çalışması için kesinlikle gereklidir. Web sürümünde, barındırma sağlayıcısının teknik işlemesi sayfanın iletilmesi için gereklidir (meşru menfaat: GDPR madde 6(1)(f); 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) madde 5/2-f).'],

      ['h2', '4. Alıcılar ve aktarımlar'],
      ['p', 'Uygulama verileri hiç kimseye göndermez; dolayısıyla alıcı veya yurt dışına aktarım yoktur. Veri satmayız, reklam ağlarıyla paylaşmayız ve reklam göstermeyiz.'],

      ['h2', '5. Saklama süresi'],
      ['p', 'Yerel veriler siz silene kadar saklanır. Uygulamanın önceki sürümleri (1.13\'ten önce) isteğe bağlı olarak bir üçüncü tarafın kullanım istatistikleri hizmetini sunuyordu. Kabul ettiyseniz topladığı veriler bu sağlayıcıda yalnızca hizmetin saklama süresi boyunca (en fazla 14 ay) kalır ve ardından otomatik olarak silinir; 1.13 sürümünden bu yana yeni veri toplanmamaktadır.'],
      ['p', 'Bu sağlayıcının bu verileri nasıl işlediği hakkında daha fazla bilgiyi gizlilik politikasında bulabilirsiniz.'],

      ['h2', '6. Haklarınız'],
      ['p', `GDPR ve KVKK (madde 11) kapsamındaki erişim, düzeltme, silme, itiraz, kısıtlama ve taşınabilirlik haklarınızı yukarıdaki iletişim adresine yazarak kullanabilirsiniz. Verilerinizin nasıl silineceğine ilişkin talimatlar ${link} adresindedir. Haklarınıza saygı gösterilmediğini düşünüyorsanız veri koruma otoritenize şikâyette bulunabilirsiniz (İspanya'da İspanya Veri Koruma Kurumu: ${AEPD}; Türkiye'de Kişisel Verileri Koruma Kurulu).`],
      ['p', 'isteğe bağlı kullanım istatistikleri hizmetini içeren önceki bir sürümü kullandıysanız ve verilerinizin silinmesini istiyorsanız, talebi işleme almak için sizden kurulumunuzun takma adlı tanımlayıcısını isteyebiliriz; bu tanımlayıcıyı uygulamanın verilerini temizleyerek veya uygulamayı kaldırarak da sıfırlayabilirsiniz.'],

      ['h2', '7. Cihaz izinleri'],
      ['p', 'Uygulama yalnızca bir izin ister: <strong>titreşim</strong> (çarkın efektleri için). Bu, onayınızı gerektirmeyen normal bir izindir ve bu izin üzerinden hiçbir bilgi toplanmaz. Uygulama İnternet erişimi veya konum izni istemez. Cihazın sesi yalnızca çarkın seslerini çalmak için kullanılır.'],

      ['h2', '8. Çocuklar'],
      ['p', 'GymRoulette 14 yaşın altındaki çocuklara yönelik değildir ve reşit olmayanlar dahil hiç kimseden kişisel veri toplamaz. Reşit olmayan birinin bize veri verdiğini düşünüyorsanız bizimle iletişime geçin; bu verileri sileriz.'],

      ['h2', '9. Güvenlik'],
      ['p', 'Verileriniz cihazınızdan hiç çıkmaz; bu nedenle işletim sisteminin uygulama yalıtımıyla korunur. Web sürümü HTTPS üzerinden sunulur.'],

      ['h2', '10. Bu politikadaki değişiklikler'],
      ['p', 'Politika değişirse yeni sürümü aynı adreste yayımlar ve en üstte gösterilen tarihi güncelleriz.'],
    ],
  },

};
