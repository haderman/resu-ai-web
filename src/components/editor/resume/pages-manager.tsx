import React from 'react';
import styles from './resume.module.scss';

const BLOCKS = Array(10)
  .fill(undefined)
  .map((val, idx) => ({
    id: `block-${idx}`,
  }));

export function PagesManager() {
  const pagesContainerRef = React.useRef<HTMLDivElement>(null);
  const blockRefMap = React.useRef<Record<Block['id'], HTMLDivElement | null>>({});
  const [pages, setPages] = React.useState<Page[]>([BLOCKS]);

  React.useEffect(
    () => {
      if (pagesContainerRef.current === null) {
        return;
      }

      const blocksWithHeight = composeBlocksWithHeight(BLOCKS, blockRefMap.current);
      const pages_ = composePages(pagesContainerRef.current, blocksWithHeight);
      setPages(pages_);
    },
    [pagesContainerRef.current, blockRefMap.current]
  );

  return (
    <>
      {BLOCKS.length}
      <div
        // ref={pagesContainerRef}
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
                <Block
                  key={block.id}
                  id={block.id}
                  ref={ref => {
                    blockRefMap.current[block.id] = ref;
                  }}
                >
                  {block.id}
                </Block>
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

const Block = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{ id: string, children: React.ReactNode }>>(
  function Block(props, ref) {
    return (
      <div
        id={props.id}
        ref={ref}
        data-kind="block"
        style={{
          width: '100%',
          height: randomHeight(),
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

);

type Page = Block[];

type Block = {
  id: string
};

type BlockWithHeight = Block & {
  height: number
};

function randomHeight() {
  return 246;
  let min = 100;
  let max = 500;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function composePages($pagesContainer: HTMLElement, blocks: BlockWithHeight[]) {
  const pageComputedStyle = getElementComputedStyle($pagesContainer as HTMLElement);
  let pages: Array<Block[]> = [[]];
  let total = 0;
  let currentPageNum = 0;
  const limit = pageComputedStyle.height - pageComputedStyle.paddingTop - pageComputedStyle.paddingBottom;

  blocks.forEach(block => {
    if (total + block.height < limit) {
      total = total +block.height + 20;
      pages[currentPageNum].push({ id: block.id });
    } else {
      total = block.height + 20;
      currentPageNum++;
      pages[currentPageNum] = [{ id: block.id }];
    }
  });

  return pages;
}

function getElementComputedStyle($element: HTMLElement) {
  const { paddingTop, paddingBottom, marginBottom } = window.getComputedStyle($element);
  console.log('$element.offsetHeight: ', $element.offsetHeight);
  return {
    height: $element.offsetHeight,
    paddingTop: Math.ceil(parseFloat(paddingTop)),
    paddingBottom: Math.ceil(parseFloat(paddingBottom)),
    marginBottom: 20, //Math.ceil(parseFloat(marginBottom)),
  };
}

function composeBlocksWithHeight(blocks: Block[], blocksRefMap: Record<Block['id'], HTMLDivElement | null>) {
  return blocks.map(block => {
    if (block.id in blocksRefMap) {
      const blockComputedStyle = getElementComputedStyle(blocksRefMap[block.id] as HTMLElement);
      return {
        ...block,
        height: blockComputedStyle.height,
      };
    } else {
      return {
        ...block,
        height: 0,
      };
    }
  });
}
