import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Contact } from '../../../src/components/editor/content';

export default {
  title: 'editor/content/contact',
  component: Contact,
  argTypes: {
    color: { defaultValue: 'secondary' },
  },
} as ComponentMeta<typeof Contact>;

export const Basic: ComponentStory<typeof Contact> = (args) => (
  <Container>
    <Contact {...args} />
  </Container>
);
