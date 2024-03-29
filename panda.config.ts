import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  jsxFramework: 'react',

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1440px',
      },
      keyframes: {
        loadingSpin: {
          '100%': { transform: 'rotate(360deg)' },
        },
        clipIn: {
          '0%': {
            opacity: 0.3,
            clipPath: 'polygon(0 0, 10% 0, 0 10%)',
          },
          '100%': {
            opacity: 1,
            clipPath: 'polygon(0 0, 200% 0, 0 200%)',
          },
        },
        buttonShiny: {
          '0%': {
            backgroundPosition: '100% 100%',
          },
          '100%': {
            backgroundPosition: '0 0',
          },
        },
      },
    },
  },

  // hash: { cssVar: false, className: true },

  // The output directory for your css system
  outdir: 'styled-system',
})
