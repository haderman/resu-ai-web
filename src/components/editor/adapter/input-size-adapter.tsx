import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { SizeButtonGroup } from '@/components/editor/form';
import { Field, Size } from '@/shared/types';
import { createObjectFromPath } from '@/shared/helpers';

const { useProfileUpdater } = apiState.profile;

export type InputSizeAdapterProps = {
  path: Field['path']
}

export function InputSizeAdapter(props: InputSizeAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, ''));
  const update = useProfileUpdater();

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
    <SizeButtonGroup
      value={value}
      onChange={handleChange}
    />
  );
}
