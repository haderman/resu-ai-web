import { Color, Alignment, Weight, Size } from '@/shared/types';

const themeNames = [
  'default',
  'dark-space',
] as const;

export type ResumeTheme = typeof themeNames[number];

export const ResumeTheme = {
  values: themeNames,
  decode(data: unknown): ResumeTheme {
    if (typeof data !== 'string') {
      throw new Error('Invalid resume theme');
    }

    if (!themeNames.includes(data as ResumeTheme)) {
      throw new Error('Invalid resume theme');
    }

    return data as ResumeTheme;
  },
  encode(theme: ResumeTheme): string {
    return theme;
  },

  /**
   * Getters
   *
   * I don't want to expose the object structure because I might change it
   * lager so I think this way avoid to refactor a lot
   */
  getGap(variant: GapVariant = 'none'): CssVar {
    return toCssVar(resumeThemeValues.gap[variant]);
  },
  getGapClassName(variant: GapVariant = 'none'): ClassName {
    return toClassName(resumeThemeValues.gap[variant]);
  },
  getPadding(variant: PaddingVariant): CssVar {
    return toCssVar(resumeThemeValues.padding[variant]);
  },
  getPaddingClassName(variant: PaddingVariant = 'none'): ClassName {
    return toClassName(resumeThemeValues.padding[variant]);
  },
  getFontSize(variant: FontSizeVariant = 'none'): CssVar {
    return toCssVar(resumeThemeValues.fontSize[variant]);
  },
  getFontSizeClassName(variant: FontSizeVariant = 'none'): ClassName {
    return toClassName(resumeThemeValues.fontSize[variant]);
  },
  getFontWeight(variant: FontWeightVariant = 'regular'): CssVar {
    return toCssVar(resumeThemeValues.fontWeight[variant]);
  },
  getFontWeightClassName(variant: FontWeightVariant = 'regular'): ClassName {
    return toClassName(resumeThemeValues.fontWeight[variant]);
  },
  getBorderRadius(variant: BorderRadiusVariant = 'none'): CssVar {
    return toCssVar(resumeThemeValues.borderRadius[variant]);
  },
  getBorderRadiusClassName(variant: BorderRadiusVariant = 'none'): ClassName {
    return toClassName(resumeThemeValues.borderRadius[variant]);
  },
  getColor(color: Color, variant: keyof ColorVariant): CssVar {
    return toCssVar(resumeThemeValues.colors[color][variant]);
  },
  getLineHeight(variant: LineHeightVariant = 'normal'): CssVar {
    return toCssVar(resumeThemeValues.lineHeight[variant]);
  },
  getLineHeightClassName(variant: LineHeightVariant = 'normal'): ClassName {
    return toClassName(resumeThemeValues.lineHeight[variant]);
  }
};

type GapVariant = keyof ResumeThemeValues['gap'];
type PaddingVariant = keyof ResumeThemeValues['padding'];
type FontSizeVariant = keyof ResumeThemeValues['fontSize'];
type FontWeightVariant = keyof ResumeThemeValues['fontWeight'];
type BorderRadiusVariant = keyof ResumeThemeValues['borderRadius'];
type LineHeightVariant = keyof ResumeThemeValues['lineHeight'];
type ColorVariant = {
  foreground: CssVarDeclaration
  background: CssVarDeclaration
  faded: CssVarDeclaration

  // text color with high contrast to background
  text: CssVarDeclaration
};

type ResumeThemeValues = {
  gap: Record<Size, CssVarDeclaration>
  padding: Record<Size | 'none', CssVarDeclaration>;
  borderRadius: Record<Size, CssVarDeclaration>
  fontSize: Record<Size | 'none', CssVarDeclaration>
  fontWeight: Record<Weight, CssVarDeclaration>
  lineHeight: {
    normal: CssVarDeclaration
  }
  colors: {
    [key in Color]: ColorVariant
  }
}

type CssVar = `var(--resume-${string})`;
type CssVarDeclaration = `--resume-${string}`;
type ClassName = `resume-${string}`;

