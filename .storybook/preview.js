import './style.css';

import { themes } from '@storybook/theming';
import { addDecorator, addParameters } from '@storybook/react';
import { WithThemeProvider } from 'storybook-addon-styled-components-themes';

import { CvTheme } from '../src/components/editor/themes';

export const parameters = {
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'white' }
  }
};

addParameters({
  styledComponentsThemes: {
    themes: CvTheme.getAllThemes(),
    initialTheme: 0, // optional
    label: 'name', // optional
  },
});

addDecorator(story => (
  <WithThemeProvider>
    {story()}
  </WithThemeProvider>
));
