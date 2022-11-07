import styled, { css } from 'styled-components';

import { Size, Color } from '@/shared/types';

export type BoxProps = React.PropsWithChildren<{
  padding?: Size
  fitContent?: boolean
  color?: Color
  borderRadius?: Size
}>

export const Box = styled.div<BoxProps>`
  width: ${props => props.fitContent ? 'fit-content' : '100%'};
  height: ${props => props.fitContent ? 'fit-content' : 'unset'};
  padding: ${props => props.theme.padding[props.padding ?? 'default']};
  border-radius: ${props => props.theme.borderRadius[props.borderRadius ?? 'default']};

  ${props => props.color ? colorBox : noColorBox};
`;

const colorBox = css<BoxProps>`
  color: ${props => props.theme.colors[props.color as Color].text};
  background: ${props => props.theme.colors[props.color as Color].background};
`;

const noColorBox = css`
  color: inherit;
  background: transparent;
`;
