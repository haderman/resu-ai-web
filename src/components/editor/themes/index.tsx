import * as React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { apiState } from '@/state/api';
import { ResumeTheme } from '@/themes';

import { defaultTheme } from './default';
import { darkSpaceTheme } from './dark-space';

const { selectors } = apiState.style;

export type WithThemeProps = React.PropsWithChildren<{}>;

export function WithTheme(props: WithThemeProps) {
  // const theme = useSelector(selectors.selectTheme);
  const themeValues = getTheme('dark-space');

  return (
    <ThemeProvider theme={themeValues}>
      {props.children}
    </ThemeProvider>
  );
}

export function getTheme(theme?: ResumeTheme): DefaultTheme {
  switch (theme) {
    case 'dark-space':
      return darkSpaceTheme;
    case 'default':
    default:
      return defaultTheme;
  }
}

