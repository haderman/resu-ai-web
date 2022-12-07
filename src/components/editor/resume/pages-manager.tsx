import React from 'react';
import useResizeObserver from 'use-resize-observer';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import styles from './resume.module.scss';

const BLOCKS = Array(13)
  .fill(undefined)
  .map((val, idx) => ({
    id: `block-${idx}`,
    height: 0,
    content: 'Lorem: ',
  }));

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
    [pagesContainerRef.current, blocks]
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

  function handleOnChangeContent(blockId: string) {
    return (content: string) => {
      setBlocks(blocks => blocks.map(block =>
        block.id === blockId
          ? {...block, content}
          : block
        )
      );
    };
  }

  return (
    <>
      {BLOCKS.length}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 60,
          paddingBottom: 40,
          boxSizing: 'border-box',
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
                  <MemoizedBlockContent
                    content={block.content}
                    onChange={handleOnChangeContent(block.id)}
                  >
                    {block.id}
                  </MemoizedBlockContent>
                </MemoizedBlock>
              )}
            </Page>
          );
        })}
      </div>
      <div style={{ visibility: 'hidden' }}>
        <Page ref={pagesContainerRef} />
      </div>
    </>
  );
}

const Page = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
  function PageComponent(props, ref) {
    return (
      <div
        ref={ref}
        className={styles.page}
        data-kind="page"
        style={{
          marginTop: 0,
          padding: '10mm',
          gap: 20,
          overflow: 'hidden',
        }}
      >
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
    <div
      id={props.id}
      ref={ref}
      data-kind="block"
      style={{
        width: '100%',
        backgroundColor: 'hsl(210deg 10% 20%)',
        borderRadius: 10,
        marginBottom: 20,
        border: 'none',
      }}
    >
      {props.children}
    </div>
  );
}

const MemoizedBlockContent = React.memo(BlockContent);

type BlockContentProps = React.PropsWithChildren<{
  content: string
  onChange: (content: string) => void
}>;

function BlockContent(props: BlockContentProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  function handleOnChange(event: ContentEditableEvent) {
    props.onChange(event.target.value);
  }

  return (
    <div style={{ width: '100%', height: randomHeight(), padding: 10, fontSize: 16, display: 'block' }}>
      {props.children}
      <ContentEditable
        innerRef={ref}
        html={props.content}
        onChange={handleOnChange}
      />
    </div>
  );
}

type Page = Block[];

type Block = {
  id: string
  height: number
  content: string
};

function randomHeight() {
  return 'auto';
  let min = 100;
  let max = 500;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function composePages($pagesContainer: HTMLElement, blocks: Block[]) {
  const pageComputedStyle = getElementComputedStyle($pagesContainer as HTMLElement);
  let pages: Array<Block[]> = [[]];
  let total = 0;
  let currentPageNum = 0;
  const limit = pageComputedStyle.height - pageComputedStyle.paddingTop - pageComputedStyle.paddingBottom;

  blocks.forEach(block => {
    if (total + block.height < limit) {
      total = total +block.height + 20;
      pages[currentPageNum].push(block);
    } else {
      total = block.height + 20;
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
