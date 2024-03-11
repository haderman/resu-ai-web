import * as React from 'react';

import { apiState } from '@/state/api';

import { ResumeContainer } from './resume';
import { Panel } from './panel';
import { Header } from './header';

import styles from './editor.module.scss';

export function Editor() {
  const isLoading = apiState.resume.useIsLoadingResume();

  if (isLoading) {
    return <LoadingState />;
  }

  return <Content />;
}

function LoadingState() {
  return (
    <div className={styles.layout}>
      <div>Loading...</div>
    </div>
  );
}

const Content = React.memo(
  function ContentInner() {
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
);
