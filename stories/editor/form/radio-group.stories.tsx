import { useAddonState } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RadioGroup } from '@/components/editor/form';
import { Container, ResizableBox } from '../../helpers';

export default {
  title: 'editor/form/radio-group',
  component: RadioGroup,
  argTypes: {},
} as ComponentMeta<typeof RadioGroup>;

export const Basic: ComponentStory<typeof RadioGroup> = (args) => {
  const [selected, setSelected] = useAddonState<string | null>('editor/form/toggle-group', null);

  return (
    <Container>
      <ResizableBox>
        <RadioGroup
          legend="Text Align"
          name="text-align-option-group"
          selected={selected}
          onChange={setSelected}
        >
          <RadioGroup.Item label="Left" value="left">
            <Circle color="red" />
          </RadioGroup.Item>
          <RadioGroup.Item label="Center" value="center">
            <Circle color="green" />
          </RadioGroup.Item>
          <RadioGroup.Item label="Right" value="right">
            <Circle color="blue" />
          </RadioGroup.Item>
        </RadioGroup>
      </ResizableBox>
    </Container>
  );
};

function Circle({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: color,
      }}
    />
  );
}
