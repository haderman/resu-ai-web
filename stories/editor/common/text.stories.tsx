import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Color } from '@/shared/types';

import { Container } from '../../helpers/container';
import { Text } from '../../../src/components/editor/common';

export default {
  title: 'editor/common/text',
  component: Text,
  argTypes: {
    color: {
      defaultValue: 'pink',
      control: {
        type: 'select',
        options: Color.values,
      }
    },
  },
} as ComponentMeta<typeof Text>;

export const Basic: ComponentStory<typeof Text> = (args) => (
  <Container>
    <Text {...args}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </Text>
  </Container>
);
