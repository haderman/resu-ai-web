import * as React from 'react';
import styled from 'styled-components';

import { ThemeSwitch } from './controls';
import { PageLayout } from './page-layout';
import { CvTheme } from './themes';

export function Editor() {
  const [selectedTheme, setSelectedTheme] = React.useState<CvTheme>('dark-space');

  return (
    <StyledEditor>
      <Controls theme={selectedTheme} onThemeChange={setSelectedTheme} />
      <Preview theme={selectedTheme} />
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

type ControlsProps = {
  theme: CvTheme;
  onThemeChange: (theme: CvTheme) => void;
};

function Controls(props: ControlsProps) {
  return (
    <StyledControls>
      <ThemeSwitch value={props.theme} onChange={props.onThemeChange} />
    </StyledControls>
  );
}

const StyledControls = styled.div`
  padding: 10px;
  background-color: hsl(210 10% 10%);
`;

type PreviewProps = {
  theme: CvTheme;
}

function Preview(props: PreviewProps) {
  return (
    <StyledPreview>
      <PageLayout theme={props.theme} />
    </StyledPreview>
  );
}

const StyledPreview = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;
