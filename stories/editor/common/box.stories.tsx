import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Color } from '@/shared/types';
import { Box, Text } from '@/components/editor/common';

import { Container } from '../../helpers/container';

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
