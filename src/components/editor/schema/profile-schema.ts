import { SectionSchemaMap } from '@/shared/types';

export const profileSectionSchemaMap: SectionSchemaMap['profile'] = {
  type: 'profile',
  fields: [
    {
      path: 'profile.title.text',
      type: 'text',
    },
    {
      path: 'profile.description.text',
      type: 'rich-text',
    },
    {
      path: 'profile.title.align',
      type: 'align',
    },
    {
      path: 'profile.cardStyle.background',
      type: 'color',
    },
    {
      path: 'profile.title.size',
      type: 'size',
    },
  ],
};
