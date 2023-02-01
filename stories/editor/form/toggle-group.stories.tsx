import * as React from 'react';
import { IconAlignCenter, IconAlignLeft, IconAlignRight } from '@tabler/icons';
import { useAddonState } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ToggleGroup } from '@/components/editor/form';
import { Container, ResizableBox } from '../../helpers';
import { Size } from '@/shared/types';

export default {
  title: 'editor/form/toggle-group',
  component: ToggleGroup,
  argTypes: {},
} as ComponentMeta<typeof ToggleGroup>;

export const Basic: ComponentStory<typeof ToggleGroup> = (args) => {
  const [selected, setSelected] = useAddonState<string | null>('editor/form/toggle-group', null);

  return (
    <Container>
      <ResizableBox>
        <ToggleGroup
          legend="Size"
          name="size-option-group"
          selected={selected}
          onChange={setSelected}
        >
          <ToggleGroup.Item id="test-1" label="Left" value="small">
            <IconAlignLeft />
          </ToggleGroup.Item>
          <ToggleGroup.Item id="test-2" label="Center" value="medium">
            <IconAlignCenter />
          </ToggleGroup.Item>
          <ToggleGroup.Item id="test-3" label="Right" value="large">
            <IconAlignRight />
          </ToggleGroup.Item>
        </ToggleGroup>
      </ResizableBox>
    </Container>
  );
};
