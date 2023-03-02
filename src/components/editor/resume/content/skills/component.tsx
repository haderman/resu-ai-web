import { useSelector } from 'react-redux';

import { Chip, Stack, Text } from '@/components/editor/common';
import type { Color, SkillItem } from '@/shared/types';
import { apiState } from '@/state/api';

const selectors = apiState.skills.selectors;

export type SkillsProps = {
  data: SkillItem[]
  color: Color
  background: Color
}

export function Skills(props: SkillsProps) {
  return (
    <Stack gap="large" padding="medium" color={props.background}>
      <TitleContainer />
      <Chip.Container gap="medium">
        {props.data.map(({ title }) => {
          return (
            <Chip key={title} size="small" color={props.color}>
              {title}
            </Chip>
          );
        })}
      </Chip.Container>
    </Stack>
  );
}

export function TitleContainer() {
  const title = useSelector(selectors.selectTitle);

  return (
    <Text size="large" weight="bold" as="h2">
      {title.text}
    </Text>
  );
}
