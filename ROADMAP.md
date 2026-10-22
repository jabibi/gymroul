# Hoja de ruta

Objetivos de las próximas versiones. Lo ya publicado está en el historial de commits y en las notas de cada versión (`store/notas-de-la-version.txt`).

## Peticiones de usuarios

Lo que piden las reseñas de Play y otros mensajes. Se apunta la petición, de dónde viene y qué implicaría; no es un compromiso de hacerlo.

Abiertas:

- Ruleta más grande (reseña de 4 estrellas, 2 oct 2026, versión 1.0.7, en inglés: «spinner size can be increased»). Se valora en la 1.17; ver abajo.

Atendidas en la 1.15:

- Repeticiones por ejercicio (reseña de 5 estrellas, 6 oct 2026, versión 1.10, en inglés; y feedback del día 11 de la prueba, de Kamil Szostek, en inglés). Quien lo pide puede hacer 50 flexiones pero solo 10 dominadas, y quiere asignar un número de repeticiones a cada ejercicio y poder cambiarlo a medida que gana fuerza.
- Ruleta solo con los ejercicios (misma reseña): que la ruleta muestre únicamente los ejercicios y que el número de repeticiones salga después de girar, para que se vea menos recargada.
- Ejercicios por defecto sin traducir (informe de prueba en OPPO Reno5 A con Android 12, en español, con la app en japonés): las etiquetas de la ruleta salían en inglés mientras los botones y los diálogos estaban en japonés.

## Hecho: acceso a producción y publicación

Solicitud enviada el 18 oct 2026 a las 21:53, con 15 testers y la 1.16 en las pruebas cerradas (Alpha y googlegroups). Las respuestas enviadas están en `store/solicitud-produccion.md`. La app se publicó en producción el 20 oct 2026, la misma fecha que el aviso de calificación de contenido de IARC (*IARC Live Rating Notice*, que llegó por correo) y que su aparición en las búsquedas públicas de Google Play. La versión publicada es la 1.16 «Six Pack» (versionCode 16). Desde entonces las pruebas cerradas ya no condicionan nada y cada cambio de la ficha o de la versión llega a usuarios reales.

## Hecho: versión 1.16 «Six Pack» (versionCode 16, publicada)

- **Historial sin repeticiones duplicadas**: la fila mostraba el número en el recuadro y otra vez al principio del título (detectado en la 1.15 con la app en euskera). El título lleva solo el ejercicio, traducido.
- **Historial rediseñado**: sin la pastilla «Hecho» (`history.done`, eliminada de los 20 idiomas), con el icono del ejercicio a la derecha y la hora en un gris más legible. El pie resume ejercicios y repeticiones totales de la sesión (`history.total` lleva ahora `{n}` y `{reps}`) y «Limpiar historial» es un botón de texto sin fondo rojo.
- **«Limpiar historial» pide confirmación**: la primera pulsación cambia el botón a «Pulsa otra vez» (`history.clearConfirm`, en los 20 idiomas) y, si no se confirma en 3 segundos o se cierra el historial, vuelve a su estado normal. Con el historial vacío no hace nada.
- **Salto con piernas abiertas en japonés** (reseña de 4 estrellas, OPPO Reno5 A, versión 1.15): el sector mostraba «スプリット», que en japonés se lee como el «split» (la apertura de piernas). El nombre corto pasa a «スプリットジャンプ» (`exercise.splitjump.short`, 9 caracteres de un máximo de 12).
- **Código muerto fuera**: se elimina `displayChallenge` de `src/wheel-math.js` y sus tests, que ya no se usaban.
- **Novedades de Play con las dos últimas versiones**: hecho, cada idioma muestra «Versión 1.15 (Be Reborn):» y «Versión 1.14 (RandWork):» con sus viñetas (`NOTES_VERSIONS` y `notesText` en `store/listing.mjs`; 500 caracteres por idioma).
- **Ficha de Play al día con la 1.16**: `NOTES_VERSIONS` en 1.16 y 1.15, novedades de cada idioma con las viñetas de la 1.16, y capturas, textos y CSV regenerados con `npm run store`. Si se añaden más cambios a la versión antes de publicar, hay que sumar su viñeta en los 20 idiomas (cuidado con el límite de 500 caracteres: el francés, el neerlandés y el italiano rozan los 450) y regenerar las capturas afectadas.

