import { apiState } from '@/state/api';

import { ResumeContainer } from './resume';
import { Panel } from './panel';
import { Header } from './header';

import styles from './editor.module.scss';

export function Editor() {
  const { isLoading } = apiState.resume.useGetResumeQuery();

  return (
    <div className={styles.layout}>
      <Header data-section="header" />
      {isLoading
        ? <div>Loading...</div>
        : <>
          <div data-section="panel">
            <Panel />
          </div>
          <ResumeContainer data-section="resume" />
        </>
      }
    </div>
  );
}
