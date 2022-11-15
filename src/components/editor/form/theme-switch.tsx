import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { ResumeTheme } from '@/themes';

const { selectors, useUpdaters } = apiState.style;

export function ThemeSwitch() {
  const theme = useSelector(selectors.selectTheme);
  const [updaters] = useUpdaters();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    updaters.updateTheme(event.target.value as ResumeTheme);
  }

  return (
    <div>
      <span>Theme: </span>
      <label>
        <input
          type="radio"
          name="theme"
          value="dark-space"
          onChange={handleChange}
          checked={theme === 'dark-space'}
        />
        Dark Space
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="default"
          onChange={handleChange}
          checked={theme === 'default'}
        />
        Light Space
      </label>
    </div>
  );
}

