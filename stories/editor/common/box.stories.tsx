import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Color } from '@/shared/types';

import { Container } from '../../helpers/container';
import { Box, Text } from '../../../src/components/editor/common';

export default {
  title: 'editor/common/box',
  component: Box,
  argTypes: {
    padding: { defaultValue: 'medium' },
    fitContent: { defaultValue: true },
    borderRadius: { defaultValue: 'medium' },
    color: {
      defaultValue: 'secondary',
      control: {
        type: 'select',
        options: Color.values,
      }
    },
  },
} as ComponentMeta<typeof Box>;

export const Basic: ComponentStory<typeof Box> = (args) => (
  <Container>
    <Box {...args}>
      <Text size="large">Text</Text>
    </Box>
  </Container>
);
