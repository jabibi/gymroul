# GymRoulette

Ruleta de ejercicios para entrenar. Gira la ruleta (con el botón o arrastrándola) y obtén un reto aleatorio con el formato `repeticiones × ejercicio`, por ejemplo **20 Burpee**.

Disponible como aplicación web (Firebase Hosting) y como app Android (Capacitor) a partir del mismo código.

## Características

- Ruleta en `canvas` con física de inercia independiente de la frecuencia de pantalla, sonido de "tick", fanfarria y vibración.
- Sectores generados automáticamente: repeticiones activas × ejercicios activos (por defecto 6 × 6 = 36).
- Configuración editable: activar/desactivar, crear y eliminar ejercicios (nombre, nombre corto, icono) y repeticiones (máx. 12 de cada).
- Selector con ≈100 iconos de muchas disciplinas (fuerza, calistenia, cardio, Hyrox, CrossFit, OCR, artes marciales, yoga, pilates, tai chi, deportes…) con búsqueda; no se admite texto libre ni emojis.
- Historial de la sesión con los retos completados.
- La configuración se guarda en `localStorage` (con versión de esquema y migraciones).
- Funciona sin conexión: Tailwind, Font Awesome y la fuente van empaquetados.
- Firebase Analytics solo se carga si el usuario da su consentimiento.

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
  audio.js             Sonido y vibración (háptica nativa en Android)
  analytics.js         Consentimiento y carga diferida de Firebase Analytics
  style.css            Tailwind + fuentes + iconos
public/                privacy.html, borrar-datos.html, creditos.html y 404.html (se copian tal cual al build)
test/                  Tests con Vitest
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
| `npm run deploy` | `build` + `firebase deploy --only hosting` |

## Despliegue web

```bash
npm run deploy
```

El proyecto de Firebase por defecto es `gymroul` (ver `.firebaserc`).

## App Android

Tras cualquier cambio, compila y sincroniza la copia de Android:

```bash
npm run build:android
npx cap open android
```

Generar el bundle de release (la firma no está configurada en el repositorio; usa tu propio keystore, que no debe subirse):

```bash
cd android && ./gradlew bundleRelease
```

Regenerar iconos y splash desde `assets/icon.png`:

```bash
npx capacitor-assets generate --android
```

## Seguridad y privacidad

- Content-Security-Policy estricta (sin `unsafe-inline`/`unsafe-eval` en scripts) y cabeceras de seguridad en `firebase.json`.
- La clave de API de Firebase del cliente no es secreta, pero conviene restringirla en Google Cloud Console (*APIs y servicios → Credenciales*) por referentes HTTP (`gymroul.web.app`, `gymroul.firebaseapp.com`) y por aplicación Android (`eus.jabibi.gymroul`).
- Política de privacidad: [`public/privacy.html`](public/privacy.html).

## Stack

Capacitor 8 · Vite · Tailwind CSS 3 · Iconify (`@iconify/tailwind`, MDI y Game Icons) · Firebase Hosting y Analytics · Canvas 2D y Web Audio API · Vitest

## Iconos de los ejercicios

El catálogo está en [`src/icons.js`](src/icons.js). Para añadir un icono:

1. Busca el nombre en [icones.js.org](https://icones.js.org) (conjuntos `mdi` o `game-icons`).
2. Añade una entrada con la clase **escrita completa** (`icon-[mdi--karate]`): Tailwind solo genera el CSS de las clases que aparecen literalmente en el código.
3. Ejecuta `npm test`: comprueba que el icono existe y que los ids no se repiten.

Los iconos se compilan a máscaras CSS durante el build (sin peticiones en ejecución). Las licencias están en [`public/creditos.html`](public/creditos.html); Game Icons es CC BY 3.0 y exige atribución.

