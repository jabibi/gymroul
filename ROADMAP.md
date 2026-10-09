# Hoja de ruta

Objetivos de las próximas versiones. Lo ya publicado está en el historial de commits y en las notas de cada versión (`store/notas-de-la-version.txt`).

## Peticiones de usuarios

Lo que piden las reseñas de Play y otros mensajes. Se apunta la petición, de dónde viene y qué implicaría; no es un compromiso de hacerlo.

- Repeticiones por ejercicio (reseña de 5 estrellas, 6 oct 2026, versión 1.10, en inglés). Quien la escribe puede hacer 50 flexiones pero solo 10 dominadas, y propone asignar un número de repeticiones al añadir un ejercicio y poder actualizarlo más adelante a medida que se gana fuerza.
  - Hoy las repeticiones son una lista global (máximo 12) que se combina con todos los ejercicios (máximo 12), y los sectores son repeticiones activas x ejercicios activos. Esto lo cambiaría a repeticiones propias de cada ejercicio, con migración del esquema de `src/store.js`.
- Ruleta solo con los ejercicios (misma reseña). Propone que la ruleta muestre únicamente los ejercicios (empezaría con solo 6 sectores) y que el número de repeticiones aleatorio salga después de girar, para que se vea menos recargada.
  - Cambia la lógica de `src/wheel-math.js` y el dibujo de `src/wheel.js`, y encaja con la petición anterior: el sector sería el ejercicio y las repeticiones saldrían de su propio rango o valor.

## Ideas sin fecha

- Valoración dentro de la app (In-App Review): descartada de momento. Añade una dependencia de Google Play que choca con el «sin SDK de terceros ni conexión» de la 1.13 (habría que revisar la política de privacidad y «Seguridad de los datos»), Google limita cuántas veces se muestra y ahora no hay un momento claro de éxito del usuario. Retomarla cuando haya más usuarios y algo como un historial de entrenamientos completados.

_Apunta aquí lo que aún no tiene versión asignada._
