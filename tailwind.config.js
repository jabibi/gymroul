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
          900: 'rgb(var(--brand-900) / <alpha-value>)',
        },
        dark: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
    },
  },
};
