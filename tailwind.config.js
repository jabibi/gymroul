import { addDynamicIconSelectors } from '@iconify/tailwind';
import { GYMROUL_ICONS } from './src/custom-icons.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.js'],
  // Clases de iconos (prefijo icon, conjunto y nombre separados por dos guiones): máscaras CSS generadas en el build a partir de @iconify-json
  plugins: [addDynamicIconSelectors({ iconSets: { gymroul: GYMROUL_ICONS } })],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        // Los valores viven en src/style.css (:root) como canales RGB
        brand: {
          400: 'rgb(var(--brand-400) / <alpha-value>)',
          500: 'rgb(var(--brand-500) / <alpha-value>)',
          600: 'rgb(var(--brand-600) / <alpha-value>)',
        },
        // Neutros: también salen de variables, para que el tema Claro los invierta (la escala slate y el blanco de los textos)
        slate: Object.fromEntries([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(n => [n, `rgb(var(--slate-${n}) / <alpha-value>)`])),
        white: 'rgb(var(--ink) / <alpha-value>)',
        dark: {
          800: 'rgb(var(--slate-800) / <alpha-value>)',
          900: 'rgb(var(--slate-900) / <alpha-value>)',
          950: 'rgb(var(--slate-950) / <alpha-value>)',
        },
        // Texto de marca sobre el fondo (más oscuro en el tema Claro) y texto sobre fondos de marca (siempre oscuro)
        'brand-text': 'rgb(var(--brand-text) / <alpha-value>)',
        'on-brand': '#020617',
      },
    },
  },
};
