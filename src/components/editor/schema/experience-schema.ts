import { SectionSchemaMap } from '@/shared/types';

export const experienceSectionSchemaMap: SectionSchemaMap['experience'] = {
  type: 'experience',
  fields: [
    {
      type: 'text',
      path: 'experience.title.text',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'color',
      path: 'experience.title.color',
      label: 'Title Color',
      name: 'titleColor',
    },
    {
      type: 'size',
      path: 'experience.title.size',
      label: 'Title Size',
      name: 'titleSize',
    },
    {
      type: 'experience-entries',
      path: 'experience.entries',
      label: 'Experience',
      name: 'experience',
    },
    {
      type: 'color',
      path: 'experience.style.background',
      label: 'Background Color',
      name: 'background-color',
    },
    {
      type: 'color',
      path: 'experience.entryStyle.background',
      label: 'Entry Background Color',
      name: 'entry-background-color',
    },
  ],
};
