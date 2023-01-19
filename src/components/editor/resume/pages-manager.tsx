import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useResizeObserver from 'use-resize-observer';

import { pageSlice, selectPageHeight } from '@/state/page';
import { blocksSlice, selectBlocks } from '@/state/blocks';
import { PageDimensions } from '@/shared/types/page';
import { Block, BlockTemplate } from '@/shared/types';

import {
  ContactContainer,
  ExperienceContainer,
  PhotoContainer,
  ProjectsContainer,
  SkillsContainer,
  ProfileContainer,
} from './content';
import styles from './resume.module.scss';

type Page = Block[];

export function PagesManager() {
  const pages = usePages();

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 40,
          gap: 60,
        }}
      >
        {pages.map((page, idx) => {
          return (
            <Page key={idx}>
              {page.map((block, jdx) =>
                <BlockComponent
                  id={block.id}
                  key={block.id}
                  slots={block.template.slots}
                >
                  {block.template.sections.map((section) => {
                    switch (section) {
                      case 'contact': return <ContactContainer />;
                      case 'experience': return <ExperienceContainer />;
                      case 'photo': return <PhotoContainer />;
                      case 'projects': return <ProjectsContainer />;
                      case 'skills': return <SkillsContainer />;
                      case 'profile': return <ProfileContainer />;
                      case 'empty': return <div>return</div>;
                      default: return null;
                    }
                  })}
                </BlockComponent>
              )}
            </Page>
          );
        })}
      </div>
      <HiddenPageForMeasuring />
    </>
  );
}

function HiddenPageForMeasuring() {
  const pagesContainerRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  React.useEffect(
    function getPageComputedStyleAndSendItToStore() {
      if (pagesContainerRef.current === null) {
        return;
      }

      const dimensions = getDimensions(pagesContainerRef.current);
      dispatch(pageSlice.actions.setDimensions(dimensions));
    },
    [dispatch]
  );

  return (
    <Hidden>
      <Page ref={pagesContainerRef} />
    </Hidden>
  );
}

function Hidden(props: React.PropsWithChildren<{}>) {
  return (
    <div style={{ visibility: 'hidden', position: 'absolute', bottom: '200%', }}>
      {props.children}
    </div>
  );
}

const Page = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
  function PageComponent(props, ref) {
    return (
      <div ref={ref} className={styles.page} data-kind="page">
        {props.children}
      </div>
    );
  }
);

type BlockComponentProps = React.PropsWithChildren<{
  id: string
  slots: BlockTemplate['slots']
  children: React.ReactNode
}>;

function BlockComponent(props: BlockComponentProps) {
  const dispatch = useDispatch();
  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize(size) {
      dispatch(
        blocksSlice.actions.updateBlock({
          id: props.id,
          height: size.height ?? 1,
        })
      );
    },
  });

  return (
    <div
      id={props.id}
      ref={ref}
      className={styles.block}
      data-block-layout={props.slots}
    >
      {props.children}
    </div>
  );
}

function getDimensions($element: HTMLElement): PageDimensions {
  const { paddingTop, paddingBottom, marginBottom } = window.getComputedStyle($element);
  return {
    offsetHeight: $element.offsetHeight,
    paddingTop: Math.ceil(parseFloat(paddingTop)),
    paddingBottom: Math.ceil(parseFloat(paddingBottom)),
    marginBottom: Math.ceil(parseFloat(marginBottom)),
  };
}

function usePages(): Page[] {
  const pageHeight = useSelector(selectPageHeight);
  const blocks = useSelector(selectBlocks);

  const pages = React.useMemo(
    () => composePages(pageHeight, blocks),
    [pageHeight, blocks]
  );

  return pages;
}

function composePages(pageHeight: number, blocks: Page) {
  let pages: Page[] = [[]];
  let total = 0;
  let currentPageNum = 0;

  blocks.forEach(block => {
    if (total + block.height < pageHeight) {
      total = total + block.height;
      pages[currentPageNum].push(block);
    } else {
      total = block.height;
      currentPageNum++;
      pages[currentPageNum] = [block];
    }
  });

  return pages;
}
