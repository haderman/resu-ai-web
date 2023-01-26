import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { SelectableCard } from '@/components/editor/common';

import { Skills } from './component';

const { selectors } = apiState.skills;

export function SkillsContainer() {
  const skills = useSelector(selectors.selectSkills);

  return (
    <SelectableCard item="skills">
      <MemoizedSkills
        data={skills.items}
        color={skills.itemStyle.background}
        background={skills.cardStyle.background}
      />
    </SelectableCard>
  );
}

const MemoizedSkills = React.memo(Skills);
