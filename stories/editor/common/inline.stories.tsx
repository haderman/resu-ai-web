import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Color } from '@/shared/types';

import { Container } from '../../helpers/container';
import { Box, Inline } from '../../../src/components/editor/common';

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
