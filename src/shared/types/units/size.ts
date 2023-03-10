const sizes = [
  'none',
  'small',
  'medium',
  'large',
] as const;

export type Size = typeof sizes[number];

const DEFAULT: Size = 'none';

export const Size = {
  DEFAULT,
  values: sizes,
  decode(data: unknown): Size {
    if (typeof data !== 'string') {
      return DEFAULT;
    }

    switch (data) {
      case 'small': return 'small';
      case 'medium': return 'medium';
      case 'large': return 'large';
      default: return DEFAULT;
    }
  },
  encode(size: Size): string {
    return size;
  },
  isSize(value: unknown): value is Size {
    return typeof value === 'string' && sizes.includes(value as Size);
  }
};
