import { defineConfig } from 'vite';

// La salida va a www/ porque es el directorio que usan Firebase Hosting y Capacitor
export default defineConfig({
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'www',
    emptyOutDir: true,
  },
  server: {
    // Carpetas de salida o ajenas a la app web: sin esto, cada build:android o cada compilación de Gradle
    // recarga el navegador del servidor de desarrollo
    watch: { ignored: ['**/android/**', '**/www/**', '**/store/**', '**/.firebase/**'] },
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
  },
});
