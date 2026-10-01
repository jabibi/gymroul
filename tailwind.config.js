/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          400: '#ff8a3c',
          500: '#f97316',
          600: '#ea580c',
          900: '#7c2d12',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
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
