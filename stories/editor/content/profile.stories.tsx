import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Profile } from '@/components/editor/resume/content';

import { Container } from '../../helpers/container';

export default {
  title: 'editor/content/profile',
  component: Profile,
  argTypes: {
    color: { defaultValue: 'secondary' },
  },
} as ComponentMeta<typeof Profile>;

export const Basic: ComponentStory<typeof Profile> = (args) => (
  <Container>
    <Profile {...args} />
  </Container>
);
