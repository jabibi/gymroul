# Hoja de ruta

Solo lo que está en marcha o por hacer: la versión en desarrollo y las siguientes. Lo ya publicado no se guarda aquí (está en el historial de commits y en `store/notas-de-la-version.txt`). Al empezar a trabajar en una versión nueva, se borra de este fichero la anterior.

Última versión publicada en producción: la 1.16 «Six Pack» (versionCode 16, 20 oct 2026). Cada cambio de la ficha o de la versión llega ya a usuarios reales.

## En desarrollo: versión 1.18 «GymTonic» (versionCode 18)

Sin publicar y cerrada: no se añaden más cambios a la 1.18 (el trabajo nuevo va a la 1.19). Ya está fusionada en `main`. Un toque más fresco, elegante y suave, con el ruso como gran novedad y el tema claro. Incluye:
- **Tema Claro** y **Sistema** (por defecto): cuatro opciones en Apariencia: Sistema (sigue el modo claro u oscuro del dispositivo; nunca elige Clásico), Oscuro (antes Suave; el identificador guardado sigue siendo `calm`), Claro (nuevo) y Clásico. Claro lleva una ruleta de tonos cálidos pastel con texto casi negro y neutros cálidos. La imagen de compartir y las barras del sistema de Android también siguen la apariencia, y la pantalla de arranque de Android tiene versión clara y oscura.
- **Ruso** como idioma 21 (app, ficha de Play y páginas legales), con Manrope para el cirílico, y Manrope en los créditos.
- **Ajustes sin botones de guardar**, **deshacer al borrar un ejercicio** y **vista previa con mini ruleta** en Apariencia.
- **Visor de documentos** que siempre abre desde arriba y sin añadir entradas al historial al navegar entre páginas legales.
- **Logo sin resplandor** (trazo de 16) en Oscuro y Claro: cabecera, favicon, icono del launcher, pantalla de arranque, imagen de compartir y ficha de Play. El Clásico es otro diseño y no cambia.
- **Icono monocromo** para los «iconos con tema» de Android 13 (trazo de 20; `drawable-nodpi/ic_launcher_monochrome.png`, enlazado por `scripts/fix-adaptive-icon.mjs`).
- **Pantalla de arranque en Android 12 y posteriores**: fondo e icono del sistema según el modo del dispositivo (antes salía el logo oscuro sobre el fondo claro).
- **Código nativo de Android en Kotlin** (`MainActivity`, `AppBarsPlugin` y la nueva `SplashOverlay`; ya no queda Java propio).
- **Pantalla de arranque nativa con la firma «from PointedIO»**: el logo de la apariencia y la firma abajo desde el primer fotograma de la actividad (`SplashOverlay.kt`), que se retira con un fundido cuando la web avisa (`AppBars.hideSplash`), con un mínimo de 900 ms. La web conserva la suya en HTML (`#bootSplash`), sin tiempo mínimo y oculta en la app: el diseño está en dos sitios.
- Aviso de novedades de la 1.18 (`WHATS_NEW_VERSION`) y novedades de Play con la 1.18 y la 1.17.

Pendiente antes de publicar:
- Probar en dispositivo (Pixel 8 Pro) la pantalla de arranque nativa (logo y firma en Oscuro, Claro y Clásico, la barra de gestos y el tiempo mínimo) y un arranque con la apariencia elegida distinta del modo del dispositivo. Además: el tema claro, la pantalla de arranque en claro y en oscuro (sigue el modo del dispositivo, no la apariencia elegida en la app), las barras del sistema y el icono con «Iconos con tema» activado (Ajustes → Fondo de pantalla y estilo).
- Subir en Play Console los textos, el CSV, el icono (`store/icon.png`) y las imágenes de `store/`.
- La ficha de `pt-PT` se queda como está: decisión congelada.

## Probable: versión 1.19 — historial que se guarda y resumen acumulado

Aún no está decidida ni empezada. Es el prerrequisito para retomar la valoración dentro de la app (ver «Ideas sin fecha»).

**Mantenimiento previsto**: Vite actualizado a la 8.3.5 (la 8.3.2 tenía avisos de seguridad del servidor de desarrollo; no afectaban a lo publicado). Los avisos que quedan de `npm audit` vienen de `@capacitor/assets` y `@capacitor/cli`, solo de desarrollo: se resuelven cuando esos paquetes actualicen sus dependencias, sin `npm audit fix --force`.

