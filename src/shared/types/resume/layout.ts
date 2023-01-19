const DEFAULT_LAYOUT: ResumeLayout = [
  [0, 1, 1],
  [2, 3, 3],
  [4],
  [5],
];

export type ResumeLayout = ResumeLayoutItem[];

export type ResumeLayoutItem =
  | [number]
  | [number, number]
  | [number, number, number];

export const ResumeLayout = {
  DEFAULT_LAYOUT,
  decode(data: unknown): ResumeLayout {
    if (!Array.isArray(data)) {
      throw new Error('Invalid resume layout');
    }

    const layout: ResumeLayout = [];
    for (const row of data) {
      layout.push(ResumeLayoutItem.decode(row));
    }

    return layout;
  },
  encode(layout: ResumeLayout): unknown {
    const data: unknown[] = [];
    for (const row of layout) {
      data.push(ResumeLayoutItem.encode(row));
    }

    return data;
  },
};

export const ResumeLayoutItem = {
  decode(data: unknown): ResumeLayoutItem {
    if (!Array.isArray(data)) {
      throw new Error('Invalid resume layout item');
    }

    if (data.length < 1 || data.length > 3) {
      throw new Error('Invalid resume layout item');
    }

    for (const item of data) {
      if (typeof item !== 'number') {
        throw new Error('Invalid resume layout item');
      }
    }

    return data as ResumeLayoutItem;
  },
  encode(item: ResumeLayoutItem): unknown {
    return item;
  },
};
