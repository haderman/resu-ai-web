import { ResumeFieldPath } from './resume';

export type Field = {
  path: ResumeFieldPath
  label: string
  name: string
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

