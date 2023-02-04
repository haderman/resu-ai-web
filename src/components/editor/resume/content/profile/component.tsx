import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Color } from '@/shared/types';
import { Stack, Text } from '@/components/editor/common';

const selectors = apiState.profile.selectors;

export type ProfileProps = {
  color: Color
}

export function Profile(props: ProfileProps) {
  return (
    <Stack gap="large" padding="medium" color={props.color}>
      <TitleContainer />
      <DescriptionContainer />
    </Stack>
  );
}

function TitleContainer() {
  const title = useSelector(selectors.selectProfileTitle);

  return (
    <Text
      as="h2"
      size={title.size}
      weight="bold"
      align={title.align}
    >
      {title.text}
    </Text>
  );
}

function DescriptionContainer() {
  const description = useSelector(selectors.selectProfileDescription);

  return (
    <Text as="p">{description.text}</Text>
  );
}
