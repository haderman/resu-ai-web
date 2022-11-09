import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Color } from '@/shared/types';
import { ColorSelector } from '@/components/editor/form';

const { selectors, useUpdater } = apiState.skills;

export function InputItemColorContainer() {
  const { background } = useSelector(selectors.selectItemStyle);
  const [updater] = useUpdater();

  function handleChange(value: Color) {
    updater.updateItemStyle({ background: value });
  }

  return <InputItemColorComponent value={background} onChange={handleChange} />;
}

type InputItemColorComponentProps = {
  value: Color
  onChange: (value: Color) => void
}

export function InputItemColorComponent(props: InputItemColorComponentProps) {
  return (
    <ColorSelector
      label="Items Color"
      value={props.value}
      onChange={props.onChange}
    />
  );
}
