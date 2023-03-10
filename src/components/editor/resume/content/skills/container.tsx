import * as React from 'react';

import { SelectableCard } from '@/components/editor/common';

import { Skills } from './component';

export function SkillsContainer() {
  return (
    <SelectableCard item="skills">
      <MemoizedSkills />
    </SelectableCard>
  );
}

const MemoizedSkills = React.memo(Skills);
