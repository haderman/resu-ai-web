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

    if (!ResumeSection.values.includes(data as ResumeSection)) {
      throw new Error('Invalid resume section');
    }

    return data as ResumeSection;
  },
  encode(section: ResumeSection): string {
    return section;
  },
};
