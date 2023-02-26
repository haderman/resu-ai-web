import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Size } from '@/shared/types';
import { SizeButtonGroup } from '@/components/editor/form';

const { selectors, useProfileUpdater } = apiState.profile;

export function InputSizeContainer() {
  const size = useSelector(selectors.selectTitleSize);
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: Size | null) => {
      update({
        title: {
          size: value === null ? 'none' : value,
        },
      });
    },
    [update]
  );

  return (
    <SizeButtonGroup value={size} onChange={handleChange} />
  );
}
