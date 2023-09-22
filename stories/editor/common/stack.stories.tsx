import type { Meta, StoryObj } from '@storybook/react';

import { Box, Stack } from '@/components/editor/common';

import { Container } from '../../helpers/container';

const meta: Meta<typeof Stack> = {
  title: 'editor/common/stack',
  component: Stack,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    padding: 'medium',
    fitContent: true,
    borderRadius: 'medium',
    gap: 'medium',
    color: 'blue'
  },
};

export default meta;
type Story = StoryObj<typeof Stack>

export const Primary: Story = {
  args: {},
  render: (args) =>
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
    </Container>,
};
