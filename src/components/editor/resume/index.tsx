import * as React from 'react';

import { apiState } from '@/state/api';

import {
  ContactContainer,
  ExperienceContainer,
  PhotoContainer,
  ProjectsContainer,
  SkillsContainer,
  ProfileContainer,
} from './content';
import { LayoutA, LayoutB } from './layouts';

import { SelectableCard } from '../common';
import { WithTheme } from '../themes';
import { useSelector } from 'react-redux';

const { selectors } = apiState.style;

export type ResumeProps = {};

export const Resume = React.forwardRef<HTMLDivElement, ResumeProps>(
  function ResumeComponent(props: ResumeProps, ref) {
    const layout = useSelector(selectors.selectLayout);
    const LayoutComponent = layout === 'layout-a' ? LayoutA : LayoutB;

    return (
      <WithTheme>
        <LayoutComponent ref={ref}>
          <SelectableCard item="photo">
            <PhotoContainer />
          </SelectableCard>
          <SelectableCard item="profile">
            <ProfileContainer />
          </SelectableCard>
          <SelectableCard item="contact">
            <ContactContainer />
          </SelectableCard>
          <SelectableCard item="skills">
            <SkillsContainer />
          </SelectableCard>
          <SelectableCard item="experience">
            <ExperienceContainer />
          </SelectableCard>
          <SelectableCard item="projects">
            <ProjectsContainer />
          </SelectableCard>
        </LayoutComponent>
      </WithTheme>
    );
  }
);
