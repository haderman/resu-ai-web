import * as React from 'react';
import { useSelector } from 'react-redux';
import { apiState } from '@/state/api';
import {
  InputText,
  AlignButtonGroup,
  RadioColorGroup,
  SizeButtonGroup,
  TextEditor,
} from '@/components/editor/form';

import { Field, Alignment, Color, Size } from '@/shared/types';

const { useProfileUpdater } = apiState.profile;

export type AdapterProps = {
  field: Field
}

export function Adapter(props: AdapterProps) {
  if (props.field.type === 'text') {
    return <InputTextAdapter path={props.field.path} />;
  }

  if (props.field.type === 'align') {
    return <InputAlignAdapter path={props.field.path} />;
  }

  if (props.field.type === 'color') {
    return <InputColorAdapter path={props.field.path} />;
  }

  if (props.field.type === 'size') {
    return <InputSizeAdapter path={props.field.path} />;
  }

  if (props.field.type === 'rich-text') {
    return <InputTextEditorAdapter path={props.field.path} />;
  }

  return (
    <div className="flex flex-col">NULL</div>
  );
}

type InputTextAdapterProps = {
  path: Field['path']
}

function InputTextAdapter(props: InputTextAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, ''));
  const update = useProfileUpdater();

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
      label="Title"
      value={value}
      onChange={handleChange}
    />
  );
}

type InputAlignAdapterProps = {
  path: Field['path']
}

function InputAlignAdapter(props: InputAlignAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, 'center'));
  const update = useProfileUpdater();

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
      value={value}
      onChange={handleChange}
    />
  );
}

type InputColorAdapterProps = {
  path: Field['path']
}

function InputColorAdapter(props: InputColorAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, Color.getDefault()));
  const update = useProfileUpdater();

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
      legend='Color'
      name='color'
      selected={value as unknown as Color}
      onChange={handleChange}
    />
  );
}

type InputSizeAdapterProps = {
  path: Field['path']
}

function InputSizeAdapter(props: InputSizeAdapterProps) {
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

type InputTextEditorAdapterProps = {
  path: Field['path']
}

function InputTextEditorAdapter(props: InputTextEditorAdapterProps) {
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

// created with chatGPT
function createObjectFromPath<T>(path: string, value: T): any {
  const keys = path.split('.');
  const result: any = {};
  let current = result;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = {};
      current = current[key];
    }
  }
  return result;
}
