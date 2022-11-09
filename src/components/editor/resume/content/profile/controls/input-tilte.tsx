import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { apiState } from '@/state/api';
import { Input } from '@/components/editor/form';
import { Profile } from '@/shared/types';

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
    <StyledFieldset>
      <StyledLegend>Title</StyledLegend>
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
    </StyledFieldset>
  );
}

const StyledFieldset = styled.fieldset`
  padding: 10px;
  background-color: hsl(0 0% 15%);
  border-color: hsl(0 0% 35%);
  border-style: solid;
`;

const StyledLegend = styled.legend`
  color: white;
`;

function useUpdateTitle() {
  const [updater] = useProfileUpdater();

  function updateTitle(title: Partial<Profile['title']>) {
    updater.updateProfleTitle(title);
  }

  return [updateTitle];
}
