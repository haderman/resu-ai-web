import { useSelector } from 'react-redux';

import {
  selectColor,
  selectBackground,
  selectSkillsColor,
} from '@/state/projects';

import { Projects } from './component';

export function ProjectsContainer() {
  const color = useSelector(selectColor);
  const background = useSelector(selectBackground);
  const skillsColor = useSelector(selectSkillsColor);

  return (
    <Projects
      color={color}
      background={background}
      skillsColor={skillsColor}
    />
  );
}
