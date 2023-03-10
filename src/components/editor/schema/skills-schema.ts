import { SectionSchemaMap } from '@/shared/types';

export const skillsSectionSchemaMap: SectionSchemaMap['skills'] = {
  type: 'skills',
  fields: [
    {
      path: 'skills.title.text',
      type: 'text',
      label: 'Title',
      name: 'title',
    },
    {
      path: 'skills.title.color',
      type: 'color',
      label: 'Title Color',
      name: 'title-color',
    },
    {
      path: 'skills.title.align',
      type: 'align',
      label: 'Title Alignment',
      name: 'title-align',
    },
    {
      path: 'skills.cardStyle.background',
      type: 'color',
      label: 'Card Background',
      name: 'card-background',
    },
    {
      path: 'skills.itemStyle.size',
      type: 'size',
      label: 'Item Size',
      name: 'item-size',
    },
    {
      path: 'skills.itemStyle.color',
      type: 'color',
      label: 'Item Color',
      name: 'item-color',
    },
    {
      path: 'skills.items',
      type: 'skill-items',
      label: 'Items',
      name: 'items',
    },
  ],
};

