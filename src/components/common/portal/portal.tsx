import * as React from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = React.PropsWithChildren<{}>;

export function Portal(props: PortalProps) {
  return createPortal(props.children, document.body);
}
