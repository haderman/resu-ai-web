import { useAddonState } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RadioColorGroup } from '@/components/editor/form';
import { Container, ResizableBox } from '../../helpers';
import { Color } from '@/shared/types';

export default {
  title: 'editor/form/radio-color-group',
  component: RadioColorGroup,
  argTypes: {},
} as ComponentMeta<typeof RadioColorGroup>;

export const Basic: ComponentStory<typeof RadioColorGroup> = (args) => {
  const [selected, setSelected] = useAddonState<Color>('editor/form/radio-color-group', 'red');

  return (
    <Container>
      <ResizableBox>
        <RadioColorGroup
          legend="Text Align"
          name="text-align-option-group"
          selected={selected}
          onChange={setSelected}
        />
      </ResizableBox>
    </Container>
  );
};
