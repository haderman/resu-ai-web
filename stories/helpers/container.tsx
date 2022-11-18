import * as React from 'react';

export type ContainerProps = React.PropsWithChildren<{}>

export function Container(props: ContainerProps) {
  const style = {
    height: '100%',
    padding: '10px',
    background: 'black',
  };

  return (
    <div style={style}>
      {props.children}
    </div>
  );
}

