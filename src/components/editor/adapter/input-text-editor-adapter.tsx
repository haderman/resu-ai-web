import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { TextEditor, TextEditorProps } from '@/components/editor/form';
import { Field } from '@/shared/types';
import { createObjectFromPath, useDebouncedFunction } from '@/shared/helpers';

const useUpdater = apiState.resume.useResumeContentUpdater;

export type InputTextEditorAdapterProps = Exclude<Field, 'type'>;

export function InputTextEditorAdapter(props: InputTextEditorAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path));
  const update = useUpdater();

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
    <DebouncedTextEditor
      id={props.path}
      name={props.path}
      label="Description"
      markdown={value}
      onChange={handleChange}
    />
  );
}

function DebouncedTextEditor(props: TextEditorProps) {
  const [value, setValue] = React.useState(() => props.markdown);
  const debouncedOnChange = useDebouncedFunction(props.onChange, 500);

  function handleChange(newValue: string) {
    setValue(newValue);
    debouncedOnChange(newValue);
  }

  return <TextEditor {...props} markdown={value} onChange={handleChange} />;
}
