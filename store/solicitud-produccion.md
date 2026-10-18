# Solicitud de acceso a producción

Respuestas preparadas para el formulario «Solicitar acceso a producción» de Play Console. Van en inglés porque es el idioma que mejor entiende el equipo de revisión.

## Datos de la prueba cerrada
- Versión: 1.15 (Be Reborn), versionCode 15.
- Testers: 16, conseguidos con la app «12 Testers - Testers Community» (Duho Corp).
- Requisitos de Play: versión de prueba cerrada publicada, al menos 12 testers que aceptaron participar y 14 días de prueba, todos cumplidos.

## 1. ¿Cómo reclutaste a los testers y cómo interactuaron con la app?
> We recruited 16 testers through the "12 Testers - Testers Community" app, a community where developers test each other's apps. The testers installed GymRoulette from the closed-testing link and used it for more than 14 days: spinning the wheel, customising their exercises and repetition ranges, reviewing their history and sharing results. We collected their feedback through the community and used it to improve the app.

## 2. Resume los comentarios recibidos y los cambios que hiciste
> Three pieces of tester feedback led to our changes:
> 1. Default exercises were shown in English regardless of the app language. They are now translated into the user's language (20 languages), while the user's own exercises stay as typed.
> 2. Testers wanted different repetitions for each exercise and a cleaner wheel. Each exercise now has its own repetition range, and the wheel shows only the exercises; the repetitions are drawn when the spin ends.
> 3. Native speakers reviewed the translations in context. Testers who are native speakers of Japanese, Arabic, Turkish, English, Polish, Dutch, Portuguese and Spanish sent us feedback on the app in their own language, through Google Play and the testers' community. For example, a native Japanese tester confirmed that the translated exercise names now appear on the wheel and result card, and pointed out that the short wheel label of one exercise ("Split Jumps") was ambiguous in Japanese, where the short form on its own reads as the leg split rather than a jump. We changed it to the full name for the next version, which is being released shortly.

## 3. ¿Por qué tu app está lista para producción?
> The app is complete and ready after the closed test. Over the 14+ days of testing, none of our 16 testers reported crashes or freezes; the feedback we received was only suggestions and positive ratings. It requires no account and no Internet permission (only VIBRATE), collects no data and contains no ads. It supports 20 languages, including right-to-left Arabic, and native speakers of eight of those languages (Japanese, Arabic, Turkish, English, Polish, Dutch, Portuguese and Spanish) have reviewed the translations. Every release passes our CI (type checking, automated tests and release builds). The store listing, privacy policy and data safety declarations are complete.

> Android vitals aún muestra «Datos no disponibles» (pocos usuarios), así que la respuesta no se apoya en esos datos. Confirmado por ti: ningún tester comunicó cuelgues, solo sugerencias y valoraciones positivas.

> Confirmado por ti: el tester japonés es nativo y hay revisores nativos de árabe, turco, inglés, polaco, neerlandés, portugués y español, todos con feedback enviado en Play Store o en la app de testers. El único caso con cambio concreto en la app es el del japonés (reseña de 4 estrellas del 17 oct 2026, OPPO Reno5 A, versión 1.15); en los demás idiomas el texto solo dice que revisaron, sin inventar correcciones. Se describe el caso sin nombrar al usuario. Cuidado con los límites de caracteres de cada campo del formulario. La corrección entra en la 1.16 (aún sin publicar).

## 4. Público y uso previsto (si lo preguntan)
> People aged 16 and over who want a fun, random way to choose their workout at the gym or at home. We expect organic growth through store search and word of mouth.

## Qué es Android vitals
Es un apartado de Play Console con datos de calidad que Google recoge de los dispositivos reales: porcentaje de cierres inesperados (cuelgues) y de aplicación que no responde (ANR). Se encuentra en **Calidad > Android vitals > Resumen** (en algunas cuentas, «Supervisar y mejorar»). Si no aparece ningún dato o los porcentajes son 0 %, no ha habido cuelgues. Con pocos usuarios aparece «Datos no disponibles» (es el caso de la 1.15), y entonces la respuesta 3 no debe apoyarse en esos datos.
