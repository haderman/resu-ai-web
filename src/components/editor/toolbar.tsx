import styled from 'styled-components';

import { ThemeSwitch, LayoutSelector } from './form';

export function Toolbar() {
  console.log('toolbar');
  return (
    <StyledToolbar>
      <ThemeSwitch />
      <div data-aria="divisor">|</div>
      <LayoutSelector />
    </StyledToolbar>
  );
}

const StyledToolbar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  border-bottom: 1px solid hsl(210, 10%, 15%);
  background-color: hsl(210 10% 5% / 0.8);
  backdrop-filter: blur(5px);
`;


