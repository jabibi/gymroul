# CLAUDE.md

GymRoulette: ruleta de ejercicios. Una sola base de código para web (Firebase Hosting) y Android (Capacitor 8). JavaScript con tipos JSDoc (sin framework), Vite, Tailwind 3 y Vitest. Todo el texto de cara al usuario, los comentarios y los commits están en español.

## Comandos

```bash
npm run dev          # Vite
npm run typecheck    # tsc sobre JSDoc (jsconfig.json)
npm test             # Vitest (test/)
npm run build        # build-legal + vite build -> www/
npm run build:android  # build + cap sync android
npm run check:layout # recorre la app en cada idioma y móvil y busca textos cortados o solapados (Chromium)
npm run store        # ficha de Google Play (capturas, notas, CSV); requiere Chromium vía puppeteer-core
```

CI (`.github/workflows/ci.yml`) ejecuta `typecheck`, `test` y `build`, y en un job aparte compila el Android (`assembleRelease` y `bundleRelease`). Antes de dar algo por terminado, pasa los tres.

## Estructura

- `src/main.js`: arranque; los eventos se conectan por delegación con `data-action` en `index.html`.
- `src/wheel-math.js`: lógica pura (sector ganador, combinaciones, ángulos). Es lo que más se testea; mantenla sin DOM.
- `src/wheel.js`: canvas, física de inercia (independiente de la frecuencia de pantalla) y arrastre.
- `src/store.js`: catálogo y selección en `localStorage` con versión de esquema y migraciones. Si cambias la forma de los datos guardados, sube la versión y añade la migración.
- `src/ui.js`: modales (con botón Atrás), historial y configuración.
- `src/icons.js`: catálogo cerrado de iconos.
- `src/i18n/`: `locales/en.js` es la fuente de verdad; las variantes regionales (`en-GB`, `en-AU`, `es-419`, `fr-CA`, `pt-PT`) solo redefinen lo que difiere. Son 20 idiomas en la app y en la ficha de Play (`store/listing.mjs`); las páginas legales tienen 16 (sin variantes regionales, `legal/index.mjs`). El árabe (`ar`) se escribe de derecha a izquierda: `setLanguage` pone `dir="rtl"` en `<html>` (`RTL_LANGUAGES` en `src/i18n/index.js`; las páginas legales usan `RTL_LANGUAGES` de `legal/index.mjs`). Un idioma nuevo hay que añadirlo en los tres sitios.
- **Sin analítica ni conexión**: la app no envía datos a ningún sitio y Android no declara el permiso de Internet (solo `VIBRATE`). No añadas SDK de terceros, scripts externos ni `INTERNET` sin actualizar la política de privacidad, la ficha de Play y la sección «Seguridad de los datos».
- **Compartir el reto** (`src/share.js`, botón del modal de resultado): la imagen PNG y el texto con el enlace a Play se generan en local y se entregan al menú de compartir del sistema con `@capacitor/share` y `@capacitor/filesystem` (plugins locales, sin permisos ni red); la imagen queda en la caché de la app y se borra al compartir de nuevo o al abrir la app. En el navegador usa la API de compartir y, si no hay, descarga la imagen. No añadas permisos ni envíes la imagen a ningún servidor. La imagen se hace con colores planos a propósito: con degradados el PNG pesa más de 1 MB y tarda segundos en pasar por el puente de Capacitor (base64). Mientras se prepara se muestra `#shareLoading` (ruleta de carga, app inerte) y se puede cancelar con el botón o con Atrás.
- El enlace «Compromiso de privacidad» (Configuración) abre un modal con el resumen de las prácticas (`commitmentModal` en `index.html`, `openCommitment` en `src/ui.js`) que enlaza la política completa; si cambian las prácticas, actualiza esos textos en todos los idiomas.
- Al abrir la app se ve directamente la ruleta: no hay introducción ni pasos iniciales (se quitó en la 1.14 para dar valor en menos de 10 segundos).
- `legal/*.mjs` -> `public/*.html` (generadas por `scripts/build-legal.mjs`). Edita `legal/`, no `public/`.
- `store/`: ficha de Play por idioma (generada). `assets/` e iconos de Android: generados por `npm run icons`; edita `scripts/build-icons.mjs`, no los PNG. `npm run icons` termina con `scripts/fix-adaptive-icon.mjs`, que deja el fondo del icono adaptativo a lienzo completo (capacitor-assets lo mete en un inset que dejaba una raya oscura en el borde del círculo); no lo quites.
- `www/` es la salida del build y no se versiona. `android/` lo genera Capacitor, pero `app/build.gradle` y `MainActivity` son propios.

