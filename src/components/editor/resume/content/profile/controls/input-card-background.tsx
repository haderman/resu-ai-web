import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { ColorSelector } from '@/components/editor/form';
import { Color } from '@/shared/types';

const { selectors, useProfileUpdater } = apiState.profile;

export function InputCardBackgroundContainer() {
  const color = useSelector(selectors.selectProfileCardBackground);
  const [updater] = useProfileUpdater();

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
    <ColorSelector label="Color" value={props.value} onChange={props.onChange} />
  );
}
