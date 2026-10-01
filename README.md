# GymRoulette

Ruleta de ejercicios para entrenar. Gira la ruleta (con el botón o arrastrándola) y obtén un reto aleatorio con el formato `repeticiones × ejercicio`, por ejemplo **20 Burpee**.

Disponible como aplicación web (Firebase Hosting) y como app Android (Capacitor) a partir del mismo código.

## Características

- Ruleta en `canvas` con física de inercia, sonido de "tick", fanfarria al terminar y vibración.
- Sectores generados automáticamente: repeticiones activas × ejercicios activos (por defecto 6 × 6 = 36).
- Configuración editable: activar/desactivar, crear y eliminar ejercicios (nombre, nombre corto, icono) y repeticiones.
- Historial de la sesión.
- La configuración se guarda en `localStorage`.
- Interfaz en español, pensada para móvil.

## Estructura

```
www/index.html         App completa (HTML + CSS + JS)
www/privacy.html       Política de privacidad
firebase.json          Configuración de Firebase Hosting
capacitor.config.json  Configuración de Capacitor (appId eus.jabibi.gymroul)
assets/icon.png        Icono fuente para generar iconos y splash
android/               Proyecto Android generado por Capacitor
```

No hay paso de compilación para la web: `www/` se sirve tal cual. Tailwind, Font Awesome, Google Fonts y el SDK de Firebase se cargan por CDN, así que hace falta conexión a internet.

## Requisitos

- Node.js y npm
- [Firebase CLI](https://firebase.google.com/docs/cli) (para desplegar la web)
- Android Studio / JDK 21 (para compilar la app Android)

## Puesta en marcha

```bash
npm install
```

Para probar la web en local basta con servir `www/`:

```bash
npx serve www
```

## Despliegue web

```bash
firebase deploy --only hosting
```

El proyecto de Firebase por defecto es `gymroul` (ver `.firebaserc`).

## App Android

Tras cualquier cambio en `www/`, sincroniza la copia de Android:

```bash
npx cap sync android
```

Abrir en Android Studio:

```bash
npx cap open android
```

Generar el bundle de release (la firma no está configurada en el repositorio; usa tu propio keystore, que no debe subirse):

```bash
cd android && ./gradlew bundleRelease
```

Regenerar iconos y splash desde `assets/icon.png`:

```bash
npx capacitor-assets generate --android
```

## Stack

Capacitor 8 · Firebase Hosting y Analytics · Tailwind CSS (CDN) · Font Awesome 6 · Canvas 2D y Web Audio API

## Privacidad

Consulta [`www/privacy.html`](www/privacy.html).
