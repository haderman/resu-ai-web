import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Color } from '@/shared/types';
import { Box, Inline } from '@/components/editor/common';

import { Container } from '../../helpers/container';

export default {
  title: 'editor/common/inline',
  component: Inline,
  argTypes: {
    padding: { defaultValue: 'medium' },
    fitContent: { defaultValue: true },
    borderRadius: { defaultValue: 'medium' },
    gap: { defaultValue: 'medium' },
    color: {
      defaultValue: 'blue',
      control: {
        type: 'select',
        options: Color.values,
      }
    },
  },
} as ComponentMeta<typeof Inline>;

export const Basic: ComponentStory<typeof Inline> = (args) => (
  <Container>
    <Inline {...args}>
      <Box color="pink">
        <div style={{ width: 100, height: 100 }}></div>
      </Box>
      <Box color="pink">
        <div style={{ width: 100, height: 100 }}></div>
      </Box>
      <Box color="pink">
        <div style={{ width: 100, height: 100 }}></div>
      </Box>
    </Inline>
  </Container>
);
