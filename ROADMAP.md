# Hoja de ruta

Objetivos de las próximas versiones. Lo ya publicado está en el historial de commits y en las notas de cada versión (`store/notas-de-la-version.txt`).

## Peticiones de usuarios

Lo que piden las reseñas de Play y otros mensajes. Se apunta la petición, de dónde viene y qué implicaría; no es un compromiso de hacerlo.

- Repeticiones por ejercicio (reseña de 5 estrellas, 6 oct 2026, versión 1.10, en inglés). Quien la escribe puede hacer 50 flexiones pero solo 10 dominadas, y propone asignar un número de repeticiones al añadir un ejercicio y poder actualizarlo más adelante a medida que se gana fuerza.
  - Hoy las repeticiones son una lista global (máximo 12) que se combina con todos los ejercicios (máximo 12), y los sectores son repeticiones activas x ejercicios activos. Esto lo cambiaría a repeticiones propias de cada ejercicio, con migración del esquema de `src/store.js`.
- Ruleta solo con los ejercicios (misma reseña). Propone que la ruleta muestre únicamente los ejercicios (empezaría con solo 6 sectores) y que el número de repeticiones aleatorio salga después de girar, para que se vea menos recargada.
  - Cambia la lógica de `src/wheel-math.js` y el dibujo de `src/wheel.js`, y encaja con la petición anterior: el sector sería el ejercicio y las repeticiones saldrían de su propio rango o valor.

## Versión 1.15 (alcance acordado)

Se hacen juntas las dos peticiones de la reseña de 5 estrellas (6 oct 2026), porque la segunda depende de la primera.

- **Repeticiones propias por ejercicio**, como rango mínimo–máximo editable en cualquier momento.
  - Sustituye la lista global de repeticiones (máximo 12). Sigue el máximo de 12 ejercicios.
  - Migración del esquema de `src/store.js` (subir la versión): los ejercicios existentes reciben un rango por defecto razonable.
  - Textos nuevos en `en.js` y en los 20 idiomas; revisar la política de privacidad solo si cambian las prácticas (no se espera).
- **Ruleta solo con ejercicios**: un sector por ejercicio activo y el número de repeticiones, al azar dentro del rango del ejercicio, sale después de girar.
  - Cambia la lógica de `src/wheel-math.js` (sin DOM, con tests) y el dibujo de `src/wheel.js`.
  - Revisar el historial, el resultado y «Compartir reto», que hoy asumen sector = ejercicio x repeticiones.
  - Ejecutar `npm run check:layout` en todos los idiomas, árabe incluido.
- Decisiones de diseño:
  - Modelo: cada ejercicio lleva `repsMin` y `repsMax` (enteros de 1 a `MAX_REP_VALUE`, con mínimo <= máximo). Desaparecen la lista global, `active.reps`, `MAX_REPS`, `getReps`, `addRep` y `removeRep`; se añade `updateExerciseReps(id, min, max)` y el error `error.repMinMax`.
  - Migración v7 -> v8 (`SCHEMA_VERSION` = 8): cada ejercicio recibe el mínimo y el máximo de las repeticiones activas guardadas; si no hay, las de `gym_reps`; si tampoco, 10–60. Es idempotente y `getExercises` rellena los que sigan sin rango. Se borran ya `gym_reps` y `gymroulette_active_reps` (sin vuelta atrás limpia a versiones anteriores).
  - Ejercicios por defecto y ejercicios nuevos: rango inicial 10–60.
  - Tirada: entero uniforme entre mínimo y máximo, ambos incluidos (`rollReps(min, max, rng)`, pura y con test). Se tira al terminar el giro y el resultado, el historial y «Compartir reto» reciben las repeticiones ya tiradas.
  - Ruleta: un sector por ejercicio activo (máximo 12), etiqueta siempre con el nombre corto. Se quita la insignia de repeticiones del marcador en vivo. `winner.reps === 0` deja de ser el centinela de «Configurar».
  - Configuración: se elimina la tarjeta de repeticiones. Cada ejercicio muestra su rango en un botón de al menos 44 px que despliega un editor en la propia fila (Mín., Máx., Guardar y Cancelar), sin modal nuevo. El formulario de añadir ejercicio gana los campos Mín. y Máx. En árabe, campos numéricos con `dir="ltr"` y propiedades lógicas.
  - Textos: se retiran las claves de la lista global de repeticiones y se añaden `config.repsMin`, `config.repsMax`, `config.repsRange`, `config.editReps`, `config.repsSave` y `error.repMinMax`, en `en.js` y en los 20 idiomas. Revisar la ficha de Play y las capturas. La política de privacidad no cambia.
  - Commits previstos: modelo y migración con tests; `wheel-math` y `wheel.js`; giro, resultado, historial y compartir; configuración; textos y ficha; publicación (1.15.0, versionCode 15, codename, notas y `store/datos-de-la-ficha.md`). Al terminar, `npm run check:layout`.
- Fuera de alcance: retos completados en el historial, plantillas, exportar/importar y revisión de accesibilidad (quedan como ideas sin fecha).

## Ideas sin fecha

- Valoración dentro de la app (In-App Review): descartada de momento. Añade una dependencia de Google Play que choca con el «sin SDK de terceros ni conexión» de la 1.13 (habría que revisar la política de privacidad y «Seguridad de los datos»), Google limita cuántas veces se muestra y ahora no hay un momento claro de éxito del usuario. Retomarla cuando haya más usuarios y algo como un historial de entrenamientos completados.

- Retos completados en el historial con un resumen sencillo (prerrequisito para retomar la valoración en la app).
- Plantillas de ejercicios para empezar rápido.
- Exportar e importar la configuración en un archivo local.
- Revisión de accesibilidad (texto grande, lector de pantalla).

_Apunta aquí lo que aún no tiene versión asignada._
