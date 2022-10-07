import * as React from 'react';
import styled from 'styled-components';
import useResizeObserver from 'use-resize-observer';

import { CVDoc } from './cv-doc';
import { WithTheme } from './themes';

export function Preview() {
  const previewRef = React.useRef<HTMLDivElement>(null);
  const CvDocRef = React.useRef<HTMLDivElement>(null);
  useSetScale(previewRef, CvDocRef);

  return (
    <StyledPreview ref={previewRef}>
      <WithTheme>
        <MemoizedCVDoc ref={CvDocRef} />
      </WithTheme>
    </StyledPreview>
  );
}

const MemoizedCVDoc = React.memo(CVDoc);

const StyledPreview = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
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
    const scale = parentWidth > childWidth ? 1 : parentWidth / childWidth;
    if (childRef.current) {
      childRef.current.style.transform = `scale(${scale})`;
      childRef.current.style.transformOrigin = 'top center';
    }
  }, [parentWidth, childWidth, childRef]);
}
