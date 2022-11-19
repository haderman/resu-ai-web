import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Input } from '@/components/editor/form';

const { selectors, useUpdater } = apiState.skills;

export function InputChipsContainer() {
  const items = useSelector(selectors.selectItems);
  const [updater] = useUpdater();

  const rawItems = React.useMemo(
    () => items.map(item => item.title).join(', '),
    [items]
  );

  function handleChange(value: string) {
    updater.updateItems(
      value
        .split(',')
        .map(title => ({ title: title.trim(), yearsOfExperience: 1 }))
    );
  }

  return <InputTitleComponent value={rawItems} onChange={handleChange} />;
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
      <legend>Skills</legend>
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
