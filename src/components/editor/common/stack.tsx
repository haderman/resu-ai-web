import styled from 'styled-components';

import { Size } from '@/shared/types';

import { Box, BoxProps } from './box';

export type StackProps = React.PropsWithChildren<BoxProps & {
  gap?: Size;
}>;

export const Stack = styled(Box)<StackProps>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.gap[props.gap ?? 'default']};
`;
