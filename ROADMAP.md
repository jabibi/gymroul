# Hoja de ruta

Objetivos de las próximas versiones. Lo ya publicado está en el historial de commits y en las notas de cada versión (`store/notas-de-la-version.txt`).

## 1.11 (SloMo): en preparación

- Alemán e italiano en toda la aplicación, la ficha de Google Play y las páginas de privacidad, eliminación de datos, créditos, 404 y prueba cerrada.
- Firebase Analytics sigue siendo opcional en esta versión.

## Siguiente versión: sin seguimiento y totalmente sin conexión

Objetivo: que la aplicación sea totalmente offline y no recopile ningún dato innecesario.

### 1. Eliminar Firebase Analytics por completo

- Quitar `src/analytics.js`, la pantalla y las cadenas de consentimiento (todas las claves de i18n asociadas) y el interruptor de analítica de Configuración.
- Quitar la dependencia `firebase` del proyecto (`package.json` y `package-lock.json`). Firebase Hosting y la CLI siguen usándose solo para publicar la web.
- Quitar la clave de API y la configuración de Firebase del código cliente, y revisar la CSP de `firebase.json` (ya no hacen falta los orígenes de Google Analytics).
- Si hay datos guardados del consentimiento (`gymroulette_analytics_consent`), limpiarlos en una migración de `src/store.js`.
- Actualizar los tests y la política de privacidad (`legal/privacy.mjs`) en todos los idiomas, y la sección «Seguridad de los datos» de Play Console (`store/datos-de-la-ficha.md`).

### 2. Introducción de dos diapositivas en la primera apertura

Sustituye al diálogo de aceptar o rechazar la analítica, que deja de existir.

- Diapositiva 1: cómo funciona la ruleta (girar con el botón o arrastrando, reto de «repeticiones × ejercicio», marcar como hecho o saltar).
- Diapositiva 2: la aplicación es totalmente offline, sin anuncios, sin trackers (no envía información fuera de la app), sin cookies innecesarias y sin acceso a la ubicación del dispositivo.
- En la parte superior, el botón `Skip` en inglés, traducido en el resto de idiomas. Se puede saltar en cualquier momento.
- Se muestra solo la primera vez (guardar en `localStorage` que ya se vio) y debe respetar el botón Atrás de Android y el tema claro/oscuro.
- Textos en los 13 idiomas de la app; el test de cobertura de i18n ya exige que no falte ninguna clave.

### 3. Ficha de Google Play y páginas web

- Rehacer las descripciones de los 13 idiomas para indicar claramente que la aplicación es totalmente offline y no recopila datos innecesarios.
- Rehacer capturas y gráficos de funciones (la primera apertura ya no muestra el diálogo de analítica; considerar una captura de la introducción).
- Actualizar `pruebas-cerradas`, privacidad y eliminación de datos para reflejar que no hay recopilación de datos.
- Revisar la declaración de «Seguridad de los datos» en Play Console: sin datos recopilados ni compartidos.
- Versión sugerida: 1.12 (subir `package.json`: `version`, `versionCode` y `versionCodename`).

## Nuevos idiomas: polaco, hindi, turco e inglés de Australia

Mismo alcance que el alemán y el italiano: toda la aplicación, la ficha de Google Play y las páginas legales.

- Códigos: `pl` (Polski), `hi` (हिन्दी), `tr` (Türkçe) y `en-AU`.
- `en-AU` es una variante regional como `en-GB`: solo redefine lo que difiere de `en.js` (por ejemplo `Add`/`Create`, ortografía y vocabulario australiano). Va en la app y en la ficha de Play, pero no en las páginas legales.
- Pasarían a ser 17 idiomas en la app y en la ficha de Play, y 13 en las páginas legales.
- Un idioma nuevo hay que añadirlo en `src/i18n/index.js`, `store/listing.mjs` y `legal/index.mjs` (los tres sitios de `CLAUDE.md`), además de `scripts/build-release-notes.mjs`, `test/i18n.test.js` y `test/store-listing.test.js`.
- Hindi: comprobar que la tipografía de la app y el Chromium que genera las capturas (`npm run store`) tienen glifos devanagari, para no ver recuadros vacíos. Las etiquetas del catálogo de iconos son largas en este idioma, así que revisar los desbordes en Configuración.
- Turco: cuidar las mayúsculas (`İ`/`ı`) en los títulos en mayúsculas de la interfaz.
- Revisión por hablantes nativos de todos los textos antes de publicar, igual que con alemán e italiano.
- Versión sugerida: la siguiente que se publique (subir `version`, `versionCode` y `versionCodename` en `package.json`).

## Ideas sin fecha

_Apunta aquí lo que aún no tiene versión asignada._
