/**
 * source: https://stackoverflow.com/a/61132308/14250613
 */
export type DeepPartial<T> = T extends Record<string, unknown> ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;
