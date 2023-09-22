import { themes } from '@storybook/theming';
import { addDecorator } from '@storybook/react';
import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'

// import themes from '!!style-loader?injectType=lazyStyleTag!css-loader!../src/themes/resume-theme.css'

import './style.css';
import '../src/themes/resume-theme.css';
import '../src/styles/utility.css';
import "../src/styles/globals.css";

import { ResumeTheme } from '../src/themes';

export const parameters = {
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'white' }
  }
};

// export const decorators = [
//   cssVariablesTheme,
// ];

// addParameters({
//   styledComponentsThemes: {
//     themes: CvTheme.getAllThemes(),
//     initialTheme: 0, // optional
//     label: 'name', // optional
//   },
// });

export const decorators = [
  function ProvideTheme(story) {
    return (
      <div className="theme-container" data-resume-theme="dark-space" id="root">
        {story()}
      </div>
    );
  },
];
