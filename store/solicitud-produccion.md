# Solicitud de acceso a producción

Respuestas preparadas para el formulario «Solicitar acceso a producción» de Play Console. Cada respuesta está en inglés y en español, con el mismo contenido: se puede enviar la que se prefiera. Si hay que elegir una sola, el inglés es el idioma que mejor entiende el equipo de revisión.

## Datos de la prueba cerrada
- Versión con la que empezó la prueba: 1.0.8, versionCode 8. Durante la prueba se publicaron versiones nuevas con los cambios derivados del feedback de los testers: la 1.15 (Be Reborn, versionCode 15) y la 1.16 (Six Pack, versionCode 16), ya publicada en los dos canales de la prueba cerrada (Alpha y googlegroups). Aún no hay acceso a pruebas abiertas ni a producción.
- Testers: 15, conseguidos con la app «12 Testers - Testers Community» (Duho Corp). Los grupos de pruebas se forman con 16 miembros, dueño de cada app incluido, y cada miembro prueba las apps del resto, así que cada app la prueban los otros 15.
- Requisitos de Play: versión de prueba cerrada publicada, al menos 12 testers que aceptaron participar y 14 días de prueba, todos cumplidos.

## 1. ¿Cómo reclutaste a los testers y cómo interactuaron con la app?

**English**
> We recruited 15 testers through the "12 Testers - Testers Community" app, a community where developers test each other's apps. The testers installed GymRoulette from the closed-testing link and used it for more than 14 days: spinning the wheel, customising their exercises and repetition ranges, reviewing their history and sharing results. We collected their feedback through the community and used it to improve the app.

**Español**
> Reclutamos a 15 testers con la app «12 Testers - Testers Community», una comunidad en la que los desarrolladores prueban las apps de los demás. Los testers instalaron GymRoulette desde el enlace de la prueba cerrada y la usaron durante más de 14 días: giraron la ruleta, personalizaron sus ejercicios y sus rangos de repeticiones, consultaron su historial y compartieron resultados. Recogimos sus comentarios a través de la comunidad y los usamos para mejorar la app.

## 2. Resume los comentarios recibidos y los cambios que hiciste

**English**
> Three pieces of tester feedback led to our changes:
> 1. Default exercises were shown in English regardless of the app language. They are now translated into the user's language (20 languages), while the user's own exercises stay as typed.
> 2. Testers wanted different repetitions for each exercise and a cleaner wheel. Each exercise now has its own repetition range, and the wheel shows only the exercises; the repetitions are drawn when the spin ends.
> 3. Native speakers reviewed the translations in context. Testers who are native speakers of Japanese, Arabic, Turkish, English, Polish, Dutch, Portuguese and Spanish sent us feedback on the app in their own language, through Google Play and the testers' community, and we reviewed the Basque translation ourselves as native speakers. For example, a native Japanese tester confirmed that the translated exercise names now appear on the wheel and result card, and pointed out that the short wheel label of one exercise ("Split Jumps") was ambiguous in Japanese, where the short form on its own reads as the leg split rather than a jump. We changed it to the full name in version 1.16, which is already live in our closed-testing channels.

**Español**
> Tres comentarios de los testers nos llevaron a hacer cambios:
> 1. Los ejercicios por defecto se mostraban en inglés sea cual fuese el idioma de la app. Ahora se muestran traducidos al idioma del usuario (20 idiomas), y los ejercicios que crea el usuario se quedan como los escribió.
> 2. Los testers querían repeticiones distintas para cada ejercicio y una ruleta menos recargada. Ahora cada ejercicio tiene su propio rango de repeticiones y la ruleta muestra solo los ejercicios; las repeticiones se sortean al terminar el giro.
> 3. Hablantes nativos revisaron las traducciones en contexto. Testers nativos de japonés, árabe, turco, inglés, polaco, neerlandés, portugués y español nos enviaron comentarios sobre la app en su idioma, por Google Play y por la comunidad de testers, y la traducción al euskera la revisamos nosotros mismos como hablantes nativos. Por ejemplo, un tester nativo de japonés confirmó que los nombres de ejercicios traducidos ya aparecen en la ruleta y en la tarjeta de resultado, y señaló que el nombre corto de un ejercicio («Split Jumps») era ambiguo en japonés, donde la forma corta por sí sola se lee como la apertura de piernas y no como un salto. Lo cambiamos por el nombre completo en la versión 1.16, que ya está disponible en nuestros canales de prueba cerrada.

