import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';

import { Skills } from './component';

const { selectors } = apiState.skills;

export function SkillsContainer() {
  const skills = useSelector(selectors.selectSkills);

  return (
    <Skills
      data={skills.items}
      color={skills.itemStyle.background}
      background={skills.cardStyle.background}
    />
  );
}
