import { SectionSchemaMap } from '@/shared/types';

export const contactSectionSchemaMap: SectionSchemaMap['contact'] = {
  type: 'contact',
  fields: [
    {
      type: 'text',
      path: 'basicInfo.fullName',
      label: 'Full Name',
      name: 'full-name',
    },
    {
      type: 'color',
      path: 'contact.cardStyle.background',
      label: 'Background Color',
      name: 'background-color',
    }
  ],
};
