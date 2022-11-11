import * as React from 'react';
import styled from 'styled-components';
import useResizeObserver from 'use-resize-observer';

import { Resume } from './resume';
import { CustomizationPanel } from './customization-panel';
import { Toolbar } from './toolbar';

export function Editor() {
  const resumeRef = React.useRef<HTMLDivElement>(null);
  const innerLayoutRef = React.useRef<HTMLDivElement>(null);
  useSetScale(innerLayoutRef, resumeRef);

  return (
    <StyledLayout>
      <CustomizationPanel />
      <InnerLayout ref={innerLayoutRef}>
        <Toolbar />
        <Resume ref={resumeRef} />
      </InnerLayout>
    </StyledLayout>
  );
}

const StyledLayout = styled.div`
  position: relative;
  min-height: 100%;
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    'panel inner-layout';

  & > *:first-child {
    grid-area: panel;
    overflow: auto;
    min-height: 100%;
  }

  & > *:last-child {
    grid-area: inner-layout;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 100%;
  }
`;

const InnerLayout = styled.div`
  position: relative;
  min-height: 100%;
  justify-content: center;
  justify-items: center;
  gap: 20px;
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  grid-template-rows: 40px 1fr;
  grid-template-areas:
    'toolbar toolbar toolbar'
    '. preview .';

  & > *:first-child {
    grid-area: toolbar;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  & > *:last-child {
    grid-area: preview;
  }
`;

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
