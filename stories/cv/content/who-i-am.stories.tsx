import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../../helpers/container';
import { WhoIAm } from '../../../src/components/cv/content';

export default {
  title: 'CV/content/whoIAm',
  component: WhoIAm,
} as ComponentMeta<typeof WhoIAm>;

export const Basic: ComponentStory<typeof WhoIAm> = (args) => (
  <Container>
    <WhoIAm />
  </Container>
);
