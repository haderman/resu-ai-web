import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectSelectedItem } from '@/state';

import { ThemeSwitch } from './controls';
import { PageLayout } from './page-layout';
import { WithTheme } from './themes';
import { CvItem } from './types';
import {
  ContactOptions,
  ProfileOptions,
  Skills,
} from './content';

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
  const selectedItem = useSelector(selectSelectedItem);

  const controlsMap: Record<CvItem, JSX.Element | null> = {
    contact: <ContactOptions />,
    education: null,
    experience: null,
    skills: <Skills.Options />,
    photo: null,
    profile: <ProfileOptions />,
    projects: null,
  };

  const ControlsComponent = selectedItem && selectedItem in controlsMap
    ? controlsMap[selectedItem]
    : null;

  return (
    <StyledControls>
      <ThemeSwitch />
      {ControlsComponent}
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
