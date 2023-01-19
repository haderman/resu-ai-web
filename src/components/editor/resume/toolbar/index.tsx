import * as React from 'react';

import { ThemeSwitch } from '../../form';
import styles from './toolbar.module.scss';

export type ToolbarProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'id'>;

export function Toolbar(props: ToolbarProps) {
  return (
    <div className={styles.toolbar} {...props}>
      <ThemeSwitch />
    </div>
  );
}

