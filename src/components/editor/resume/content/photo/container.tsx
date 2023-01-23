import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectColor } from '@/state/photo';
import { SelectableCard } from '@/components/editor/common';

import { Photo } from './component';

/**
 * This is the Profile component but connected to the store
 * @returns Profile component
 */
export function PhotoContainer() {
  const color = useSelector(selectColor);

  return (
    <SelectableCard item="photo">
      <Photo background={color} />
    </SelectableCard>
  );
}

const MemoizedPhoto = React.memo(Photo);
