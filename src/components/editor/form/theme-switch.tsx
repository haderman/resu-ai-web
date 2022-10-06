import { useSelector, useStore } from 'react-redux';
import styled from 'styled-components';

import { editorSlice, selectTheme } from '@/state';
import { CvTheme } from '../themes';

const { actions } = editorSlice;

export function ThemeSwitch() {
  const theme = useSelector(selectTheme);
  const store = useStore();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    store.dispatch(actions.setTheme(event.target.value as CvTheme));
  }

  return (
    <StyledFieldset>
      <StyledLegend>Please select your preferred theme:</StyledLegend>
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
    </StyledFieldset>
  );
}

const StyledFieldset = styled.fieldset`
  padding: 10px;
  background-color: hsl(0 0% 15%);
  border-color: hsl(0 0% 35%);
  border-style: solid;
`;

const StyledLegend = styled.legend`
  color: white;
`;
