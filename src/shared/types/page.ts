export type PageDimensions = {
  offsetHeight: number
  paddingTop: number
  paddingBottom: number
  marginBottom: number
};

export type PageKind = 'A4' | 'Letter' | 'Custom';

export const PageDimensions = {
  calcLimit(pDim: PageDimensions): number {
    return pDim.offsetHeight - pDim.paddingTop - pDim.paddingBottom;
  },
};
