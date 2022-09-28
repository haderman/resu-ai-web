import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Experience } from '../../../src/components/cv/content';

export default {
  title: 'CV/content/experience',
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
