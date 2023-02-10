import { useSelector, useStore } from 'react-redux';

import {
  selectColor,
  selectBackground,
  experienceSlice,
} from '@/state/experience';
import { Color } from '@/shared/types';
import { RadioColorGroup } from '@/components/editor/form';

const { actions } = experienceSlice;

export function ExperienceOptions() {
  return (
    <>
      <BackgroundSelectorContainer />
      <ColorSelectorContainer />
    </>
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
      name="color-2"
      legend="Color"
      selected={color}
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
    <RadioColorGroup
      name="background-1"
      legend="Background"
      selected={background}
      onChange={handleBackgroundChange}
    />
  );
}
