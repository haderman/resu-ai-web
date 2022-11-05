import styled from 'styled-components';

import { Color, Size, Weight } from '@/shared/types';

// TODO: add better line height -> read this https://twitter.com/danqing_liu/status/1576997493765611520?s=20&t=T7u0xdkm8QOrLbnNRwoq-A

export type TextProps = React.PropsWithChildren<{
  as?: keyof Pick<JSX.IntrinsicElements, 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
  color?: Color
  size?: Size
  weight?: Weight
}>

export const Text = styled.span<TextProps>`
  margin: 0;
  padding: 0;

  color: ${props => props.color ? props.theme.colors[props.color].foreground : 'inherit'};
  font-size: ${props => props.theme.fontSize[props.size ?? 'default']};
  font-weight: ${props => props.theme.fontWeight[props.weight ?? 'regular']};
  line-height: ${props => props.theme.lineHeight.normal};
`;
