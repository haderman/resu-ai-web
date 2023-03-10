import { useSelector } from 'react-redux';

import { Chip, Stack, Text } from '@/components/editor/common';
import { Color, Field, Size, SkillItem } from '@/shared/types';
import { apiState } from '@/state/api';

const selectors = apiState.resume.selectors;

export function Skills() {
  const data = useSelector(selectors.selectResumeProperty('skills.items', [] as SkillItem[]));
  const chipColor = useSelector(selectors.selectResumeProperty<Color>('skills.itemStyle.color', 'pink'));
  const chipSize = useSelector(selectors.selectResumeProperty<Size>('skills.itemStyle.size', 'small'));

  console.log('data', data);

  if (!Array.isArray(data)) {
    console.error('Invalid value type in Skills');
    return null;
  }

  return (
    <Card path="skills.cardStyle.background">
      <TitleContainer />
      <Chip.Container gap="medium">
        {data.map(({ title }) => {
          return (
            <Chip key={title} size={chipSize} color={chipColor}>
              {title}
            </Chip>
          );
        })}
      </Chip.Container>
    </Card>
  );
}

export function TitleContainer() {
  const text = useSelector(selectors.selectResumeProperty('skills.title.text', ''));
  const color = useSelector(selectors.selectResumeProperty<Color>('skills.title.color', 'pink'));

  return (
    <Text size="large" weight="bold" as="h2" color={color}>
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
