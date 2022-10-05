import * as React from 'react';
import styled from 'styled-components';

import { Color } from '@/components/cv/types';

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
    <StyledFieldset>
      <StyledLegend>{props.label}</StyledLegend>
      <div>
        {Color.values().map((color) => {
          return (
            <StyledRadio
              key={color}
              type="radio"
              id={props.label + '-' + color}
              name={color}
              value={color}
              color={color}
              data-checked={color === props.value ? 'true' : 'false'}
              checked={props.value === color}
              onChange={handleOnChange(color)}
            />
          );
        })}
      </div>
    </StyledFieldset>
  );
}

const StyledFieldset = styled.fieldset`
  padding: 10px;
  background-color: hsl(0 0% 15%);
  border-color: hsl(0 0% 35%);
  border-style: solid;
`;

const StyledLegend = styled.legend`
  color: white;
`;

const StyledRadio = styled.input<{ color: Color }>`
  appearance: none;
  background-color: ${(props) => props.theme.colors[props.color].background};
  width: 1.15rem;
  height: 1.15rem;
  border: 0.15rem solid ${(props) => props.theme.colors[props.color].foreground};
  border-radius: 50%;

  ::before {
    content: '';
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1rem 1rem ${(props) => props.theme.colors[props.color].background};
  }

  &[data-checked='true'] {
    box-shadow: 0px 0px 0px 3px hsl(210deg 11% 49%);
  }

  &[data-checked='true']::before {
    content: '';
    transform: scale(1);
  }
`;
