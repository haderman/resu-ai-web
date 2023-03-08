import * as React from 'react';

import { SelectableCard } from '@/components/editor/common';

import { Photo } from './component';

/**
 * This is the Profile component but connected to the store
 * @returns Profile component
 */
export function PhotoContainer() {
  return (
    <SelectableCard item="photo">
      <MemoizedPhoto />
    </SelectableCard>
  );
}

const MemoizedPhoto = React.memo(Photo);