## Reglas que no son obvias

- **Iconos**: la clase de Tailwind debe aparecer literal (`icon-[mdi--karate]`); si se compone con una cadena, no se genera el CSS. Hay que añadir etiquetas del icono en todos los idiomas.
- **Textos**: toda clave nueva va en `en.js` y en todos los idiomas, con `t('clave')` o `data-i18n`. `npm test` falla si falta alguna o si cambian los parámetros `{x}`.
- **Derecha a izquierda (árabe)**: usa propiedades lógicas (`ps-`/`pe-`/`start`/`end`, `rtl:space-x-reverse`) y no `pl-`/`pr-`/`left`/`right` para espaciar o colocar texto. El árabe es cursiva: el espaciado entre letras (`tracking-*`) lo rompe y está anulado con `:lang(ar)` en `src/style.css`. Tras cambiar la interfaz o los textos, ejecuta `npm run check:layout`.
- **Tailwind**: no escribas ejemplos de clases en comentarios; el escáner los detecta y emite avisos.
- **CSP estricta** (meta en `index.html`, solo `'self'`): sin scripts ni estilos en línea nuevos que requieran `unsafe-inline`.
- **Versión**: la única fuente es `package.json` (`version`, `versionCode`, `versionCodename`). `android/app/build.gradle` la lee de ahí y compone el `versionName` como `major.minor (codename)`. Al publicar, sube las tres, actualiza `NOTES_VERSIONS` y las novedades de cada idioma en `store/listing.mjs` (la ficha muestra las dos últimas versiones: la nueva pasa arriba y la actual baja a anterior; 500 caracteres por idioma), ejecuta `npm run release-notes` y actualiza `store/datos-de-la-ficha.md`.
- **Firma de commits en sesiones en la nube**: el entorno de Claude Code no pasa sus variables al script de preparación, solo a la sesión, así que la firma se configura con el hook `SessionStart` de `.claude/settings.json` (`.claude/hooks/git-signing.sh`). Lee `GIT_SIGNING_KEY` (clave privada ed25519 en base64, dedicada y revocable), `GIT_USER_NAME` y `GIT_USER_EMAIL` del entorno, activa la firma SSH y deja un informe sin secretos en `/tmp/signing-diag.txt`. No pongas nunca la clave en el repositorio.
- `ROADMAP.md` recoge los objetivos de las próximas versiones; consúltalo antes de empezar una funcionalidad nueva.
- Máximo 12 ejercicios, cada uno con su rango de repeticiones (`repsMin`-`repsMax`, de 1 a 999 999, solo enteros). Los sectores son los ejercicios activos y las repeticiones se sortean al terminar el giro (`rollReps` en `src/wheel-math.js`).
- **Ejercicios por defecto**: el nombre guardado es el inglés (es su identidad: selección activa, duplicados, historial). Se muestran traducidos con `exerciseLabels` (`src/exercise-names.js`, claves `exercise.<clave>` y `exercise.<clave>.short` en cada idioma). Los ejercicios del usuario no se traducen. Si añades uno por defecto, añade su clave en todos los idiomas.
- No subas keystores, `google-services.json` ni credenciales. La firma de release se configura en local.

## Commits

Mensajes en español con prefijo entre corchetes: `[ADD]`, `[IMP]`, `[FIX]`. Primera línea corta; en el cuerpo, el porqué. No incluyas líneas `Co-Authored-By` ni atribuciones a herramientas en commits ni en descripciones o comentarios de PR.
