import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Box, Stack } from '../../../src/components/cv/common';
import { Color } from '../../../src/components/cv/types';

export default {
  title: 'CV/common/stack',
  component: Stack,
  argTypes: {
    padding: { defaultValue: 'medium' },
    fitContent: { defaultValue: true },
    borderRadius: { defaultValue: 'medium' },
    gap: { defaultValue: 'medium' },
    color: {
      defaultValue: 'blue',
      control: {
        type: 'select',
        options: Color.values(),
      }
    },
  },
} as ComponentMeta<typeof Stack>;

export const Basic: ComponentStory<typeof Stack> = (args) => (
  <Container>
    <Stack {...args}>
      <Box color="pink">
        <div style={{ width: 100, height: 100 }}></div>
      </Box>
      <Box color="pink">
        <div style={{ width: 100, height: 100 }}></div>
      </Box>
      <Box color="pink">
        <div style={{ width: 100, height: 100 }}></div>
      </Box>
    </Stack>
  </Container>
);
