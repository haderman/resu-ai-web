import classNames from 'classnames';

import { Size, Color } from '@/shared/types';
import { ResumeTheme } from '@/themes';

import { Text } from '../text';
import { Inline } from '../inline';
import type { TextProps } from '../text';
import type { InlineProps } from '../inline';

export type ChipProps = {
  children: React.ReactElement<TextProps> | string
  variant?: 'outlined' | 'filled'
  size?: Exclude<Size, 'default'>
  color?: Color
};

export type ContainerProps = {
  gap: InlineProps['gap']
  children: React.ReactElement<ChipProps> | React.ReactElement<ChipProps>[]
}

function Container(props: ContainerProps) {
  return <Inline fitContent {...props} />;
}

export function Chip(props: ChipProps) {
  const {
    children,
    color = 'gray',
    size = 'small',
    variant = 'filled',
  } = props;

  const className = classNames(
    'inline',
    ResumeTheme.getFontSizeClassName(size),
    ResumeTheme.getBorderRadiusClassName('medium'),
    ResumeTheme.getPaddingClassName('small'),
  );

  const style = variant === 'filled' ? {
    backgroundColor: ResumeTheme.getColor(color, 'background'),
    color: ResumeTheme.getColor(color, 'text'),
    border: `0.3mm solid ${ResumeTheme.getColor(color, 'foreground')}`,
  } : {
    backgroundColor: 'transparent',
    color: ResumeTheme.getColor(color, 'foreground'),
    border: `0.3mm solid ${ResumeTheme.getColor(color, 'background')}`,
  };

  return (
    <span className={className} style={style}>
      {typeof children === 'string'
        ? <Text>{children}</Text>
        : children
      }
    </span>
  );
}

Chip.Container = Container;
