import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { apiState } from '@/state/api';
import { Textarea } from '@/components/editor/form';
import { Profile } from '@/shared/types';

const { selectors, useProfileUpdater } = apiState.profile;

export function InputDescriptionContainer() {
  const description = useSelector(selectors.selectProfileDescription);
  const [update] = useUpdateDescription();

  function handleChange(value: string) {
    update({ text: value });
  }

  return <InputDescriptionComponent value={description.text} onChange={handleChange} />;
}

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
    <StyledFieldset>
      <StyledLegend>Description</StyledLegend>
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

function useUpdateDescription() {
  const [updater] = useProfileUpdater();

  function updateDescription(description: Partial<Profile['description']>) {
    updater.updateProfleDescription(description);
  }

  return [updateDescription] as const;
}
