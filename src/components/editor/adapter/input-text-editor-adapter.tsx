import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { TextEditor } from '@/components/editor/form';
import { Field } from '@/shared/types';
import { createObjectFromPath } from '@/shared/helpers';

const { useProfileUpdater } = apiState.profile;

export type InputTextEditorAdapterProps = {
  path: Field['path']
}

export function InputTextEditorAdapter(props: InputTextEditorAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path));
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: string) => {
      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  if (typeof value !== 'string') {
    console.error('Invalid value type in InputTextEditorAdapter');
    return null;
  }

  return (
    <TextEditor
      label="Description"
      markdown={value}
      onChange={handleChange}
    />
  );
}
