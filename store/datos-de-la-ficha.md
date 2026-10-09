# Datos de la ficha de Google Play

## Enlaces
| Campo | Valor |
|---|---|
| Política de privacidad | https://gymroul.web.app/privacy.html |
| Eliminación de datos | https://gymroul.web.app/data-deletion.html |
| Créditos | https://gymroul.web.app/credits.html |
| Correo de contacto | javimelex@gmail.com |
| Identificador de la app | eus.jabibi.gymroul |
| Versión | 1.13 (the 13th) (versionCode 13); se define en `package.json` |

Las páginas existen solo después de desplegar la web (`npm run deploy`). Cada una contiene los dieciséis idiomas y muestra el del navegador del visitante, con un selector arriba; la misma URL vale para todas las fichas. Se puede forzar uno con `?lang=eu`.

## Clasificación
- Categoría en la consola: Salud y bienestar (Health & Fitness).
- Público objetivo: 16 años o más.
- Anuncios: no contiene anuncios.
- Cuentas de usuario: la app no permite crear cuentas.

## Seguridad de los datos
Desde la 1.13 la app **no recopila ni comparte ningún dato** (sin analítica, sin anuncios, sin SDK de terceros, sin permiso de Internet). En Play Console:

- ¿Tu aplicación recopila o comparte alguno de los tipos de datos de usuario necesarios? **No**.
- Todas las categorías, sin marcar (ubicación, actividad en aplicaciones, IDs de dispositivo u otros ID, etc.).
- Política de privacidad: la URL de arriba (ya explica que las versiones anteriores a la 1.13 tenían Google Analytics opcional).

> Los datos que recogieron las versiones anteriores a la 1.13 en Google Analytics (si el usuario los aceptó) siguen en Google un máximo de 14 meses y se pueden solicitar eliminar desde la página de eliminación de datos. Al actualizar la declaración, Play puede tardar en reflejar el cambio.

## Permisos de la app
Solo VIBRATE (vibración del resultado). Desde la 1.13 la app **no** declara INTERNET: no se conecta a ningún servidor.
