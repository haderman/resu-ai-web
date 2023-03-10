import * as React from 'react';
import { ToggleGroup } from '@/components/editor/form/core';
import { Size } from '@/shared/types';

export type SizeButtonGroupProps = {
  id: string
  name: string
  label: string
  value: Size | null;
  onChange: (size: Size | null) => void;
};

export function SizeButtonGroup(props: SizeButtonGroupProps) {
  function handleSizeChange(size: string | null) {
    props.onChange(size as Size);
  }

  return (
    <ToggleGroup
      name={props.name}
      selected={props.value}
      onChange={handleSizeChange}
      legend={props.label}
    >
      <ToggleGroup.Item label='Small' value="small">Small</ToggleGroup.Item>
      <ToggleGroup.Item label='Medium' value="medium">Medium</ToggleGroup.Item>
      <ToggleGroup.Item label='Large' value="large">Large</ToggleGroup.Item>
    </ToggleGroup>
  );
}
