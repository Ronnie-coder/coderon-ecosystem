import type { Config } from 'tailwindcss';

// Coderon design system: "Daylight Editorial".
// Colours are CSS variables (RGB channels) so light and dark themes swap in one place:
// see src/styles/globals.css.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem' }, screens: { '2xl': '1200px' } },
    extend: {
      colors: {
        paper: v('paper'),
        card: v('card'),
        ink: v('ink'),
        gold: v('gold'),
        'gold-text': v('gold-text'),
        line: v('line'),
        good: v('good'),
        bad: v('bad'),
        warn: v('warn'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'hard-sm': '3px 3px 0 rgb(var(--shadow))',
        hard: '5px 5px 0 rgb(var(--shadow))',
        'hard-lg': '8px 8px 0 rgb(var(--shadow))',
        'hard-gold': '5px 5px 0 rgb(var(--gold))',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        draw: { from: { strokeDashoffset: '101' }, to: { strokeDashoffset: '0' } },
        'fade-up': { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        progress: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        blink: 'blink 1.1s steps(1) infinite',
        draw: 'draw 1.1s cubic-bezier(.65,0,.35,1) both',
        'fade-up': 'fade-up .7s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
