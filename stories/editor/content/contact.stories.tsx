import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Contact } from '@/components/editor/resume/content';

import { Container } from '../../helpers/container';

export default {
  title: 'editor/content/contact',
  component: Contact,
  argTypes: {
    color: { defaultValue: 'secondary' },
  },
} as ComponentMeta<typeof Contact>;

export const Basic: ComponentStory<typeof Contact> = (args) => (
  <Container>
    <Contact />
  </Container>
);
