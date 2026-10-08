# Hoja de ruta

Objetivos de las próximas versiones. Lo ya publicado está en el historial de commits y en las notas de cada versión (`store/notas-de-la-version.txt`).

## 1.14 (RandWork): en preparación

- En Play Console, cambiar la categoría a Salud y bienestar (Health & Fitness).
- Reducir los pasos de configuración inicial para que el usuario obtenga valor en menos de 10 segundos tras la primera apertura.
- Exportación y compartición: compartir el resultado como imagen PNG con un texto asociado que incluya el enlace a la app (o algo parecido), para favorecer la viralidad orgánica. Se descarta el PDF. Todo se genera en local y sin conexión; la app solo entrega el archivo al menú de compartir del sistema, así que no hace falta el permiso `INTERNET` ni cambiar la política de privacidad (lo que el usuario haga después con el archivo queda fuera de la app).
  - Detalle técnico: Capacitor no trae compartir archivos de serie, así que hará falta el plugin oficial `@capacitor/share` (y probablemente `@capacitor/filesystem` para guardar el PNG temporal). Son plugins locales que no usan red ni Google Play, pero añaden dependencias, y `CLAUDE.md` pide revisar eso. En la web se puede usar la Web Share API, que no necesita nada extra.
- Nuevo idioma: neerlandés (`nl`). Hay que añadirlo en la app (`src/i18n/`), en la ficha de Play (`store/listing.mjs`) y en las páginas legales (`legal/index.mjs`), y regenerar la ficha (`npm run store`). Pasarían a ser 19 idiomas en la app y la ficha, y 15 en las páginas legales.

## Peticiones de usuarios

Lo que piden las reseñas de Play y otros mensajes. Se apunta la petición, de dónde viene y qué implicaría; no es un compromiso de hacerlo.

- Repeticiones por ejercicio (reseña de 5 estrellas, 6 oct 2026, versión 1.10, en inglés). Quien la escribe puede hacer 50 flexiones pero solo 10 dominadas, y propone asignar un número de repeticiones al añadir un ejercicio y poder actualizarlo más adelante a medida que se gana fuerza.
  - Hoy las repeticiones son una lista global (máximo 12) que se combina con todos los ejercicios (máximo 12), y los sectores son repeticiones activas x ejercicios activos. Esto lo cambiaría a repeticiones propias de cada ejercicio, con migración del esquema de `src/store.js`.
- Ruleta solo con los ejercicios (misma reseña). Propone que la ruleta muestre únicamente los ejercicios (empezaría con solo 6 sectores) y que el número de repeticiones aleatorio salga después de girar, para que se vea menos recargada.
  - Cambia la lógica de `src/wheel-math.js` y el dibujo de `src/wheel.js`, y encaja con la petición anterior: el sector sería el ejercicio y las repeticiones saldrían de su propio rango o valor.

## Ideas sin fecha

- Valoración dentro de la app (In-App Review): descartada de momento. Añade una dependencia de Google Play que choca con el «sin SDK de terceros ni conexión» de la 1.13 (habría que revisar la política de privacidad y «Seguridad de los datos»), Google limita cuántas veces se muestra y ahora no hay un momento claro de éxito del usuario. Retomarla cuando haya más usuarios y algo como un historial de entrenamientos completados.

_Apunta aquí lo que aún no tiene versión asignada._
