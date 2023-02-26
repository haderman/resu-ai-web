import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { InputText } from '@/components/editor/form';

const { selectors, useProfileUpdater } = apiState.profile;

export function InputTitleContainer() {
  const title = useSelector(selectors.selectProfileTitle);
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: string) => {
      update({
        title: {
          text: value
        },
      });
    },
    [update]
  );

  return <MemoizedInputTitleComponent value={title.text} onChange={handleChange} />;
}

const MemoizedInputTitleComponent = React.memo(InputTitleComponent);

type InputTitleComponentProps = {
  value: string
  onChange: (value: string) => void
}

export function InputTitleComponent(props: InputTitleComponentProps) {
  const [value, setValue] = React.useState(() => props.value);
  const debouncedOnChange = useDebouncedFunction(props.onChange, 500);

  function handleChange(newValue: string) {
    setValue(newValue);
    debouncedOnChange(newValue);
  }

  return (
    <InputText
      label="Title"
      value={value}
      onChange={handleChange}
    />
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
