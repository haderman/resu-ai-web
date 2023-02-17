import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { TextEditor } from '@/components/editor/form';

const { selectors, useProfileUpdater } = apiState.profile;

export function InputDescriptionContainer() {
  const description = useSelector(selectors.selectProfileDescription);
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: string) => {
      update({
        description: {
          text: value
        },
      });
    },
    [update]
  );

  return <MemoizedInputDescriptionComponent value={description.text} onChange={handleChange} />;
}

const MemoizedInputDescriptionComponent = React.memo(InputDescriptionComponent);

type InputDescriptionComponentProps = {
  value: string
  onChange: (value: string) => void
};

export function InputDescriptionComponent(props: InputDescriptionComponentProps) {
  const [value, setValue] = React.useState(() => props.value);
  const debouncedOnChange = useDebouncedFunction(props.onChange, 500);

  function handleChange(newValue: string) {
    setValue(newValue);
    debouncedOnChange(newValue);
  }

  return (
    <TextEditor label="Title" markdown={value} onChange={handleChange} />
  );
}

/**
 * function created with chatGTP
 */
function useDebouncedFunction<T extends any[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void {
  const timerIdRef = React.useRef<NodeJS.Timeout>();

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
