import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@/components/cv/common';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'CV/box',
  component: Box,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // padding: { control: 'text' },
    // background: { control: 'text' },
    // background: {
    //   defaultValue: 'primary',
    // }
    // borderRadius: { control: 'text' },
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Box>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />;

export const Basic: ComponentStory<typeof Box> = (args) => (
  <Box {...args}>
    <div style={{ width: 100, height: 100 }} />
  </Box>
);
