import * as React from 'react';
import dynamic from 'next/dynamic';
import useResizeObserver from 'use-resize-observer';

import { Resume } from './page';
import { Toolbar } from './toolbar';

import styles from './resume.module.scss';

const PagesManager = dynamic(
  () => import('./pages-manager').then(mod => mod.PagesManager),
  {
    ssr: false,
  }
);
const MemoizedPagesManager = React.memo(PagesManager);

export type ResumeContainerProps = React.DataHTMLAttributes<{}>;

export function ResumeContainer(props: ResumeContainerProps) {
  const resumeRef = React.useRef<HTMLDivElement>(null);
  const innerLayoutRef = React.useRef<HTMLDivElement>(null);
  useSetScale(innerLayoutRef, resumeRef);

  return (
    <div className={styles.container} ref={innerLayoutRef} {...props}>
      <Toolbar />
      <div ref={resumeRef} style={{ marginTop: 80 }}>
        <MemoizedPagesManager />
      </div>
      {/* <Resume ref={resumeRef} /> */}
    </div>
  );
}

/**
 * this is to scale the CV document to fit the screen so the user is going to see the
 * size (at scale to aviod overflow) of the document as it will be printed
 *
 * @param parentRef the ref of the parent element that is going to containt the available width
 * @param childRef the ref of the child element that is going to be scaled to fit the parent
 */
 function useSetScale(parentRef: React.RefObject<HTMLDivElement>, childRef: React.RefObject<HTMLDivElement>) {
  const { width: parentWidth = 1 } = useResizeObserver<HTMLDivElement>({ ref: parentRef });
  const { width: childWidth = 1 } = useResizeObserver<HTMLDivElement>({ ref: childRef });

  React.useEffect(() => {
    // 40 is the padding of the preview given by grid-template-columns: 20px 1fr 20px;
    const scale = parentWidth > childWidth ? 1 : (parentWidth - 40) / childWidth;
    if (childRef.current) {
      childRef.current.style.transform = `scale(${scale})`;
      childRef.current.style.transformOrigin = 'top center';
    }
  }, [parentWidth, childWidth, childRef]);
}
