import styled from 'styled-components';

import { Color, Size, Weight } from '../types';

export type TextProps = React.PropsWithChildren<{
  as?: keyof Pick<JSX.IntrinsicElements, 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
  color?: Color
  size?: Size
  weight?: Weight
}>

export const Text = styled.span<TextProps>`
  color: ${props => props.color ? props.theme.colors[props.color].foreground : 'inherit'};
  font-size: ${props => props.theme.fontSize[props.size ?? 'default']};
  font-weight: ${props => props.theme.fontWeight[props.weight ?? 'regular']};
  line-height: ${props => props.theme.lineHeight.normal};
`;
