import { useSelector, useStore } from 'react-redux';

import { selectColor, contactSlice } from '@/state/contact';
import { Color } from '@/shared/types';
import { ColorSelector } from '@/components/editor/form';

const { actions } = contactSlice;

export function ContactOptions() {
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
    <ColorSelector
      label="Color"
      value={color}
      onChange={handleColorChange}
    />
  );
}
