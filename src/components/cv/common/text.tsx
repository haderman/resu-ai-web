import styled from 'styled-components';

import { ColorVariant, Size, Weight } from '../types';

export type TextProps = React.PropsWithChildren<{
  as?: keyof Pick<JSX.IntrinsicElements, 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
  color?: ColorVariant
  size?: Size
  weight?: Weight
}>

export const Text = styled.span<TextProps>`
  color: ${props => props.color ? props.theme.fg[props.color] : 'inherit'};
  font-size: ${props => props.theme.fontSize[props.size ?? 'default']};
  font-weight: ${props => props.theme.fontWeight[props.weight ?? 'regular']};
  line-height: ${props => props.theme.lineHeight.normal};
`;
