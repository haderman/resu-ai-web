import { useSelector } from 'react-redux';

import { selectColor } from '@/state/profile';

import { Profile } from './component';

/**
 * This is the Profile component but connected to the store
 * @returns Profile component
 */
export function ProfileContainer() {
  const color = useSelector(selectColor);

  return <Profile color={color} />;
}

