import * as fc from 'fast-check';
import { Alignment, Size } from '@/shared/types/units';
import { Color } from '@/shared/types/color';
import { LocationType, ResumeLayout } from '@/shared/types';
import { ResumeTheme } from '@/themes';
import { ResumeSections } from '@/shared/types/resume/sections';

// Fast-check arbitraries to replace jest-fuzz
export const Fuzz = {
  string: () => fc.string(),
  bool: () => fc.boolean(),
  float: () => fc.float(),
  int: () => fc.integer(),
  array: <T>(arb: fc.Arbitrary<T>) => fc.array(arb),
  undefined: () => fc.constant(undefined),
  size: () => fc.constantFrom(...Size.values),
  alignment: () => fc.constantFrom(...Alignment.values),
  color: () => fc.constantFrom(...Color.values),
  theme: () => fc.constantFrom(...ResumeTheme.values),
  layout: () => fc.constant(ResumeLayout.DEFAULT_LAYOUT),
  sections: () => fc.constant(ResumeSections.DEFAULT_LIST),
  locationType: () => fc.constantFrom(...LocationType.values),
};

// Updated types for fast-check arbitraries
export type Fuzzer = fc.Arbitrary<any>;

export type FuzzerSchema<T> = Record<keyof T, Fuzzer>;
