export type ColorVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'accent-contrast'
  | 'complementary';

// define the array first, note the const
const colors = [
  'primary',
  'secondary',
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
export type Color = (typeof colors)[number];

export const Color = {
  values: colors,
  decode(data: unknown): Color {
    if (typeof data !== 'string') {
      return 'primary';
    }

    if (colors.includes(data as Color)) {
      return data as Color;
    }

    return 'primary';
  },
  encode(color: Color): string {
    return color;
  },
  gerDefault(): Color {
    return colors[0];
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
