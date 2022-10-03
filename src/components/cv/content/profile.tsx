import { selectColor } from '@/state/profile';
import { useSelector, useStore } from 'react-redux';

import { profileSlice } from '@/state/profile';
import { Stack, Text } from '../common';
import { ColorSelector } from '../controls';
import { WithTheme } from '../themes';
import { Color } from '../types';

const { actions } = profileSlice;

export type ProfileProps = {
  color: Color
}

export function Profile(props: ProfileProps) {
  const color = useSelector(selectColor);

  return (
    <Stack gap="large" padding="medium" color={color}>
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

Profile.Options = function ProfileOptions() {
  return (
    <WithTheme>
      <ColorSelectorContainer />
    </WithTheme>
  );
};

function ColorSelectorContainer() {
  const store = useStore();
  const color = useSelector(selectColor);

  function handleColorChange(color: Color) {
    store.dispatch(actions.setColor(color));
  }

  return <ColorSelector value={color} onChange={handleColorChange} />;
}



const description = `
I’m a Front End Developer and I am very adaptive to different ways of working.
I believe that the most important thing is to learn the basics very well and determine
the best approach for the team and the product overall. I love to have side projects
to experiment with new technologies and to practice new things that
I learn on my way. I really love what I do and I am continuously learning
and developing my skills.
`;

