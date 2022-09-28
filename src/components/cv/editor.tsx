import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectTheme } from '@/state';
import { ThemeSwitch } from './controls';
import { PageLayout } from './page-layout';

export function Editor() {
  return (
    <StyledEditor>
      <Controls />
      <Preview />
    </StyledEditor>
  );
}

const StyledEditor = styled.div`
  position: relative;
  min-height: 100%;
  display: grid;
  grid-template-columns: 400px 1fr;

  & > * {
    overflow: auto;
    min-height: 100%;
  }
`;

function Controls() {
  return (
    <StyledControls>
      <ThemeSwitch />
    </StyledControls>
  );
}

const StyledControls = styled.div`
  padding: 10px;
  background-color: hsl(210 10% 10%);
`;

function Preview() {
  const theme = useSelector(selectTheme);

  return (
    <StyledPreview>
      <PageLayout theme={theme} />
    </StyledPreview>
  );
}

const StyledPreview = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;
