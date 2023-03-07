import * as React from 'react';

import { ResumeContainer } from './resume';
import { Panel } from './panel';
import { Header } from './header';

import styles from './editor.module.scss';

export function Editor() {
  console.log('editor');
  return (
    <div className={styles.layout}>
      <Header data-section="header" />
      <div data-section="panel">
        <Panel />
      </div>
      <ResumeContainer data-section="resume" />
    </div>
  );
}
