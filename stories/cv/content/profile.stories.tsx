import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Profile } from '../../../src/components/cv/content';

export default {
  title: 'CV/content/profile',
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
