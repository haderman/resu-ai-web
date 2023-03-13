import { useSelector } from 'react-redux';

import { Stack, Text } from '@/components/editor/common';
import { apiState } from '@/state/api';
import { Color, Experience, LocationType } from '@/shared/types';

export type EntryProps = Experience['entries'][number];

export function Entry(props: EntryProps) {
  return (
    <Card>
      <Text as="h3" color="blue" weight="bold">
        {props.startDate} - {props.endDate}
      </Text>
      <Text as="h4">
        <Text>{props.title} at</Text>
        {' '}
        <Text weight="bold">{props.company}</Text>
        {', '}
        <Text size="small">{props.location}</Text>
        {' - '}
        <Text size="small">
          ({LocationType.toFriendlyString(props.locationType)})
        </Text>
      </Text>
      <Text as="p">
        {props.description}
      </Text>
    </Card>
  );
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