**Revisar el máximo de ejercicios por ruleta** (límite de 12, `MAX_EXERCISES` en `src/store.js`): con los 12 ya creados, Ajustes deja pulsar «Añadir nuevo ejercicio», rellenar todos los campos y guardar, y solo entonces sale el aviso de número máximo. Debería avisarse antes de hacer el trabajo: por ejemplo, desactivar el botón o avisar al pulsarlo, con el motivo a la vista, y que el aviso de `error.maxExercises` quede como respaldo. Revisar también el resto de caminos que crean ejercicios (restaurar uno borrado con «Deshacer», `restoreExercise`) y probarlo con `npm run check:layout`.

**Pulir la pantalla del historial** (`historyModal` en `index.html`, `requestClearHistory` y `historySummary` en `src/ui.js`): el texto del resumen y el botón «Limpiar historial» del pie quedan colgando, sin integrarse con la lista. Rediseñar el pie para que forme un conjunto con ella (por ejemplo, el resumen dentro o pegado al recuadro de la lista y el botón como acción secundaria de su misma fila o tarjeta). Con el historial vacío, ocultar el botón (hoy `requestClearHistory` ya no hace nada si está vacío, pero el botón se ve). Comprobarlo con `npm run check:layout` (incluido `--stress`) y en árabe; cambia la interfaz, así que la PR dejará `store:check` en rojo hasta regenerar las capturas.

**Avisos de Play Console sobre la 1.18 (versionCode 18) para la siguiente versión** (apartado «Para tu siguiente versión», categoría Experiencia de usuario; los tres aparecen con la 1.18 ya enviada):
- **«Tu aplicación usa APIs o parámetros obsoletos para la vista de extremo a extremo»** (obsoletos en Android 15). El enlace del aviso lleva a la página general de cambios de Android 15 (`developer.android.com/about/versions/15/behavior-changes-15#edge-to-edge`), pero el detalle del aviso en Play Console sí es específico: señala `android.view.Window.setStatusBarColor`, `android.view.Window.setNavigationBarColor` y `LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES`, llamados desde cinco clases con el nombre ofuscado por R8 (`ge.C`, `he.C`, `je.C`, `q2.a` e `y.k`; ninguna es de `eus.jabibi.gymroul`). Qué dice la página de Android: en Android 15 `setStatusBarColor` y `setNavigationBarColor` (con navegación por gestos) quedan sin efecto, y `SHORT_EDGES` se interpreta como `ALWAYS`; la solución es dibujar el fondo propio tras las barras y aplicar los insets. Lo comprobado en local (`javap` sobre las dependencias de `releaseRuntimeClasspath`): `androidx.activity` 1.11.0, que es la que usa `enableEdgeToEdge()`, llama a esas tres cosas (`EdgeToEdgeApi29` a `setStatusBarColor` y `setNavigationBarColor`, `EdgeToEdgeApi28` pone `layoutInDisplayCutoutMode` en `SHORT_EDGES`). Es muy probable que el aviso venga de ahí y no de nuestro código, pero no se ha podido casar con las cinco clases: los nombres ofuscados de la 1.18 publicada no coinciden con el `mapping.txt` de una compilación local; para casarlos hace falta el `mapping.txt` del AAB de la 1.18 (en Play Console, la versión → Descargas → fichero de desasignación de ofuscación, o guardarlo de la compilación que se subió). Nuestro código propio también asigna `window.statusBarColor` y `window.navigationBarColor` en `AppBarsPlugin.kt` (`apply`) y los atributos del mismo nombre en `res/values/styles.xml`; con las barras ya transparentes por `enableEdgeToEdge()` esas asignaciones sobran y se pueden quitar dejando solo el color de los iconos (`WindowInsetsControllerCompat`). Opciones para el resto: subir `androidx.activity` cuando una versión nueva deje de usar esas APIs (mirar sus notas de la versión), o dejarlo como está: el aviso es informativo («obsoletas», no «bloqueantes») y es lo que genera la propia recomendación de Google de llamar a `enableEdgeToEdge()`. Cuidado con `AppBars.setBars` y con el fondo de la ventana (ver «Estructura» en `CLAUDE.md`: no usar `SystemBars.setStyle`).
- **«Quita las restricciones de redimensionamiento y orientación de tu aplicación para que sea compatible con dispositivos de pantalla grande»**: desde Android 16, en pantallas grandes (plegables, tabletas) se ignoran `screenOrientation="portrait"` y las restricciones de redimensionamiento. La actividad va bloqueada en vertical (`AndroidManifest.xml`) y no hay diseño horizontal, y `targetSdkVersion` ya es 36. Decidir si se acepta (la tarjeta de resultado ya tiene altura máxima con desplazamiento) o se hace el diseño horizontal de «Ideas sin fecha»; comprobar con un emulador de tableta o plegable y en `npm run check:layout` si se hace.
- **«Es posible que la vista de extremo a extremo no funcione para todos los usuarios»** (apuntando al SDK 35 o superior): Google recomienda gestionar los bajorrelieves y llamar a `enableEdgeToEdge()`. La app ya hace ambas cosas (`MainActivity.kt` y las zonas seguras con `AppBars.getInsets`), así que probablemente sea un aviso genérico; confirmarlo en un Android 15 o posterior con recorte de pantalla y comprobar que desaparece del panel con la siguiente versión.

