import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Color } from '@/shared/types';
import { ColorSelector } from '@/components/editor/form';

const { selectors, useUpdater } = apiState.skills;

export function InputCardBackgroundContainer() {
  const color = useSelector(selectors.selectCardBackground);
  const [updater] = useUpdater();

  function handleChange(value: Color) {
    updater.updateCardStyle({ background: value });
  }

  return <InputCardBackgroundComponent value={color} onChange={handleChange} />;
}

type InputCardBackgroundComponentProps = {
  value: Color
  onChange: (value: Color) => void
}

export function InputCardBackgroundComponent(props: InputCardBackgroundComponentProps) {
  return (
    <ColorSelector
      label="Background"
      value={props.value}
      onChange={props.onChange}
    />
  );
}
