import * as React from 'react';

/**
 * function created with chatGTP
 */
export function useDebouncedFunction<T extends any[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void {
  const timerIdRef = React.useRef<NodeJS.Timeout>(undefined);

  return React.useCallback(
    (...args: T) => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
      timerIdRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay, timerIdRef]
  );
}
