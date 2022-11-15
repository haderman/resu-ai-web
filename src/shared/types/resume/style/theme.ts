const themeNames = [
  'default',
  'dark-space',
] as const;

export type ResumeThemeName = typeof themeNames[number];

export const ResumeThemeName = {
  values: themeNames,
  decode(data: unknown): ResumeThemeName {
    if (typeof data !== 'string') {
      throw new Error('Invalid resume theme');
    }

    if (!themeNames.includes(data as ResumeThemeName)) {
      throw new Error('Invalid resume theme');
    }

    return data as ResumeThemeName;
  },
  encode(theme: ResumeThemeName): string {
    return theme;
  },
};
