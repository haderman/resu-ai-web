import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { selectMode } from '@/state/settings';

import { ResumeContainer } from './resume';
import { Panel } from './panel';


import styles from './editor.module.scss';
import { Chat } from './chat';
import { Header } from './header';

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
    const mode = useSelector(selectMode);
    const Section = mode === 'chat' ? ChatSection : PanelSection;

    return (
      <div className={styles.layout} data-mode={mode}>
        <Header data-section="header" />
        <Section />
        <ResumeContainer data-name="resume" />
      </div>
    );
  }
);

function ChatSection() {
  return (
    <section data-name="chat">
      <Chat />
    </section>
  );
}
  
function PanelSection() {
  return (
    <section data-name="panel">
      <Panel />
    </section>
  );
}