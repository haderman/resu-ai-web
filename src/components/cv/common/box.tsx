import styled from 'styled-components';

import { Size, Color } from '../types';

export type BoxProps = React.PropsWithChildren<{
  padding?: Size
  background?: Color
  borderRadius?: Size
}>

export const Box = styled.div<BoxProps>`
  padding: var(--cv-padding-${(props) => props.padding ?? '0'});
  background-color: var(--cv-bg-${(props) => props.background ?? 'unset'});
  border-radius: var(--cv-border-radius-${(props) => props.borderRadius ?? '0'});
`;
