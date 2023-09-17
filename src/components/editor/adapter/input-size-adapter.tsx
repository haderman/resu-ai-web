import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { SizeButtonGroup } from '@/components/editor/form';
import { Field, Size } from '@/shared/types';
import { createObjectFromPath } from '@/shared/helpers';

const useUpdater = apiState.resume.useResumeContentUpdater;

export type InputSizeAdapterProps = Exclude<Field, 'type'>;

export function InputSizeAdapter(props: InputSizeAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, ''));
  const update = useUpdater();

  const handleChange = React.useCallback(
    (value: Size | null) => {
      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  if (!Size.isSize(value)) {
    console.error('Invalid value type in InputSizeAdapter');
    return null;
  }

  return (
    <InputSizeAdapterComponent
      path={props.path}
      name={props.name}
      label={props.label}
      value={value}
      onChange={handleChange}
    />
  );
}

type InputSizeAdapterComponentProps = {
  path: string;
  name: string;
  label: string;
  value: Size;
  onChange: (value: Size | null) => void;
}

const InputSizeAdapterComponent = React.memo(
  function InputSizeAdapterComponent(props: InputSizeAdapterComponentProps) {
    return (
      <SizeButtonGroup
        id={props.path}
        name={props.name}
        label={props.label}
        value={props.value}
        onChange={props.onChange}
      />
    );
  }
);
