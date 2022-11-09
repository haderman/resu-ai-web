import { useTheme } from 'styled-components';
import { IconBrandGithub, IconBrandTwitter, IconMail } from '@tabler/icons';

import { Color } from '@/shared/types';
import { Stack, Inline, Text } from '@/components/editor/common';

export type ContactProps = {
  color: Color
}

export function Contact(props: ContactProps) {
  const theme = useTheme();

  return (
    <Stack gap="medium" padding="medium" color={props.color}>
      <Text as="h2" size="large" weight="bold">
        Hader Cardon Suarez
      </Text>
      <Inline gap="medium" alignItems="center">
        <IconBrandGithub stroke={1} size={theme.fontSize.large} />
        <Text weight="light">haderman</Text>
      </Inline>
      <Inline gap="medium" alignItems="center">
        <IconMail stroke={1} size={theme.fontSize.large} />
        <Text weight="light">cardona.hader@gmail.com</Text>
      </Inline>
      <Inline gap="medium" alignItems="center">
        <IconBrandTwitter stroke={1} size={theme.fontSize.large} />
        <Text weight="light">haderman7</Text>
      </Inline>
    </Stack>
  );
}
