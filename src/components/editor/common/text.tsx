import classNames from 'classnames';

import { Color, Size, Weight, Alignment } from '@/shared/types';
import { ResumeTheme } from '@/themes';

import type { JSX } from "react";

// TODO: add better line height -> read this https://twitter.com/danqing_liu/status/1576997493765611520?s=20&t=T7u0xdkm8QOrLbnNRwoq-A

export type TextProps = React.PropsWithChildren<{
  as?: keyof Pick<JSX.IntrinsicElements, 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
  color?: Color
  size?: Size
  weight?: Weight
  align?: Alignment
}>

export function Text(props: TextProps) {
  const Component = props.as || 'span';
  const className = classNames(
    ResumeTheme.getFontWeightClassName(props.weight),
    ResumeTheme.getFontSizeClassName(props.size),
    ResumeTheme.getLineHeightClassName('normal'),
    ResumeTheme.getAlignmentClassName(props.align),
  );
  const style: React.CSSProperties = {
    color: props.color
      ? ResumeTheme.getColor(props.color, 'foreground')
      : 'inherit',
  };

  return (
    <Component className={className} style={style}>
      {props.children}
    </Component>
  );
}
