import * as React from 'react';
import { IconAlignCenter, IconAlignLeft, IconAlignRight } from '@tabler/icons';
import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { ToggleGroup } from '@/components/editor/form';
import { Container, ResizableBox } from '../../helpers';

const meta: Meta<typeof ToggleGroup> = {
  title: 'editor/form/toggle-group',
  component: ToggleGroup,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Basic: Story = {
  args: {},
  render: function Wrapper(args) {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <Container>
        <ResizableBox>
          <ToggleGroup
            legend="Text Align"
            name="text-align-option-group"
            selected={selected}
            onChange={setSelected}
          >
            <ToggleGroup.Item label="Left" value="left">
              <IconAlignLeft />
            </ToggleGroup.Item>
            <ToggleGroup.Item label="Center" value="center">
              <IconAlignCenter />
            </ToggleGroup.Item>
            <ToggleGroup.Item label="Right" value="right">
              <IconAlignRight />
            </ToggleGroup.Item>
          </ToggleGroup>
        </ResizableBox>
      </Container>
    );
  }
};

export const Large: Story = {
  args: {},
  render: function Wrapper(args) {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <Container>
        <ResizableBox>
          <ToggleGroup
            legend="Size"
            name="size-option-group"
            selected={selected}
            onChange={setSelected}
          >
            <ToggleGroup.Item id="test-1" label="x-small" value="xs">
              XS
            </ToggleGroup.Item>
            <ToggleGroup.Item id="test-2" label="small" value="sm">
              SM
            </ToggleGroup.Item>
            <ToggleGroup.Item id="test-3" label="medium" value="m">
              M
            </ToggleGroup.Item>
            <ToggleGroup.Item id="test-3" label="large" value="l">
              L
            </ToggleGroup.Item>
            <ToggleGroup.Item id="test-3" label="x-large" value="xl">
              XL
            </ToggleGroup.Item>
          </ToggleGroup>
        </ResizableBox>
      </Container>
    );
  }
};
