# Hoja de ruta

Objetivos de las próximas versiones. Lo ya publicado está en el historial de commits y en las notas de cada versión (`store/notas-de-la-version.txt`).

## 1.14 (RandWork): en preparación

- En Play Console, cambiar la categoría a Salud y bienestar (Health & Fitness).
- Reducir los pasos de configuración inicial para que el usuario obtenga valor en menos de 10 segundos tras la primera apertura.
- Exportación y compartición: compartir el resultado como imagen PNG con un texto asociado que incluya el enlace a la app (o algo parecido), para favorecer la viralidad orgánica. Se descarta el PDF. Todo se genera en local y sin conexión; la app solo entrega el archivo al menú de compartir del sistema, así que no hace falta el permiso `INTERNET` ni cambiar la política de privacidad (lo que el usuario haga después con el archivo queda fuera de la app).
  - Detalle técnico: Capacitor no trae compartir archivos de serie, así que hará falta el plugin oficial `@capacitor/share` (y probablemente `@capacitor/filesystem` para guardar el PNG temporal). Son plugins locales que no usan red ni Google Play, pero añaden dependencias, y `CLAUDE.md` pide revisar eso. En la web se puede usar la Web Share API, que no necesita nada extra.

## Ideas sin fecha

- Valoración dentro de la app (In-App Review): descartada de momento. Añade una dependencia de Google Play que choca con el «sin SDK de terceros ni conexión» de la 1.13 (habría que revisar la política de privacidad y «Seguridad de los datos»), Google limita cuántas veces se muestra y ahora no hay un momento claro de éxito del usuario. Retomarla cuando haya más usuarios y algo como un historial de entrenamientos completados.

_Apunta aquí lo que aún no tiene versión asignada._
