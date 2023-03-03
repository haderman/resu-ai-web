import { SectionSchemaMap } from '@/shared/types';
import { Adapter } from '@/components/editor/adapter';

export function SkillsOptions() {
  return (
    <>
      {sectionSchemaMap.skills.fields.map((field) => {
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
    fields: [],
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


