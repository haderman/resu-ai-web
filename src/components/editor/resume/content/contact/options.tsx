import { useSelector, useStore } from 'react-redux';

import { selectColor, contactSlice } from '@/state/contact';
import { Color } from '@/shared/types';
import { RadioColorGroup } from '@/components/editor/form';

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
    <RadioColorGroup
      name="color-1"
      legend="Color"
      selected={color}
      onChange={handleColorChange}
    />
  );
}
