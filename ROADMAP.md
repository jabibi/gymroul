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
- Fuera de alcance: retos completados en el historial, plantillas, exportar/importar y revisión de accesibilidad (quedan como ideas sin fecha).

## Ideas sin fecha

- Valoración dentro de la app (In-App Review): descartada de momento. Añade una dependencia de Google Play que choca con el «sin SDK de terceros ni conexión» de la 1.13 (habría que revisar la política de privacidad y «Seguridad de los datos»), Google limita cuántas veces se muestra y ahora no hay un momento claro de éxito del usuario. Retomarla cuando haya más usuarios y algo como un historial de entrenamientos completados.

- Retos completados en el historial con un resumen sencillo (prerrequisito para retomar la valoración en la app).
- Plantillas de ejercicios para empezar rápido.
- Exportar e importar la configuración en un archivo local.
- Revisión de accesibilidad (texto grande, lector de pantalla).

_Apunta aquí lo que aún no tiene versión asignada._
