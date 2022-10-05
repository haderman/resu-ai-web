import { Chip, Stack, Text } from '@/components/cv/common';
import { SkillsProps } from './types';

export function Skills(props: SkillsProps) {
  return (
    <Stack gap="large" padding="medium" color={props.background}>
      <Text size="large" weight="bold" as="h2">Skills</Text>
      <Chip.Container gap="medium">
        {props?.data?.map?.(({ name }) => {
          return (
            <Chip key={name} size="small" color={props.color}>
              {name}
            </Chip>
          );
        })}
      </Chip.Container>
    </Stack>
  );
}
