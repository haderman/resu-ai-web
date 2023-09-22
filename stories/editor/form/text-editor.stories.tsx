import { useState } from '@storybook/preview-api';

import type { Meta, StoryObj } from '@storybook/react';
import { TextEditor } from '@/components/editor/form';
import { Container, ResizableBox } from '../../helpers';

const meta: Meta<typeof TextEditor> = {
  title: 'editor/form/text-editor',
  component: TextEditor,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof TextEditor>

export const Basic: Story = {
  args: {},
  render: function Wrapper(args) {
    const [value, setValue] = useState<string>('');

    return (
      <Container>
        <ResizableBox>
          <TextEditor
            id="example"
            name="example"
            label="Example"
            markdown={value}
            onChange={setValue}
          />
        </ResizableBox>
      </Container>
    );
  }
};

