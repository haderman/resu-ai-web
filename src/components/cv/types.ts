export type Size =
  | 'default'
  | 'small'
  | 'medium'
  | 'large';

export type Weight =
  | 'default'
  | 'light'
  | 'regular'
  | 'bold';

export type SpacingUnit = `${number}mm`;

export type FontSizeUnit = `${number}pt`;

export type ColorVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'accent-contrast'
  | 'complementary';

// define the array first, note the const
const ColorValues = [
  'black',
  'white',
  'gray',
  'blue',
  'red',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink'
] as const;

// this magic incantation will create a union from that array
export type Color = (typeof ColorValues)[number];

export const Color = {
  values(){
    return ColorValues;
  },
  gerDefault(): Color {
    return ColorValues[0];
  }
};

export type ColorConfig = {
  foreground: string
  background: string
  faded: string

  // text color with high contrast to background
  text: string
}

