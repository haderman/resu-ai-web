import { Chip, Stack, Text } from '@/components/editor/common';
import type { Color, SkillItem } from '@/shared/types';

export type SkillsProps = {
  data: SkillItem[]
  color: Color
  background: Color
}

export function Skills(props: SkillsProps) {
  return (
    <Stack gap="large" padding="medium" color={props.background}>
      <Text size="large" weight="bold" as="h2">Skills</Text>
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
