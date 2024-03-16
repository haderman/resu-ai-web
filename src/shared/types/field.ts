import { ResumeContentPath } from './resume';

const FieldTypes = [
  'align',
  'text',
  'rich-text',
  'color',
  'size',
  'skill-items',
  'experience-entries',
] as const;

export type FieldType = typeof FieldTypes[number];

export type Field = {
  path: ResumeContentPath
  label: string
  name: string
  type: FieldType
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

export const Field = {
  toPromptString() {
    return `
      type Field = {
        path: ResumeContentPath;
        label: string;
        name: string;
        type: FieldType;
      };

      type FieldType = ${FieldTypes.map((t) => `'${t}'`).join(' | ')};

      type ResumeContentPath = Path<Resume['content']>;
    `;
  },
  toToolCallString() {
    return {
      type: 'object',
      properties: {
        'path': {
          type: 'string',
          description: 'Path to the field to update.',
        },
        'label': {
          type: 'string',
          description: 'Label of the field.',
        },
        'name': {
          type: 'string',
          description: 'Name of the field.',
        },
        'type': {
          type: 'string',
          description: 'Type of the field.',
          enum: FieldTypes,
        },
      },
    };
  },
};
