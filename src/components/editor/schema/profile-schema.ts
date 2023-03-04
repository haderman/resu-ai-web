import { SectionSchemaMap } from '@/shared/types';

export const profileSectionSchemaMap: SectionSchemaMap['profile'] = {
  type: 'profile',
  fields: [
    {
      path: 'profile.title.text',
      type: 'text',
      label: 'Title',
      name: 'title',
    },
    {
      path: 'profile.description.text',
      type: 'rich-text',
      label: 'Description',
      name: 'description',
    },
    {
      path: 'profile.title.align',
      type: 'align',
      label: 'Title Alignment',
      name: 'title-align',
    },
    {
      path: 'profile.cardStyle.background',
      type: 'color',
      label: 'Card Background',
      name: 'card-background',
    },
    {
      path: 'profile.title.size',
      type: 'size',
      label: 'Title Size',
      name: 'title-size',
    },
  ],
};
