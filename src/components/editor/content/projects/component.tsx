import { useTheme } from 'styled-components';
import { IconBrandGithub, IconWorld } from '@tabler/icons';

import { Color } from '@/shared/types';

import { Chip, Inline, Stack, Text } from '../../common';

const PROJECTS: Project[] = [
  {
    name: 'Personal Site',
    description: 'Personal site developed with Gatsby',
    technologies: ['Gatsby', 'React'],
    repository: '/haderman/haderman-site',
    website: 'https://haderman.netlify.app',
  }, {
    name: 'COVID-19 Tracker',
    description: 'COVID-19 Tracker developed with React',
    technologies: ['NextJS', 'React', 'GraphQL'],
    repository: '/haderman/nextjs-covid-19',
    website: 'https://covidx19.vercel.app',
  }, {
    name: 'Woki',
    description: 'Google Chrome extension to manage the tabs',
    technologies: ['Elm', 'Javascript'],
    repository: '/haderman/woki-extension',
  },
];

export type ProjectsProps = {
  color: Color
  background: Color
  skillsColor: Color
}

export function Projects(props: ProjectsProps) {
  return (
    <Stack padding="large" gap="medium" color={props.background}>
      <Text as="h2" size="large" weight="bold">
        Side Projects
      </Text>
      <Inline gap="medium" childrenWithSameWidth fitContent>
        {PROJECTS.map((project) =>
          <ProjectCard
            key={project.name}
            color={props.color}
            skillsColor={props.skillsColor}
            {...project}
          />
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

type ProjectCardProps = Project & {
  color: Color
  skillsColor: Color
}

function ProjectCard(props: ProjectCardProps) {
  const theme = useTheme();

  return (
    <Stack gap="medium" padding="medium" color={props.color} borderRadius="medium">
      <Text as="h3" weight="bold" size="small">{props.name}</Text>
      <Text size="small">{props.description}</Text>
      <Text as="h3" weight="bold" size="small">Skills:</Text>
      <Chip.Container gap="small">
        {props.technologies.map((tech) =>
          <Chip key={tech} color={props.skillsColor}>{tech}</Chip>
        )}
      </Chip.Container>
      <Inline alignItems="center" gap="medium">
        <IconBrandGithub stroke={1} size={theme.fontSize.medium} />
        <Text size="small" weight="light">{props.repository}</Text>
      </Inline>
      {props.website &&
        <Inline alignItems="center" gap="medium">
          <IconWorld stroke={1} size={theme.fontSize.medium} />
          <Text size="small" weight="light">{props.website}</Text>
        </Inline>
      }
    </Stack>
  );
}

