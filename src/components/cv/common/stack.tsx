import styled from 'styled-components';

import { Box, BoxProps } from './box';
import { Spacing, Color } from '../types';

export type StackProps = React.PropsWithChildren<BoxProps & {
  gap?: Spacing;
}>;

export const Stack = styled(Box)<StackProps>`
  display: flex;
  flex-direction: column;
  gap: var(--cv-gap-${(props) => props.gap ?? '0'});
`;
