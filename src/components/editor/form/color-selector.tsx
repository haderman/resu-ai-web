import { Color } from '@/shared/types';
import { ResumeTheme } from '@/shared/types/theme';

export type ColorSelectorProps = {
  label: string
  value: Color
  onChange: (color: Color) => void
};

export function ColorSelector(props: ColorSelectorProps) {
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
              id={composeId(props.label, color)}
              name={color}
              value={color}
              style={{
                backgroundColor: ResumeTheme.getColor(color, 'background'),
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

/**
 * HELPERS
 */
function composeId(label: string, color: Color) {
  return label + '-' + color;
}
