import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Box, Text } from '../../../src/components/cv/common';

export default {
  title: 'CV/box',
  component: Box,
  argTypes: {
    padding: { defaultValue: 'medium' },
    fitContent: { defaultValue: true },
    borderRadius: { defaultValue: 'medium' },
    background: { defaultValue: 'secondary' },
  },
} as ComponentMeta<typeof Box>;

export const Basic: ComponentStory<typeof Box> = (args) => (
  <Container>
    <Box {...args}>
      <Text size="large" color="primary">Text</Text>
    </Box>
  </Container>
);
