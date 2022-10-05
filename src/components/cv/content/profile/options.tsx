import { useSelector, useStore } from 'react-redux';

import { selectColor, profileSlice } from '@/state/profile';

import { ColorSelector } from '../../controls';
import { WithTheme } from '../../themes';
import { Color } from '../../types';

const { actions } = profileSlice;

export function ProfileOptions() {
  return (
    <WithTheme>
      <ColorSelectorContainer />
    </WithTheme>
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
