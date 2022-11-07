import styled from 'styled-components';

import { Size } from '@/shared/types';

import { Box, BoxProps } from './box';

export type InlineProps = React.PropsWithChildren<BoxProps & {
  gap?: Size
  alignItems?: 'start' | 'center' | 'end'
  childrenWithSameWidth?: boolean
}>;

export const Inline = styled(Box)<InlineProps>`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: ${({ alignItems }) => alignItems || 'unset'};
  gap: ${props => props.theme.gap[props.gap ?? 'default']};

  > * {
    ${({ childrenWithSameWidth }) => childrenWithSameWidth && `
      flex: 1;
    `}
  }
`;
