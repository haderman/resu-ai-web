import styled, { DefaultTheme, css } from 'styled-components';

import { Size, Color } from '@/shared/types';

import { Text } from './text';
import { Inline } from './inline';
import type { TextProps } from './text';
import type { InlineProps } from './inline';

export type ChipProps = {
  children: React.ReactElement<TextProps> | string
  variant?: 'outlined' | 'filled'
  size?: Exclude<Size, 'default'>
  color?: Color
};

export type ContainerProps = {
  gap: InlineProps['gap']
  children: React.ReactElement<ChipProps> | React.ReactElement<ChipProps>[]
}

function Container(props: ContainerProps) {
  return <Inline fitContent {...props} />;
}

export function Chip(props: ChipProps) {
  const ChildComponent = typeof props.children === 'string'
    ? <Text>{props.children}</Text>
    : props.children;

  return (
    <StyledChip
      size={props.size ?? 'medium'}
      color={props.color || 'gray'}
      variant={props.variant || 'filled'}
    >
      {ChildComponent}
    </StyledChip>
  );
}

Chip.Container = Container;

const StyledChip = styled.span<Required<ChipProps>>`
  display: inline-block;
  padding: ${props => calcPadding(props.theme, props.size)};
  border-radius: 1.6mm;
  font-size: 3.5mm;

  ${props => props.variant === 'filled' ? filled : outlined};
`;

// variants
const outlined = css<Required<ChipProps>>`
  background-color: transparent;
  color: ${props => props.theme.colors[props.color].foreground};
  border: 0.3mm solid ${props => props.theme.colors[props.color].background};
`;

const filled = css<Required<ChipProps>>`
  background-color: ${props => props.theme.colors[props.color].background};
  color: ${props => props.theme.colors[props.color].text};
  border: 0.3mm solid ${props => props.theme.colors[props.color].foreground};
`;


// helpers
function calcPadding(theme: DefaultTheme, size: Size = 'small'): string {
  const spacing = theme.padding[size || 'small'];
  if (size === 'default') {
    return `${spacing} ${spacing}`;
  }

  return `calc(${spacing} * 0.2) ${spacing}`;
}
