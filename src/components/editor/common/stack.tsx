import classNames from 'classnames';

import { Size } from '@/shared/types';
import { ResumeTheme } from '@/themes';

import { Box, BoxProps } from './box';

export type StackProps = BoxProps & {
  gap?: Size;
};

export function Stack(props: StackProps) {
  const className = classNames(
    'stack',
    ResumeTheme.getGapClassName(props.gap),
    props.className,
  );

  return (
    <Box {...props} className={className}>
      {props.children}
    </Box>
  );
}
