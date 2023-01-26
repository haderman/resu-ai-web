import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Textarea } from '@/components/editor/form';
import { Profile } from '@/shared/types';

const { selectors, useProfileUpdater } = apiState.profile;

export function InputDescriptionContainer() {
  const description = useSelector(selectors.selectProfileDescription);
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: string) => {
      update({
        description: {
          text: value
        },
      });
    },
    [update]
  );

  return <MemoizedInputDescriptionComponent value={description.text} onChange={handleChange} />;
}

const MemoizedInputDescriptionComponent = React.memo(InputDescriptionComponent);

type InputDescriptionComponentProps = {
  value: string
  onChange: (value: string) => void
}

export function InputDescriptionComponent(props: InputDescriptionComponentProps) {
  const [value, setValue] = React.useState(() => props.value);

  function handleChange(newValue: string) {
    setValue(newValue);
  }

  function handleClick() {
    props.onChange(value);
  }

  return (
    <fieldset>
      <legend>Description</legend>
      <div>
        <Textarea
          label="Title"
          value={value}
          onChange={handleChange}
          placeholder="Enter your awesome profile here!"
        />
        <button onClick={handleClick}>
          Save
        </button>
      </div>
    </fieldset>
  );
}
