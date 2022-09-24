import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Box, Text } from '../../../src/components/cv/common';
import { Color } from '../../../src/components/cv/types';

export default {
  title: 'CV/common/box',
  component: Box,
  argTypes: {
    padding: { defaultValue: 'medium' },
    fitContent: { defaultValue: true },
    borderRadius: { defaultValue: 'medium' },
    color: {
      defaultValue: Color.gerDefault(),
      control: {
        type: 'select',
        options: Color.values(),
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
