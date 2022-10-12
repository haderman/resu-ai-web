import Link from 'next/link';
import styled from 'styled-components';

import { AuthButtonContainer } from '@/components/common';

export function Home() {
  return (
    <Container>
      <Title>Haderman</Title>
      <Link href="/editor">Editor</Link>
    </Container>
  );
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Container = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
