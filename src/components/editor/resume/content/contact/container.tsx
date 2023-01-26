import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectColor } from '@/state/contact';
import { SelectableCard } from '@/components/editor/common';

import { Contact } from './component';

/**
 * This is a test
 * @returns
 */
export function ContactContainer() {
  const color = useSelector(selectColor);

  return (
    <SelectableCard item="contact">
      <MemoizedContact color={color} />
    </SelectableCard>
  );
}

const MemoizedContact = React.memo(Contact);
