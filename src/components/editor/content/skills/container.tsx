import { useSelector } from 'react-redux';

import {
  selectColor,
  selectSkills,
  selectBackground,
} from '@/state/skills';

import { Skills } from './component';

export function SkillsContainer() {
  const color = useSelector(selectColor);
  const background = useSelector(selectBackground);
  const skillsData = useSelector(selectSkills);

  return (
    <Skills
      data={skillsData}
      color={color}
      background={background}
    />
  );
}
