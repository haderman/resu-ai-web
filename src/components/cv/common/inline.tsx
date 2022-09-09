import styled from 'styled-components';

import { Box, BoxProps } from './box';
import { Spacing, Color } from '../types';

export type InlineProps = React.PropsWithChildren<BoxProps & {
  gap?: Spacing;
}>;

export const Inline = styled(Box)<InlineProps>`
  display: inline-flex;
  flex-direction: row;
  gap: var(--cv-gap-${(props) => props.gap ?? '0'});
`;