**La idea**: que el historial sea un registro real de entrenamientos hechos, que sobreviva al cierre de la app, y que su resumen acumule totales (retos completados y repeticiones) más allá de la sesión.

**Qué hay ya**:
- Solo se registra lo completado: `closeResult(true)` llama a `addToHistory`; si el usuario salta el reto, no entra.
- Cada fila lleva el ejercicio, las repeticiones, la hora y el icono, y el pie resume ejercicios y repeticiones totales de la sesión (`history.total`).

**Qué falta**:
- **Guardarlo**: hoy es una lista en memoria (`sessionHistory` en `src/ui.js`) y se pierde al cerrar la app. Moverlo a `src/store.js`, que gestiona lo guardado en `localStorage`.
- **Guardar la fecha completa**: ahora solo se guarda la hora ya formateada en el idioma del momento. Guardar la marca de tiempo y dar formato al pintar, para que el cambio de idioma lo respete.
- **Guardar la identidad del ejercicio, no su etiqueta**: la entrada guarda `winner.exercise`, el nombre ya traducido al girar (`generateSegments` aplica `exerciseLabels`). Al persistir, un historial hecho en un idioma se quedaría fijo en él. Guardar el nombre original (o el id) y traducirlo al mostrarlo. Si el usuario borra o renombra un ejercicio, conservar el nombre guardado es lo más simple.
- **Totales acumulados**: contador de retos completados y repeticiones totales de siempre, y quizá por día o semana. Qué mostrar exactamente es lo primero que hay que decidir: el resumen debe seguir siendo sencillo.
- **Tope de tamaño**: limitar las entradas guardadas (por ejemplo las últimas 200) y mantener los acumulados aparte, para que `localStorage` no crezca sin límite.
- **«Limpiar historial»**: decidir si borra solo la lista o también los acumulados; lo razonable es separarlo o dejar claro qué se borra.
- **El contador del botón del historial** (`historyBadge`): hoy cuenta los retos de la sesión. Decidir si sigue así o pasa a otra cosa.

**Qué implicaría**:
- **Datos guardados**: nueva clave en `src/store.js`, subir `SCHEMA_VERSION` (hoy 8) y añadir la migración, con validación al leer por si el dato está corrupto, como las demás claves.
- **Privacidad**: los datos siguen solo en el dispositivo y no hay red, así que la política no cambia, pero hay que confirmarlo y reflejar en «Seguridad de los datos» que se guarda un historial local. Revisar también el modal «Compromiso de privacidad» y la página de eliminación de datos.
- **Textos**: etiquetas nuevas del resumen acumulado en los 21 idiomas (`npm test` falla si falta alguna).
- **Interfaz**: el modal del historial deja de ser «de la sesión» (título actual «Historial de sesión»); decidir el nombre y si se separa «hoy» de «total».
- **Comprobaciones**: `npm run check:layout` (incluido `--stress`) y pruebas de la migración, con un historial grande y con datos corruptos.
- **Ficha de Play**: novedades y capturas del historial, y revisar «Seguridad de los datos».

