import { useAddonState } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InputText } from '@/components/editor/form';
import { Container, ResizableBox } from '../../helpers';

export default {
  title: 'editor/form/input',
  component: InputText,
  argTypes: {},
} as ComponentMeta<typeof InputText>;

export const Basic: ComponentStory<typeof InputText> = (args) => {
  const [value, setValue] = useAddonState<string>('editor/form/input-text', '');

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
};

export const WithPlaceholder: ComponentStory<typeof InputText> = (args) => {
  const [value, setValue] = useAddonState<string>('editor/form/input-text/placeholder', '');

  return (
    <Container>
      <ResizableBox>
        <InputText
          autoFocus
          id="example"
          label="Example"
          value={value}
          onChange={setValue}
          placeholder='This is a placeholder'
        />
      </ResizableBox>
    </Container>
  );
};

export const WithHint: ComponentStory<typeof InputText> = (args) => {
  const [value, setValue] = useAddonState<string>('editor/form/input-text/hint', '');

  return (
    <Container>
      <ResizableBox>
        <InputText
          autoFocus
          id="example"
          label="Example"
          value={value}
          onChange={setValue}
          hint='This is a hint'
        />
      </ResizableBox>
    </Container>
  );
};
