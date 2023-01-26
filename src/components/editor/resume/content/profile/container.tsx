import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { SelectableCard } from '@/components/editor/common';

import { Profile } from './component';

const selectors = apiState.profile.selectors;

/**
 * This is the Profile component but connected to the store
 * @returns Profile component
 */
export function ProfileContainer() {
  const color = useSelector(selectors.selectProfileCardBackground);

  return (
    <SelectableCard item="profile">
      <MemoizedProfile color={color} />
    </SelectableCard>
  );
}

const MemoizedProfile = React.memo(Profile);

