import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectSelectedItem } from '@/state';

import { ThemeSwitch } from './form';
import { CvItem } from './types';
import {
  ContactOptions,
  ProfileOptions,
  SkillsOptions,
  ExperienceOptions,
  PhotoOptions,
  ProjectsOptions,
} from './resume/content';

export function CustomizationPanel() {
  const selectedItem = useSelector(selectSelectedItem);

  const customizationOptionsMap: Record<CvItem, JSX.Element | null> = {
    contact: <ContactOptions />,
    education: null,
    experience: <ExperienceOptions />,
    skills: <SkillsOptions />,
    photo: <PhotoOptions />,
    profile: <ProfileOptions />,
    projects: <ProjectsOptions />,
  };

  const ControlsComponent = selectedItem && selectedItem in customizationOptionsMap
    ? customizationOptionsMap[selectedItem]
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
