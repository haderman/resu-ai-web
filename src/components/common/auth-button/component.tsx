import { SessionState } from '@/state/session';
import { signIn, signOut } from 'next-auth/react';

export type AuthButtonProps = {
  session: SessionState
}

export function AuthButton(props: AuthButtonProps) {
  if (props.session.isSessionActive) {
    return <button onClick={() => signOut()}>Sign out</button>;
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}
