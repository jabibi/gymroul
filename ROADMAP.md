# Hoja de ruta

Solo lo que está en marcha o por hacer: la versión en desarrollo y las siguientes. Lo ya publicado no se guarda aquí (está en el historial de commits y en `store/notas-de-la-version.txt`). Al empezar a trabajar en una versión nueva, se borra de este fichero la anterior.

Última versión publicada en producción: la 1.19 «Jump-Over» (versionCode 19, 26 oct 2026, 9:59). Cada cambio de la ficha o de la versión llega ya a usuarios reales.

## En desarrollo: versión 1.20 «Toes 2 Bar» (versionCode 20): plantillas de ejercicios

En la rama `roadmap-20`. La versión ya está subida en `package.json`, con las novedades de la app y de la ficha de Play escritas. Sin publicar. Pendiente antes de publicar:
- Regenerar las capturas de Play (`npm run store`, en un commit aparte: la interfaz ha cambiado) y subir en Play Console los textos, el CSV y las imágenes de `store/`.
- Valorar si la descripción larga de la ficha debe nombrar las plantillas (hoy solo lo hacen las novedades).

Lo que lleva, por si hay que retomarlo:
- **Plantillas del sistema** (`src/templates.js`): peso corporal (la lista de fábrica), cardio, con pesas, en casa sin ruido y abdominales (8 ejercicios). No se modifican ni se borran: se cargan en la ruleta o se copian. Sus ejercicios tienen id propio (`'1'` a `'30'`) y nombre inglés guardado, y se traducen con `exercise.<clave>` (24 ejercicios nuevos en los 21 idiomas); el nombre de cada plantilla es `template.<clave>`. Un ejercicio puede estar en varias plantillas con rangos distintos (la plancha, en casa y abdominales; los escaladores, en peso corporal y cardio).
- **Plantillas del usuario** (`gym_templates`, hasta 20): se crean desde cero, desde una del sistema (copia) o desde la ruleta actual, y se editan, copian y borran (con segunda pulsación). Una plantilla es una copia: al copiar una del sistema los nombres se quedan en el idioma de ese momento y ya no se traducen; cargar una en la ruleta no la enlaza con ella. Ajustes → Plantillas muestra las del usuario arriba y las del sistema debajo; «Editar ruleta» → «Cargar plantilla» abre el selector (las del usuario por orden alfabético y después las del sistema) y **sustituye todos los ejercicios de la ruleta**.
- **Colores por posición**: el ejercicio ya no guarda color; la ruleta lo reparte al pintar (`sectorColorIndexes`). Esquema 12 (migración v11 → v12 que borra el color guardado).
- Si el usuario no toca las plantillas, la app funciona como siempre (la ruleta de fábrica es la plantilla de peso corporal).

Se comprueba en Play Console ahora que la 1.19 está publicada («Para tu siguiente versión», categoría Experiencia de usuario):
- Que desaparezca el aviso de pantallas grandes («Quita las restricciones de redimensionamiento y orientación…»): ya no hay `screenOrientation` en el manifiesto.
- Los avisos de la vista de extremo a extremo: los de las APIs obsoletas deberían desaparecer, porque el código compilado ya no tiene ninguna de esas llamadas (antes las hacían cinco clases de `androidx.activity`, la librería de `enableEdgeToEdge()`; ahora la pantalla completa va a mano con el tema y `WindowCompat.setDecorFitsSystemWindows`, ver `CLAUDE.md`). Probado en Android 10, 16 y 17; sin probar en Android 9 y 11 a 14. Si Play los sigue mostrando, comparar sus clases con el `mapping.txt` del AAB publicado (Play Console, la versión, Descargas) y buscar las llamadas con `dexdump` sobre su `classes.dex`. El aviso genérico «es posible que la vista de extremo a extremo no funcione para todos los usuarios» debería desaparecer también (la app se ve bien con recorte de pantalla en Android 17); falta ver si Play lo retira. `androidxActivityVersion` (1.13.0) está en `android/variables.gradle`, que Capacitor respeta en lugar de su 1.11.0 por defecto; sigue siendo necesaria como dependencia de AppCompat y Capacitor.

## Siguiente: versión 1.21 «Chest 2 Bar» (por analizar)

Viene del comentario de un tester de la prueba cerrada (repeticiones en Ajustes). Los puntos rápidos (lápiz junto al rango, plegar el editor y avisar al guardar, aviso más cerca del centro) ya van en la 1.20. Queda por analizar:
- **Restaurar el rango de fábrica de un ejercicio incluido.** Hoy solo se vuelve tecleando los valores, o con «Cargar plantilla» → «Peso corporal», que sustituye **todos** los ejercicios de la ruleta. Valorar si eso basta o si merece un botón «Restaurar rango» por ejercicio (solo para los del sistema, con su rango de `SYSTEM_EXERCISES`).
- **Rango por defecto global** para los ejercicios nuevos: baja prioridad, añade un ajuste más a una pantalla que se quiere compactar. Solo si hay más demanda (otro tester, wolsey, pidió el lápiz sin saber que el rango ya se editaba).
- **Parpadeo del splash** (oscuro antes de claro con la apariencia clara): la 1.20 ya lo mejora (splash del sistema sin logo y `SplashOverlay` con la apariencia de la vez anterior). Falta probarlo en un móvil real con el sistema oscuro y la app clara, y al revés, y comprobar que el fondo inicial, que sigue el tema del sistema, no se nota. Con «Sistema» y en el primer arranque manda el modo del dispositivo.

## Ideas sin fecha

- Valoración dentro de la app (In-App Review): descartada de momento. Añade una dependencia de Google Play que choca con el «sin SDK de terceros ni conexión» (habría que revisar la política de privacidad y «Seguridad de los datos»), Google limita cuántas veces se muestra y no hay un momento claro de éxito del usuario. Retomarla con más usuarios y, si se hiciera, un historial de entrenamientos completados que sobreviva al cierre de la app.
- Historial que se guarda y resumen acumulado: descartado de momento, sin demanda clara entre los usuarios de la app. Hoy el historial es de la sesión: `sessionHistory` en `src/ui.js`, en memoria, con ejercicio, repeticiones, hora ya formateada e icono (solo se registra lo completado: `closeResult(true)` llama a `addToHistory`). Si se retomara: moverlo a `src/store.js` (nueva clave, subir `SCHEMA_VERSION`, hoy 12, con migración y validación al leer), guardar la marca de tiempo y el nombre original del ejercicio (no la etiqueta traducida) y dar formato al pintar, con un tope de entradas (por ejemplo las últimas 200) y totales acumulados aparte; decidir qué borra «Limpiar historial» y qué cuenta el contador del botón (`historyBadge`). Implicaría revisar la política de privacidad, «Seguridad de los datos», el compromiso de privacidad y la página de eliminación de datos (se guardaría un historial local, sin red), textos nuevos en los 21 idiomas y las capturas de Play.
- Avisos de `npm audit` que quedan, de `@capacitor/assets` y `@capacitor/cli` (solo desarrollo): se resuelven cuando esos paquetes actualicen sus dependencias, sin `npm audit fix --force`.
- Exportar e importar la configuración en un archivo local.
- Revisión de accesibilidad (texto grande, lector de pantalla).
- Cambiar el icono del launcher según la apariencia (alias de actividad): descartado por ahora. El lanzador puede parpadear o perder accesos directos, «Sistema» no se puede seguir con la app cerrada y cada tema nuevo exigiría otro icono. El icono monocromo de la 1.18 cubre lo razonable.

_Apunta aquí lo que aún no tiene versión asignada._
