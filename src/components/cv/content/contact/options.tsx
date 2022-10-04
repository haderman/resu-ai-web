import { useSelector, useStore } from 'react-redux';

import { selectColor, contactSlice } from '@/state/contact';

import { Color } from '../../types';
import { WithTheme } from '../../themes';
import { ColorSelector } from '../../controls';

const { actions } = contactSlice;

export function ContactOptions() {
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
      label="Color"
      value={color}
      onChange={handleColorChange}
    />
  );
}
