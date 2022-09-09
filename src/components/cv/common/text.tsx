import styled from 'styled-components';

import { Color, Size, Weight } from '../types';

export type TextProps = React.PropsWithChildren<{
  as?: keyof Pick<JSX.IntrinsicElements, 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
  color?: Color
  size?: Size
  weight?: Weight
}>

export const Text = styled.span`
  color: var(--cv-fg-${(props: TextProps) => props.color ?? 'primary'});
  font-size: var(--cv-font-size-${(props: TextProps) => props.size ?? 'medium'});
  font-weight: var(--cv-font-weight-${(props: TextProps) => props.weight ?? 'normal'});
  line-height: var(--cv-line-height);
`;
