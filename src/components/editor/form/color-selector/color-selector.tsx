import { Color } from '@/shared/types';

import { RadioColorGroup } from '../core/radio-color-group';

export type ColorSelectorProps = {
  label: string
  value: Color
  onChange: (color: Color) => void
};

export function ColorSelector(props: ColorSelectorProps) {
  return (
    <RadioColorGroup
      legend="Color"
      name='color'
      selected={props.value}
      onChange={props.onChange}
    />
  );
}
