import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { ColorSelector } from '@/components/editor/form';
import { Color, Profile } from '@/shared/types';

const { selectors, useProfileUpdater } = apiState.profile;

export function InputCardBackgroundContainer() {
  const color = useSelector(selectors.selectProfileCardBackground);
  const update = useProfileUpdater();

  const handleChange = React.useCallback(
    (value: Color) => {
      update({
        cardStyle: {
          background: value,
        }
      });
    },
    [update]
  );

  return <MemoizedInputCardBackgroundComponent value={color} onChange={handleChange} />;
}

const MemoizedInputCardBackgroundComponent = React.memo(InputCardBackgroundComponent);

type InputCardBackgroundComponentProps = {
  value: Color
  onChange: (value: Color) => void
}

export function InputCardBackgroundComponent(props: InputCardBackgroundComponentProps) {
  return (
    <ColorSelector label="Color" value={props.value} onChange={props.onChange} />
  );
}
