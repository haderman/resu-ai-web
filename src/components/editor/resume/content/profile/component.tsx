import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { Alignment, Color, Field, Size } from '@/shared/types';
import { Stack, Text } from '@/components/editor/common';

const selectors = apiState.resume.selectors;

export function Profile() {
  return (
    <Card path="profile.cardStyle.background">
      <TitleContainer />
      <DescriptionContainer />
    </Card>
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


function TitleContainer() {
  const text = useSelector(selectors.selectResumeProperty<string>('profile.title.text', ''));
  const size = useSelector(selectors.selectResumeProperty<Size>('profile.title.size', 'medium'));
  const align = useSelector(selectors.selectResumeProperty<Alignment>('profile.title.align', 'left'));
  const color = useSelector(selectors.selectResumeProperty<Color>('profile.title.color', 'pink'));

  return (
    <Text
      as="h2"
      size={size}
      weight="bold"
      align={align}
      color={color}
    >
      {text}
    </Text>
  );
}

function DescriptionContainer() {
  const text = useSelector(selectors.selectResumeProperty('profile.description.text', ''));

  return (
    <Text as="p">{text}</Text>
  );
}
