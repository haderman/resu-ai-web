import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectColor, selectBackground } from '@/state/experience';
import { SelectableCard } from '@/components/editor/common';

import { Experience } from './component';

/**
 * This is the Experience component but connected to the store
 * @returns Profile component
 */
export function ExperienceContainer() {
  const color = useSelector(selectColor);
  const background = useSelector(selectBackground);

  return (
    <SelectableCard item="experience">
      <MemoizedExperience color={color} background={background} />
    </SelectableCard>
  );
}

const MemoizedExperience = React.memo(Experience);
