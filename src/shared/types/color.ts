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
export type Color = typeof colors[number];

export const Color = {
  values: colors,
  /**
   *
   * @param data
   * @param fallback optional if data can't be seriaized, return this value
   * @returns
   */
  decode(data: unknown, fallback?: Color): Color {
    if (typeof data !== 'string') {
      return fallback ?? Color.getDefault();
    }

    if (colors.includes(data as Color)) {
      return data as Color;
    }

    return fallback ?? Color.getDefault();
  },
  encode(color: Color): string {
    if (typeof color !== 'string') {
      return Color.getDefault();
    }

    return color;
  },
  getDefault(): Color {
    return colors[0];
  }
};
