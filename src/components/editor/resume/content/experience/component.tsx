import { useSelector } from 'react-redux';

import { Color, Experience, Size } from '@/shared/types';
import { Stack, Text } from '@/components/editor/common';
import { apiState } from '@/state/api';

import { Entry } from './components';

const experience = [
  {
    title: 'Frontend Developer',
    company: 'Rose Technology',
    location: 'New York (remote)',
    description: [
      'Create components for mettrr project using React and Nextjs',
      'Update Somoglobal website to the new design using React and Gatsby',
    ],
    startDate: '2021',
    endDate: '2022',
  }, {
    title: 'Frontend Developer',
    company: 'Somoglobal',
    location: 'Medellín, Colombia',
    description: [
      'Create components for mettrr project using React and Nextjs',
      'Update Somoglobal website to the new design using React and Gatsby',
    ],
    startDate: '2021',
    endDate: '2021',
  }, {
    title: 'Frontend Developer',
    company: 'Firebase S.A.S',
    location: 'Medellín, Colombia (remote)',
    description: [
      'I built the entire front end for a web app using react and redux.',
      'I built an electron web app using react and redux.',
    ],
    startDate: '2016',
    endDate: '2018',
  }
];

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
