import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Color } from '@/shared/types';
import { RadioColorGroup } from '@/components/editor/form';

const { selectors, useUpdateSkills } = apiState.skills;

export function InputCardBackgroundContainer() {
  const color = useSelector(selectors.selectCardBackground);
  const updateSkills = useUpdateSkills();

  function handleChange(value: Color) {
    updateSkills({
      cardStyle: {
        background: value
      },
    });
  }

  return <InputCardBackgroundComponent value={color} onChange={handleChange} />;
}

type InputCardBackgroundComponentProps = {
  value: Color
  onChange: (value: Color) => void
}

export function InputCardBackgroundComponent(props: InputCardBackgroundComponentProps) {
  return (
    <RadioColorGroup
      name="background-6"
      legend="Background"
      selected={props.value}
      onChange={props.onChange}
    />
  );
}
