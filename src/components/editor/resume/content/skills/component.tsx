import * as React from 'react';
import { useSelector } from 'react-redux';

import { Chip, Stack, Text } from '@/components/editor/common';
import { Color, Field, Size, SkillItem } from '@/shared/types';
import { apiState } from '@/state/api';

const selectors = apiState.resume.selectors;

export function Skills() {
  const data = useSelector(selectors.selectResumeProperty('skills.items', [] as SkillItem[]));
  const chipColor = useSelector(selectors.selectResumeProperty<Color>('skills.itemStyle.color', 'pink'));
  const chipSize = useSelector(selectors.selectResumeProperty<Size>('skills.itemStyle.size', 'small'));

  if (!Array.isArray(data)) {
    console.error('Invalid value type in Skills');
    return null;
  }

  return (
    <SkillsComponent
      data={data}
      chipColor={chipColor}
      chipSize={chipSize}
    />
  );
}

type SkillsComponentProps = {
  data: Array<SkillItem>;
  chipColor: Color;
  chipSize: Size;
}

const SkillsComponent = React.memo(
  function SkillsComponentInner(props: SkillsComponentProps) {
    return (
      <Card path="skills.cardStyle.background">
        <MemoTitleContainer />
        <Chip.Container gap="medium">
          {props.data.map(({ title }) => {
            return (
              <MemoChip key={title} size={props.chipSize} color={props.chipColor}>
                {title}
              </MemoChip>
            );
          })}
        </Chip.Container>
      </Card>
    );
  }
);

const MemoChip = React.memo(Chip);
const MemoTitleContainer = React.memo(TitleContainer);

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
