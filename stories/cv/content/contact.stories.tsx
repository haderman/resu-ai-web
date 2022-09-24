import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Contact } from '../../../src/components/cv/content';

export default {
  title: 'CV/content/contact',
  component: Contact,
} as ComponentMeta<typeof Contact>;

export const Basic: ComponentStory<typeof Contact> = (args) => (
  <Container>
    <Contact />
  </Container>
);
