import { useSelector } from 'react-redux';

import { Color, Experience, Size } from '@/shared/types';
import { Stack, Text } from '@/components/editor/common';
import { apiState } from '@/state/api';

import { Entry } from './components';

export function ExperienceComponent() {
  const entries = useSelector(apiState.resume.selectors.selectResumeProperty<Experience['entries']>(
    'experience.entries',
    []
  ));

  return (
    <Stack padding="large" gap="medium" color="primary">
      <Title />
      <Stack gap="large">
        {entries?.map((item, idx) =>
          <Entry key={idx} {...item} />
        )}
      </Stack>
    </Stack>
  );
}

function Title() {
  const text = useSelector(apiState.resume.selectors.selectResumeProperty('experience.title.text', ''));
  const color = useSelector(apiState.resume.selectors.selectResumeProperty<Color>('experience.title.color', 'white'));
  const size = useSelector(apiState.resume.selectors.selectResumeProperty<Size>('experience.title.size', 'large'));

  if (typeof text !== 'string') {
    console.error('Invalid value type in FullName');
    return null;
  }

  return (
    <Text as="h2" size={size} color={color} weight="bold">
      {text}
    </Text>
  );
}
