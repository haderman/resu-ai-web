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
  'primary',
  'black',
  'almost-black',
  'white',
  'almost-white',
  'gray',
  'gray-light',
  'blue',
  'red',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink',
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

export type Palette = Record<Color, ColorConfig>;
