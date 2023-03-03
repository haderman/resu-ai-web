import { SectionSchemaMap } from '@/shared/types';

export const skillsSectionSchemaMap: SectionSchemaMap['skills'] = {
  type: 'skills',
  fields: [
    {
      path: 'skills.title.text',
      type: 'text',
    }, {
      path: 'skills.title.align',
      type: 'align',
    }, {
      path: 'skills.itemStyle.background',
      type: 'color',
    }, {
      path: 'skills.itemStyle.size',
      type: 'size',
    },
  ],
};

