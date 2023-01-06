const resumeLayoutTypeValues = [
  'layout-a',
  'layout-b',
] as const;

export type ResumeLayoutType = typeof resumeLayoutTypeValues[number];

export const ResumeLayoutType = {
  values: resumeLayoutTypeValues,
  decode(data: unknown): ResumeLayoutType {
    if (typeof data !== 'string') {
      throw new Error('Invalid resume layout');
    }

    if (!ResumeLayoutType.values.includes(data as ResumeLayoutType)) {
      throw new Error('Invalid resume layout');
    }

    return data as ResumeLayoutType;
  },
  encode(layout: ResumeLayoutType): string {
    return layout;
  }
};
