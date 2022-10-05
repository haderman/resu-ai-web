import * as React from 'react';
import styled from 'styled-components';

import { SelectableCard } from './common';
import {
  ContactContainer,
  ExperienceContainer,
  PhotoContainer,
  Projects,
  SkillsContainer,
  ProfileContainer,
} from './content';

export type PageLayoutProps = {};

export function PageLayout(props: PageLayoutProps) {
  return (
    <Layout>
      <PhotoSection>
        <SelectableCard item="photo">
          <PhotoContainer />
        </SelectableCard>
      </PhotoSection>
      <ContactSection>
        <SelectableCard item="contact">
          <ContactContainer />
        </SelectableCard>
      </ContactSection>
      <WhoIAmSection>
        <SelectableCard item="profile">
          <ProfileContainer />
        </SelectableCard>
      </WhoIAmSection>
      <SkillsSection>
        <SelectableCard item="skills">
          <SkillsContainer />
        </SelectableCard>
      </SkillsSection>
      <ExperienceSection>
        <SelectableCard item="experience">
          <ExperienceContainer />
        </SelectableCard>
      </ExperienceSection>
      <ProjectsSection>
        <SelectableCard item="projects">
          <Projects color="gray-light" />
        </SelectableCard>
      </ProjectsSection>
    </Layout>
  );
}

const BaseLayout = styled.div`
  position: relative;

  // Page size for A4 pages - https://github.com/w3c/csswg-drafts/issues/328
  height: 297mm;
  width: 210mm;
  /* aspect-ratio: 1 / 1.4142; */

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
