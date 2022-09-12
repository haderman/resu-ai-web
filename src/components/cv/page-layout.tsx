import styled, { ThemeProvider } from 'styled-components';

import { getTheme } from './themes';
import { Contact, Experience, Photo, Projects, Skills, WhoIAm } from './content';

export type PageLayoutProps = {
  photo: string;
  description: string;
  strongSkills: string[];
  skills: string[];
  twitter: string;
  github: string;
  email: string;
  experience: {
    title: string;
    company: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
};

export function PageLayout(props: PageLayoutProps) {
  const theme = getTheme('default');

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <PhotoContainer>
          <Photo />
        </PhotoContainer>
        <ContactContainer>
          <Contact />
        </ContactContainer>
        <WhoIAmContainer>
          <WhoIAm />
        </WhoIAmContainer>
        <SkillsContainer>
          <Skills />
        </SkillsContainer>
        <ExperienceContainer>
          <Experience />
        </ExperienceContainer>
        <ProjectsContainer>
          <Projects />
        </ProjectsContainer>
      </Layout>
    </ThemeProvider>
  );
}

const BaseLayout = styled.div`
  position: relative;
  height: 297mm;
  width: 210mm;
  background: white;
  color: hsl(0, 0%, 10%);

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
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
  background-color: ${props => props.theme.bg.complementary};

  // temp
  // border: .3mm solid salmon;
  height: 6cm;
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
