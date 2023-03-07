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

type Path<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends (infer U)[]
        ? K & string
        : K extends string ? `${K & string}${"" extends Path<T[K]> ? "" : "."}${Path<T[K]>}` : never
    }[keyof T]
  : "";

function createObjectFromPath<P, T>(path: Path<P>, value: T): any {
  const keys = path.split('.');
  const result: any = {};
  let current = result;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = {};
      current = current[key];
    }
  }
  return result;
}

type Person = {
  name: string;
  houses: {
    pets: {
      name: string;
      age: number;
    }[];
  };
};

const person: Person = {
  name: "John",
  houses: {
    pets: [
      { name: "Fluffy", age: 3 },
      { name: "Spot", age: 5 },
    ],
  },
};

type PersonPath = Path<Person>;

const obj = createObjectFromPath<Person, Person['houses']['pets']>("houses.pets",
  [
    { name: "Fluffy", age: 93 },
    { name: "Spot", age: 5 },
  ]
);

console.log('obj', obj);

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
                  template={block.template}
                />
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
  template: BlockTemplate
}>;

function BlockComponent(props: BlockComponentProps) {
  const Sections = React.useMemo(
    () => {
      return props.template.sections.map((section, idx) => {
        switch (section) {
          case 'contact': return <ContactContainer key='contact' />;
          case 'experience': return <ExperienceContainer key='experience' />;
          case 'photo': return <PhotoContainer key='photo' />;
          case 'projects': return <ProjectsContainer key='projects' />;
          case 'skills': return <SkillsContainer key='skills' />;
          case 'profile': return <ProfileContainer key='profile' />;
          case 'empty': return <div key='empty'>return</div>;
          default: return null;
        }
      });
    },
    [props.template.sections],
  );

  return (
    <ResizableBlock id={props.id} data-block-layout={props.template.slots}>
      {Sections}
    </ResizableBlock>
  );
}

type ResizableBlockProps = React.PropsWithChildren<{ id: string }>

function ResizableBlock(props: ResizableBlockProps) {
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
      ref={ref}
      className={styles.block}
      {...props}
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
    () => {
      return composePages(pageHeight, blocks);
    },
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
