import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { Profile } from '../../../src/components/editor/content';

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
