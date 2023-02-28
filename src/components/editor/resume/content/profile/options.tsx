import {
  InputTitleContainer,
  InputDescriptionContainer,
  InputCardBackgroundContainer,
  InputSizeContainer,
  InputAlignmentContainer,
} from './controls';

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

import { Field, SectionSchemaMap, ResumeFieldPath, ResumeContent, Resume, Alignment, Color, Size } from '@/shared/types';

const { selectors, useProfileUpdater } = apiState.profile;

export function ProfileOptions() {
  return (
    <>
      {sectionSchemaMap.profile.fields.map((field) => {
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
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path));
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: string) => {
      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  return (
    <InputText
      label="Title"
      value={value as unknown as string}
      onChange={handleChange}
    />
  );
}

type InputAlignAdapterProps = {
  path: Field['path']
}

function InputAlignAdapter(props: InputAlignAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path));
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: Alignment | null) => {
      if (value === null) return;

      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  return (
    <AlignButtonGroup
      value={value as unknown as Alignment}
      onChange={handleChange}
    />
  );
}

type InputColorAdapterProps = {
  path: Field['path']
}

function InputColorAdapter(props: InputColorAdapterProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path));
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: Color) => {
      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

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
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path));
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: Size | null) => {
      update(createObjectFromPath(props.path, value));
    },
    [update, props.path]
  );

  return (
    <SizeButtonGroup
      value={value as unknown as Size}
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

  return (
    <TextEditor
      label="Description"
      markdown={value as unknown as string}
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
    fields: [
      {
        path: 'profile.title.text',
        type: 'text',
      },
      {
        path: 'profile.description.text',
        type: 'rich-text',
      },
      {
        path: 'profile.title.align',
        type: 'align',
      },
      {
        path: 'profile.cardStyle.background',
        type: 'color',
      },
      {
        path: 'profile.title.size',
        type: 'size',
      },
    ],
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
        path: 'skills.title.color',
        type: 'color',
      }, {
        path: 'skills.title.size',
        type: 'size',
      }
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
