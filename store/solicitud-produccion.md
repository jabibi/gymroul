# Solicitud de acceso a producción

Respuestas preparadas para el formulario «Solicitar acceso a producción» de Play Console. Van en inglés porque es el idioma que mejor entiende el equipo de revisión.

## Datos de la prueba cerrada
- Versión: 1.15 (Be Reborn), versionCode 15.
- Testers: 16, conseguidos con la app «12 Testers - Testers Community» (Duho Corp).
- Requisitos de Play: versión de prueba cerrada publicada, al menos 12 testers que aceptaron participar y 14 días de prueba, todos cumplidos.

## 1. ¿Cómo reclutaste a los testers y cómo interactuaron con la app?
> We recruited 16 testers through the "12 Testers - Testers Community" app, a community where developers test each other's apps. The testers installed GymRoulette from the closed-testing link and used it for more than 14 days: spinning the wheel, customising their exercises and repetition ranges, reviewing their history and sharing results. We collected their feedback through the community and used it to improve the app.

## 2. Resume los comentarios recibidos y los cambios que hiciste
> Two pieces of tester feedback led to the biggest changes in version 1.15:
> 1. Default exercises were shown in English regardless of the app language. They are now translated into the user's language (20 languages), while the user's own exercises stay as typed.
> 2. Testers wanted different repetitions for each exercise and a cleaner wheel. Each exercise now has its own repetition range, and the wheel shows only the exercises; the repetitions are drawn when the spin ends.

## 3. ¿Por qué tu app está lista para producción?
> The app is complete and stable after the closed test. It needs no account and no Internet permission (only VIBRATE), collects no data, and contains no ads. It supports 20 languages, including right-to-left Arabic. Every release passes our CI (type checking, automated tests and release builds). The store listing, privacy policy and data safety declarations are complete.

> Antes de enviar, mira «Android vitals» (ver abajo) y, si hubiera cuelgues, no uses la frase «stable» sin matizarla.

## 4. Público y uso previsto (si lo preguntan)
> People aged 16 and over who want a fun, random way to choose their workout at the gym or at home. We expect organic growth through store search and word of mouth.

## Qué es Android vitals
Es un apartado de Play Console con datos de calidad que Google recoge de los dispositivos reales: porcentaje de cierres inesperados (cuelgues) y de aplicación que no responde (ANR). Se encuentra en **Calidad > Android vitals > Resumen** (en algunas cuentas, «Supervisar y mejorar»). Si no aparece ningún dato o los porcentajes son 0 %, no ha habido cuelgues. Con pocos usuarios puede decir «datos insuficientes», y entonces basta con no afirmar nada sobre cuelgues en la respuesta 3.
