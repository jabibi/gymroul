# Hoja de ruta

Objetivos de las próximas versiones. Lo ya publicado está en el historial de commits y en las notas de cada versión (`store/notas-de-la-version.txt`).

## Peticiones de usuarios

Lo que piden las reseñas de Play y otros mensajes. Se apunta la petición, de dónde viene y qué implicaría; no es un compromiso de hacerlo. Aún no hay ninguna abierta.

Atendidas en la 1.15:

- Repeticiones por ejercicio (reseña de 5 estrellas, 6 oct 2026, versión 1.10, en inglés; y feedback del día 11 de la prueba, de Kamil Szostek, en inglés). Quien lo pide puede hacer 50 flexiones pero solo 10 dominadas, y quiere asignar un número de repeticiones a cada ejercicio y poder cambiarlo a medida que gana fuerza.
- Ruleta solo con los ejercicios (misma reseña): que la ruleta muestre únicamente los ejercicios y que el número de repeticiones salga después de girar, para que se vea menos recargada.
- Ejercicios por defecto sin traducir (informe de prueba en OPPO Reno5 A con Android 12, en español, con la app en japonés): las etiquetas de la ruleta salían en inglés mientras los botones y los diálogos estaban en japonés.

## Próxima versión: 1.16

- **Historial sin repeticiones duplicadas**: cada fila muestra las repeticiones dos veces, en el recuadro de la izquierda y de nuevo al principio del título («16 Mendi-igoerak», «12 Sentadillas»). Detectado en la 1.15 con la app en euskera. Dejar el número solo en el recuadro y poner en el título solo el ejercicio, traducido. Está en `renderHistory` y `addToHistory` de `src/ui.js`: `text` (`displayChallenge(reps, exercise)`) solo se usa para ese título, así que basta con pintar el nombre del ejercicio y quitar `text`. Comprobar con `npm run check:layout` (incluido `--stress`, con 999999 repeticiones) que el título no se corta ni se solapa con el recuadro.

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
- Plantillas de ejercicios para empezar rápido.
- Exportar e importar la configuración en un archivo local.
- Revisión de accesibilidad (texto grande, lector de pantalla).
- Compactar la lista de Configuración: con el rango en una segunda línea, cada ejercicio ocupa dos líneas y la lista se alarga.

_Apunta aquí lo que aún no tiene versión asignada._
