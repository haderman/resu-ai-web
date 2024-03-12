import * as React from 'react';

import { apiState } from '@/state/api';

import { ResumeContainer } from './resume';
import { Panel } from './panel';
import { Header } from './header';

import styles from './editor.module.scss';
import { Chat } from './chat';

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
        <section data-name="chat">
          <Chat />
        </section>
        <section data-name="panel">
          <Panel />
        </section>
        <ResumeContainer data-name="resume" />
      </div>
    );
  }
);
