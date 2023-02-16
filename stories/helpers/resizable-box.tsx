import { Resizable } from 're-resizable';
import React from 'react';

export type ResizableBoxProps = React.PropsWithChildren<{}>;

export function ResizableBox(props: ResizableBoxProps) {
  const style = {
    display: 'flex',
    padding: '10px',
    border: '1px dashed hsl(210deg 0% 42%)',
  };

  return (
    <Resizable style={style}>
      {props.children}
    </Resizable>
  );
}
