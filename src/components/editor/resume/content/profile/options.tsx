import { SectionSchemaMap } from '@/shared/types';
import { Adapter } from '@/components/editor/adapter';

export function ProfileOptions() {
  return (
    <>
      {sectionSchemaMap.profile.fields.map((field) => {
        return <Adapter key={field.path} field={field} />;
      })}
    </>
  );
};

const sectionSchemaMap: SectionSchemaMap = {
  cover: {
    type: 'cover',
    fields: [],
  },
  profile: {
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
  },
  contact: {
    type: 'contact',
    fields: [],
  },
  photo: {
    type: 'photo',
    fields: [],
  },
  skills: {
    type: 'skills',
    fields: [],
  },
  experience: {
    type: 'experience',
    fields: [],
  },
  projects: {
    type: 'projects',
    fields: [],
  },
};
