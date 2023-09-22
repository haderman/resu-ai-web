import type { Meta, StoryObj } from '@storybook/react';

import { Chip, Text } from '@/components/editor/common';

import { Container } from '../../helpers/container';

const meta: Meta<typeof Chip> = {
  title: 'editor/common/chip',
  component: Chip,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>

export const Primary: Story = {
  args: {},
  render: (args) =>
    <Container>
      <Chip {...args}>
        <Text size="large">Text</Text>
      </Chip>
    </Container>,
};

export const InlineChips: Story = {
  args: {},
  render: (args) =>
    <Container>
      <Chip.Container gap="medium">
        <Chip {...args}>
          <Text>Text 1</Text>
        </Chip>
        <Chip {...args}>
          <Text>Text 2</Text>
        </Chip>
      </Chip.Container>
    </Container>,
};
