import { useSelector } from 'react-redux';
import { IconBrandGithub, IconBrandTwitter, IconMail } from '@tabler/icons';

import { Color, Field } from '@/shared/types';
import { Stack, Inline, Text } from '@/components/editor/common';
import { apiState } from '@/state/api';

export function Contact() {
  return (
    <Card path="contact.cardStyle.background">
      <FullName path="basicInfo.fullName" />
      <ContactField path="contact.data.github" icon={IconBrandGithub} />
      <ContactField path="contact.data.email" icon={IconMail} />
      <ContactField path="contact.data.twitter" icon={IconBrandTwitter} />
    </Card>
  );
}

type FullNameProps = {
  path: Field['path'],
}

function FullName(props: FullNameProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, ''));

  if (typeof value !== 'string') {
    console.error('Invalid value type in FullName');
    return null;
  }

  return (
    <Text as="h2" size="large" weight="bold">
      {value}
    </Text>
  );
}

type ContactFieldProps = {
  path: Field['path'];
  icon: React.ComponentType<{ stroke: number; size: string }>;
}

function ContactField(props: ContactFieldProps) {
  const value = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, ''));
  const Icon = props.icon;

  if (typeof value !== 'string' || !value.trim()) {
    return null;
  }

  return (
    <Inline gap="medium" alignItems="center">
      <Icon stroke={1} size="1.5rem" />
      <Text weight="light">{value}</Text>
    </Inline>
  );
}

type CardProps = React.PropsWithChildren<{
  path: Field['path'],
}>

function Card(props: CardProps) {
  const color = useSelector(apiState.resume.selectors.selectResumeProperty(props.path, ''));

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
