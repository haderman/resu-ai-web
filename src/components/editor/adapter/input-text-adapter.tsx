import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { InputText } from '@/components/editor/form';
import { Field } from '@/shared/types';
import { createObjectFromPath } from '@/shared/helpers';

const useUpdater = apiState.resume.useResumeContentUpdater;

export type InputTextAdapterProps = Exclude<Field, 'type'>;

export function InputTextAdapter(props: InputTextAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, ''));
  const update = useUpdater();

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
    <InputText
      id={props.path}
      label={props.label}
      value={value}
      onChange={handleChange}
    />
  );
}
