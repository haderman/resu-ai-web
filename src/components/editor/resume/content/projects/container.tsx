import * as React from 'react';

import { SelectableCard } from '@/components/editor/common';

import { Projects } from './component';

export function ProjectsContainer() {
  return (
    <SelectableCard item="projects">
      <MemoizedProjects />
    </SelectableCard>
  );
}

const MemoizedProjects = React.memo(Projects);
