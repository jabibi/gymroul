# Revisión de diseño: pendientes

Salió del análisis de las pantallas de la rama `roadmap-17` (Ajustes como menú, apariencias Suave y Clásico, logo nuevo), hecho con capturas a 412×915 en Chromium, sin probar en móvil real. Es una lista para ir viendo poco a poco: cada punto se decide por separado y, al hacerlo, se marca y se anota en qué versión.

Leyenda: `[x]` hecho · `[ ]` pendiente de decidir o de hacer.

## Hecho

- [x] **Casillas en el color de marca.** Las del editor de la ruleta salían en azul del navegador (`accent-color` en `src/style.css`).
- [x] **Foco al cambiar de pantalla en Ajustes.** Al abrir una pantalla, el foco pasa a su título (`showSettingsView` en `src/ui.js`).
- [x] **Tamaño mínimo de letra de 12 px.** Todos los textos de `index.html` y `src/ui.js` suben a 12 px o más (antes 9, 10 y 11 px). Los textos de lectura (párrafos del compromiso de privacidad e introducción del editor) van a 14 px. En las etiquetas de la ruleta la letra ya no baja de 12 px ni se deforma: si el nombre no cabe, se parte en dos líneas por un espacio o un guion (si el sector tiene altura) y solo como último recurso se recorta con «…» (`fitLabel` en `src/wheel-math.js`). Pendiente: probar en el Pixel con nombres largos en alemán y polaco.
- [x] **Descripciones de Apariencia.** Suave: «Tonos sobrios en la ruleta y verde esmeralda»; Clásico: «El aspecto original: colores vivos en la ruleta y verde intenso». Describen lo que cambia de verdad y ya no repiten el nombre del tema.
- [x] **Subtítulo «WORKOUT GENERATOR» eliminado** de todas partes: cabecera, imagen de compartir, título de la pestaña (`app.title` en los 20 idiomas y `index.html`) y el gráfico de funciones de la ficha de Play (`scripts/build-store-assets.mjs`; el PNG ya generado en `store/` se actualizará la próxima vez que se ejecute `npm run store`). Era el único texto de la interfaz sin traducir y no cabía en pantallas de menos de 380 px.
- [x] **Resalte del sector bajo el puntero.** Antes se aclaraba con una capa blanca, que bajaba el contraste del texto justo en ese sector (a unos 2,6:1). Ahora se oscurecen los demás y el activo conserva su color pleno; las etiquetas van en una capa aparte para que sigan nítidas (`src/wheel.js`). Cambia también el aspecto de Clásico: sus colores se ven más apagados que antes. Decidido mantenerlo así: con menos oscurecimiento (10 o 20 %) el texto blanco baja de 4,5:1 en naranja, ámbar, verde y cian, y se prefiere conservar el contraste a la viveza.
- [x] **Contraste de la paleta Suave.** Los sectores se oscurecen para que el texto blanco llegue a 4,5:1 como mínimo (migración v10 → v11). El verde esmeralda pasa a un verde más distinto del teal y el cian.
- [x] **Una sola cabecera para todos los paneles.** Historial, Ajustes y compromiso de privacidad comparten la misma cabecera: título a la izquierda (`text-lg`) y X a la derecha, sin icono junto al título ni raya debajo, con la misma separación. Se quitan los iconos del reloj y del escudo de los títulos.
- [x] **Nombre del editor unificado.** «Editar ruleta» en el menú (`settings.wheel`), el título (`config.title`) y el marcador vacío (`live.configure`), y «Editar» en el sector vacío (`wheel.setup`), en los 20 idiomas. `fr-CA` ya no redefine `config.title` ni `wheel.setup`.
- [x] **Enlaces del pie de Ajustes.** «Privacidad» (`settings.privacy`) y «Acerca de» (`settings.about`) sustituyen a «Compromiso de privacidad» y «Créditos» (`config.credits` desaparece; `config.commitment` sigue siendo el título del modal). En alemán y polaco el pie dejaba un punto colgando porque los textos largos se partían en dos líneas; con los nuevos cabe en una.

