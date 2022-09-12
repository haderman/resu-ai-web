import styled from 'styled-components';

import { Size, Color } from '../types';

export type BoxProps = React.PropsWithChildren<{
  padding?: Size
  background?: Color
  borderRadius?: Size
}>

export const Box = styled.div<BoxProps>`
  padding: ${props => props.theme.padding[props.padding ?? 'default']};
  background: ${props => props.theme.bg[props.background ?? 'default']};
  border-radius: ${props => props.theme.borderRadius[props.borderRadius ?? 'default']};
`;
