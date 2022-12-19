import React from 'react';
import useResizeObserver from 'use-resize-observer';

import { pageSlice, selectPageDimensions } from '@/state/page';
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

const { actions } = pageSlice;

const BLOCKS = [{
  id: 'block-1',
  height: 1,
  component: <ContactContainer />,
}, {
  id: 'block-2',
  height: 1,
  component: <ExperienceContainer />,
}, {
  id: 'block-3',
  height: 1,
  component: <PhotoContainer />,
}, {
  id: 'block-4',
  height: 1,
  component: <ProjectsContainer />,
}, {
  id: 'block-5',
  height: 1,
  component: <SkillsContainer />,
}, {
  id: 'block-6',
  height: 1,
  component: <ProfileContainer />,
}, {
  id: 'block-7',
  height: 1,
  component: <ContactContainer />,
}, {
  id: 'block-8',
  height: 1,
  component: <ExperienceContainer />,
}, {
  id: 'block-9',
  height: 1,
  component: <PhotoContainer />,
}, {
  id: 'block-10',
  height: 1,
  component: <ProjectsContainer />,
}, {
  id: 'block-11',
  height: 1,
  component: <SkillsContainer />,
}, {
  id: 'block-12',
  height: 1,
  component: <ProfileContainer />,
}];


export function PagesManager() {
  const [blocks, setBlocks] = React.useState<Block[]>(BLOCKS);

  const pageDimensions = useSelector(selectPageDimensions);
  const pages = React.useMemo(
    () => composePages(pageDimensions, blocks),
    [pageDimensions, blocks]
  );

  function handleOnResize(blockId: string) {
    return ({ height }: Size) => {
      setBlocks(blocks => blocks.map(block =>
        block.id === blockId
          ? {...block, height}
          : block
        )
      );
    };
  }

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
                <Block
                  id={block.id}
                  key={block.id}
                  onResize={handleOnResize(block.id)}
                >
                  {block.component}
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
      dispatch(actions.setDimensions(dimensions));
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
  onResize: (size: Size) => void
}>;

type Size = {
  width: number
  height: number
};

function Block(props: BlockProps) {
  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize(size) {
      props.onResize({
        width: size.width ?? 1,
        height: size.height ?? 1
      });
    },
  });

  return (
    <div id={props.id} ref={ref} data-kind="block">
      {props.children}
    </div>
  );
}

type Page = Block[];

type Block = {
  id: string
  height: number
  component: JSX.Element
};

function composePages(pageDimensions: PageDimensions, blocks: Block[]) {
  let pages: Array<Block[]> = [[]];
  let total = 0;
  let currentPageNum = 0;
  const limit = PageDimensions.calcLimit(pageDimensions);

  blocks.forEach(block => {
    if (total + block.height < limit) {
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

function getDimensions($element: HTMLElement): PageDimensions {
  const { paddingTop, paddingBottom, marginBottom } = window.getComputedStyle($element);
  return {
    offsetHeight: $element.offsetHeight,
    paddingTop: Math.ceil(parseFloat(paddingTop)),
    paddingBottom: Math.ceil(parseFloat(paddingBottom)),
    marginBottom: Math.ceil(parseFloat(marginBottom)),
  };
}
