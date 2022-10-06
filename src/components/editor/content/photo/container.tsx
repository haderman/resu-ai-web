import { useSelector } from 'react-redux';

import { selectColor } from '@/state/photo';

import { Photo } from './component';

/**
 * This is the Profile component but connected to the store
 * @returns Profile component
 */
export function PhotoContainer() {
  const color = useSelector(selectColor);

  return <Photo background={color} />;
}
