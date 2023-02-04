import * as React from 'react';
import { ToggleGroup } from '@/components/editor/form/core';
import { Size } from '@/shared/types';

export type SizeButtonGroupProps = {
  value: Size | null;
  onChange: (size: Size | null) => void;
};

export function SizeButtonGroup(props: SizeButtonGroupProps) {
  function handleSizeChange(size: string | null) {
    props.onChange(size as Size);
  }

  return (
    <ToggleGroup
      name="size"
      selected={props.value}
      onChange={handleSizeChange}
      legend="Size"
    >
      <ToggleGroup.Item label='Small' value="small">Small</ToggleGroup.Item>
      <ToggleGroup.Item label='Medium' value="medium">Medium</ToggleGroup.Item>
      <ToggleGroup.Item label='Large' value="large">Large</ToggleGroup.Item>
    </ToggleGroup>
  );
}
