import 'styled-components';

import { Weight, Color, Size, FontSizeUnit, SpacingUnit } from '../types';

// source: https://styled-components.com/docs/api#create-a-declarations-file
declare module 'styled-components' {
  export interface DefaultTheme {
    gap: Record<'default' | Size, SpacingUnit>;
    padding: Record<'default' | Size, SpacingUnit>;
    bg: Record<'default' | Color, string>
    fg: Record<'default' | Color, string>
    borderRadius: Record<'default' | Size, SpacingUnit>
    fontSize: Record<'default' | Size, FontSizeUnit | 'inherit'>
    colors: {
      gray: string
    }
    fontWeight: Record<Weight, number>
    lineHeight: {
      normal: number
    }
  }
}
