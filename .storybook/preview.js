import { addDecorator, addParameters } from '@storybook/react';
import { WithThemeProvider } from 'storybook-addon-styled-components-themes';

import { CvTheme } from '../src/components/cv/themes';

addParameters({
  styledComponentsThemes: {
    themes: CvTheme.getAllThemes(),
    initialTheme: 1, // optional
    label: 'name', // optional
  },
});

addDecorator(story => (
  <WithThemeProvider>
    {story()}
  </WithThemeProvider>
));
