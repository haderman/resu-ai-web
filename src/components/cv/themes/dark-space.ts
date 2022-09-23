import { DefaultTheme } from 'styled-components';

export const darkSpaceTheme: DefaultTheme = {
  name: 'dark-space',
  gap: {
    default: '0mm',
    small: '1mm',
    medium: '2mm',
    large: '4mm',
  },
  padding: {
    default: '0mm',
    small: '1mm',
    medium: '2mm',
    large: '4mm',
  },
  bg: {
    default: 'unset',
    primary: 'hsl(0, 0%, 0%)',
    secondary: 'hsl(0, 0%, 20%)',
    tertiary: 'hsl(0, 0%, 30%)',
    accent: 'hsl(19, 55%, 45%)',
    'accent-contrast': 'hsl(0, 0%, 0%)',
    complementary: 'hsl(0, 0%, 94%)',
  },
  fg: {
    default: 'unset',
    primary: 'hsl(0, 0%, 96%)',
    secondary: 'hsl(0, 0%, 80%)',
    tertiary: 'hsl(0, 0%, 60%)',
    accent: 'hsl(199, 55%, 45%)',
    'accent-contrast': 'hsl(0, 0%, 100%)',
    complementary: 'hsl(0, 0%, 100%)',
  },
  fontSize: {
    default: 'inherit',
    small: '10pt',
    medium: '12pt',
    large: '16pt',
  },
  fontWeight: {
    default: 200,
    light: 100,
    regular: 200,
    bold: 700,
  },
  lineHeight: {
    normal: 1.5,
  },
  borderRadius: {
    default: '0mm',
    small: '1mm',
    medium: '2mm',
    large: '4mm',
  },
  colors: {
    black: {
      foreground: 'hsl(0, 0%, 0%)',
      background: 'hsl(0, 0%, 0%)',
      faded: 'hsl(0, 0%, 0%)',
      text: 'hsl(0, 0%, 90%)',
    },
    white: {
      foreground: 'hsl(0, 0%, 100%)',
      background: 'hsl(0, 0%, 100%)',
      faded: 'hsl(0, 0%, 100%)',
      text: 'hsl(0, 0%, 6%)',
    },
    gray: {
      foreground: 'hsl(0, 0%, 40%)',
      background: 'hsl(0, 0%, 60%)',
      faded: 'hsl(0, 0%, 80%)',
      text: 'hsl(0, 0%, 100%)',
    },
    'gray-light': {
      foreground: 'hsl(0, 0%, 60%)',
      background: 'hsl(0, 0%, 80%)',
      faded: 'hsl(0, 0%, 90%)',
      text: 'hsl(0, 0%, 100%)',
    },
    blue: {
      foreground: 'hsl(199, 55%, 55%)',
      background: 'hsl(199, 55%, 35%)',
      faded: 'hsl(199, 55%, 65%)',
      text: 'hsl(0, 0%, 100%)',
    },
    red: {
      foreground: 'hsl(0, 55%, 55%)',
      background: 'hsl(0, 55%, 35%)',
      faded: 'hsl(0, 55%, 75%)',
      text: 'hsl(0, 0%, 100%)',
    },
    green: {
      foreground: 'hsl(120, 55%, 55%)',
      background: 'hsl(120, 55%, 35%)',
      faded: 'hsl(120, 55%, 65%)',
      text: 'hsl(0, 0%, 100%)',
    },
    yellow: {
      foreground: 'hsl(60, 55%, 55%)',
      background: 'hsl(60, 55%, 35%)',
      faded: 'hsl(60, 55%, 65%)',
      text: 'hsl(0, 0%, 100%)',
    },
    orange: {
      foreground: 'hsl(30, 55%, 55%)',
      background: 'hsl(30, 55%, 35%)',
      faded: 'hsl(30, 55%, 65%)',
      text: 'hsl(0, 0%, 100%)',
    },
    purple: {
      foreground: 'hsl(240, 55%, 55%)',
      background: 'hsl(240, 55%, 35%)',
      faded: 'hsl(240, 55%, 65%)',
      text: 'hsl(0, 0%, 100%)',
    },
    pink: {
      foreground: 'hsl(332.24, 81.38%, 48.43%)',
      background: 'hsl(332.24,64.38%,41.43%)',
      faded: 'hsl(300, 55%, 65%)',
      text: 'hsl(0, 0%, 100%)',
    },
  },
};
