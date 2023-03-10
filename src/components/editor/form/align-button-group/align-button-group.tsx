import * as React from 'react';
import { ToggleGroup } from '@/components/editor/form/core';
import { Alignment } from '@/shared/types';

export type AlignButtonGroupProps = {
  name: string
  id: string
  label: string
  value: Alignment | null;
  onChange: (a: Alignment | null) => void;
};

export function AlignButtonGroup(props: AlignButtonGroupProps) {
  function handleAlignmentChange(str: string | null) {
    props.onChange(str as Alignment);
  }

  return (
    <ToggleGroup
      name={props.name}
      selected={props.value}
      onChange={handleAlignmentChange}
      legend={props.label}
    >
      <ToggleGroup.Item label='Left' value="left">
        Left
      </ToggleGroup.Item>
      <ToggleGroup.Item label='Center' value="center">
        Center
      </ToggleGroup.Item>
      <ToggleGroup.Item label='Right' value="right">
        Right
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}
