import { Chip, Stack, Text } from '../common';
import { Color } from '../types';

export type SkillsProps = {
  color: Color
}

export function Skills(props: SkillsProps) {
  return (
    <Stack gap="large" padding="medium" color={props.color}>
      <Text size="large" weight="bold" as="h2">Skills</Text>
      <Chip.Container gap="medium">
        {STRONG_SKILLS.map((skill) =>
          <Chip key={skill} size="small" color="pink">
            {skill}
          </Chip>
        )}
      </Chip.Container>
    </Stack>
  );
}

const STRONG_SKILLS = ['Typescript', 'Css', 'Html', 'React'];

const SKILLS = ['C#', 'Python', 'Java', 'Go', 'Docker', 'Kubernetes'];
