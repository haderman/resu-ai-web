import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { getTheme, CvTheme } from './themes';
import { Contact, Experience, Photo, Projects, Skills, WhoIAm } from './content';

export type PageLayoutProps = {
  theme: CvTheme
  // photo: string;
  // description: string;
  // strongSkills: string[];
  // skills: string[];
  // twitter: string;
  // github: string;
  // email: string;
  // experience: {
  //   title: string;
  //   company: string;
  //   description: string;
  //   startDate: string;
  //   endDate: string;
  // }[];
};

export function PageLayout(props: PageLayoutProps) {
  const theme = React.useMemo(() => getTheme(props.theme), [props.theme]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <PhotoContainer>
            <Photo background="almost-black" />
          </PhotoContainer>
          <ContactContainer>
            <Contact color="blue" />
          </ContactContainer>
          <WhoIAmContainer>
            <WhoIAm color="secondary" />
          </WhoIAmContainer>
          <SkillsContainer>
            <Skills color="secondary" />
          </SkillsContainer>
          <ExperienceContainer>
            <Experience color="gray-light" />
          </ExperienceContainer>
          <ProjectsContainer>
            <Projects color="gray-light" />
          </ProjectsContainer>
        </Layout>
      </ThemeProvider>
    </>
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
