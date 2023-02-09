import { useSelector, useStore } from 'react-redux';

import {
  projectsSlice,
  selectColor,
  selectBackground,
  selectSkillsColor,
} from '@/state/projects';
import { Color } from '@/shared/types';
import { RadioColorGroup } from '@/components/editor/form';

const { actions } = projectsSlice;

export function ProjectsOptions() {
  return (
    <>
      <BackgroundSelectorContainer />
      <ColorSelectorContainer />
      <SkillsColorSelectorContainer />
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
      name="chip-color"
      legend="Chip color"
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
      name="background-5"
      legend="Background"
      selected={background}
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
    <RadioColorGroup
      name="skills-color"
      legend="Skills color"
      selected={color}
      onChange={handleColorChange}
    />
  );
}
