import Image from 'next/image';
import styled from 'styled-components';

import { Stack, Inline, Text } from '../common';

export function Contact() {
  return (
    <StyledStack gap="medium" padding="medium" background="accent">
      <Text
        as="h2"
        color="accent-contrast"
        size="large"
        weight="bold"
      >
        Hader Cardon Suarez
      </Text>
      <Inline gap="medium">
        <Image src="/brand-github.svg" alt="github icon" width="18mm" height="18mm" />
        <Text weight="light" color="accent-contrast">haderman</Text>
      </Inline>
      <Inline gap="medium">
        <Image src="/mail.svg" alt="mail icon" width="18mm" height="18mm" />
        <Text weight="light" color="accent-contrast">cardona.hader@gmail.com</Text>
      </Inline>
      <Inline gap="medium">
        <Image src="/brand-twitter.svg" alt="twitter icon" width="18mm" height="18mm" />
        <Text weight="light" color="accent-contrast">haderman7</Text>
      </Inline>
    </StyledStack>
  );
}

const StyledStack = styled(Stack)`
  height: fit-content;
`;
