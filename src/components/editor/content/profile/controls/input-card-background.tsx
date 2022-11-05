import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { apiState } from '@/state/api';
import { ColorSelector } from '../../../form';
import { Color, Profile } from '@/shared/types';

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

const StyledFieldset = styled.fieldset`
  padding: 10px;
  background-color: hsl(0 0% 15%);
  border-color: hsl(0 0% 35%);
  border-style: solid;
`;

const StyledLegend = styled.legend`
  color: white;
`;
