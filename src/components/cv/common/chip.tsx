import styled, { DefaultTheme } from 'styled-components';

import { Size, SpacingUnit } from '../types';
import { Text } from './text';
import { Inline } from './inline';
import type { TextProps } from './text';
import type { InlineProps } from './inline';

export type ChipProps = {
  size?: Exclude<Size, 'default'>
  children: React.ReactElement<TextProps> | string
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
    <StyledChip size={props.size}>
      {ChildComponent}
    </StyledChip>
  );
}

Chip.Container = Container;

const StyledChip = styled.span<ChipProps>`
  padding: ${props => calcPadding(props.theme, props.size)};
  border: 0.3mm solid hsl(0, 0%, 80%);
  display: inline-block;
  border-radius: 1.6mm;
  font-size: 3.5mm;
`;

function calcPadding(theme: DefaultTheme, size: Size = 'small'): string {
  const spacing = theme.padding[size || 'small'];
  if (size === 'default') {
    return `${spacing} ${spacing}`;
  }

  return `calc(${spacing} * 0.2) ${spacing}`;
}