## 3. ¿Por qué tu app está lista para producción?

**English**
> The app is complete and ready after the closed test. Over the 14+ days of testing, none of our 15 testers reported crashes or freezes; the feedback we received was only suggestions and positive ratings. It requires no account and no Internet permission (only VIBRATE), collects no data and contains no ads. It supports 20 languages, including right-to-left Arabic, and native speakers of nine of those languages (Japanese, Arabic, Turkish, English, Polish, Dutch, Portuguese, Spanish and Basque) have reviewed the translations. Every release passes our CI (type checking, automated tests and release builds). The store listing, privacy policy and data safety declarations are complete.

**Español**
> La app está completa y lista tras la prueba cerrada. Durante los más de 14 días de prueba, ninguno de nuestros 15 testers comunicó cuelgues ni bloqueos; los comentarios que recibimos fueron solo sugerencias y valoraciones positivas. No requiere cuenta ni permiso de Internet (solo VIBRATE), no recoge datos y no contiene anuncios. Está disponible en 20 idiomas, incluido el árabe, que se escribe de derecha a izquierda, y hablantes nativos de nueve de ellos (japonés, árabe, turco, inglés, polaco, neerlandés, portugués, español y euskera) han revisado las traducciones. Cada versión pasa nuestra integración continua (comprobación de tipos, pruebas automáticas y compilaciones de release). La ficha de la tienda, la política de privacidad y las declaraciones de seguridad de los datos están completas.

> Notas para quien envíe el formulario (no van en la respuesta):
> - Android vitals aún muestra «Datos no disponibles» (pocos usuarios), así que la respuesta no se apoya en esos datos. Confirmado por ti: ningún tester comunicó cuelgues, solo sugerencias y valoraciones positivas.
> - Confirmado por ti: el tester japonés es nativo y hay revisores nativos de árabe, turco, inglés, polaco, neerlandés, portugués y español, todos con feedback enviado en Play Store o en la app de testers. El euskera lo has revisado tú, que eres hablante: figura como revisión propia del equipo y no como feedback de un tester. El único caso con cambio concreto en la app es el del japonés (reseña de 4 estrellas del 17 oct 2026, OPPO Reno5 A, versión 1.15); en los demás idiomas el texto solo dice que revisaron, sin inventar correcciones. Se describe el caso sin nombrar al usuario.
> - La 1.16 (Six Pack) ya está publicada en las pruebas cerradas (Alpha y googlegroups, actualizadas el 18 oct 2026), y el cambio del japonés va en ella. No está en producción: todavía no hay acceso a pruebas abiertas ni a producción.
> - Cuidado con los límites de caracteres de cada campo del formulario; el español suele ocupar algo más que el inglés.

## 4. Público y uso previsto (si lo preguntan)

**English**
> People aged 16 and over who want a fun, random way to choose their workout at the gym or at home. We expect organic growth through store search and word of mouth.

**Español**
> Personas de 16 años en adelante que quieren una forma divertida y aleatoria de elegir su entrenamiento en el gimnasio o en casa. Esperamos un crecimiento orgánico a través del buscador de la tienda y el boca a boca.

## Qué es Android vitals
Es un apartado de Play Console con datos de calidad que Google recoge de los dispositivos reales: porcentaje de cierres inesperados (cuelgues) y de aplicación que no responde (ANR). Se encuentra en **Calidad > Android vitals > Resumen** (en algunas cuentas, «Supervisar y mejorar»). Si no aparece ningún dato o los porcentajes son 0 %, no ha habido cuelgues. Con pocos usuarios aparece «Datos no disponibles» (era el caso durante la prueba), y entonces la respuesta 3 no debe apoyarse en esos datos.
