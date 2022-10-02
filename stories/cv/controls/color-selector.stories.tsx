import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Resizable } from 're-resizable';
import styled from 'styled-components';

import { ColorSelector } from '@/components/cv/controls';
import { Container } from '../../helpers/container';

export default {
  title: 'CV/controls/color-selector',
  component: ColorSelector,
} as ComponentMeta<typeof ColorSelector>;

export const Basic: ComponentStory<typeof ColorSelector> = (args) => (
  <Container>
    <StyledResizable>
      <ColorSelector />
    </StyledResizable>
  </Container>
);

const StyledResizable = styled(Resizable)`
  padding: 10px;
  border: 1px solid #ccc;
`;
