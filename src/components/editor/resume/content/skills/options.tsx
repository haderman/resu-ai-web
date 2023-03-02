import * as React from 'react';
import { useSelector } from 'react-redux';

import {
  InputText,
  AlignButtonGroup,
  RadioColorGroup,
  SizeButtonGroup,
  TextEditor,
} from '@/components/editor/form';
import { Field, SectionSchemaMap, Alignment, Color, Size } from '@/shared/types';
import { apiState } from '@/state/api';

const { useSkillsUpdater } = apiState.skills;

export function SkillsOptions() {
  return (
    <>
      {sectionSchemaMap.skills.fields.map((field) => {
        return <Adapter key={field.path} field={field} />;
      })}
    </>
  );
};

type AdapterProps = {
  field: Field
}

function Adapter(props: AdapterProps) {
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
  const update = useSkillsUpdater();

  const handleChange = React.useCallback(
    (value: string) => {
      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  if (typeof value !== 'string') {
    console.error('Invalid string type in InputTextAdapter');
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
  const update = useSkillsUpdater();

  const handleChange = React.useCallback(
    (value: Alignment | null) => {
      if (value === null) return;

      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  if (!Alignment.isAlignment(value)) {
    console.error('Invalid alignment type in InputAlignAdapter');
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
  const update = useSkillsUpdater();

  const handleChange = React.useCallback(
    (value: Color) => {
      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  if (!Color.isColor(value)) {
    console.error('Invalid color type in InputColorAdapter');
    return null;
  }

  return (
    <RadioColorGroup
      legend='Color'
      name='color'
      selected={value}
      onChange={handleChange}
    />
  );
}

type InputSizeAdapterProps = {
  path: Field['path']
}

function InputSizeAdapter(props: InputSizeAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, 'medium'));
  const update = useSkillsUpdater();

  const handleChange = React.useCallback(
    (value: Size | null) => {
      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  if (!Size.isSize(value)) {
    console.error('Invalid size type in InputSizeAdapter');
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
  const update = useSkillsUpdater();

  const handleChange = React.useCallback(
    (value: string) => {
      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  if (typeof value !== 'string') {
    console.error('Invalid string type in InputTextEditorAdapter');
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

const sectionSchemaMap: SectionSchemaMap = {
  cover: {
    type: 'cover',
    fields: [],
  },
  profile: {
    type: 'profile',
    fields: [],
  },
  contact: {
    type: 'contact',
    fields: [],
  },
  photo: {
    type: 'photo',
    fields: [],
  },
  skills: {
    type: 'skills',
    fields: [
      {
        path: 'skills.title.text',
        type: 'text',
      }, {
        path: 'skills.title.align',
        type: 'align',
      }, {
        path: 'skills.itemStyle.background',
        type: 'color',
      }, {
        path: 'skills.itemStyle.size',
        type: 'size',
      },
    ],
  },
  experience: {
    type: 'experience',
    fields: [],
  },
  projects: {
    type: 'projects',
    fields: [],
  },
};

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
