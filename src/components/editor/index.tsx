import { apiState } from '@/state/api';

import { ResumeContainer } from './resume';
import { Panel } from './panel';

import styles from './editor.module.scss';

export function Editor() {
  const isLoading = apiState.resume.useIsLoadingResume();

  return (
    <div className={styles.layout}>
      {isLoading
        ? <div>Loading...</div>
        : <Content />
      }
    </div>
  );
}

function Content() {
  return (
    <>
      <div data-section="panel">
        <Panel />
      </div>
      <ResumeContainer data-section="resume" />
    </>
  );
}
