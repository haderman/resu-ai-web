import type { Meta, StoryObj } from '@storybook/react';

import { Inline, Box } from '@/components/editor/common';

import { Container } from '../../helpers/container';

const meta: Meta<typeof Inline> = {
  title: 'editor/common/inline',
  component: Inline,
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
type Story = StoryObj<typeof Inline>

export const Primary: Story = {
  args: {},
  render: (args) =>
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
    </Container>,
};
