# Recursos de la ficha de Google Play

Una carpeta por idioma de Play Console, con **título, descripción breve, descripción completa, novedades de la versión,
gráfico de funciones y capturas de teléfono** de ese idioma. El icono es el mismo para todos. Este archivo lo genera
`npm run store`; el texto de cada ficha está en [`listing.mjs`](listing.mjs).

```
store/
├── icon.png                                 Icono de la aplicación, 512 x 512 (común a todos los idiomas)
├── notas-de-la-version.txt                  Novedades de TODOS los idiomas en el formato único que pide Play
├── importar-traducciones.csv                Título y descripciones de TODOS los idiomas para «Importar un archivo» (npm run store)
├── datos-de-la-ficha.md                     Enlaces, clasificación y Seguridad de los datos
├── listing.mjs                              Fuente de los textos de cada idioma
└── <idioma de Play>/                        ar, ca, de-DE, en-US, en-GB, en-AU, es-ES, es-419, eu-ES, fr-FR, fr-CA, gl-ES, hi-IN, it-IT, ja-JP, nl-NL, pl-PL, pt-BR, pt-PT, tr-TR
    ├── grafico-de-funciones-1024x500.png    Gráfico de funciones con el texto traducido
    ├── capturas-telefono/                   Siete capturas 1080 x 1920 (9:16) con la app en ese idioma
    └── textos/
        ├── titulo.txt                       Nombre de la aplicación
        ├── descripcion-corta.txt            Descripción breve
        ├── descripcion-completa.txt         Descripción completa
        └── notas-de-la-version.txt          Novedades de esta versión
```

## Idiomas y longitud de los textos
| Carpeta | Idioma en Play Console | Descripción breve | Descripción completa | Novedades |
|---|---|---|---|---|
| `ar` | Árabe | 54/80 | 2001/4000 | 326/500 |
| `ca` | Catalán | 74/80 | 2388/4000 | 378/500 |
| `de-DE` | Alemán | 72/80 | 2607/4000 | 386/500 |
| `en-US` | Inglés (Estados Unidos) | 68/80 | 2291/4000 | 351/500 |
| `en-GB` | Inglés (Reino Unido) | 68/80 | 2291/4000 | 351/500 |
| `en-AU` | Inglés (Australia) | 68/80 | 2291/4000 | 351/500 |
| `es-ES` | Español (España) | 75/80 | 2401/4000 | 392/500 |
| `es-419` | Español (Latinoamérica) | 75/80 | 2407/4000 | 392/500 |
| `eu-ES` | Euskera | 74/80 | 2535/4000 | 393/500 |
| `fr-FR` | Francés (Francia) | 77/80 | 2596/4000 | 433/500 |
| `fr-CA` | Francés (Canadá) | 77/80 | 2595/4000 | 433/500 |
| `gl-ES` | Gallego | 76/80 | 2382/4000 | 374/500 |
| `hi-IN` | Hindi | 65/80 | 2317/4000 | 354/500 |
| `it-IT` | Italiano | 77/80 | 2419/4000 | 374/500 |
| `ja-JP` | Japonés | 41/80 | 1296/4000 | 41/500 |
| `nl-NL` | Neerlandés | 76/80 | 2528/4000 | 66/500 |
| `pl-PL` | Polaco | 70/80 | 2357/4000 | 391/500 |
| `pt-BR` | Portugués (Brasil) | 75/80 | 2387/4000 | 363/500 |
| `pt-PT` | Portugués (Portugal) | 75/80 | 2410/4000 | 378/500 |
| `tr-TR` | Turco | 70/80 | 2290/4000 | 360/500 |

## Dónde sube cada archivo en Play Console
En **Presencia en Google Play Store → Fichas de Play Store**, elige el idioma arriba (*Gestionar idiomas* para añadirlos) y rellena:

| Archivo | Campo de la consola |
|---|---|
| `icon.png` | Recursos visuales comunes → Icono de la aplicación |
| `<idioma>/textos/titulo.txt` | Nombre de la aplicación |
| `<idioma>/textos/descripcion-corta.txt` | Descripción breve |
| `<idioma>/textos/descripcion-completa.txt` | Descripción completa |
| `<idioma>/grafico-de-funciones-1024x500.png` | Gráfico de funciones |
| `<idioma>/capturas-telefono/*.png` | Capturas de pantalla de teléfonos (entre 2 y 8) |
| `notas-de-la-version.txt` | Novedades de esta versión: se pega **entero** en el cuadro de novedades al crear la versión (un bloque por idioma, con la etiqueta del código de Play) |

Recomendación: deja **en-US** como idioma predeterminado, porque es el que ve quien tenga un idioma que no hayas añadido.

## Requisitos de Google Play que cumplen
- Icono: PNG de 32 bits con canal alfa, 512 x 512 px, menos de 1 MB.
- Gráfico de funciones: PNG sin canal alfa, 1024 x 500 px.
- Capturas de teléfono: PNG sin canal alfa, relación 9:16 y lados entre 320 y 3840 px, menos de 8 MB cada una.
- Título hasta 30 caracteres, descripción breve hasta 80, completa hasta 4000 y novedades hasta 500 (lo comprueba `npm test`).

## Regenerar
```bash
npm run store                                  # todos los idiomas
npm run store -- --only=es-ES,en-US            # solo algunos (códigos de Play)
```
Compila la app y la renderiza con Chrome sin interfaz y sin red: no se contacta con ningún servidor. Si Chrome no está en
`/usr/bin/google-chrome`, indica su ruta con `CHROME_PATH=/ruta/a/chrome npm run store`. Las capturas son de la app real y salen en
el idioma de cada ficha; si cambias la interfaz o los textos, vuelve a ejecutarlo.

## Revisión de las traducciones
Las traducciones al euskera, gallego, catalán y árabe (este último, además, en sentido de lectura de derecha a izquierda), y los textos legales de todos los idiomas, conviene que los revise una persona
nativa antes de publicar. Las páginas de privacidad no son asesoramiento jurídico.
