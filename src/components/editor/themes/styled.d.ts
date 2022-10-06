import 'styled-components';

import {
  Weight,
  Palette,
  Size,
  FontSizeUnit,
  SpacingUnit
} from '../types';

// source: https://styled-components.com/docs/api#create-a-declarations-file
declare module 'styled-components' {
  export interface DefaultTheme {
    name: string
    gap: Record<Size, SpacingUnit>
    padding: Record<Size, SpacingUnit>;
    borderRadius: Record<Size, SpacingUnit>
    fontSize: Record<Size, FontSizeUnit | 'inherit'>
    colors: Palette
    fontWeight: Record<Weight, number>
    lineHeight: {
      normal: number
    }
  }
}
