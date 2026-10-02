# Recursos de la ficha de Google Play

Todo lo necesario para la ficha de GymRoulette, en español. Los gráficos se generan solos desde la app y los textos están escritos a mano.

```
store/
├── graficos/
│   ├── icon.png                              Icono de la aplicación, 512 x 512
│   └── grafico-de-funciones-1024x500.png     Gráfico de funciones, 1024 x 500
├── capturas-telefono/                        Capturas de teléfono, 1080 x 1920 (9:16)
│   ├── 01-ruleta.png
│   ├── 02-resultado.png
│   ├── 03-historial.png
│   ├── 04-configuracion.png
│   ├── 05-selector-de-iconos.png
│   └── 06-busqueda-de-iconos.png
└── textos/
    ├── titulo.txt                  (11 de 30 caracteres)
    ├── descripcion-corta.txt       (75 de 80)
    ├── descripcion-completa.txt    (1923 de 4000)
    ├── notas-de-la-version.txt     (474 de 500)
    └── datos-de-la-ficha.md        Enlaces, clasificación y Seguridad de los datos
```

## Dónde sube cada cosa en Play Console
| Archivo | Campo de la consola |
|---|---|
| `graficos/icon.png` | Ficha de Play Store principal → Icono de la aplicación |
| `graficos/grafico-de-funciones-1024x500.png` | Ficha de Play Store principal → Gráfico de funciones |
| `capturas-telefono/*.png` | Recursos para teléfono → Capturas de pantalla de teléfonos (entre 2 y 8) |
| `textos/titulo.txt` | Nombre de la aplicación |
| `textos/descripcion-corta.txt` | Breve descripción |
| `textos/descripcion-completa.txt` | Descripción completa |
| `textos/notas-de-la-version.txt` | Novedades de esta versión (en la pantalla de la versión) |

## Requisitos de Google Play que cumplen
- Icono: PNG de 32 bits con canal alfa, 512 x 512 px, menos de 1 MB.
- Gráfico de funciones: PNG sin canal alfa, 1024 x 500 px.
- Capturas de teléfono: PNG sin canal alfa, relación 9:16 y lados entre 320 y 3840 px, menos de 8 MB cada una.

## Regenerar los gráficos
```bash
npm run store
```
Compila la app y la renderiza con Chrome sin interfaz y sin red: no se envía nada a Google Analytics. Si Chrome no está en `/usr/bin/google-chrome`, indica su ruta con `CHROME_PATH=/ruta/a/chrome npm run store`. Las capturas son siempre de la app real; si cambias la interfaz, vuelve a ejecutarlo.
