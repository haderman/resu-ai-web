import { DefaultTheme } from 'styled-components';

import { defaultTheme } from './default';
import { darkSpaceTheme } from './dark-space';

export type CvTheme = 'default' | 'dark-space';

export function getTheme(theme?: CvTheme): DefaultTheme {
  switch (theme) {
    case 'dark-space':
      return darkSpaceTheme;
    case 'default':
    default:
      return defaultTheme;
  }
}

export const CvTheme = {
  getAllThemes(): DefaultTheme[] {
    return [darkSpaceTheme, defaultTheme];
  },
};
