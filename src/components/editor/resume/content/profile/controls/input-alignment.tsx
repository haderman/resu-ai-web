import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Alignment } from '@/shared/types';
import { AlignButtonGroup } from '@/components/editor/form';

const { selectors, useProfileUpdater } = apiState.profile;

export function InputAlignmentContainer() {
  const title = useSelector(selectors.selectProfileTitle);
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: Alignment | null) => {
      if (value === null) return;

      update({
        title: {
          align: value,
        },
      });
    },
    [update]
  );

  return (
    <AlignButtonGroup value={title.align} onChange={handleChange} />
  );
}
