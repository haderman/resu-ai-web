const alignments = [
  'left',
  'center',
  'right',
] as const;

export type Alignment = typeof alignments[number];

export const Alignment = {
  values: alignments,
  decode(data: unknown): Alignment {
    if (typeof data !== 'string') {
      return 'left';
    }

    switch (data) {
      case 'left': return 'left';
      case 'center': return 'center';
      case 'right': return 'right';
      default: return 'left';
    }
  },
  encode(alignment: Alignment): string {
    return alignment;
  },
};
