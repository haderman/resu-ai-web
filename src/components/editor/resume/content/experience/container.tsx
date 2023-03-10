import * as React from 'react';

import { SelectableCard } from '@/components/editor/common';

import { Experience } from './component';

/**
 * This is the Experience component but connected to the store
 * @returns Profile component
 */
export function ExperienceContainer() {
  return (
    <SelectableCard item="experience">
      <MemoizedExperience />
    </SelectableCard>
  );
}

const MemoizedExperience = React.memo(Experience);
