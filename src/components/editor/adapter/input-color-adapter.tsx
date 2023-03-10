import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { RadioColorGroup } from '@/components/editor/form';
import { Field, Color } from '@/shared/types';
import { createObjectFromPath } from '@/shared/helpers';

const useUpdater = apiState.resume.useResumeContentUpdater;

export type InputColorAdapterProps = Exclude<Field, 'type'>;

export function InputColorAdapter(props: InputColorAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, Color.getDefault()));
  const update = useUpdater();

  const handleChange = React.useCallback(
    (value: Color) => {
      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  if (!Color.isColor(value)) {
    console.error('Invalid value type in InputColorAdapter');
    return null;
  }

  return (
    <RadioColorGroup
      legend={props.label}
      name={props.name}
      selected={value}
      onChange={handleChange}
    />
  );
}
