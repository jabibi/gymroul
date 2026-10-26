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
└── <idioma de Play>/                        ar, ca, de-DE, en-US, es-ES, eu-ES, fr-FR, gl-ES, hi-IN, it-IT, ja-JP, nl-NL, pl-PL, pt-BR, pt-PT, ru-RU, tr-TR
    ├── grafico-de-funciones-1024x500.png    Gráfico de funciones con el texto traducido
    ├── capturas-telefono/                   Cuatro capturas 1080 x 1920 (9:16) con la app en ese idioma
    └── textos/
        ├── titulo.txt                       Nombre de la aplicación
        ├── descripcion-corta.txt            Descripción breve
        ├── descripcion-completa.txt         Descripción completa
        └── notas-de-la-version.txt          Novedades (las dos últimas versiones)
```

## Idiomas y longitud de los textos
| Carpeta | Idioma en Play Console | Descripción breve | Descripción completa | Novedades |
|---|---|---|---|---|
| `ar` | Árabe | 62/80 | 2163/4000 | 321/500 |
| `ca` | Catalán | 64/80 | 2621/4000 | 399/500 |
| `de-DE` | Alemán | 71/80 | 2819/4000 | 384/500 |
| `en-US` | Inglés (Estados Unidos) | 60/80 | 2515/4000 | 355/500 |
| `es-ES` | Español (España) | 73/80 | 2619/4000 | 397/500 |
| `eu-ES` | Euskera | 63/80 | 2746/4000 | 430/500 |
| `fr-FR` | Francés (Francia) | 69/80 | 2837/4000 | 418/500 |
| `gl-ES` | Gallego | 70/80 | 2603/4000 | 372/500 |
| `hi-IN` | Hindi | 55/80 | 2517/4000 | 399/500 |
| `it-IT` | Italiano | 64/80 | 2658/4000 | 395/500 |
| `ja-JP` | Japonés | 29/80 | 1397/4000 | 216/500 |
| `nl-NL` | Neerlandés | 72/80 | 2739/4000 | 408/500 |
| `pl-PL` | Polaco | 54/80 | 2578/4000 | 380/500 |
| `pt-BR` | Portugués (Brasil) | 69/80 | 2625/4000 | 385/500 |
| `pt-PT` | Portugués (Portugal) | 68/80 | 2652/4000 | 387/500 |
| `ru-RU` | Ruso | 59/80 | 2672/4000 | 393/500 |
| `tr-TR` | Turco | 64/80 | 2486/4000 | 357/500 |

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
| `notas-de-la-version.txt` | Novedades de las dos últimas versiones (la actual y la anterior, cada una con su encabezado): se pega **entero** en el cuadro de novedades al crear la versión (un bloque por idioma, con la etiqueta del código de Play) |

Recomendación: deja **en-US** como idioma predeterminado, porque es el que ve quien tenga un idioma que no hayas añadido.

## Requisitos de Google Play que cumplen
- Icono: PNG de 32 bits con canal alfa, 512 x 512 px, menos de 1 MB.
- Gráfico de funciones: PNG sin canal alfa, 1024 x 500 px.
- Capturas de teléfono: PNG sin canal alfa, relación 9:16 y lados entre 320 y 3840 px, menos de 8 MB cada una.
- Título hasta 30 caracteres, descripción breve hasta 80, completa hasta 4000 y novedades hasta 500 (lo comprueba `npm test`).

## Regenerar
```bash
npm run store                                  # todos los idiomas
STORE_ONLY=es-ES,en-US npm run store          # solo algunos (códigos de Play); no guarda la huella de `npm run store:check`
```
(`npm run store -- --only=…` no filtra: npm añade esos argumentos al último comando de la cadena, no al generador.)
Compila la app y la renderiza con Chrome sin interfaz y sin red: no se contacta con ningún servidor. Si Chrome no está en
`/usr/bin/google-chrome`, indica su ruta con `CHROME_PATH=/ruta/a/chrome npm run store`. Las capturas son de la app real y salen en
el idioma de cada ficha; si cambias la interfaz o los textos, vuelve a ejecutarlo.

## Revisión de las traducciones
Las traducciones al euskera, gallego, catalán y árabe (este último, además, en sentido de lectura de derecha a izquierda), y los textos legales de todos los idiomas, conviene que los revise una persona
nativa antes de publicar. Las páginas de privacidad no son asesoramiento jurídico.