## En desarrollo: versión 1.17 «Muted Tones» (versionCode 17)

Va en la rama `roadmap-17` (PR #24) y no está publicada. Incluye:
- **Ajustes como menú**: editar ruleta, apariencia, idioma y, abajo, «Privacidad» (resumen del compromiso) y «Acerca de» (créditos y versión). Cabecera común con Historial y el compromiso de privacidad, y paneles inferiores que llegan al borde de abajo (la barra de gestos de Android queda sobre el panel).
- **Dos apariencias**: Suave (la nueva, por defecto) y Clásico (la original, con colores vivos y verde intenso).
- **Logo e icono nuevos**, más sobrios, y barras del sistema de Android con el color de la app.
- **Ruleta más grande**, con el nombre completo de cada ejercicio (el nombre corto desaparece), letra de 12 px como mínimo y textos de lectura a 14 px.
- **Editor de la ruleta más compacto**: una línea por ejercicio, la lista se desplaza dentro de su tarjeta, «Añadir nuevo ejercicio» siempre visible y en una ventana aparte, y la ayuda tras un botón (?). Ejercicios por orden alfabético del idioma activo (editor y ruleta).
- **Historial en un recuadro redondeado**, con una fila por ejercicio.
- **Botón «Guardar»** fijo abajo en Apariencia e Idioma.
- **Más difícil equivocarse**: tocar fuera de un panel ya no lo cierra, y Historial y Ajustes no se abren mientras la ruleta gira (el resultado aparecía debajo del panel).
- **Aviso de novedades al abrir la app** tras actualizar, una sola vez y solo para quien ya la tenía, con una explicación de cómo recuperar la apariencia original (Ajustes → Apariencia → Clásico) y un botón que lleva allí.
- **Tono más sereno**: sin exclamaciones ni mayúsculas en la app ni en la ficha de Play («Girar ruleta», «Ejercicio seleccionado», «Completado», «Empezar» en las novedades).
- **Sin el subtítulo «Workout Generator»** en ninguna parte.
- **Corrección**: Atrás en el visor de documentos mostraba el documento anterior.
- **Ficha de Play**: título «GymRoulette: …» y descripción breve nuevos, pensados para la búsqueda («ruleta de ejercicios», «ejercicio aleatorio», «rutinas aleatorias»), y novedades de la 1.17 en los 16 idiomas con ficha (`en-GB`, `en-AU`, `es-419` y `fr-CA` no tienen ficha propia). Capturas, gráficos, textos y CSV regenerados con `npm run store`.

La ficha de `pt-PT` se queda como está: decisión congelada, no se toca ni a corto ni a medio plazo.

Antes de publicar: pasar la CI del Android (PR #24), probar en dispositivo, y subir el icono, los textos, el CSV y las imágenes de `store/` en Play Console.

Los puntos de diseño que quedaron por revisar tras estos cambios (distribución, textos, apariencia) están en [`PENDIENTE-DISENO.md`](PENDIENTE-DISENO.md).

### Lista de Configuración más compacta (hecho en la 1.17)

Hecho: el rango de repeticiones va en la misma línea que el nombre (pasa a una segunda solo si no cabe), la lista se desplaza dentro de su tarjeta y añadir un ejercicio es una ventana aparte. Queda por decidir el guardado automático (ver `PENDIENTE-DISENO.md`).

## Hecho en la versión 1.17 — ruleta más grande

Petición de una reseña de Play (ver «Peticiones de usuarios»). Hecho: la ruleta ocupa más espacio en los móviles que lo permiten. Lo siguiente es el análisis original, que se conserva como referencia.

**Cómo está hoy**: el contenedor de la ruleta mide 320 px y 360 px desde el punto de corte `sm` (640 px de ancho) en `index.html`, dentro de un `<main>` de `max-w-md` con `px-4` (416 px útiles como máximo). El tamaño del canvas sale del contenedor en `resize` (`src/wheel.js`). En un móvil de unos 412 dp de ancho quedan unos 380 px útiles, así que la ruleta deja unos 60 px de ancho sin usar.

**Qué limita el tamaño**:
- **Ancho**: el espacio útil de cada móvil (con el margen lateral actual).
- **Alto**: la ruleta comparte pantalla con la cabecera, el marcador de sector (52 px), el botón de girar y las barras del sistema. En pantallas bajas o con letra grande, una ruleta mayor empujaría el botón fuera de la vista; no debería obligar a desplazarse para girar.
- **Etiquetas**: los textos de los sectores se ajustan al radio libre (`fitText`); una ruleta mayor deja más sitio y puede subir el tamaño máximo (`MAX_LABEL_SIZE`).
- **Botón central y púa**: tienen tamaño fijo (80 px y 48 px); hay que ver si guardan la proporción.

**Qué probar**:
- Tamaño en función del espacio disponible (ancho y alto de la ventana) en lugar de dos valores fijos, con un máximo razonable en pantallas grandes y tabletas.
- Que el botón de girar siga siempre visible sin desplazarse, también con la letra del sistema grande y con el teclado cerrado.
- Que el nombre de ejercicios largos siga cabiendo con 12 sectores.

**Qué implicaría**: sobre todo maquetación (`index.html`, `src/wheel.js`, `src/style.css`), sin cambios en los datos guardados. Hay que pasar `npm run check:layout`, incluido `--stress`, en los 20 idiomas y con el árabe de derecha a izquierda, y regenerar las capturas de la ficha de Play (`npm run store`).

## Hecho en la 1.18 — apertura de las páginas de Privacidad y Acerca de

Hecho: `openDocument` recrea el marco en cada apertura (siempre empieza arriba y en el documento pedido) y `public/legal.js` hace que, dentro del visor, los enlaces entre páginas legales sustituyan la entrada del historial en lugar de añadir otra. Lo que sigue es el análisis original.

Detectado probando la 1.17 en el móvil. Los documentos (política de privacidad y créditos, desde «Privacidad» y «Acerca de» en Ajustes) se abren en un visor dentro de la app (`documentModal`, un `iframe`).

**Lo que pasa**: si abres, por ejemplo, la política de privacidad, bajas hasta el final y la cierras, la siguiente vez que la abres aparece otra vez abajo del todo, en la posición en la que se dejó.

**Lo esperado** (confirmado): que cualquier documento se abra siempre desde arriba, sin recordar el desplazamiento anterior.

**Otro documento que se puede abrir**: la página de eliminación de datos (`data-deletion.html`). No tiene entrada propia en Ajustes, pero la política de privacidad la enlaza, y ese enlace (y el de vuelta, desde la eliminación de datos hacia la política) navega dentro del propio visor. Hay que comprobar que ahí también se cumple lo esperado y que, al cerrar y volver a abrir «Privacidad», empieza en la política y arriba, no en la página a la que se hubiera llegado por ese enlace. Además, esa navegación dentro del marco añade entradas al historial del navegador, el mismo problema que se arregló en la 1.17 para Atrás.

**Dónde mirar**: `renderDocument` y `openDocument` en `src/ui.js`. El marco solo se sustituye cuando cambia el documento (`documentSrc`); si se abre el mismo dos veces seguidas, se reutiliza el mismo marco con su desplazamiento. Hay que volver a empezar arriba al abrirlo (por ejemplo, recrear el marco en cada apertura) sin romper el arreglo de Atrás de la 1.17, que depende de que la primera carga de un marco nuevo no añada una entrada al historial. Conviene reproducirlo en el navegador y en el móvil, con los tres documentos (privacidad, créditos y eliminación de datos) y en varios idiomas, y comprobar también Atrás.

## Hecho en la 1.18 — ruso como idioma nuevo

Hecho: app, ficha de Play y las cinco páginas legales en ruso (21 idiomas). Como Plus Jakarta Sans no trae el cirílico básico, se añade Manrope para el cirílico. Pendiente: que un hablante nativo revise la traducción antes de publicar. Lo que sigue es el análisis original.

**Qué implicaría** (según `CLAUDE.md`, un idioma nuevo hay que añadirlo en tres sitios):
- **La app**: `src/i18n/locales/ru.js` con todas las claves de `en.js` (incluidos `exercise.<clave>` de los seis ejercicios por defecto y las etiquetas de los iconos) y alta en `LANGUAGES` de `src/i18n/index.js`. `npm test` falla si falta alguna clave o si cambian los parámetros `{x}`. Pasa de 20 a 21 idiomas, y todos los textos que hablan de «20 idiomas» (`CLAUDE.md`, ficha de Play, solicitud de producción) hay que actualizarlos.
- **La ficha de Play**: entrada de `ru` en `store/listing.mjs` con título, descripciones y novedades (500 caracteres), y capturas, textos y CSV regenerados con `npm run store`.
- **Las páginas legales**: política de privacidad y resto en `legal/index.mjs` (`LANGUAGE_ORDER`), regeneradas con `npm run legal`; hoy son 16, sin variantes regionales.

**Riesgos**:
- **Tipografía**: hoy solo se cargan los subconjuntos `latin` de Plus Jakarta Sans (`src/style.css`) y el paquete trae el cirílico extendido (`cyrillic-ext`), que no parece incluir las letras básicas del ruso. Hay que comprobarlo; si no las cubre, el texto caería en la fuente del sistema o habría que cambiar de fuente.
- **Longitud**: el ruso suele ocupar más que el inglés. Hay que pasar `npm run check:layout`, incluido `--stress`, en los 21 idiomas y vigilar los nombres cortos de los ejercicios (máximo 12) y las etiquetas de la ruleta.
- **Revisión**: conviene que la traducción la revise un hablante nativo antes de publicarla, como se ha hecho con otros idiomas.

## Probable: versión 1.19 — historial que se guarda y resumen acumulado

Aún no está decidida ni empezada. Es el prerrequisito para retomar la valoración dentro de la app (ver «Ideas sin fecha»), que sigue descartada hasta que haya un momento claro de éxito del usuario.

**La idea**: que el historial sea un registro real de entrenamientos hechos, que sobreviva al cierre de la app, y que su resumen acumule totales (retos completados y repeticiones) más allá de la sesión.

**Qué hay ya** (1.16):
- Solo se registra lo completado: `closeResult(true)` llama a `addToHistory`; si el usuario salta el reto, no entra.
- Cada fila lleva el ejercicio, las repeticiones, la hora y el icono, y el pie resume ejercicios y repeticiones totales de la sesión (`history.total`).

**Qué falta**:
- **Guardarlo**: hoy es una lista en memoria (`sessionHistory` en `src/ui.js`) y se pierde al cerrar la app. Habría que moverlo a `src/store.js`, que es quien gestiona lo guardado en `localStorage`.
- **Guardar la fecha completa**: ahora solo se guarda la hora ya formateada en el idioma del momento. Guardar la marca de tiempo y dar formato al pintar, para que el cambio de idioma lo respete.
- **Guardar la identidad del ejercicio, no su etiqueta**: la entrada guarda `winner.exercise`, que es el nombre ya traducido al girar (`generateSegments` aplica `exerciseLabels`). Al persistir, un historial hecho en un idioma se quedaría fijo en él. Hay que guardar el nombre original (o el id) y traducirlo al mostrarlo con `exerciseLabels`. Si el usuario borra o renombra un ejercicio, decidir cómo se muestran las entradas antiguas (conservar el nombre guardado es lo más simple).
- **Totales acumulados**: contador de retos completados y repeticiones totales de siempre, y quizá por día o semana. Qué mostrar exactamente es lo que hay que decidir primero: el resumen debe seguir siendo sencillo.
- **Tope de tamaño**: limitar las entradas guardadas (por ejemplo las últimas 200) y mantener los acumulados aparte, para que `localStorage` no crezca sin límite.
- **«Limpiar historial»**: decidir si borra solo la lista o también los acumulados; lo razonable es separarlo o dejar claro qué se borra.
- **El contador del botón del historial** (`historyBadge`): hoy cuenta los retos de la sesión. Con historial guardado, decidir si sigue contando solo los de la sesión o pasa a otra cosa.

**Qué implicaría**:
- **Datos guardados**: nueva clave en `src/store.js`, subir `SCHEMA_VERSION` (hoy 8) y añadir la migración, como pide `CLAUDE.md`. Con validación al leer, por si el dato está corrupto, como las demás claves.
- **Privacidad**: los datos siguen solo en el dispositivo y no hay red, así que la política de privacidad no cambia, pero hay que confirmarlo y reflejar en la sección «Seguridad de los datos» que se guarda un historial local. Revisar también el texto del modal «Compromiso de privacidad» y la página de eliminación de datos, que habla de lo que se guarda.
- **Textos**: etiquetas nuevas del resumen acumulado en los 20 idiomas, y `npm test` falla si falta alguna.
- **Interfaz**: el modal del historial deja de ser «de la sesión» (el título actual es «Historial de sesión»); decidir el nombre y si se separa «hoy» de «total».
- **Comprobaciones**: `npm run check:layout` (incluido `--stress`) y pruebas de la migración, con un historial grande y con datos corruptos.
- **Ficha de Play**: novedades y capturas del historial, y revisar «Seguridad de los datos».

**Riesgos**: un historial que crece necesita un tope y una forma clara de borrarlo; y no debe romper la idea de que la app abra directamente la ruleta y sea inmediata.

## Probable: versión 1.20 — plantillas de ejercicios

Aún no está decidida ni empezada. Se apunta aquí para no perderla y porque encaja con la regla de dar valor en menos de 10 segundos.

**La idea**: conjuntos de ejercicios ya preparados para cambiar de tipo de entrenamiento sin crear ni borrar ejercicios uno a uno. Al elegir una plantilla, la ruleta pasa a llevar esos ejercicios, cada uno con su icono, su color y su rango de repeticiones, y después se ajusta como siempre. Para quien abre la app por primera vez, o quiere entrenar distinto hoy, es más rápido que configurar a mano.

**Plantillas candidatas** (por decidir; cada una con 6-8 ejercicios para dejar margen hasta el máximo de 12):
- Peso corporal: flexiones, sentadillas, burpees, zancadas, plancha, abdominales… Es parecida a la lista por defecto actual.
- Cardio: saltos, escaladores, rodillas altas, cuerda, carrera en el sitio…
- Con pesas: ejercicios con mancuernas, kettlebell o barra, con rangos de repeticiones más bajos.
- Sin material y en casa: pensada para espacios pequeños y sin ruido.

**Cómo podría funcionar**:
- Un acceso en Configuración, junto a la lista de ejercicios, que abre un modal con las plantillas y una vista previa de sus ejercicios.
- Qué pasa con los ejercicios que el usuario ya tiene es la decisión principal. Opciones: reemplazarlos (con confirmación y sin tocar el historial de la sesión), añadir los de la plantilla hasta llegar a 12, o ofrecer las dos. Lo más sencillo y seguro es reemplazar solo los ejercicios por defecto y conservar siempre los del usuario.
- Las repeticiones propias que el usuario haya editado en un ejercicio por defecto no se pisan sin avisar.

**Qué implicaría**:
- **Textos**: cada ejercicio nuevo necesita su nombre en los 20 idiomas (`exercise.<clave>`), igual que los seis por defecto de la 1.15. Es el grueso del trabajo. Además, el nombre de la plantilla, la descripción y los textos del modal, también en todos los idiomas, y `npm test` falla si falta alguno.
- **Identidad del ejercicio**: hoy `exerciseLabels` (`src/exercise-names.js`) traduce un ejercicio solo si su id está en `DEFAULT_EXERCISE_KEYS` y su nombre guardado sigue siendo el inglés original (`DEFAULT_EXERCISES` de `src/store.js`, ids de `'1'` a `'6'`). Las plantillas necesitarían ids propios y ampliar esa tabla.
- **Datos guardados**: si solo se copian ejercicios a la lista existente, el esquema no cambia (hoy es la versión 8). Si se guarda qué plantilla está activa, hay que subir la versión y añadir la migración en `src/store.js`.
- **Iconos**: las clases de Tailwind deben aparecer literales y hay que añadir las etiquetas de cualquier icono nuevo en todos los idiomas.
- **Interfaz**: modal nuevo con botón Atrás (`src/ui.js`), propiedades lógicas para el árabe y `npm run check:layout` (incluido `--stress`) al terminar.
- **Ficha de Play**: novedades y capturas, y valorar si merece una captura propia.

**Riesgos**: más ejercicios por defecto significan más texto que mantener en 20 idiomas, y las plantillas deben quedar bien en pantallas pequeñas y en árabe.

## Hecho: versión 1.15 «Be Reborn» (versionCode 15)

- **Repeticiones propias por ejercicio**, como rango mínimo-máximo editable en cualquier momento (`repsMin` y `repsMax`; por defecto y al crear, 10-60).
  - Solo enteros de 1 a 999 999 (`MAX_REP_VALUE`), validados en `src/store.js`. El nombre del ejercicio admite 30 caracteres (hasta la 1.16 había además un nombre corto de 12; desaparece en la 1.17).
  - Migración del esquema v7 -> v8: cada ejercicio hereda el mínimo y el máximo de las repeticiones activas guardadas (si no hay, las de `gym_reps`; si tampoco, 10-60). Es idempotente y borra las claves antiguas (`gym_reps`, `gymroulette_active_reps`), sin vuelta atrás limpia a versiones anteriores.
- **Ruleta solo con ejercicios**: un sector por ejercicio activo (máximo 12). Las repeticiones se sortean al terminar el giro (`rollReps`, entero uniforme entre mínimo y máximo, ambos incluidos). El marcador en vivo ya no muestra la cantidad.
  - Las etiquetas se ajustan al sector (`fitText` en `src/wheel-math.js`): bajan de tamaño y, si aun así no caben, se recortan con «…».
- **Resultado en dos niveles**: las repeticiones grandes, su etiqueta debajo (`result.reps`) y el ejercicio en otra línea, con un brillo verde radial y una barra con el color del sector. La imagen de compartir sigue la misma jerarquía. El texto que se comparte y el historial no cambian.
- **Configuración**: cada ejercicio edita su rango en su propia fila, sin modal nuevo. Crear o borrar un ejercicio, o cambiar de idioma, ya no reinicia las casillas sin guardar. Con el teclado abierto en el buscador de iconos, la cuadrícula se limita a lo que se ve para que el scroll no parezca bloqueado.
- **Ejercicios por defecto traducidos** (`exerciseLabels` en `src/exercise-names.js`, claves `exercise.<clave>` y `exercise.<clave>.short` en los 20 idiomas). Lo guardado sigue en inglés, porque el nombre es la identidad del ejercicio (selección activa, duplicados, historial); no hizo falta migrar. Los ejercicios del usuario no se traducen.
- **Icono adaptativo** con la ruleta centrada, con más aire sobre el fondo verde y sin la raya oscura del borde (`scripts/fix-adaptive-icon.mjs`, al final de `npm run icons`).
- **Comprobaciones**: `npm run check:layout` gana `--stress` (12 ejercicios de nombres larguísimos y repeticiones hasta 999999) y simula el teclado abierto en la pantalla de iconos.
- Ficha de Play, capturas y notas de la versión regeneradas en los 20 idiomas.

## Ideas sin fecha

- Valoración dentro de la app (In-App Review): descartada de momento. Añade una dependencia de Google Play que choca con el «sin SDK de terceros ni conexión» de la 1.13 (habría que revisar la política de privacidad y «Seguridad de los datos»), Google limita cuántas veces se muestra y ahora no hay un momento claro de éxito del usuario. Retomarla cuando haya más usuarios y algo como un historial de entrenamientos completados.
- Exportar e importar la configuración en un archivo local.
- Revisión de accesibilidad (texto grande, lector de pantalla).

_Apunta aquí lo que aún no tiene versión asignada._
