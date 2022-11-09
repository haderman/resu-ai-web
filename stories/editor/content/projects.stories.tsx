import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Projects } from '@/components/editor/resume/content';

import { Container } from '../../helpers/container';

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
