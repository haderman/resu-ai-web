import JestFuzz from 'jest-fuzz';

export const Fuzz = {
  ...JestFuzz,
  undefined() {
    return () => undefined;
  }
};

export type Fuzzer =
  | ReturnType<typeof Fuzz.string>
  | ReturnType<typeof Fuzz.bool>
  | ReturnType<typeof Fuzz.float>
  | ReturnType<typeof Fuzz.int>
  | ReturnType<typeof Fuzz.array>
  | ReturnType<typeof Fuzz.Fuzzer<object>>
  | ReturnType<typeof Fuzz.undefined>;

export type FuzzerSchema<T> = Record<keyof T, Fuzzer>;

