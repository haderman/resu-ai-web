const sizes = ['default', 'small', 'medium', 'large'] as const;

export type Size = typeof sizes[number];

export const Size = {
  values: sizes,
  decode(data: unknown): Size {
    if (typeof data !== 'string') {
      return 'default';
    }

    switch (data) {
      case 'small': return 'small';
      case 'medium': return 'medium';
      case 'large': return 'large';
      default: return 'default';
    }
  },
  encode(size: Size): string {
    return size;
  },
};
