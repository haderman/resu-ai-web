export type ResumeSections = ResumeSection[];

const DEFAULT_LIST: ResumeSections = [
  'photo',
  'profile',
  'contact',
  'skills',
  'experience',
  'projects',
];

export const ResumeSections = {
  DEFAULT_LIST,
  decode(data: unknown): ResumeSections {
    if (!Array.isArray(data)) {
      throw new Error('Invalid resume sections');
    }

    return data.map(ResumeSection.decode);
  },
  encode(sections: ResumeSections): unknown {
    return sections.map(ResumeSection.encode);
  },
};

const resumeSectionValues = [
  'cover',
  'profile',
  'contact',
  'photo',
  'skills',
  'experience',
  'projects',
] as const;

export type ResumeSection = typeof resumeSectionValues[number];

export const ResumeSection = {
  values: resumeSectionValues,
  decode(data: unknown): ResumeSection {
    if (typeof data !== 'string') {
      throw new Error('Invalid resume section');
    }

    if (!resumeSectionValues.includes(data as ResumeSection)) {
      throw new Error('Invalid resume section');
    }

    return data as ResumeSection;
  },
  encode(section: ResumeSection): string {
    return section;
  },
};
