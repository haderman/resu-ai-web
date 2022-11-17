import classNames from 'classnames';

import { ResumeTheme } from '@/themes';
import { Size, Color } from '@/shared/types';

export type BoxProps = React.PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements
  padding?: Size
  fitContent?: boolean
  color?: Color
  borderRadius?: Size,
  className?: string
  style?: React.CSSProperties
}>

export function Box(props: BoxProps) {
  const className = classNames(
    props.fitContent ? 'width-fit-content' : 'width-full',
    props.fitContent ? 'height-fit-content' : 'height-unset',
    ResumeTheme.getPaddingClassName(props.padding),
    ResumeTheme.getBorderRadiusClassName(props.borderRadius),
    props.className,
  );


  const style: React.CSSProperties = props.color ? {
    color: ResumeTheme.getColor(props.color, 'text'),
    backgroundColor: ResumeTheme.getColor(props.color, 'background'),
  } : {
    color: 'inherit',
    background: 'transparent',
  };

  const Component = props.as || 'div';

  return (
    <Component className={className} style={{ ...props.style, ...style }}>
      {props.children}
    </Component>
  );
}
