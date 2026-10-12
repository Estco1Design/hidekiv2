/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050505',
          secondary: '#0A0A0A',
          tertiary: '#111111',
        },
        text: {
          primary: '#EAEAEA',
          secondary: '#FFFFFF',
        },
      },
      fontSize: {
        'xs-custom': ['11px', { letterSpacing: '0.05em', textTransform: 'uppercase' }],
        editorial: ['clamp(2rem, 8vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
      },
      fontFamily: {
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
