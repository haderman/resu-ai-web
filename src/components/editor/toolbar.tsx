import styled from 'styled-components';

export function Toolbar() {
  console.log('toolbar');
  return (
    <StyledToolbar>

    </StyledToolbar>
  );
}

const StyledToolbar = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid hsl(210, 10%, 15%);
  background-color: hsl(210 10% 5% / 0.8);
  backdrop-filter: blur(5px);
`;
