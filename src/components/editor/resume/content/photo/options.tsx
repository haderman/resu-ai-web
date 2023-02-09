import { useSelector, useStore } from 'react-redux';

import { selectColor, photoSlice } from '@/state/photo';
import { Color } from '@/shared/types';
import { RadioColorGroup } from '@/components/editor/form';

const { actions } = photoSlice;

export function PhotoOptions() {
  return (
    <ColorSelectorContainer />
  );
};

function ColorSelectorContainer() {
  const store = useStore();
  const color = useSelector(selectColor);

  function handleColorChange(color: Color) {
    store.dispatch(actions.setColor(color));
  }

  return (
    <RadioColorGroup
      name="background-2"
      legend="Background color"
      selected={color}
      onChange={handleColorChange}
    />
  );
}
