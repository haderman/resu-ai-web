import classNames from 'classnames';
import styled from 'styled-components';

import { Size } from '@/shared/types';

import { Box, BoxProps } from './box';
import { ResumeTheme } from '@/themes';

export type StackProps = BoxProps & {
  gap?: Size;
};

export function Stack(props: StackProps) {
  const className = classNames(
    'stack',
    ResumeTheme.getGapClassName(props.gap),
  );

  return (
    <Box {...props} className={className}>
      {props.children}
    </Box>
  );
}

export const Stack_ = styled(Box)<StackProps>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.gap[props.gap ?? 'default']};
`;
