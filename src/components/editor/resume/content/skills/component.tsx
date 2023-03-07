import { useSelector } from 'react-redux';

import { Chip, Stack, Text } from '@/components/editor/common';
import { Color, Field, SkillItem } from '@/shared/types';
import { apiState } from '@/state/api';

const selectors = apiState.resume.selectors;

export function Skills() {
  const data = useSelector(selectors.selectResumeProperty('skills.items', [] as SkillItem[]));

  console.log('data', data);

  return (
    <Card path="skills.cardStyle.background">
      <TitleContainer />
      {/* <Chip.Container gap="medium">
        {props.data.map(({ title }) => {
          return (
            <Chip key={title} size="small" color={props.color}>
              {title}
            </Chip>
          );
        })}
      </Chip.Container> */}
    </Card>
  );
}

export function TitleContainer() {
  const text = useSelector(selectors.selectResumeProperty('skills.title.text', ''));

  return (
    <Text size="large" weight="bold" as="h2">
      {text}
    </Text>
  );
}

type CardProps = React.PropsWithChildren<{
  path: Field['path'],
}>


function Card(props: CardProps) {
  const color = useSelector(selectors.selectResumeProperty(props.path, ''));

  if (!Color.isColor(color)) {
    console.error('Invalid value type in Card');
    return null;
  }

  return (
    <Stack gap="medium" padding="medium" color={color}>
      {props.children}
    </Stack>
  );
}
