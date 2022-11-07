import JestFuzz from 'jest-fuzz';
import { Alignment, Size } from '@/shared/types/units';
import { Color } from '@/shared/types/color';

export const Fuzz = {
  ...JestFuzz,
  undefined() {
    return () => undefined;
  },
  size() {
    return () => {
      return Size.values[Math.floor(Math.random() * Size.values.length)];
    };
  },
  alignment() {
    return () => {
      return Alignment.values[Math.floor(Math.random() * Alignment.values.length)];
    };
  },
  color() {
    return () => {
      return Color.values[Math.floor(Math.random() * Color.values.length)];
    };
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
  | ReturnType<typeof Fuzz.color>;

export type FuzzerSchema<T> = Record<keyof T, Fuzzer>;

