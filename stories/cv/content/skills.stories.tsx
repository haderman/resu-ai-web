import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Skills } from '../../../src/components/cv/content';

export default {
  title: 'CV/content/skills',
  component: Skills,
} as ComponentMeta<typeof Skills>;

export const Basic: ComponentStory<typeof Skills> = (args) => (
  <Container>
    <Skills />
  </Container>
);
