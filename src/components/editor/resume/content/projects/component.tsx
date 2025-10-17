import { useSelector } from 'react-redux';

import { Color, Projects as ProjectsType, Size } from '@/shared/types';
import { Inline, Stack, Text } from '@/components/editor/common';
import { apiState } from '@/state/api';

import { ProjectCard } from './components';

export function Projects() {
  const items = useSelector(apiState.resume.selectors.selectResumeProperty<ProjectsType['items']>(
    'projects.items',
    []
  ));
  const cardBackground = useSelector(apiState.resume.selectors.selectResumeProperty<Color>(
    'projects.cardStyle.background',
    'primary'
  ));

  return (
    <Stack padding="large" gap="medium" color={cardBackground}>
      <Title />
      <Inline gap="medium" childrenWithSameWidth fitContent>
        {items?.map((project, idx) =>
          <ProjectCard
            key={idx}
            {...project}
          />
        )}
      </Inline>
    </Stack>
  );
}

function Title() {
  const text = useSelector(apiState.resume.selectors.selectResumeProperty('projects.title.text', ''));
  const color = useSelector(apiState.resume.selectors.selectResumeProperty<Color>('projects.title.color', 'white'));
  const size = useSelector(apiState.resume.selectors.selectResumeProperty<Size>('projects.title.size', 'large'));

  if (typeof text !== 'string') {
    console.error('Invalid value type in Title');
    return null;
  }

  return (
    <Text as="h2" size={size} color={color} weight="bold">
      {text}
    </Text>
  );
}

