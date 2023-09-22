import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '@/components/editor/common';

import { Container } from '../../helpers/container';

const meta: Meta<typeof Text> = {
  title: 'editor/common/text',
  component: Text,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    color: 'almost-white',
    align: 'left',
    size: 'medium',
    weight: 'light',
  },
};

export default meta;
type Story = StoryObj<typeof Text>

export const Primary: Story = {
  args: {},
  render: (args) =>
    <Container>
      <Text {...args}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
    </Container>,
};
