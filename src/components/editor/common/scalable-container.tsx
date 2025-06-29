'use client';

import * as React from 'react';
import useResizeObserver from 'use-resize-observer';

const ScalableContext = React.createContext<React.RefObject<HTMLDivElement | null>>(null as any);

export function ScalableContainer(props: React.PropsWithChildren<{}>) {
  const resumeRef = React.useRef<HTMLDivElement>(null);
  const innerLayoutRef = React.useRef<HTMLDivElement>(null);
  useSetScale(innerLayoutRef, resumeRef);

  return (
    <div {...props} ref={innerLayoutRef}>
      <ScalableContext.Provider value={resumeRef}>
        {props.children}
      </ScalableContext.Provider>
    </div>
  );
}

ScalableContainer.Item = function ScalableContainerItem(props: React.HTMLProps<HTMLDivElement>) {
  const innerLayoutRef = React.useContext(ScalableContext);
  return (
    <div {...props} ref={innerLayoutRef}>
      {props.children}
    </div>
  );
};

/**
 * this is to scale the CV document to fit the screen so the user is going to see the
 * size (at scale to aviod overflow) of the document as it will be printed
 *
 * @param parentRef the ref of the parent element that is going to containt the available width
 * @param childRef the ref of the child element that is going to be scaled to fit the parent
 */
 function useSetScale(
  parentRef: React.RefObject<HTMLDivElement | null>,
  childRef: React.RefObject<HTMLDivElement | null>,
) {
  const { width: parentWidth = 1 } = useResizeObserver<HTMLDivElement>({ ref: parentRef as any });
  const { width: childWidth = 1 } = useResizeObserver<HTMLDivElement>({ ref: childRef as any});

  React.useEffect(() => {
    // 40 is the padding of the preview given by grid-template-columns: 20px 1fr 20px;
    const scale = parentWidth > childWidth ? 1 : (parentWidth - 40) / childWidth;
    if (childRef.current) {
      childRef.current.style.transform = `scale(${scale})`;
      childRef.current.style.transformOrigin = 'top center';
    }
  }, [parentWidth, childWidth, childRef]);
}
