import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Projects } from '../../../src/components/editor/content';

export default {
  title: 'editor/content/projects',
  component: Projects,
  argTypes: {
    color: { defaultValue: 'secondary' },
  },
} as ComponentMeta<typeof Projects>;

export const Basic: ComponentStory<typeof Projects> = (args) => (
  <Container>
    <Projects {...args} />
  </Container>
);
