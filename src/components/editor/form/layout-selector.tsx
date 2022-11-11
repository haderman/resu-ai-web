import { useSelector, useStore } from 'react-redux';
import styled from 'styled-components';

import { apiState } from '@/state/api';
import { ResumeLayout } from '@/shared/types';

const { selectors, useUpdaters } = apiState.style;

export function LayoutSelector() {
  const layout = useSelector(selectors.selectLayout);
  const [updaters] = useUpdaters();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    updaters.updateLayout(event.target.value as ResumeLayout);
  }

  return (
    <StyledFieldset>
      <StyledLegend>Layout: </StyledLegend>
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
    </StyledFieldset>
  );
}

const StyledFieldset = styled.div`
  display: flex;
  border-color: hsl(0 0% 35%);
  border-style: none;
`;

const StyledLegend = styled.span`
  color: white;
`;
