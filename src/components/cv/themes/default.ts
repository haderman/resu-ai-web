import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
  name: 'default',
  colors: {
    gray: 'hsl(0, 0%, 90%)',
  },
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
    primary: 'hsl(0, 0%, 100%)',
    secondary: 'hsl(0, 0%, 90%)',
    tertiary: 'hsl(0, 0%, 80%)',
    accent: 'hsl(199, 55%, 45%)',
    complementary: 'hsl(0, 0%, 6%)',
    'accent-contrast': 'hsl(0, 0%, 100%)',
  },
  fg: {
    default: 'unset',
    primary: 'hsl(0, 0%, 6%)',
    secondary: 'hsl(0, 0%, 20%)',
    tertiary: 'hsl(0, 0%, 40%)',
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
};
