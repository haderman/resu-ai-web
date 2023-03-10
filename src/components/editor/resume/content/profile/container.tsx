import * as React from 'react';

import { SelectableCard } from '@/components/editor/common';

import { Profile } from './component';

/**
 * This is the Profile component but connected to the store
 * @returns Profile component
 */
export function ProfileContainer() {
  return (
    <SelectableCard item="profile">
      <MemoizedProfile />
    </SelectableCard>
  );
}

const MemoizedProfile = React.memo(Profile);

