import { DefaultTheme } from 'styled-components';

export const darkSpaceTheme: DefaultTheme = {
  name: 'dark-space',
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
};
