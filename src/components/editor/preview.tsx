import styled from 'styled-components';

import { CVDoc } from './cv-doc';
import { WithTheme } from './themes';

export function Preview() {
  return (
    <StyledPreview>
      <WithTheme>
        <CVDoc />
      </WithTheme>
    </StyledPreview>
  );
}

const StyledPreview = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;
