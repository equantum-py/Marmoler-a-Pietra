import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './sections/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pietra: {
          background: '#FAFAF9',
          green: '#4A6356',
          sage: '#719482',
          brown: '#8B4828',
          ink: '#1F1F1C',
          muted: '#6F6A61',
          border: '#E8E2D8',
          cream: '#FFFDF8',
          dark: '#1F1F1C',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 12px 32px rgba(31, 31, 28, 0.08)',
        soft: '0 8px 24px rgba(74, 99, 86, 0.12)',
      },
      backgroundImage: {
        'pietra-soft': 'radial-gradient(circle at top left, rgba(113,148,130,.18), transparent 32rem), linear-gradient(180deg, #FAFAF9 0%, #FFFDF8 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
