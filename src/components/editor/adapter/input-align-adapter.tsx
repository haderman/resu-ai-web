import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { AlignButtonGroup } from '@/components/editor/form';
import { Field, Alignment } from '@/shared/types';
import { createObjectFromPath } from '@/shared/helpers';

const useUpdater = apiState.resume.useResumeContentUpdater;

export type InputAlignAdapterProps = Exclude<Field, 'type'>;

export function InputAlignAdapter(props: InputAlignAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, 'center'));
  const update = useUpdater();

  const handleChange = React.useCallback(
    (value: Alignment | null) => {
      if (value === null) return;

      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  if (!Alignment.isAlignment(value)) {
    console.error('Invalid value type in InputAlignAdapter');
    return null;
  }

  return (
    <AlignButtonGroup
      id={props.path}
      name={props.name}
      label={props.label}
      value={value}
      onChange={handleChange}
    />
  );
}
