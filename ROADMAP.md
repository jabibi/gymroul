# Hoja de ruta

Objetivos de las próximas versiones. Lo ya publicado está en el historial de commits y en las notas de cada versión (`store/notas-de-la-version.txt`).

## Peticiones de usuarios

Lo que piden las reseñas de Play y otros mensajes. Se apunta la petición, de dónde viene y qué implicaría; no es un compromiso de hacerlo. Aún no hay ninguna abierta.

Atendidas en la 1.15:

- Repeticiones por ejercicio (reseña de 5 estrellas, 6 oct 2026, versión 1.10, en inglés; y feedback del día 11 de la prueba, de Kamil Szostek, en inglés). Quien lo pide puede hacer 50 flexiones pero solo 10 dominadas, y quiere asignar un número de repeticiones a cada ejercicio y poder cambiarlo a medida que gana fuerza.
- Ruleta solo con los ejercicios (misma reseña): que la ruleta muestre únicamente los ejercicios y que el número de repeticiones salga después de girar, para que se vea menos recargada.
- Ejercicios por defecto sin traducir (informe de prueba en OPPO Reno5 A con Android 12, en español, con la app en japonés): las etiquetas de la ruleta salían en inglés mientras los botones y los diálogos estaban en japonés.

## En desarrollo: versión 1.16 «Six Pack» (versionCode 16)

- **Historial sin repeticiones duplicadas**: la fila mostraba el número en el recuadro y otra vez al principio del título (detectado en la 1.15 con la app en euskera). El título lleva solo el ejercicio, traducido.
- **Historial rediseñado**: sin la pastilla «Hecho» (`history.done`, eliminada de los 20 idiomas), con el icono del ejercicio a la derecha y la hora en un gris más legible. El pie resume ejercicios y repeticiones totales de la sesión (`history.total` lleva ahora `{n}` y `{reps}`) y «Limpiar historial» es un botón de texto sin fondo rojo.
- **Novedades de Play con las dos últimas versiones**: hecho, cada idioma muestra «Versión 1.15 (Be Reborn):» y «Versión 1.14 (RandWork):» con sus viñetas (`NOTES_VERSIONS` y `notesText` en `store/listing.mjs`; 500 caracteres por idioma).
- **Pendiente al publicar**: pasar `NOTES_VERSIONS` a 1.16 y 1.15, escribir las viñetas de la 1.16 en cada idioma y regenerar la ficha con `npm run store` (el historial rediseñado cambia las capturas).

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
- **Textos**: cada ejercicio nuevo necesita su nombre y su nombre corto en los 20 idiomas (`exercise.<clave>` y `exercise.<clave>.short`), igual que los seis por defecto de la 1.15. Es el grueso del trabajo. Además, el nombre de la plantilla, la descripción y los textos del modal, también en todos los idiomas, y `npm test` falla si falta alguno.
- **Identidad del ejercicio**: hoy `exerciseLabels` (`src/exercise-names.js`) traduce un ejercicio solo si su id está en `DEFAULT_EXERCISE_KEYS` y su nombre guardado sigue siendo el inglés original (`DEFAULT_EXERCISES` de `src/store.js`, ids de `'1'` a `'6'`). Las plantillas necesitarían ids propios y ampliar esa tabla.
- **Datos guardados**: si solo se copian ejercicios a la lista existente, el esquema no cambia (hoy es la versión 8). Si se guarda qué plantilla está activa, hay que subir la versión y añadir la migración en `src/store.js`.
- **Iconos**: las clases de Tailwind deben aparecer literales y hay que añadir las etiquetas de cualquier icono nuevo en todos los idiomas.
- **Interfaz**: modal nuevo con botón Atrás (`src/ui.js`), propiedades lógicas para el árabe y `npm run check:layout` (incluido `--stress`) al terminar.
- **Ficha de Play**: novedades y capturas, y valorar si merece una captura propia.

**Riesgos**: más ejercicios por defecto significan más texto que mantener en 20 idiomas, y las plantillas deben quedar bien en pantallas pequeñas y en árabe.

## Hecho: versión 1.15 «Be Reborn» (versionCode 15)

- **Repeticiones propias por ejercicio**, como rango mínimo-máximo editable en cualquier momento (`repsMin` y `repsMax`; por defecto y al crear, 10-60).
  - Solo enteros de 1 a 999 999 (`MAX_REP_VALUE`), validados en `src/store.js`. El nombre del ejercicio admite 30 caracteres y el nombre corto 12; si no se escribe corto, se deriva del nombre.
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
- Retos completados en el historial con un resumen sencillo (prerrequisito para retomar la valoración en la app).
- Exportar e importar la configuración en un archivo local.
- Revisión de accesibilidad (texto grande, lector de pantalla).
- Compactar la lista de Configuración: con el rango en una segunda línea, cada ejercicio ocupa dos líneas y la lista se alarga.

_Apunta aquí lo que aún no tiene versión asignada._
