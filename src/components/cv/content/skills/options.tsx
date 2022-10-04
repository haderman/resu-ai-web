import { useSelector, useStore } from 'react-redux';

import {
  skillsSlice,
  selectColor,
  selectBackground,
} from '@/state/skills';

import { Color } from '../../types';
import { ColorSelector } from '../../controls';
import { WithTheme } from '../../themes';

const { actions } = skillsSlice;

export function SkillOptions() {
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
      label="Chip color"
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
