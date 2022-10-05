import { useSelector, useStore } from 'react-redux';

import {
  selectColor,
  selectBackground,
  experienceSlice,
} from '@/state/experience';

import { Color } from '../../types';
import { WithTheme } from '../../themes';
import { ColorSelector } from '../../controls';

const { actions } = experienceSlice;

export function ExperienceOptions() {
  return (
    <WithTheme>
      <BackgroundSelectorContainer />
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

function BackgroundSelectorContainer() {
  const store = useStore();
  const background = useSelector(selectBackground);

  function handleBackgroundChange(background: Color) {
    store.dispatch(actions.setBackground(background));
  }

  return (
    <ColorSelector
      label="Background"
      value={background}
      onChange={handleBackgroundChange}
    />
  );
}
