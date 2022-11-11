import * as React from 'react';
import styled from 'styled-components';

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

export type ResumeProps = {};

export const Resume = React.forwardRef<HTMLDivElement, ResumeProps>(
  function ResumeComponent(props: ResumeProps, ref) {
    return (
      <LayoutA ref={ref}>
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
      </LayoutA>
    );
  }
);

const BaseLayout = styled.div`
  position: relative;

  // Page size for A4 pages - https://github.com/w3c/csswg-drafts/issues/328
  height: 297mm;
  width: 210mm;
  min-width: 210mm;

  background-color: ${(props) => props.theme.colors.primary.background};
  color: ${(props) => props.theme.colors.primary.text};

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  @media print {
    body * {
      visibility: hidden;
    }

    & * {
      visibility: visible;
    }

    & {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

const Layout = styled(BaseLayout)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, min-content);
  grid-template-areas:
    'photo whoiam whoiam'
    'contact skills skills'
    'experience experience experience'
    'projects projects projects';
`;

const PhotoSection = styled.div`
  grid-area: photo;
  position: relative;

  // temp
  // border: .3mm solid salmon;
  /* height: 6cm; */
`;

const ContactSection = styled.div`
  grid-area: contact;
`;

const WhoIAmSection = styled.div`
  grid-area: whoiam;

  & > * {
    height: 100%;
  }
`;

const SkillsSection = styled.div`
  grid-area: skills;

  & > * {
    height: 100%;
  }
`;

const ExperienceSection = styled.div`
  grid-area: experience;
`;

const ProjectsSection = styled.div`
  grid-area: projects;
`;
