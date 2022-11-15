import styled from 'styled-components';
import classNames from 'classnames';

import { Size } from '@/shared/types';

import { Box, BoxProps } from './box';
import { ResumeTheme } from '@/themes';

export type InlineProps = BoxProps & {
  gap?: Size
  alignItems?: 'start' | 'center' | 'end'
  childrenWithSameWidth?: boolean
};

export function Inline(props: InlineProps) {
  const className = classNames(
    'inline',
    'wrap',
    ResumeTheme.getGapClassName(props.gap),
    {
      'children-same-size': props.childrenWithSameWidth,
    }
  );
  const style: React.CSSProperties = {
    alignItems: props.alignItems,
  };

  return (
    <Box {...props} className={className} style={style}>
      {props.children}
    </Box>
  );
}

export const Inline_ = styled(Box)<InlineProps>`
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
