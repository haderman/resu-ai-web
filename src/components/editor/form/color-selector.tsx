import { useTheme } from 'styled-components';

import { Color } from '@/shared/types';

export type ColorSelectorProps = {
  label: string
  value: Color
  onChange: (color: Color) => void
};

export function ColorSelector(props: ColorSelectorProps) {
  const theme = useTheme();

  function handleOnChange(color: Color) {
    return () => {
      props.onChange(color);
    };
  }

  return (
    <fieldset>
      <legend>{props.label}</legend>
      <div>
        {Color.values.map((color) => {
          return (
            <input
              key={color}
              type="radio"
              id={props.label + '-' + color}
              name={color}
              value={color}
              style={{
                backgroundColor: theme.colors[color].background,
              }}
              data-checked={color === props.value ? 'true' : 'false'}
              checked={props.value === color}
              onChange={handleOnChange(color)}
            />
          );
        })}
      </div>
    </fieldset>
  );
}
