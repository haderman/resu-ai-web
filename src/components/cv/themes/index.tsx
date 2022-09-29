import * as React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

import { selectTheme } from '@/state';
import { defaultTheme } from './default';
import { darkSpaceTheme } from './dark-space';

export type CvTheme = 'default' | 'dark-space';

export type WithThemeProps = React.PropsWithChildren<{}>;

export function WithTheme(props: WithThemeProps) {
  const theme = useSelector(selectTheme);
  const themeValues = React.useMemo(() => getTheme(theme), [theme]);

  return (
    <ThemeProvider theme={themeValues}>
      {props.children}
    </ThemeProvider>
  );
}

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

