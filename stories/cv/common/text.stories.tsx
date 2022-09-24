import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Text } from '../../../src/components/cv/common';
import { Color } from '../../../src/components/cv/types';

export default {
  title: 'CV/text',
  component: Text,
  argTypes: {
    color: {
      defaultValue: 'pink',
      control: {
        type: 'select',
        options: Color.values(),
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
