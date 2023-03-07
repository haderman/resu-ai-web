import * as React from 'react';

import { SelectableCard } from '@/components/editor/common';

import { Contact } from './component';

/**
 * This is a test
 * @returns
 */
export function ContactContainer() {
  return (
    <SelectableCard item="contact">
      <MemoizedContact />
    </SelectableCard>
  );
}

const MemoizedContact = React.memo(Contact);
