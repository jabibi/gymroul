# Revisión de diseño: pendientes

Salió del análisis de las pantallas de la rama `roadmap-17` (Ajustes como menú, apariencias Sereno y Clásico, logo nuevo), hecho con capturas a 412×915 en Chromium, sin probar en móvil real. Es una lista para ir viendo poco a poco: cada punto se decide por separado y, al hacerlo, se marca y se anota en qué versión.

Leyenda: `[x]` hecho · `[ ]` pendiente de decidir o de hacer.

## Hecho

- [x] **Casillas en el color de marca.** Las del editor de la ruleta salían en azul del navegador (`accent-color` en `src/style.css`).
- [x] **Foco al cambiar de pantalla en Ajustes.** Al abrir una pantalla, el foco pasa a su título (`showSettingsView` en `src/ui.js`).
- [x] **Tamaño mínimo de letra de 12 px.** Todos los textos de `index.html` y `src/ui.js` suben a 12 px o más (antes 9, 10 y 11 px). Los textos de lectura (párrafos del compromiso de privacidad e introducción del editor) van a 14 px. En las etiquetas de la ruleta la letra ya no baja de 12 px ni se deforma: si el nombre no cabe, se parte en dos líneas por un espacio o un guion (si el sector tiene altura) y solo como último recurso se recorta con «…» (`fitLabel` en `src/wheel-math.js`). Pendiente: probar en el Pixel con nombres largos en alemán y polaco.
- [x] **Subtítulo «WORKOUT GENERATOR» eliminado** de todas partes: cabecera, imagen de compartir, título de la pestaña (`app.title` en los 20 idiomas y `index.html`) y el gráfico de funciones de la ficha de Play (`scripts/build-store-assets.mjs`; el PNG ya generado en `store/` se actualizará la próxima vez que se ejecute `npm run store`). Era el único texto de la interfaz sin traducir y no cabía en pantallas de menos de 380 px.
- [x] **Resalte del sector bajo el puntero.** Antes se aclaraba con una capa blanca, que bajaba el contraste del texto justo en ese sector (a unos 2,6:1). Ahora se oscurecen los demás y el activo conserva su color pleno; las etiquetas van en una capa aparte para que sigan nítidas (`src/wheel.js`). Cambia también el aspecto de Clásico: revisar si se prefiere el resalte original en esa apariencia.
- [x] **Contraste de la paleta Sereno.** Los sectores se oscurecen para que el texto blanco llegue a 4,5:1 como mínimo (migración v10 → v11). El verde esmeralda pasa a un verde más distinto del teal y el cian.

## Distribución y equilibrio

- [ ] **Altura del panel de Ajustes.** Mide lo que mide su contenido y salta entre pantallas (menú corto, editor muy alto). Opción: altura mínima fija en las pantallas internas y transición corta de deslizamiento entre ellas.
- [ ] **Una sola cabecera para todos los paneles.** Ajustes ya no lleva raya bajo el título; el historial sí, y difieren el icono junto al título y el espaciado. Unificar Ajustes, historial y compromiso de privacidad.
- [ ] **Flecha y X a la vez en las pantallas internas.** Sobra una: dejar solo la flecha atrás en las pantallas internas y la X solo en el menú.
- [ ] **Editor de la ruleta demasiado aire.** Cada fila ocupa unos 68 px y el rango de repeticiones va en una segunda línea casi vacía; además hay contenedores dentro de contenedores (panel, tarjeta, fila). Enlaza con «lista de Configuración más compacta» (`ROADMAP.md`, 1.17).
- [ ] **«Guardar cambios» solo en el editor.** Idioma y Apariencia se aplican al instante y el editor pide guardar. Decidir un único modelo (lo habitual hoy: guardado automático).
- [ ] **Borrar un ejercicio** no pide confirmación ni se puede deshacer. Opción: borrar y mostrar un aviso con «Deshacer».
- [ ] **Pantalla principal.** A 915 px de alto quedan unos 200 px vacíos sobre el marcador y otros tantos bajo el botón. Subir un poco la ruleta o aprovechar el hueco.
- [ ] **Tirador y gesto de deslizar para cerrar** en los paneles inferiores (estándar de Material 3).

## Textos

- [ ] **Unificar el nombre del editor.** Hoy: «Configurar ruleta» (menú), «Configuración de la ruleta» (título) y «Configurar» (sector vacío). Propuesta: «Editar ruleta» en los tres sitios (claves `settings.wheel`, `config.title`, `live.configure`; 20 idiomas).
- [ ] **Tono del resultado.** Para una app de bienestar sobran mayúsculas y exclamaciones: «¡EJERCICIO SELECCIONADO!» → «Tu reto»; «¡Completado!» → «Hecho». Igual con el botón «¡Girar la ruleta!».
- [ ] **Descripciones de Apariencia.** «Colores suaves y equilibrados, con aire de bienestar» suena a eslogan. Propuesta: «Tonos suaves y sobrios» y «La original: colores vivos y verde intenso».
- [ ] **Enlaces del pie de Ajustes.** «Privacidad» y «Acerca de» son más estándar que «Compromiso de privacidad» y «Créditos».
- [ ] **Barra de color del resultado.** Usa el color del sector (índigo, por ejemplo) y no tiene relación con el verde de marca. Decidir si se mantiene.

## Apariencia

- [ ] **Vista previa de Apariencia.** Hoy son solo puntos de color; una mini ruleta mostraría el efecto real.
- [ ] **Indicador de la opción elegida.** Una opción lleva una marca y la otra un círculo vacío. Unificar con un botón de opción (punto relleno) en ambas.
- [ ] **Tema claro y «seguir el del sistema».** La app es solo oscura; hoy se espera poder elegir. Es una función nueva, no un ajuste.

## Para tener en cuenta al decidir

- Todo texto nuevo o cambiado va en los 20 idiomas y `npm test` falla si falta alguno.
- Cada cambio de interfaz necesita `npm run check:layout` completo (también con `--stress` si toca el editor).
- Lo que se decida de «lista compacta» y «guardado automático» afecta a los mismos archivos (`index.html`, `src/ui.js`): conviene verlos juntos.
