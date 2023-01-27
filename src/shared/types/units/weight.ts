const weights = ['light', 'regular', 'bold'] as const;

export type Weight = typeof weights[number];

const DEFAULT: Weight = 'regular';

export const Weight = {
  values: weights,
  decode(data: unknown): Weight {
    if (typeof data !== 'string') {
      return DEFAULT;
    }

    switch (data) {
      case 'light': return 'light';
      case 'regular': return 'regular';
      case 'bold': return 'bold';
      default: return DEFAULT;
    }
  },
  encode(weight: Weight): string {
    return weight;
  },
};
