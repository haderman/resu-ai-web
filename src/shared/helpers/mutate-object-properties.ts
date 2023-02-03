import { DeepPartial } from '../types';

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
