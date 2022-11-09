import { useSelector, useStore } from 'react-redux';

import { selectColor, photoSlice } from '@/state/photo';
import { Color } from '@/shared/types';
import { WithTheme } from '@/components/editor/themes';
import { ColorSelector } from '@/components/editor/form';

const { actions } = photoSlice;

export function PhotoOptions() {
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

  return (
    <ColorSelector
      label="Background color"
      value={color}
      onChange={handleColorChange}
    />
  );
}
