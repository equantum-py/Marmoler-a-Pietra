import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './sections/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pietra: {
          black: '#050504',
          graphite: '#151513',
          charcoal: '#24231f',
          stone: '#d8ccb7',
          sand: '#b9aa8e',
          cream: '#f4efe5',
          warm: '#fffaf0',
          olive: '#6f7356',
          gold: '#c7a76a',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 25px 80px rgba(199, 167, 106, 0.12)',
      },
      backgroundImage: {
        'radial-luxe': 'radial-gradient(circle at top, rgba(199,167,106,.16), transparent 34%), radial-gradient(circle at 80% 20%, rgba(111,115,86,.16), transparent 28%)',
      },
    },
  },
  plugins: [],
};

export default config;
