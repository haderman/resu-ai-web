import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Color } from '@/shared/types';
import { RadioColorGroup } from '@/components/editor/form';

const { selectors, useUpdateSkills } = apiState.skills;

export function InputItemColorContainer() {
  const { background } = useSelector(selectors.selectItemStyle);
  const updateSkills = useUpdateSkills();

  function handleChange(value: Color) {
    updateSkills({
      itemStyle: {
        background: value
      },
    });
  }

  return <InputItemColorComponent value={background} onChange={handleChange} />;
}

type InputItemColorComponentProps = {
  value: Color
  onChange: (value: Color) => void
}

export function InputItemColorComponent(props: InputItemColorComponentProps) {
  return (
    <RadioColorGroup
      name="background-6"
      legend="Items Color"
      selected={props.value}
      onChange={props.onChange}
    />
  );
}
