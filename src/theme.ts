import { extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#f0f7ff',
          100: '#d0e6ff',
          200: '#a6ccff',
          300: '#7cb2ff',
          400: '#5894fc',
          500: '#3573f0',
          600: '#1e58e0',
          700: '#1546c1',
          800: '#123a9e',
          900: '#123480',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: '#e3f0ff',
          100: '#c8d9f2',
          200: '#9fb8e2',
          300: '#7897d1',
          400: '#567ac1',
          500: '#3862b0',
          600: '#2b4f94',
          700: '#1e3c78',
          800: '#14295d',
          900: '#0a1947',
        },
      },
    },
  },
  components: {
    // Add custom component theme variants here
  },
});