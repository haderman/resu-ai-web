import { useSelector, useStore } from 'react-redux';

import {
  projectsSlice,
  selectColor,
  selectBackground,
  selectSkillsColor,
} from '@/state/projects';

import { Color } from '../../types';
import { ColorSelector } from '../../form';
import { WithTheme } from '../../themes';

const { actions } = projectsSlice;

export function ProjectsOptions() {
  return (
    <WithTheme>
      <BackgroundSelectorContainer />
      <ColorSelectorContainer />
      <SkillsColorSelectorContainer />
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

function SkillsColorSelectorContainer() {
  const store = useStore();
  const color = useSelector(selectSkillsColor);

  function handleColorChange(color: Color) {
    store.dispatch(actions.setSkillsColor(color));
  }

  return (
    <ColorSelector
      label="Skills color"
      value={color}
      onChange={handleColorChange}
    />
  );
}
