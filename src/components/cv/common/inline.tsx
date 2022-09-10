import styled from 'styled-components';

import { Box, BoxProps } from './box';
import { Size } from '../types';

export type InlineProps = React.PropsWithChildren<BoxProps & {
  gap?: Size;
}>;

export const Inline = styled(Box)<InlineProps>`
  display: inline-flex;
  flex-direction: row;
  gap: var(--cv-gap-${(props) => props.gap ?? '0'});
`;
