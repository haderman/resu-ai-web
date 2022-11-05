const weights = ['default', 'light', 'regular', 'bold'] as const;

export type Weight = typeof weights[number];

export const Weight = {
  values: weights,
  decode(data: unknown): Weight {
    if (typeof data !== 'string') {
      return 'default';
    }

    switch (data) {
      case 'light': return 'light';
      case 'regular': return 'regular';
      case 'bold': return 'bold';
      default: return 'default';
    }
  },
  encode(weight: Weight): string {
    return weight;
  },
};
