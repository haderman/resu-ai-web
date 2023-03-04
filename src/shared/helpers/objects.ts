import { DeepPartial, Resume } from '../types';

/**
 * This function allows you to mutate the properties of an object
 * to a new value, while only updating the specific properties that have changed.
 * The function will only traverse up to a maximum depth of 3 levels of nesting.
 *
 * PD: this function was created by chatGTP
 *
 * @param mutableObj The original object that you want to mutate
 * @param partialObj A partial object that holds the updated properties
 * @param level The current level of nesting, used for limiting the depth of the function
 */
export function mutateObjectProperties<T extends object>(mutableObj: T, partialObj: DeepPartial <T> , level = 0): void {
  if (level > 3) {
    return;
  }

  Object.entries(partialObj).forEach(([key, value]) => {
    if (value !== undefined) {
      if (typeof value === 'object') {
        mutateObjectProperties(mutableObj[key as keyof T] as object, value, level + 1);
      } else {
        mutableObj[key as keyof T] = value;
      }
    }
  });
}

// created with chatGPT
export type Path<T> = T extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? `${Key}.${Rest}`
      : never
    : never
  : T extends keyof any
    ? T
    : never;


// created with chatGPT
export function createObjectFromPath<T>(path: string, value: T): any {
  const keys = path.split('.');
  const result: any = {};
  let current = result;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = {};
      current = current[key];
    }
  }
  return result;
}



// created with chatGPT
export function pick<T, K extends Path<keyof T>>(obj: T, path: K): K extends `${infer Key1}.${infer Key2}.${infer Key3}`
  ? Key1 extends keyof T
    ? Key2 extends keyof T[Key1]
      ? Key3 extends keyof T[Key1][Key2]
        ? T[Key1][Key2][Key3]
        : never
      : never
    : never
  : K extends `${infer Key1}.${infer Key2}`
    ? Key1 extends keyof T
      ? Key2 extends keyof T[Key1]
        ? T[Key1][Key2]
        : never
      : never
    : K extends keyof T
      ? T[K]
      : never {
  const parts = (path as string).split('.') as Array<keyof T & string>; // type assertion to tell TypeScript that keys are strings
  if (parts.length > 3) {
    throw new Error('Path too deep');
  }
  let result = obj;
  for (const part of parts) {
    if (result == null) {
      break;
    }
    result = result[part] as T;
  }
  return result as any;
}

