import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Projects } from '../../../src/components/cv/content';

export default {
  title: 'CV/content/projects',
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
