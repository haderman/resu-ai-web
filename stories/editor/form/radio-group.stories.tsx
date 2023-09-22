import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { RadioColorGroup } from '@/components/editor/form';
import { Container, ResizableBox } from '../../helpers';
import { Color } from '@/shared/types';

const meta: Meta<typeof RadioColorGroup> = {
  title: 'editor/form/radio-color-group',
  component: RadioColorGroup,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof RadioColorGroup>

export const Basic: Story = {
  args: {},
  render: function Wrapper(args) {
    const [selected, setSelected] = useState<Color>('red');

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
  }
};
