import JestFuzz from 'jest-fuzz';
import { Alignment, Size } from '@/shared/types/units';
import { Color } from '@/shared/types/color';
import { ResumeLayout } from '@/shared/types';
import { ResumeTheme } from '@/themes';
import { ResumeSections } from '@/shared/types/resume/sections';

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
    return oneOf(ResumeTheme.values);;
  },
  layout() {
    return () => ResumeLayout.DEFAULT_LAYOUT;
  },
  sections() {
    return () => ResumeSections.DEFAULT_LIST;
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
  | ReturnType<typeof Fuzz.layout>
  | ReturnType<typeof Fuzz.sections>;

export type FuzzerSchema<T> = Record<keyof T, Fuzzer>;

/**
 * heleprs
 */
function oneOf<T>(values: readonly T[]): () => T {
  return () => values[Math.floor(Math.random() * values.length)];
}
