import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { InputText } from '@/components/editor/form';

const { selectors, useUpdateSkills } = apiState.skills;

export function InputChipsContainer() {
  const items = useSelector(selectors.selectItems);
  const updateSkills = useUpdateSkills();
  const rawItems = React.useMemo(
    () => items.map(item => item.title).join(', '),
    [items]
  );

  function handleChange(value: string) {
    updateSkills({
      items: value
        .split(',')
        .map(title => ({ title: title.trim(), yearsOfExperience: 1 }))
    });
  }

  return <InputTitleComponent value={rawItems} onChange={handleChange} />;
}

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
