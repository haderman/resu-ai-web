import { ResumeLayoutItem } from './resume';
import { ResumeSections } from './resume/sections';

export type Block = {
  id: BlockId
  template: {
    sections: ResumeSections;
    slots:
      | 'child1'
      | 'child1,child2'
      | 'child1,child1,child2'
      | 'child1,child2,child2'
      | 'child1,child2,child3'
  }
  height: number
}

export type BlockTemplate = Block['template'];

export type BlockId = string;

export const Block = {
  create(id: BlockId, template: BlockTemplate): Block {
    return {
      id,
      template,
      height: 0,
    };
  },
};

export const BlockLayout = {
  mapToBlockLayoutCSS,
};

function mapToBlockLayoutCSS(layout: ResumeLayoutItem): BlockTemplate['slots'] {
  switch (layout.length) {
    case 1:
      return 'child1';
    case 2:
      return 'child1,child2';
    case 3:
      if (layout[0] === layout[1]) {
        return 'child1,child1,child2';
      } else if (layout[1] === layout[2]) {
        return 'child1,child2,child2';
      } else {
        return 'child1,child2,child3';
      }
  }
}
