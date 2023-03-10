import { useSelector } from 'react-redux';

import { Stack, Text } from '@/components/editor/common';
import { apiState } from '@/state/api';
import { Color } from '@/shared/types';

export type EntryProps = {
  title: string;
}

export function Entry() {
  return (
    <Card>
      <Text as="h3" color="blue" weight="bold">
        startDate - endDate
      </Text>
      <Text as="h4">
        <Text>title at</Text>
        {' '}
        <Text weight="bold">company</Text>
        {' - '}
        <Text size="small">location</Text>
      </Text>
      <ul>
        {/* {props.description.map((txt, idx) =>
          <li key={idx}>
            <Text size="small">{txt}</Text>
          </li>
        )} */}
      </ul>
    </Card>
  );
  // return (
  //   <Stack padding="medium" borderRadius="medium" color={props.color} className={styles.card}>
  //     <Text as="h3" color="blue" weight="bold">
  //       {props.startDate} - {props.endDate}
  //     </Text>
  //     <Text as="h4">
  //       <Text>{props.title} at</Text>
  //       {' '}
  //       <Text weight="bold">{props.company}</Text>
  //       {' - '}
  //       <Text size="small">{props.location}</Text>
  //     </Text>
  //     <ul>
  //       {props.description.map((txt, idx) =>
  //         <li key={idx}>
  //           <Text size="small">{txt}</Text>
  //         </li>
  //       )}
  //     </ul>
  //   </Stack>
  // );
}

function Card(props: React.PropsWithChildren<{}>) {
  const color = useSelector(apiState.resume.selectors.selectResumeProperty<Color>('experience.entryStyle.background', 'secondary'));

  if (!Color.isColor(color)) {
    console.error('Invalid value type in Card');
    return null;
  }

  return (
    <Stack padding="medium" borderRadius="medium" color={color}>
      {props.children}
    </Stack>
  );
}
