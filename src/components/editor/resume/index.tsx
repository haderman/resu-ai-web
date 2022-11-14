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

import { SelectableCard } from '../common';
import { WithTheme } from '../themes';
import { useSelector } from 'react-redux';

import layout from './layouts/layout.module.scss';

const { selectors } = apiState.style;

export type ResumeProps = {};

export const Resume = React.forwardRef<HTMLDivElement, ResumeProps>(
  function ResumeComponent(props: ResumeProps, ref) {
    return (
      <WithTheme>
        <Layout ref={ref}>
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
        </Layout>
      </WithTheme>
    );
  }
);

const Layout = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
  function LayoutComponent(props, ref) {
    const selectedLayout = useSelector(selectors.selectLayout);
    return (
      <div ref={ref} className={layout.container} data-area={selectedLayout}>
        {props.children}
      </div>
    );
  }
);
