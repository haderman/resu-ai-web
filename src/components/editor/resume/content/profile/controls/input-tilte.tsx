import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Input } from '@/components/editor/form';
import { Profile, ResumeContent } from '@/shared/types';

const { useResumeUpdaters } = apiState.resume;

const { selectors, useProfileUpdater } = apiState.profile;

export function InputTitleContainer() {
  const title = useSelector(selectors.selectProfileTitle);
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: string) => {
      update({
        title: {
          text: value
        },
      } as Partial<Profile>);
    },
    [update]
  );

  return <MemoizedInputTitleComponent value={title.text} onChange={handleChange} />;
}

const MemoizedInputTitleComponent = React.memo(InputTitleComponent);

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
  const update = useResumeUpdaters();

  function updateTitle(title: Partial<Profile['title']>) {
    update({
      content: {
        profile: {
          title: { text: title.text }
        }
      } as ResumeContent
    });
  }

  return [updateTitle];
}
