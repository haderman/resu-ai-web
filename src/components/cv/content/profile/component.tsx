import { Stack, Text } from '../../common';
import { Color } from '../../types';

export type ProfileProps = {
  color: Color
}

export function Profile(props: ProfileProps) {
  return (
    <Stack gap="large" padding="medium" color={props.color}>
      <Text
        as="h2"
        size="large"
        weight="bold"
      >
        Profile
      </Text>
      <Text as="p">{description}</Text>
    </Stack>
  );
}

const description = `
I’m a Front End Developer and I am very adaptive to different ways of working.
I believe that the most important thing is to learn the basics very well and determine
the best approach for the team and the product overall. I love to have side projects
to experiment with new technologies and to practice new things that
I learn on my way. I really love what I do and I am continuously learning
and developing my skills.
`;

