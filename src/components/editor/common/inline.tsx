import classNames from 'classnames';

import { Size } from '@/shared/types';
import { ResumeTheme } from '@/themes';

import { Box, BoxProps } from './box';

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
