import * as React from 'react';
import useResizeObserver from 'use-resize-observer';

import { Resume } from './resume';
import { Panel } from './panel';
import { Toolbar } from './toolbar';

import styles from './editor.module.scss';

export function Editor() {
  const resumeRef = React.useRef<HTMLDivElement>(null);
  const innerLayoutRef = React.useRef<HTMLDivElement>(null);
  useSetScale(innerLayoutRef, resumeRef);

  return (
    <div className={styles.layout}>
      <Panel />
      <div className={styles['inner-layout']}>
        <Toolbar id="toolbar" />
        <div className="resume-container" ref={innerLayoutRef}>
          <Resume ref={resumeRef} />
        </div>
      </div>
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
