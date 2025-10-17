import * as React from 'react';
import { useSelector } from 'react-redux';
import { IconBrandGithub, IconWorld } from '@tabler/icons';

import { Color, Size, Projects } from '@/shared/types';
import { Chip, Inline, Stack, Text } from '@/components/editor/common';
import { apiState } from '@/state/api';

export type ProjectCardProps = Projects['items'][number];

export function ProjectCard(props: ProjectCardProps) {
  const itemBackground = useSelector(apiState.resume.selectors.selectResumeProperty<Color>(
    'projects.itemStyle.background',
    'secondary'
  ));
  const itemColor = useSelector(apiState.resume.selectors.selectResumeProperty<Color>(
    'projects.itemStyle.color',
    'primary'
  ));
  const itemSize = useSelector(apiState.resume.selectors.selectResumeProperty<Size>(
    'projects.itemStyle.size',
    'small'
  ));
  const skillsBackground = useSelector(apiState.resume.selectors.selectResumeProperty<Color>(
    'projects.skillsStyle.background',
    'pink'
  ));
  const skillsColor = useSelector(apiState.resume.selectors.selectResumeProperty<Color>(
    'projects.skillsStyle.color',
    'white'
  ));
  const skillsSize = useSelector(apiState.resume.selectors.selectResumeProperty<Size>(
    'projects.skillsStyle.size',
    'small'
  ));

  return (
    <Stack gap="medium" padding="medium" color={itemBackground} borderRadius="medium">
      <Text as="h3" weight="bold" size={itemSize} color={itemColor}>{props.name}</Text>
      <Text size={itemSize} color={itemColor}>{props.description}</Text>
      <Text as="h3" weight="bold" size={itemSize} color={itemColor}>Skills:</Text>
      <Chip.Container gap="small">
        {props.technologies.map((tech) =>
          <Chip
            key={tech}
            color={skillsBackground}
            size={skillsSize}
          >
            <Text color={skillsColor} size={skillsSize}>{tech}</Text>
          </Chip>
        )}
      </Chip.Container>
      {props.repository &&
        <Inline alignItems="center" gap="medium">
          <IconBrandGithub stroke={1} size="1rem" />
          <Text size={itemSize} weight="light" color={itemColor}>{props.repository}</Text>
        </Inline>
      }
      {props.website &&
        <Inline alignItems="center" gap="medium">
          <IconWorld stroke={1} size="1rem" />
          <Text size={itemSize} weight="light" color={itemColor}>{props.website}</Text>
        </Inline>
      }
    </Stack>
  );
}

const MemoizedProjectCard = React.memo(ProjectCard);
export { MemoizedProjectCard };