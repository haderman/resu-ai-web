import type { Meta, StoryObj } from '@storybook/react';

import { Box, Text } from '@/components/editor/common';

import { Container } from '../../helpers/container';

const meta: Meta<typeof Box> = {
  title: 'editor/common/box',
  component: Box,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    padding: 'medium',
    fitContent: true,
    borderRadius: 'medium',
    color: 'secondary'
  },
};

export default meta;
type Story = StoryObj<typeof Box>

export const Primary: Story = {
  args: {},
  render: (args) =>
    <Container>
      <Box {...args}>
        <Text size="large">Text</Text>
      </Box>
    </Container>,
};
