import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { InputText, InputTextProps } from '@/components/editor/form';
import { Field } from '@/shared/types';
import { createObjectFromPath, useDebouncedFunction } from '@/shared/helpers';

const { useResumeContentUpdater, selectors } = apiState.resume;

export type InputTextAdapterProps = Exclude<Field, 'type'>;

export function InputTextAdapter(props: InputTextAdapterProps) {
  const value = useSelector(selectors.selectResumeProperty(props.path, ''));
  const update = useResumeContentUpdater();

  const handleChange = React.useCallback(
    (value: string) => {
      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  if (typeof value !== 'string') {
    console.error('Invalid value type in InputTextAdapter');
    return null;
  }

  return (
    <DebouncedInputText
      id={props.path}
      label={props.label}
      value={value}
      onChange={handleChange}
    />
  );
}

function DebouncedInputText(props: InputTextProps) {
  const [value, setValue] = React.useState(() => props.value);
  const debouncedOnChange = useDebouncedFunction(props.onChange, 500);

  function handleChange(newValue: string) {
    setValue(newValue);
    debouncedOnChange(newValue);
  }

  return <InputText {...props} value={value} onChange={handleChange} />;
}
