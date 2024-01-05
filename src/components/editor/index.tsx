import * as React from 'react';

import { apiState } from '@/state/api';

import { ResumeContainer } from './resume';
import { Panel } from './panel';

import styles from './editor.module.scss';
import { Chat } from '../chat';

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
        <div data-section="panel">
          <Chat />
          <Panel />
        </div>
        <ResumeContainer data-section="resume" />
      </div>
    );
  }
);
