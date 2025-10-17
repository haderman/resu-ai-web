import { SectionSchemaMap } from "@/shared/types";

export const projectsSectionSchemaMap: SectionSchemaMap['projects'] = {
  type: 'projects',
  fields: [
    {
      path: 'projects.title.text',
      type: 'text',
      label: 'Title',
      name: 'title',
    },
    {
      path: 'projects.title.color',
      type: 'color',
      label: 'Title Color',
      name: 'title-color',
    },
    {
      path: 'projects.title.align',
      type: 'align',
      label: 'Title Alignment',
      name: 'title-align',
    },
    {
      path: 'projects.title.size',
      type: 'size',
      label: 'Title Size',
      name: 'title-size',
    },
    {
      path: 'projects.cardStyle.background',
      type: 'color',
      label: 'Card Background',
      name: 'card-background',
    },
    {
      path: 'projects.itemStyle.background',
      type: 'color',
      label: 'Item Background',
      name: 'item-background',
    },
    {
      path: 'projects.itemStyle.color',
      type: 'color',
      label: 'Item Color',
      name: 'item-color',
    },
    {
      path: 'projects.itemStyle.size',
      type: 'size',
      label: 'Item Size',
      name: 'item-size',
    },
    {
      path: 'projects.items',
      type: 'project-entries',
      label: 'Projects',
      name: 'projects',
    },
  ],
};
