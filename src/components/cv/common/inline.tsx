import styled from 'styled-components';

import { Box, BoxProps } from './box';
import { Size } from '../types';

export type InlineProps = React.PropsWithChildren<BoxProps & {
  gap?: Size;
  alignItems?: 'start' | 'center' | 'end';
}>;

export const Inline = styled(Box)<InlineProps>`
  display: inline-flex;
  flex-direction: row;
  align-items: ${({ alignItems }) => alignItems || 'unset'};
  gap: ${props => props.theme.gap[props.gap ?? 'default']};
`;
