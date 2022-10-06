import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Chip, Text } from '../../../src/components/editor/common';
import { Size } from '@/components/editor/types';

export default {
  title: 'editor/common/chip',
  component: Chip,
  argTypes: {
    size: { defaultValue: 'default' as Size },
  },
} as ComponentMeta<typeof Chip>;

export const Basic: ComponentStory<typeof Chip> = (args) => (
  <Container>
    <Chip {...args}>
      <Text size="large">Text</Text>
    </Chip>
  </Container>
);

export const InlineChips: ComponentStory<typeof Chip> = (args) => (
  <Container>
    <Chip.Container gap="medium">
      <Chip {...args}>
        <Text>Text 1</Text>
      </Chip>
      <Chip {...args}>
        <Text>Text 2</Text>
      </Chip>
    </Chip.Container>
  </Container>
);
