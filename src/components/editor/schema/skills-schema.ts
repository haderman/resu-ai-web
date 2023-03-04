import { SectionSchemaMap } from '@/shared/types';

export const skillsSectionSchemaMap: SectionSchemaMap['skills'] = {
  type: 'skills',
  fields: [
    {
      path: 'skills.title.text',
      type: 'text',
      label: 'Title',
      name: 'title',
    }, {
      path: 'skills.title.align',
      type: 'align',
      label: 'Title Alignment',
      name: 'title-align',
    }, {
      path: 'skills.itemStyle.background',
      type: 'color',
      label: 'Item Background',
      name: 'item-background',
    }, {
      path: 'skills.itemStyle.size',
      type: 'size',
      label: 'Item Size',
      name: 'item-size',
    },
  ],
};

