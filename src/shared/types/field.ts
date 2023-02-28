import { ResumeFieldPath, ResumeContent } from './resume';

export type Field = {
  path: ResumeFieldPath
  type:
    | 'align'
    | 'text'
    | 'rich-text'
    | 'color'
    | 'size'
}

type Section =
  | { type: 'contact', fields: Field[] }
  | { type: 'experience', fields: Field[] }
  | { type: 'profile', fields: Field[] }
  | { type: 'skills', fields: Field[] }
  | { type: 'basic-info', fields: Field[] }
  | { type: 'photo', fields: Field[] };


const sectionTypeValues = [
  'cover',
  'profile',
  'contact',
  'photo',
  'skills',
  'experience',
  'projects',
] as const;

export type SectionType = typeof sectionTypeValues[number];

type SectionSchema = {
  type: SectionType
  fields: Field[]
}

export type SectionSchemaMap = {
  [key in SectionType]: SectionSchema
}

export const sectionSchemaMap: SectionSchemaMap = {
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
      }, {
        path: 'profile.description.text',
        type: 'rich-text',
      }, {
        path: 'profile.title.align',
        type: 'align',
      }, {
        path: 'profile.title.color',
        type: 'color',
      }
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
    fields: [
      {
        path: 'skills.title.text',
        type: 'text',
      }, {
        path: 'skills.title.align',
        type: 'align',
      }, {
        path: 'skills.title.color',
        type: 'color',
      }, {
        path: 'skills.title.size',
        type: 'size',
      }
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
