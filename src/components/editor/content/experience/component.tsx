import styled from 'styled-components';

import { Stack, Text } from '../../common';
import { Color } from '../../types';

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

export type ExperienceProps = {
  background: Color
  color: Color
}

export function Experience(props: ExperienceProps) {
  return (
    <Stack padding="large" gap="medium" color={props.background}>
      <Text as="h2" size="large" weight="bold">
        Experience
      </Text>
      <Stack gap="large">
        {experience.map((item, idx) =>
          <Item key={idx} {...item}  color={props.color} />
        )}
      </Stack>
    </Stack>
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
    <Stack padding="large" borderRadius="medium" color={props.color}>
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
      <StyledUl>
        {props.description.map((txt, idx) =>
          <li key={idx}>
            <Text size="small">{txt}</Text>
          </li>
        )}
      </StyledUl>
    </Stack>
  );
}

const StyledUl = styled.ul`
  margin: 0;
  padding-left: 8mm;
`;
