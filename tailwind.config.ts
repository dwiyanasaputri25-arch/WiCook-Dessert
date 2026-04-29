import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './index.tsx',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#fdfcf0',
          brown: '#4a3728',
          gold: '#c5a059',
          terracotta: '#b45f4c',
          'soft-pink': '#f4d3d3',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
