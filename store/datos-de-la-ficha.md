# Datos de la ficha de Google Play

## Enlaces
| Campo | Valor |
|---|---|
| Política de privacidad | https://gymroul.web.app/privacy.html |
| Eliminación de datos | https://gymroul.web.app/data-deletion.html |
| Créditos | https://gymroul.web.app/credits.html |
| Correo de contacto | pointedio@proton.me |
| Identificador de la app | eus.jabibi.gymroul |
| Versión | 1.20 (Toes2Bar) (versionCode 20); se define en `package.json` |

Las páginas existen solo después de desplegar la web (`npm run deploy`). Cada una contiene los diecisiete idiomas y muestra el del navegador del visitante, con un selector arriba; la misma URL vale para todas las fichas. Se puede forzar uno con `?lang=eu`.

## Clasificación
- Categoría en la consola: Salud y bienestar (Health & Fitness).
- Público objetivo: 16 años o más.
- Anuncios: no contiene anuncios.
- Cuentas de usuario: la app no permite crear cuentas.

## Seguridad de los datos
La app **no recopila ni comparte ningún dato** (sin analítica, sin anuncios, sin SDK de terceros, sin permiso de Internet). En Play Console:

- ¿Tu aplicación recopila o comparte alguno de los tipos de datos de usuario necesarios? **No**.
- Todas las categorías, sin marcar (ubicación, actividad en aplicaciones, IDs de dispositivo u otros ID, etc.).
- Política de privacidad: la URL de arriba.
- Compartir el reto (1.14): la app genera una imagen y un texto en el dispositivo y los entrega al menú de compartir de Android; no los envía ella. Es una acción que decide el usuario y la imagen solo lleva el ejercicio, las repeticiones y la marca de la app, sin datos personales, así que la respuesta sigue siendo **No** (confírmalo en la ayuda de Play Console sobre la sección «Seguridad de los datos»). La política de privacidad ya lo explica.

> Al actualizar la declaración, Play puede tardar en reflejar el cambio.

## Permisos de la app
Solo VIBRATE (vibración del resultado). La app **no** declara INTERNET: no se conecta a ningún servidor. Los plugins de compartir de la 1.14 (`@capacitor/share` y `@capacitor/filesystem`) no añaden permisos.
