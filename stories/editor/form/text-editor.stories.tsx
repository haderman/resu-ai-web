import { useAddonState } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextEditor, TextEditorProps } from '@/components/editor/form';
// import { Box as TextEditor } from '@/components/editor/common';
import { Container, ResizableBox } from '../../helpers';
import { Color } from '@/shared/types';

export default {
  title: 'editor/form/text-editor',
  component: TextEditor,
  argTypes: {},
} as ComponentMeta<typeof TextEditor>;

export const Basic: ComponentStory<typeof TextEditor> = (args) => {
  const [value, setValue] = useAddonState<string>('editor/form/text-editor', '');

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
};
