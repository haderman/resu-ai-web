import { useSelector, useStore } from 'react-redux';

import { editorSlice, selectTheme } from '@/state';
import { CvTheme } from "../themes";

const { actions } = editorSlice;

export function ThemeSwitch() {
  const theme = useSelector(selectTheme);
  const store = useStore();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    store.dispatch(actions.setTheme(event.target.value as CvTheme));
  }

  return (
    <div style={{ backgroundColor: 'gray' }}>
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
