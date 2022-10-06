import * as React from 'react';
import { useAddonState } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ColorSelector } from '@/components/editor/form';
import { Color } from '@/components/editor/types';
import { Container, ResizableBox } from '../../helpers';

export default {
  title: 'editor/form/color-selector',
  component: ColorSelector,
  argTypes: {
    label: { defaultValue: 'Label' },
  },
} as ComponentMeta<typeof ColorSelector>;

export const Basic: ComponentStory<typeof ColorSelector> = (args) => {
  const [value, setValue] = useAddonState<Color>('CV/controls/color-selector', 'blue');

  return (
    <Container>
      <ResizableBox>
        <ColorSelector label={args.label} value={value} onChange={setValue} />
      </ResizableBox>
    </Container>
  );
};
