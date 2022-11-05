import { useSelector, useStore } from 'react-redux';

import { selectColor, profileSlice } from '@/state/profile';
import { Color } from '@/shared/types';

import { ColorSelector } from '../../form';
import { WithTheme } from '../../themes';
import {
  InputTitleContainer,
  InputDescriptionContainer,
  InputCardBackgroundContainer,
} from './controls';

const { actions } = profileSlice;

export function ProfileOptions() {
  return (
    <>
      <InputTitleContainer />
      <InputDescriptionContainer />
      <WithTheme>
        <InputCardBackgroundContainer />
      </WithTheme>
    </>
  );
};

function ColorSelectorContainer() {
  const store = useStore();
  const color = useSelector(selectColor);

  function handleColorChange(color: Color) {
    store.dispatch(actions.setColor(color));
  }

  return <ColorSelector label="Color" value={color} onChange={handleColorChange} />;
}
