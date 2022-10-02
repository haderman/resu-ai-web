import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectTheme } from '@/state';
import { ThemeSwitch, ColorSelector } from './controls';
import { PageLayout } from './page-layout';
import { WithTheme } from './themes';

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
      <WithTheme>
        <ColorSelector />
      </WithTheme>
    </StyledControls>
  );
}

const StyledControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px;
  background-color: hsl(210 10% 10%);
`;

function Preview() {
  const theme = useSelector(selectTheme);

  return (
    <StyledPreview>
      <WithTheme>
        <PageLayout />
      </WithTheme>
    </StyledPreview>
  );
}

const StyledPreview = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;