- [x] **Historial en un recuadro redondeado**, con una fila por ejercicio separadas por una línea y «Limpiar historial» a la derecha si el resumen no cabe en una línea.
- [x] **Añadir ejercicio en una ventana aparte** (`addExerciseModal`), con Atrás o la X para volver sin guardar, y la ayuda del editor tras un botón (?).
- [x] **Tocar fuera de un panel ya no lo cierra** (también en novedades y en nuevo ejercicio): una pulsación errada no hace perder lo que se hacía.
- [x] **Historial y Ajustes desactivados mientras gira la ruleta**: el resultado aparecía debajo del panel y Atrás lo cerraba antes.
- [x] **Ejercicios por orden alfabético** del idioma activo, en el editor y en la ruleta.

## Distribución y equilibrio

- [ ] **Altura del panel de Ajustes.** Mide lo que mide su contenido y salta entre pantallas (menú corto, editor muy alto). Opción: altura mínima fija en las pantallas internas y transición corta de deslizamiento entre ellas.
- [ ] **Flecha y X a la vez en las pantallas internas.** Sobra una: dejar solo la flecha atrás en las pantallas internas y la X solo en el menú.
- [x] **Editor de la ruleta más compacto.** Cada fila ocupa una sola línea (nombre, rango de repeticiones y papelera), la lista se desplaza dentro de su tarjeta, «Añadir nuevo ejercicio» está siempre a la vista y la explicación va tras el botón (?). Pendiente: el guardado automático (ver abajo).
- [ ] **«Guardar cambios» solo en el editor.** Idioma y Apariencia se aplican al elegirlos, pero llevan igualmente un botón «Guardar» fijo abajo que solo cierra Ajustes; el editor sí pide «Guardar cambios». Decidir un único modelo (lo habitual hoy: guardado automático y sin botón).
- [ ] **Borrar un ejercicio** no pide confirmación ni se puede deshacer. Opción: borrar y mostrar un aviso con «Deshacer».
- [ ] **Pantalla principal.** A 915 px de alto quedan unos 200 px vacíos sobre el marcador y otros tantos bajo el botón. Subir un poco la ruleta o aprovechar el hueco.
- [ ] **Tirador y gesto de deslizar para cerrar** en los paneles inferiores (estándar de Material 3).

## Textos

- [x] **Tono del resultado (parte hecha).** «Ejercicio seleccionado» (sin mayúsculas ni exclamación), botón «Girar ruleta» y botón «Empezar» en las novedades, en los 20 idiomas.
- [x] **Exclamaciones y mayúsculas, resueltas.** Ya no hay ninguna exclamación en la app ni en la ficha de Play, en los 20 idiomas: «Completado» (`result.done`), «Gira la ruleta para empezar» (`history.empty`), el texto de compartir, el gráfico y el cierre de la descripción. Las mayúsculas también se han quitado: «Girar» en el botón central, el título «Ejercicios» y los grupos de iconos sin la clase `uppercase`, y los títulos de sección de la descripción de Play en minúsculas (con la primera letra en mayúscula). Regla escrita en `CLAUDE.md`.
- [ ] **Barra de color del resultado.** Usa el color del sector (índigo, por ejemplo) y no tiene relación con el verde de marca. Decidir si se mantiene.

## Apariencia

- [ ] **Vista previa de Apariencia.** Hoy son solo puntos de color; una mini ruleta mostraría el efecto real.
- [ ] **Indicador de la opción elegida.** Una opción lleva una marca y la otra un círculo vacío. Unificar con un botón de opción (punto relleno) en ambas.
- [ ] **Tema claro y «seguir el del sistema».** La app es solo oscura; hoy se espera poder elegir. Es una función nueva, no un ajuste.

## Para tener en cuenta al decidir

- Todo texto nuevo o cambiado va en los 20 idiomas y `npm test` falla si falta alguno.
- Cada cambio de interfaz necesita `npm run check:layout` completo (también con `--stress` si toca el editor).
- Lo que se decida de «lista compacta» y «guardado automático» afecta a los mismos archivos (`index.html`, `src/ui.js`): conviene verlos juntos.
