type ResumePropertyName = `--resume-${string}`;

export type ResumeTheme = {
  [key: string]: ResumePropertyName | ResumeTheme
};

export const ResumeTheme: ResumeTheme = {
  gap: {
    default: '--resume-gap-default',
    small: '--resume-gap-small',
    medium: '--resume-gap-medium',
    large: '--resume-gap-large',
  },
  padding: {
    default: '--resume-padding-default',
    small: '--resume-padding-small',
    medium: '--resume-padding-medium',
    large: '--resume-padding-large',
  },
  fontSize: {
    default: '--resume-font-size-default',
    small: '--resume-font-size-small',
    medium: '--resume-font-size-medium',
    large: '--resume-font-size-large',
  },
  fontWeight: {
    default: '--resume-font-weight-default',
    light: '--resume-font-weight-light',
    regular: '--resume-font-weight-regular',
    bold: '--resume-font-weight-bold',
  },
  lineHeight: {
    normal: '--resume-line-height-normal',
  },
  borderRadius: {
    default: '--resume-border-radius-default',
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
