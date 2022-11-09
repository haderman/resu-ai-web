import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Experience } from '@/components/editor/resume/content';

import { Container } from '../../helpers/container';

export default {
  title: 'editor/content/experience',
  component: Experience,
  argTypes: {
    color: { defaultValue: 'secondary' },
  },
} as ComponentMeta<typeof Experience>;

export const Basic: ComponentStory<typeof Experience> = (args) => (
  <Container>
    <Experience {...args} />
  </Container>
);
