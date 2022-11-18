import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Color } from '@/shared/types';
import { Box, Stack } from '@/components/editor/common';

import { Container } from '../../helpers/container';

export default {
  title: 'editor/common/stack',
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
        options: Color.values,
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
