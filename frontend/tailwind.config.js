/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#030712',
          50: '#0A0F1E',
          100: '#111827',
          200: '#1E293B',
        },
        accent: {
          DEFAULT: '#0EF6CC',
          dim: 'rgba(14, 246, 204, 0.1)',
          glow: 'rgba(14, 246, 204, 0.4)',
        },
        warm: {
          DEFAULT: '#F59E0B',
          dim: 'rgba(245, 158, 11, 0.1)',
        },
        slate: {
          350: '#94A3B8',
          450: '#64748B',
        }
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'slide-left': 'slide-left 0.6s ease-out forwards',
        'draw-line': 'draw-line 1.5s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-left': {
          '0%': { opacity: 0, transform: 'translateX(40px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'draw-line': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
