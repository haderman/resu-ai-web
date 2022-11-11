const resumeThemesValues = [
  'default',
  'dark-space',
] as const;

export type ResumeTheme = typeof resumeThemesValues[number];

export const ResumeTheme = {
  values: resumeThemesValues,
  decode(data: unknown): ResumeTheme {
    if (typeof data !== 'string') {
      throw new Error('Invalid resume theme');
    }

    if (!ResumeTheme.values.includes(data as ResumeTheme)) {
      throw new Error('Invalid resume theme');
    }

    return data as ResumeTheme;
  },
  encode(theme: ResumeTheme): string {
    return theme;
  },
};
