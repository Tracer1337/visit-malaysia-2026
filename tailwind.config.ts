import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-dm_sans)'],
      },
    },
  },
  plugins: [],
};

export default config;
