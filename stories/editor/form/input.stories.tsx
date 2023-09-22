import { useState } from '@storybook/preview-api';

import type { Meta, StoryObj } from '@storybook/react';
import { InputText } from '@/components/editor/form';
import { Container, ResizableBox } from '../../helpers';

const meta: Meta<typeof InputText> = {
  title: 'editor/form/input',
  component: InputText,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof InputText>

export const Basic: Story = {
  args: {},
  render: function Wrapper(args) {
    const [value, setValue] = useState<string>('');

    return (
      <Container>
        <ResizableBox>
          <InputText
            autoFocus
            id="example"
            label="Example"
            value={value}
            onChange={setValue}
          />
        </ResizableBox>
      </Container>
    );
  }
};

export const WithPlaceholder: Story = {
  args: { placeholder: 'This is a placeholder' },
  render: function Wrapper({ placeholder }) {
    const [value, setValue] = useState<string>('');

    return (
      <Container>
        <ResizableBox>
          <InputText
            autoFocus
            id="example"
            label="Example"
            value={value}
            onChange={setValue}
            placeholder={placeholder}
          />
        </ResizableBox>
      </Container>
    );
  }
};

export const WithHint: Story = {
  args: { hint: 'This is a hint' },
  render: function Wrapper({ hint }) {
    const [value, setValue] = useState('');

    return (
      <Container>
        <ResizableBox>
          <InputText
            autoFocus
            id="example"
            label="Example"
            value={value}
            onChange={setValue}
            hint={hint}
          />
        </ResizableBox>
      </Container>
    );
  }
};
