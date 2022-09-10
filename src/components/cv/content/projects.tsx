import Image from 'next/image';

import { Chip, Inline, Stack, Text } from '../common';

const PROJECTS: Project[] = [
  {
    name: 'Personal Site',
    description: 'Personal site developed with Gatsby',
    technologies: ['Gatsby', 'React'],
    repository: 'https://github.com/haderman/haderman-site',
    website: 'https://haderman.netlify.app',
  }, {
    name: 'COVID-19 Tracker',
    description: 'COVID-19 Tracker developed with React',
    technologies: ['NextJS', 'React', 'GraphQL'],
    repository: 'https://github.com/haderman/nextjs-covid-19',
    website: 'https://covidx19.vercel.app',
  }, {
    name: 'Woki',
    description: 'Google Chrome extension to manage the tabs',
    technologies: ['Elm', 'Javascript'],
    repository: 'https://github.com/haderman/woki-extension',
  },
];

export function Projects() {
  return (
    <Stack padding="large">
      <Text as="h2" size="large" weight="bold">
        Side Projects
      </Text>
      <Inline gap="medium">
        {PROJECTS.map((project) =>
          <ProjectCard key={project.name} {...project} />
        )}
      </Inline>
    </Stack>
  );
}

type Project = {
  name: string
  description: string
  technologies: string[]
  repository?: string
  website?: string
}

type ProjectCardProps = Project

function ProjectCard(props: ProjectCardProps) {
  return (
    <Stack gap="medium" padding="medium" background="secondary" borderRadius="medium">
      <Text as="h3" weight="bold" size="small">{props.name}</Text>
      <Text size="small">{props.description}</Text>
      <Text as="h3" weight="bold" size="small">Skills:</Text>
      <Inline gap="small">
        {props.technologies.map((tech) =>
          <Chip key={tech}>{tech}</Chip>
        )}
      </Inline>
      <Inline>
        <Image src="/brand-github.svg" alt="github icon" width="18mm" height="18mm" />
        <Text size="small" weight="light">{props.repository}</Text>
      </Inline>
      {props.website &&
        <Inline>
          <Image src="/brand-github.svg" alt="github icon" width="18mm" height="18mm" />
          <Text size="small" weight="light">{props.website}</Text>
        </Inline>
      }
    </Stack>
  );
}

