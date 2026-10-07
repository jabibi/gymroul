# Hoja de ruta

Objetivos de las próximas versiones. Lo ya publicado está en el historial de commits y en las notas de cada versión (`store/notas-de-la-version.txt`).

## 1.13 (the 13th): en preparación

Hecho en esta versión:

- Firebase Analytics eliminado por completo: sin `src/analytics.js`, sin la dependencia `firebase`, sin consentimiento, sin el interruptor de Configuración y sin orígenes de Google en la CSP. La migración v5 → v6 de `src/store.js` borra la elección guardada (`gymroulette_analytics_consent`).
- La app de Android ya no declara el permiso de Internet (solo `VIBRATE`).
- Introducción de dos diapositivas en la primera apertura (cómo funciona la ruleta; offline, sin anuncios, sin trackers, sin cookies innecesarias y sin acceso a la ubicación), con `Skip` arriba y botón Atrás de Android.
- Nuevos idiomas: polaco, hindi, turco e inglés de Australia (17 en la app y la ficha de Play, 13 en las páginas legales).
- Política de privacidad y eliminación de datos reescritas: sin recopilación; las versiones anteriores a la 1.13 se mencionan en pasado.
- Ficha de Play: textos sin analítica, capturas de la introducción (07 y 08) y 17 idiomas.

Pendiente de hacer a mano antes de publicar:

- Probar la app en un dispositivo real **sin el permiso de Internet** (que arranca, gira y guarda la configuración) y la introducción de la primera apertura y desde una versión anterior.
- Actualizar en Play Console la sección «Seguridad de los datos» (ahora: no se recopilan datos) según `store/datos-de-la-ficha.md`.
- Revisión por hablantes nativos de alemán, italiano, polaco, hindi y turco (aplicación, páginas legales y ficha).
- Desplegar la web (`npm run deploy`) para que las páginas legales nuevas estén publicadas antes de enviar la versión a revisión.

## Ideas sin fecha

_Apunta aquí lo que aún no tiene versión asignada._
