import * as React from 'react';
import { useAddonState } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Combobox } from '@/components/editor/form';
import { Container, ResizableBox } from '../../helpers';

export default {
  title: 'editor/form/combobox',
  component: Combobox,
  argTypes: {},
} as ComponentMeta<typeof Combobox>;

export const Basic: ComponentStory<typeof Combobox> = (args) => {
  const [selected, setSelected] = useAddonState<string | null>('editor/form/combobox', null);

  return (
    <Container>
      <ResizableBox>
        <Combobox id="example" />
      </ResizableBox>
    </Container>
  );
};
