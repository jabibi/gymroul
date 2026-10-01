import { defineConfig } from 'vite';

// La salida va a www/ porque es el directorio que usan Firebase Hosting y Capacitor
export default defineConfig({
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'www',
    emptyOutDir: true,
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
  },
});
