import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectors, useUpdateResume } from '@/state/api';
import { Input } from '@/components/editor/common/form';
import { Profile } from '@/shared/types';

export function InputTitleContainer() {
  const title = useSelector(selectors.selectProfileTitle);
  const updateProfile = useUpdateProfile();

  function handleChange(value: string) {
    updateProfile({ title: value });
  }

  return <InputTitleComponent value={title} onChange={handleChange} />;
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
      <div gap="medium">
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

function useUpdateProfile() {
  const profile = useSelector(selectors.selectProfile);
  const [updateResume] = useUpdateResume();

  function updateProfile(newProfile: Partial<Profile>) {
    updateResume({
      profile: { ...profile, ...newProfile },
    });
  }

  return updateProfile;
}
