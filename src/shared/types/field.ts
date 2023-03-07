import { ResumeContentPath } from './resume';

export type Field = {
  path: ResumeContentPath
  label: string
  name: string
  type:
    | 'align'
    | 'text'
    | 'rich-text'
    | 'color'
    | 'size'
    | 'skill-items'
}

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