**Riesgos**: un historial que crece necesita un tope y una forma clara de borrarlo; y no debe romper la idea de que la app abra directamente la ruleta y sea inmediata.

## Probable: versión 1.20 — plantillas de ejercicios

Aún no está decidida ni empezada. Encaja con la regla de dar valor en menos de 10 segundos.

**La idea**: conjuntos de ejercicios ya preparados para cambiar de tipo de entrenamiento sin crear ni borrar ejercicios uno a uno. Al elegir una plantilla, la ruleta pasa a llevar esos ejercicios, cada uno con su icono, su color y su rango de repeticiones, y después se ajusta como siempre.

**Plantillas candidatas** (por decidir; 6-8 ejercicios cada una, para dejar margen hasta el máximo de 12):
- Peso corporal: flexiones, sentadillas, burpees, zancadas, plancha, abdominales… Parecida a la lista por defecto actual.
- Cardio: saltos, escaladores, rodillas altas, cuerda, carrera en el sitio…
- Con pesas: mancuernas, kettlebell o barra, con rangos de repeticiones más bajos.
- Sin material y en casa: para espacios pequeños y sin ruido.

**Cómo podría funcionar**:
- Un acceso en Ajustes, junto a la lista de ejercicios, que abre un modal con las plantillas y una vista previa de sus ejercicios.
- Qué pasa con los ejercicios que el usuario ya tiene es la decisión principal. Opciones: reemplazarlos (con confirmación), añadir los de la plantilla hasta llegar a 12, u ofrecer las dos. Lo más sencillo y seguro es reemplazar solo los ejercicios por defecto y conservar siempre los del usuario.
- Las repeticiones que el usuario haya editado en un ejercicio por defecto no se pisan sin avisar.

**Qué implicaría**:
- **Textos**: cada ejercicio nuevo necesita su nombre en los 21 idiomas (`exercise.<clave>`), igual que los seis por defecto. Es el grueso del trabajo. Además, nombre y descripción de la plantilla y textos del modal.
- **Identidad del ejercicio**: hoy `exerciseLabels` (`src/exercise-names.js`) traduce un ejercicio solo si su id está en `DEFAULT_EXERCISE_KEYS` y su nombre guardado sigue siendo el inglés original (`DEFAULT_EXERCISES` de `src/store.js`, ids `'1'` a `'6'`). Las plantillas necesitarían ids propios y ampliar esa tabla.
- **Datos guardados**: si solo se copian ejercicios a la lista, el esquema no cambia (hoy versión 8). Si se guarda qué plantilla está activa, subir la versión y añadir la migración.
- **Iconos**: clases de Tailwind literales y etiquetas de cualquier icono nuevo en todos los idiomas.
- **Interfaz**: modal nuevo con botón Atrás (`src/ui.js`), propiedades lógicas para el árabe y `npm run check:layout` (incluido `--stress`).
- **Ficha de Play**: novedades y capturas, y valorar una captura propia.

**Riesgos**: más ejercicios por defecto significan más texto que mantener en 21 idiomas, y las plantillas deben quedar bien en pantallas pequeñas y en árabe.

## Ideas sin fecha

- Diseño horizontal (ruleta a un lado y el botón al otro): hoy la actividad va bloqueada en vertical y `check:layout` no prueba ninguna pantalla en horizontal. Haría falta ambas cosas si se abre la app a tabletas o plegables con pantalla dividida.
- Valoración dentro de la app (In-App Review): descartada de momento. Añade una dependencia de Google Play que choca con el «sin SDK de terceros ni conexión» (habría que revisar la política de privacidad y «Seguridad de los datos»), Google limita cuántas veces se muestra y no hay un momento claro de éxito del usuario. Retomarla con más usuarios y un historial de entrenamientos completados (versión 1.19).
- Exportar e importar la configuración en un archivo local.
- Revisión de accesibilidad (texto grande, lector de pantalla).
- Cambiar el icono del launcher según la apariencia (alias de actividad): descartado por ahora. El lanzador puede parpadear o perder accesos directos, «Sistema» no se puede seguir con la app cerrada y cada tema nuevo exigiría otro icono. El icono monocromo de la 1.18 cubre lo razonable.

_Apunta aquí lo que aún no tiene versión asignada._
