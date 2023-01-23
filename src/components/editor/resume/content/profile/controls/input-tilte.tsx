import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Input } from '@/components/editor/form';
import { Profile } from '@/shared/types';

const { useResumeUpdaters } = apiState.resume;

const { selectors, useProfileUpdater } = apiState.profile;

export function InputTitleContainer() {
  const title = useSelector(selectors.selectProfileTitle);
  const [update] = useUpdateTitle();

  function handleChange(value: string) {
    update({ text: value });
  }

  return <InputTitleComponent value={title.text} onChange={handleChange} />;
}

type InputTitleComponentProps = {
  value: string
  onChange: (value: string) => void
}

export function InputTitleComponent(props: InputTitleComponentProps) {
  const [value, setValue] = React.useState(() => props.value);

  function handleChange(newValue: string) {
    setValue(newValue);
  }

  function handleClick() {
    props.onChange(value);
  }

  return (
    <fieldset>
      <legend>Title</legend>
      <div>
        <Input
          label="Title"
          value={value}
          onChange={handleChange}
        />
        <button onClick={handleClick}>
          Save
        </button>
      </div>
    </fieldset>
  );
}

function useUpdateTitle() {
  const [update] = useResumeUpdaters();

  function updateTitle(title: Partial<Profile['title']>) {
    update({
      content: {
        profile: {
          title: { text: title.text }
        }
      }
    });
  }

  return [updateTitle];
}

function useUpdateTitle_old() {
  const [updater] = useProfileUpdater();

  function updateTitle(title: Partial<Profile['title']>) {
    updater.updateProfleTitle(title);
  }

  return [updateTitle];
}
