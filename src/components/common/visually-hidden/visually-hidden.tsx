export type VisuallyHiddenProps = React.PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements
}>

export function VisuallyHidden(props: VisuallyHiddenProps) {
  const { as: Component = 'span' } = props;

  return (
    <Component className="visually-hidden">
      {props.children}
    </Component>
  );
}
