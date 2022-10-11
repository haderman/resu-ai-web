import Link from 'next/link';
import styled from 'styled-components';
import { useSession, signIn, signOut } from 'next-auth/react';

export function Landing() {
  return (
    <Container>
      <main>
        <Title>Haderman</Title>
        <Link href="/editor">Editor</Link>
        <Login />
      </main>
    </Container>
  );
}

function Login() {
  const { data: session } = useSession();

  console.log('session -> ', session);

  if (session?.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
