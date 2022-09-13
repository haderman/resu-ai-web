import { addDecorator } from '@storybook/react';
import { withThemesProvider, ThemesProvider } from 'storybook-addon-styled-component-theme';
import { CvTheme } from '../src/components/cv/themes';

const themes = CvTheme.getAllThemes();
addDecorator(withThemesProvider(themes), ThemesProvider);
