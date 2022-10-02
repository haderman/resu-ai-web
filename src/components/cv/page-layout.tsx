import * as React from 'react';
import styled from 'styled-components';

import { Contact, Experience, Photo, Projects, Skills, WhoIAm } from './content';
import { SelectableCard } from './common';

export type PageLayoutProps = {};

export function PageLayout(props: PageLayoutProps) {
  return (
    <Layout>
      <PhotoContainer>
        <SelectableCard item="photo">
          <Photo background="almost-black" />
        </SelectableCard>
      </PhotoContainer>
      <ContactContainer>
        <SelectableCard item="contact">
          <Contact color="blue" />
        </SelectableCard>
      </ContactContainer>
      <WhoIAmContainer>
        <SelectableCard item="profile">
          <WhoIAm color="secondary" />
        </SelectableCard>
      </WhoIAmContainer>
      <SkillsContainer>
        <SelectableCard item="skills">
          <Skills color="secondary" />
        </SelectableCard>
      </SkillsContainer>
      <ExperienceContainer>
        <SelectableCard item="experience">
          <Experience color="gray-light" />
        </SelectableCard>
      </ExperienceContainer>
      <ProjectsContainer>
        <SelectableCard item="projects">
          <Projects color="gray-light" />
        </SelectableCard>
      </ProjectsContainer>
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

const PhotoContainer = styled.div`
  grid-area: photo;
  position: relative;

  // temp
  // border: .3mm solid salmon;
  /* height: 6cm; */
`;

const ContactContainer = styled.div`
  grid-area: contact;
`;

const WhoIAmContainer = styled.div`
  grid-area: whoiam;

  & > * {
    height: 100%;
  }
`;

const SkillsContainer = styled.div`
  grid-area: skills;

  & > * {
    height: 100%;
  }
`;

const ExperienceContainer = styled.div`
  grid-area: experience;
`;

const ProjectsContainer = styled.div`
  grid-area: projects;
`;
