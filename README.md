# GymRoulette

Ruleta de ejercicios para entrenar. Gira la ruleta (con el botón o arrastrándola) y obtén un reto aleatorio con el formato `repeticiones × ejercicio`, por ejemplo **20 Burpee**: la ruleta solo muestra los ejercicios y las repeticiones salen al terminar el giro, dentro del rango de cada ejercicio.

Disponible como aplicación web (Firebase Hosting) y como app Android (Capacitor) a partir del mismo código.

## Características

- Ruleta en `canvas` con física de inercia independiente de la frecuencia de pantalla, sonido de "tick", fanfarria y vibración.
- Un sector por ejercicio activo (por defecto 6); las repeticiones se sortean al parar, entre el mínimo y el máximo de ese ejercicio.
- Configuración editable: activar/desactivar, crear y eliminar ejercicios (nombre, nombre corto, icono) y rango de repeticiones de cada uno (máx. 12 ejercicios).
- Selector con ≈100 iconos de muchas disciplinas (fuerza, calistenia, cardio, fitness funcional, OCR, artes marciales, yoga, pilates, tai chi, deportes…) con búsqueda; no se admite texto libre ni emojis.
- Interfaz en 20 idiomas: árabe (de derecha a izquierda), inglés (EE. UU., Reino Unido y Australia), español (España y Latinoamérica), euskera, gallego, catalán, francés (Francia y Canadá), alemán, italiano, japonés, neerlandés, polaco, hindi, turco y portugués (Brasil y Portugal). Se elige según el dispositivo y se puede cambiar en Configuración.
- Historial de la sesión con los retos completados.
- La configuración se guarda en `localStorage` (con versión de esquema y migraciones).
- Funciona sin conexión: Tailwind, Font Awesome y la fuente van empaquetados. La app de Android no declara el permiso de Internet.
- Sin analítica, sin anuncios, sin rastreadores y sin acceso a la ubicación: no envía ningún dato fuera del dispositivo.
- Se abre directamente la ruleta, sin introducción: el enlace «Compromiso de privacidad» (en Configuración) resume qué no hace la app con tus datos.
- Compartir el reto: botón en el resultado que genera una imagen y un texto con el enlace a la app y los entrega al menú de compartir, todo en el dispositivo y sin conexión.

## Hoja de ruta

Los objetivos de las próximas versiones están en [`ROADMAP.md`](ROADMAP.md).

## Estructura

```
index.html             Marcado de la app (entrada de Vite)
src/
  main.js              Arranque y conexión de módulos (delegación de eventos data-action)
  store.js             Catálogo y selección activa, localStorage y migraciones
  wheel-math.js        Lógica pura: sector ganador, combinaciones, normalización de ángulos
  wheel.js             Canvas, física y arrastre
  ui.js                Modales (con soporte de botón Atrás), historial, configuración
  icons.js             Catálogo cerrado de iconos (≈100) y búsqueda
  i18n/                Idiomas: índice, detección y locales/ (un archivo por idioma; las variantes regionales solo redefinen lo que cambia)
  audio.js             Sonido y vibración (háptica nativa en Android)
  style.css            Tailwind + fuentes + iconos
ROADMAP.md             Objetivos de las próximas versiones
legal/                 Contenido de las páginas legales por idioma (fuente de public/*.html)
public/                Páginas multilingües generadas (privacy, borrar-datos, creditos, 404, pruebas-cerradas), legal.js, favicon
store/                 Ficha de Google Play por idioma: textos, gráfico de funciones y capturas (npm run store)
test/                  Tests con Vitest (lógica, i18n, iconos, páginas legales y ficha de Play)
CLAUDE.md              Guía para trabajar con Claude Code en el repositorio
scripts/               build-icons.mjs (logo e iconos), build-legal.mjs (páginas legales), build-store-assets.mjs (capturas de Play), build-release-notes.mjs (novedades), build-listing-csv.mjs (CSV de la ficha)
assets/                Logo y PNG de iconos/splash generados (fuente: scripts/build-icons.mjs)
www/                   Salida del build (no versionada; la usan Firebase y Capacitor)
android/               Proyecto Android generado por Capacitor
firebase.json          Hosting: cabeceras de seguridad y caché
```

## Requisitos

