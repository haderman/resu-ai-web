import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { ResumeLayoutType } from '@/shared/types';

const { selectors, useUpdaters } = apiState.layout;

export function LayoutSelector() {
  const layout = useSelector(selectors.selectLayoutType);
  const [updaters] = useUpdaters();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    updaters.updateLayout(ResumeLayoutType.decode(event.target.value));
  }

  return (
    <div>
      <span>Layout: </span>
      <label>
        <input
          type="radio"
          name="layout"
          value="layout-a"
          onChange={handleChange}
          checked={layout === 'layout-a'}
        />
        A
      </label>
      <label>
        <input
          type="radio"
          name="layout"
          value="layout-b"
          onChange={handleChange}
          checked={layout === 'layout-b'}
        />
        B
      </label>
    </div>
  );
}

