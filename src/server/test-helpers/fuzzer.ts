import JestFuzz from 'jest-fuzz';
import { Alignment, Size } from '@/shared/types/units';
import { Color } from '@/shared/types/color';
import { ResumeLayout, ResumeThemeName } from '@/shared/types';

export const Fuzz = {
  ...JestFuzz,
  undefined() {
    return () => undefined;
  },
  size() {
    return oneOf(Size.values);
  },
  alignment() {
    return oneOf(Alignment.values);;
  },
  color() {
    return oneOf(Color.values);
  },
  theme() {
    return oneOf(ResumeThemeName.values);;
  },
  layout() {
    return oneOf(ResumeLayout.values);
  }
};

export type Fuzzer =
  | ReturnType<typeof Fuzz.string>
  | ReturnType<typeof Fuzz.bool>
  | ReturnType<typeof Fuzz.float>
  | ReturnType<typeof Fuzz.int>
  | ReturnType<typeof Fuzz.array>
  | ReturnType<typeof Fuzz.Fuzzer<object>>
  | ReturnType<typeof Fuzz.undefined>
  | ReturnType<typeof Fuzz.size>
  | ReturnType<typeof Fuzz.alignment>
  | ReturnType<typeof Fuzz.color>
  | ReturnType<typeof Fuzz.theme>
  | ReturnType<typeof Fuzz.layout>;

export type FuzzerSchema<T> = Record<keyof T, Fuzzer>;

/**
 * heleprs
 */
function oneOf<T>(values: readonly T[]): () => T {
  return () => values[Math.floor(Math.random() * values.length)];
}
