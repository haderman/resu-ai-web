import { useSelector } from 'react-redux';

import { selectors } from '@/state/api';

import { Profile } from './component';

/**
 * This is the Profile component but connected to the store
 * @returns Profile component
 */
export function ProfileContainer() {
  const color = useSelector(selectors.selectProfileCardBackground);

  return <Profile color={color} />;
}