const resumeThemeValues: ResumeThemeValues = {
  gap: {
    none: '--resume-gap-none',
    small: '--resume-gap-small',
    medium: '--resume-gap-medium',
    large: '--resume-gap-large',
  },
  padding: {
    none: '--resume-padding-none',
    small: '--resume-padding-small',
    medium: '--resume-padding-medium',
    large: '--resume-padding-large',
  },
  fontSize: {
    none: '--resume-font-size-none',
    small: '--resume-font-size-small',
    medium: '--resume-font-size-medium',
    large: '--resume-font-size-large',
  },
  fontWeight: {
    light: '--resume-font-weight-light',
    regular: '--resume-font-weight-regular',
    bold: '--resume-font-weight-bold',
  },
  lineHeight: {
    normal: '--resume-line-height-normal',
  },
  borderRadius: {
    none: '--resume-border-radius-none',
    small: '--resume-border-radius-small',
    medium: '--resume-border-radius-medium',
    large: '--resume-border-radius-large',
  },
  colors: {
    primary: {
      foreground: '--resume-primary-foreground-color',
      background: '--resume-primary-background-color',
      faded: '--resume-primary-faded-color',
      text: '--resume-primary-text-color',
    },
    secondary: {
      foreground: '--resume-secondary-foreground-color',
      background: '--resume-secondary-background-color',
      faded: '--resume-secondary-faded-color',
      text: '--resume-secondary-text-color',
    },
    'almost-black': {
      foreground: '--resume-almost-black-foreground-color',
      background: '--resume-almost-black-background-color',
      faded: '--resume-almost-black-faded-color',
      text: '--resume-almost-black-text-color',
    },
    black: {
      foreground: '--resume-black-foreground-color',
      background: '--resume-black-background-color',
      faded: '--resume-black-faded-color',
      text: '--resume-black-text-color',
    },
    'almost-white': {
      foreground: '--resume-almost-white-foreground-color',
      background: '--resume-almost-white-background-color',
      faded: '--resume-almost-white-faded-color',
      text: '--resume-almost-white-text-color',
    },
    white: {
      foreground: '--resume-white-foreground-color',
      background: '--resume-white-background-color',
      faded: '--resume-white-faded-color',
      text: '--resume-white-text-color',
    },
    gray: {
      foreground: '--resume-gray-foreground-color',
      background: '--resume-gray-background-color',
      faded: '--resume-gray-faded-color',
      text: '--resume-gray-text-color',
    },
    'gray-light': {
      foreground: '--resume-gray-light-foreground-color',
      background: '--resume-gray-light-background-color',
      faded: '--resume-gray-light-faded-color',
      text: '--resume-gray-light-text-color',
    },
    blue: {
      foreground: '--resume-blue-foreground-color',
      background: '--resume-blue-background-color',
      faded: '--resume-blue-faded-color',
      text: '--resume-blue-text-color',
    },
    red: {
      foreground: '--resume-red-foreground-color',
      background: '--resume-red-background-color',
      faded: '--resume-red-faded-color',
      text: '--resume-red-text-color',
    },
    green: {
      foreground: '--resume-green-foreground-color',
      background: '--resume-green-background-color',
      faded: '--resume-green-faded-color',
      text: '--resume-green-text-color',
    },
    yellow: {
      foreground: '--resume-yellow-foreground-color',
      background: '--resume-yellow-background-color',
      faded: '--resume-yellow-faded-color',
      text: '--resume-yellow-text-color',
    },
    orange: {
      foreground: '--resume-orange-foreground-color',
      background: '--resume-orange-background-color',
      faded: '--resume-orange-faded-color',
      text: '--resume-orange-text-color',
    },
    purple: {
      foreground: '--resume-purple-foreground-color',
      background: '--resume-purple-background-color',
      faded: '--resume-purple-faded-color',
      text: '--resume-purple-text-color',
    },
    pink: {
      foreground: '--resume-pink-foreground-color',
      background: '--resume-pink-background-color',
      faded: '--resume-pink-faded-color',
      text: '--resume-pink-text-color',
    },
  },
} as const;

/**
 * HELPERS
 */
 function toClassName(value: CssVarDeclaration): ClassName {
  return value.replace('--', '') as ClassName;
}

function toCssVar(value: CssVarDeclaration): CssVar {
  return `var(${value})`;
}
