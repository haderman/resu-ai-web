const resumeLayoutValues = [
  'layout-a',
  'layout-b',
] as const;

export type ResumeLayout = typeof resumeLayoutValues[number];

export const ResumeLayout = {
  values: resumeLayoutValues,
  decode(data: unknown): ResumeLayout {
    if (typeof data !== 'string') {
      throw new Error('Invalid resume layout');
    }

    if (!ResumeLayout.values.includes(data as ResumeLayout)) {
      throw new Error('Invalid resume layout');
    }

    return data as ResumeLayout;
  },
  encode(layout: ResumeLayout): string {
    return layout;
  }
};