- Node.js 20+ y npm
- [Firebase CLI](https://firebase.google.com/docs/cli) (para desplegar la web)
- Android Studio / JDK 21 (para compilar la app Android)

## Desarrollo

```bash
npm install
npm run dev
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo de Vite |
| `npm run build` | Compila la app a `www/` |
| `npm test` | Ejecuta los tests (Vitest) |
| `npm run typecheck` | Comprueba los tipos JSDoc con `tsc` |
| `npm run cap:sync` | Solo `cap sync android` (copia `www/` al proyecto Android, sin compilar) |
| `npm run build:android` | `build` + `cap:sync`: compila en `www/` y sincroniza Android |
| `npm run check:layout` | Recorre la app en cada idioma y tamaño de móvil y avisa de textos cortados o solapados |
| `npm run store` | `build` + capturas, novedades y CSV de la ficha de Play |
| `npm run release-notes` | Solo novedades de la versión y CSV de la ficha |
| `npm run legal` | Regenera las páginas legales de `public/` |
| `npm run icons` | Regenera logo, iconos y pantalla de bienvenida |
| `npm run deploy` | `build` + `firebase deploy --only hosting` |

## Despliegue web

```bash
npm run deploy
```

El proyecto de Firebase por defecto es `gymroul` (ver `.firebaserc`).

## Versión

La única fuente es `package.json`: `version` (semver; la app muestra `major.minor`), `versionCode` (entero que crece en cada subida a Play) y `versionCodename`. `android/app/build.gradle` las lee de ahí, así que no hay que tocar Gradle al publicar. Tras subirla, ejecuta `npm run release-notes` y actualiza `store/datos-de-la-ficha.md`.

## App Android

Tras cualquier cambio, compila y sincroniza la copia de Android:

```bash
npm run build:android
npx cap open android
```

Generar el bundle de release (la firma no está configurada en el repositorio; usa tu propio keystore, que no debe subirse, y no añadas contraseñas a `build.gradle`):

```bash
cd android && ./gradlew bundleRelease
```

Regenerar el logo, los iconos del lanzador y la pantalla de bienvenida:

```bash
npm run icons
```

Un solo diseño (la ruleta) vive en [`scripts/build-icons.mjs`](scripts/build-icons.mjs). El script escribe en `assets/` los PNG que consume `@capacitor/assets` (`icon-only`, `icon-foreground`, `icon-background`, `splash` y `splash-dark`), más `assets/logo.svg` y `public/favicon.svg` (cabecera de la app y pestaña del navegador), y a continuación ejecuta `capacitor-assets generate --android`. Para cambiar colores o forma del logo, edita ese script, no los PNG. Después, `npm run build:android` para llevarlo a la app.

## Seguridad y privacidad

- Content-Security-Policy estricta en `index.html` (solo `'self'`; sin `unsafe-inline`/`unsafe-eval` en scripts) y cabeceras de seguridad en `firebase.json`.
- No hay claves ni SDK de terceros en el cliente: la app no contacta con ningún servidor.
- Política de privacidad: [`public/privacy.html`](public/privacy.html).

## Stack

Capacitor 8 · Vite · Tailwind CSS 3 · Iconify (`@iconify/tailwind`, MDI y Game Icons) · Firebase Hosting · Canvas 2D y Web Audio API · Vitest

## Iconos de los ejercicios

El catálogo está en [`src/icons.js`](src/icons.js). Para añadir un icono:

1. Busca el nombre en [icones.js.org](https://icones.js.org) (conjuntos `mdi` o `game-icons`).
2. Añade una entrada con la clase **escrita completa** (`icon-[mdi--karate]`): Tailwind solo genera el CSS de las clases que aparecen literalmente en el código.
3. Ejecuta `npm test`: comprueba que el icono existe y que los ids no se repiten.

Los iconos se compilan a máscaras CSS durante el build (sin peticiones en ejecución). Las licencias están en [`public/credits.html`](public/credits.html); Game Icons es CC BY 3.0 y exige atribución.

## Idiomas

Los textos de la interfaz están en `src/i18n/locales/<idioma>.js` (el inglés es la fuente de verdad y el respaldo). Para añadir o cambiar un texto:

1. Añade la clave en `en.js` y úsala con `t('clave')` en el código o con `data-i18n="clave"` en `index.html`.
2. Tradúcela en todos los idiomas; `npm test` falla si falta alguna clave, si cambian los parámetros `{x}` o si falta la etiqueta de algún icono.
3. Las variantes regionales (`en-GB`, `es-419`, `fr-CA`, `pt-PT`) heredan de su idioma base: solo hay que escribir lo que difiere.

El buscador de iconos mira las etiquetas y palabras clave de **todos** los idiomas, así que «boxeo», «boxing» y «boxe» encuentran el mismo icono.

Las páginas legales (`legal/*.mjs` → `public/*.html`) contienen todos los idiomas en cada página y muestran el que pide `?lang=` o el del navegador (inglés si no hay coincidencia). Tras editarlas, `npm run legal` (o `npm run build`) las regenera. `closed-testing.html` es la invitación para los testers de la prueba cerrada de Google Play; tiene un diseño propio con pasos numerados.

La ficha de Google Play de cada idioma, con sus capturas, se genera con `npm run store`; ver [`store/README.md`](store/README.md).

