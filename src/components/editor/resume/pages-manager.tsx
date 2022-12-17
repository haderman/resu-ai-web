import React from 'react';
import useResizeObserver from 'use-resize-observer';

import {
  ContactContainer,
  ExperienceContainer,
  PhotoContainer,
  ProjectsContainer,
  SkillsContainer,
  ProfileContainer,
} from './content';

import styles from './resume.module.scss';

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
  const pagesContainerRef = React.useRef<HTMLDivElement>(null);
  const [pages, setPages] = React.useState<Page[]>([BLOCKS]);
  const [blocks, setBlocks] = React.useState<Block[]>(BLOCKS);

  React.useLayoutEffect(
    () => {
      if (pagesContainerRef.current === null) {
        return;
      }

      setPages(composePages(pagesContainerRef.current, blocks));
    },
    [pagesContainerRef, blocks]
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
          gap: 60,
          paddingBottom: 40,
        }}
      >
        {pages.map((page, idx) => {
          return (
            <Page key={idx}>
              {page.map((block, jdx) =>
                <MemoizedBlock
                  key={block.id}
                  id={block.id}
                  onResize={handleOnResize(block.id)}
                >
                  {block.component}
                </MemoizedBlock>
              )}
            </Page>
          );
        })}
      </div>
      <Hidden>
        <Page ref={pagesContainerRef} />
      </Hidden>
    </>
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

const MemoizedBlock = React.memo(Block);

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

function composePages($pagesContainer: HTMLElement, blocks: Block[]) {
  const pageComputedStyle = getElementComputedStyle($pagesContainer as HTMLElement);
  let pages: Array<Block[]> = [[]];
  let total = 0;
  let currentPageNum = 0;
  const limit = pageComputedStyle.height - pageComputedStyle.paddingTop - pageComputedStyle.paddingBottom;

  blocks.forEach(block => {
    if (total + block.height < limit) {
      total = total +block.height;
      pages[currentPageNum].push(block);
    } else {
      total = block.height;
      currentPageNum++;
      pages[currentPageNum] = [block];
    }
  });

  return pages;
}

function getElementComputedStyle($element: HTMLElement) {
  const { paddingTop, paddingBottom, marginBottom } = window.getComputedStyle($element);
  return {
    height: $element.offsetHeight,
    paddingTop: Math.ceil(parseFloat(paddingTop)),
    paddingBottom: Math.ceil(parseFloat(paddingBottom)),
    marginBottom: 20, //Math.ceil(parseFloat(marginBottom)),
  };
}
