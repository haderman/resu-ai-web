import React from 'react';
import useResizeObserver from 'use-resize-observer';

import { pageSlice, selectPageHeight } from '@/state/page';
import { blocksSlice, selectBlocks } from '@/state/blocks';
import { apiState } from '@/state/api';
import { PageDimensions } from '@/shared/types/page';
import {
  ContactContainer,
  ExperienceContainer,
  PhotoContainer,
  ProjectsContainer,
  SkillsContainer,
  ProfileContainer,
} from './content';

import styles from './resume.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Block } from '@/shared/types/block';

export function PagesManager() {
  useBlockLayoutSync();
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
                <Block id={block.id} key={block.id}>
                  {block.section === 'contact' ? <ContactContainer />
                  :block.section === 'experience' ? <ExperienceContainer />
                  :block.section === 'photo' ? <PhotoContainer />
                  :block.section === 'projects' ? <ProjectsContainer />
                  :block.section === 'skills' ? <SkillsContainer />
                  :block.section === 'profile' ? <ProfileContainer />
                  :null}
                </Block>
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

type BlockProps = React.PropsWithChildren<{
  id: string
  children: React.ReactNode
}>;

function Block(props: BlockProps) {
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
    <div id={props.id} ref={ref} data-kind="block">
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

function useBlockLayoutSync() {
  const dispatch = useDispatch();
  const layout = useSelector(apiState.layout.selectors.selectLayout);

  React.useEffect(
    function dispatchComposeBlocks() {
      if (layout === null) {
        return;
      }

      dispatch(blocksSlice.actions.composeBlocks());
    }, [layout, dispatch]
  );
}

function usePages(): Block[][] {
  const pageHeight = useSelector(selectPageHeight);
  const blocks = useSelector(selectBlocks);

  const pages = React.useMemo(
    () => composePages(pageHeight, blocks),
    [pageHeight, blocks]
  );

  return pages;
}

function composePages(pageHeight: number, blocks: Block[]) {
  let pages: Array<Block[]> = [[]];
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
