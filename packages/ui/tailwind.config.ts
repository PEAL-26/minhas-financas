import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import { colors } from './src/styles/colors';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindcssAnimate, forms],
} satisfies Config;

export default config;
