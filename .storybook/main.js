const path = require('path');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-styling",
    // "@storybook/addon-interactions",
    // {
    //   name: "@storybook/addon-styling",
    //   options: {
    //     cssBuildRule: {
    //       test: /\.scss$/,
    //       use: [
    //         'style-loader',
    //         {
    //           loader: 'css-loader',
    //           options: {
    //             modules: {
    //               auto: true,
    //             },
    //           },
    //         },
    //         // 'sass-loader',
    //       ],
    //       include: path.resolve(__dirname, '../src'),
    //     },
    //     sass: {
    //       // Require your preprocessor
    //       implementation: require("sass"),
    //     },
    //   },
    // },
    "storybook-dark-mode",
    "@etchteam/storybook-addon-css-variables-theme",
  ],

  "framework": {
    name: "@storybook/nextjs",
    options: {}
  },

  // webpackFinal: async (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@': path.resolve(__dirname, '../src/'),
  //   };

  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: [
  //       'style-loader',
  //       {
  //         loader: 'css-loader',
  //         options: {
  //           modules: {
  //             auto: true,
  //           },
  //         },
  //       },
  //       'sass-loader',
  //     ],
  //     include: path.resolve(__dirname, '../'),
  //   });

  //   return config;
  // },

  docs: {
    autodocs: false
  }
}
