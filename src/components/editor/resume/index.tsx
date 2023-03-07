import * as React from 'react';
import dynamic from 'next/dynamic';

import { ScalableContainer } from '@/components/editor/common/scalable-container';

import { Toolbar } from './toolbar';
import styles from './resume.module.scss';

const PagesManager = dynamic(
  () => import('./pages-manager').then(mod => mod.PagesManager),
  {
    ssr: false,
  }
);

export type ResumeContainerProps = React.DataHTMLAttributes<{}>;

export function ResumeContainer(props: ResumeContainerProps) {
  return (
    <ScalableContainer className={styles.container} {...props}>
      <Toolbar />
      <ScalableContainer.Item style={{ marginTop: 80 }}>
        <PagesManager />
      </ScalableContainer.Item>
    </ScalableContainer>
  );
}
