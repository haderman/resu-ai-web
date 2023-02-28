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
import { InputText } from '@/components/editor/form';

import { Field, SectionSchemaMap, ResumeFieldPath, ResumeContent, Resume } from '@/shared/types';

const { selectors, useProfileUpdater } = apiState.profile;

export function ProfileOptions() {
  return (
    <>
      {sectionSchemaMap.profile.fields.map((field) => {
        return <Adapter key={field.path} field={field} />;
      })}
    </>
  );
  return (
    <>
      <InputTitleContainer />
      <InputDescriptionContainer />
      <InputCardBackgroundContainer />
      <InputSizeContainer />
      <InputAlignmentContainer />
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
      const obj = createObjectFromPath(props.path, value);
      console.log('obj', obj);
      update(obj);
      // update({
      //   title: {
      //     text: value
      //   },
      // });
    },
    [update]
  );

  return (
    <InputText
      label="Title"
      value={value as unknown as string}
      onChange={handleChange}
    />
  );
}

// function useSelectorFactory(path: `${infer Key}.${infer Rest}`) {
//   const [section, key] = path.split('.');
//   const selector = useSelector();
//   return selector;
// }

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
      }, {
        path: 'profile.description.text',
        type: 'rich-text',
      }, {
        path: 'profile.title.align',
        type: 'align',
      }, {
        path: 'profile.title.color',
        type: 'color',
      }
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
