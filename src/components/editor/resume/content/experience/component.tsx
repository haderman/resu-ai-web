import { Color, Size } from '@/shared/types';
import { Stack, Text } from '@/components/editor/common';

import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { apiState } from '@/state/api';

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

export function Experience() {
  return (
    <Stack padding="large" gap="medium" color="primary">
      <Title />
      <Stack gap="large">
        {experience.map((item, idx) =>
          <Item key={idx} {...item}  color="secondary" />
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

type ItemProps = {
  title: string;
  company: string;
  location: string;
  description: string[];
  startDate: string;
  endDate: string;
  color: Color;
}

function Item(props: ItemProps) {
  return (
    <Stack padding="medium" borderRadius="medium" color={props.color} className={styles.card}>
      <Text as="h3" color="blue" weight="bold">
        {props.startDate} - {props.endDate}
      </Text>
      <Text as="h4">
        <Text>{props.title} at</Text>
        {' '}
        <Text weight="bold">{props.company}</Text>
        {' - '}
        <Text size="small">{props.location}</Text>
      </Text>
      <ul>
        {props.description.map((txt, idx) =>
          <li key={idx}>
            <Text size="small">{txt}</Text>
          </li>
        )}
      </ul>
    </Stack>
  );
}
