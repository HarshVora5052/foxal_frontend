import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // FOXAL Luxury Spiritual Palette
        charcoal: {
          DEFAULT: '#0F0D0B',
          50: '#F5F4F3',
          100: '#E7E5E3',
          200: '#CFCAC6',
          300: '#AFA8A2',
          400: '#7F7771',
          500: '#5A534E',
          600: '#3D3733',
          700: '#272320',
          800: '#1A1715',
          900: '#0F0D0B',
          950: '#070605',
        },
        cream: {
          DEFAULT: '#F6EFE4',
          light: '#FBF8F2',
          card: '#FBF7F0',
          muted: '#EADECB',
          border: '#E3D4BD',
          dark: '#D5C1A3',
        },
        gold: {
          DEFAULT: '#C8922A',
          light: '#DFB15B',
          pale: '#FBF5EA',
          dark: '#9A6A16',
          hover: '#B57E1E',
          border: '#D8AB50',
        },
        sandalwood: {
          DEFAULT: '#7A5230',
          light: '#9E6F46',
          dark: '#56381E',
          muted: '#8C633E',
        },
        sage: {
          DEFAULT: '#4A6B53',
          light: '#EBF2ED',
          border: '#C7D9CD',
          dark: '#354E3C',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(15, 13, 11, 0.05)',
        card: '0 6px 24px -4px rgba(122, 82, 48, 0.08)',
        hover: '0 12px 32px -4px rgba(15, 13, 11, 0.12)',
        glow: '0 0 25px -2px rgba(200, 146, 42, 0.25)',
      },
      animation: {
        'smoke-drift': 'smokeDrift 8s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        smokeDrift: {
          '0%': { transform: 'translateY(0px) scale(1) rotate(0deg)', opacity: '0.4' },
          '50%': { transform: 'translateY(-15px) scale(1.05) rotate(1deg)', opacity: '0.7' },
          '100%': { transform: 'translateY(-30px) scale(1.1) rotate(-1deg)', opacity: '0.3' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
