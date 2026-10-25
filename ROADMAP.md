# Hoja de ruta

Solo lo que está en marcha o por hacer: la versión en desarrollo y las siguientes. Lo ya publicado no se guarda aquí (está en el historial de commits y en `store/notas-de-la-version.txt`). Al empezar a trabajar en una versión nueva, se borra de este fichero la anterior.

Última versión publicada en producción: la 1.18 «GymTonic» (versionCode 18, 25 oct 2026). Cada cambio de la ficha o de la versión llega ya a usuarios reales.

## En desarrollo: versión 1.19 «Jump-Over» (versionCode 19)

En la rama `roadmap-19`. La versión ya está subida en `package.json`, con el diseño horizontal, las novedades de la app (también para quien abre la app por primera vez) y las de la ficha de Play escritas. Sin publicar. Pendiente antes de publicar:
- Regenerar las capturas de Play con `npm run store` (unos 30 minutos) y pasar `npm run store:check`. El script solo hace capturas de teléfono: las de tableta no se suben de momento.
- Si se puede, probar en un Android 7 u 8 (barra de navegación, donde `enableEdgeToEdge()` puede dejar un velo y ya no se asignan los colores de las barras). Probado en un Huawei ANA-NX9 con Android 10, un Pixel 8 Pro con Android 17 (recorte de pantalla y vista de extremo a extremo) y una Samsung SM-X210 con Android 16: vertical, horizontal, arranque nativo, resultado y paneles.
- Subir en Play Console los textos, el CSV, el icono y las imágenes de `store/`.

Se comprueba en Play Console cuando la 1.19 esté enviada («Para tu siguiente versión», categoría Experiencia de usuario):
- Que desaparezca el aviso de pantallas grandes («Quita las restricciones de redimensionamiento y orientación…»): ya no hay `screenOrientation` en el manifiesto.
- Los avisos de la vista de extremo a extremo: es probable que los de las APIs obsoletas sigan, porque los genera `androidx.activity` (1.13.0, la última estable; la 1.14 solo existe en alfa). Comprobado con `javap` que sigue llamando a `setStatusBarColor`, `setNavigationBarColor` y al modo de recorte `SHORT_EDGES`, igual que la 1.11.0; nuestro `AppBarsPlugin` ya no llama a las dos primeras. Para casar los nombres ofuscados del aviso con clases concretas hace falta el `mapping.txt` del AAB publicado (Play Console, la versión, Descargas). El aviso genérico «es posible que la vista de extremo a extremo no funcione para todos los usuarios» debería desaparecer (la app se ve bien con recorte de pantalla en Android 17); falta ver si Play lo retira. `androidxActivityVersion` está en `android/variables.gradle`, que Capacitor respeta en lugar de su 1.11.0 por defecto.

## Probable: versión 1.20 «Toes2Bar» — plantillas de ejercicios

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

- Valoración dentro de la app (In-App Review): descartada de momento. Añade una dependencia de Google Play que choca con el «sin SDK de terceros ni conexión» (habría que revisar la política de privacidad y «Seguridad de los datos»), Google limita cuántas veces se muestra y no hay un momento claro de éxito del usuario. Retomarla con más usuarios y, si se hiciera, un historial de entrenamientos completados que sobreviva al cierre de la app.
- Historial que se guarda y resumen acumulado: descartado de momento, sin demanda clara entre los usuarios de la app. Hoy el historial es de la sesión: `sessionHistory` en `src/ui.js`, en memoria, con ejercicio, repeticiones, hora ya formateada e icono (solo se registra lo completado: `closeResult(true)` llama a `addToHistory`). Si se retomara: moverlo a `src/store.js` (nueva clave, subir `SCHEMA_VERSION`, hoy 8, con migración y validación al leer), guardar la marca de tiempo y el nombre original del ejercicio (no la etiqueta traducida) y dar formato al pintar, con un tope de entradas (por ejemplo las últimas 200) y totales acumulados aparte; decidir qué borra «Limpiar historial» y qué cuenta el contador del botón (`historyBadge`). Implicaría revisar la política de privacidad, «Seguridad de los datos», el compromiso de privacidad y la página de eliminación de datos (se guardaría un historial local, sin red), textos nuevos en los 21 idiomas y las capturas de Play.
- Avisos de `npm audit` que quedan, de `@capacitor/assets` y `@capacitor/cli` (solo desarrollo): se resuelven cuando esos paquetes actualicen sus dependencias, sin `npm audit fix --force`.
- Exportar e importar la configuración en un archivo local.
- Revisión de accesibilidad (texto grande, lector de pantalla).
- Cambiar el icono del launcher según la apariencia (alias de actividad): descartado por ahora. El lanzador puede parpadear o perder accesos directos, «Sistema» no se puede seguir con la app cerrada y cada tema nuevo exigiría otro icono. El icono monocromo de la 1.18 cubre lo razonable.

_Apunta aquí lo que aún no tiene versión asignada._
