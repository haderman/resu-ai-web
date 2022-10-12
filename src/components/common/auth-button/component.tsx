import { signIn, signOut } from 'next-auth/react';

import { SessionState } from '@/state/session';
import { AuthProvidersState } from '@/state/auth-providers';

export type AuthButtonProps = {
  session: SessionState
  providers: AuthProvidersState
}

export function AuthButton(props: AuthButtonProps) {
  if (props.providers.github === null) {
    return null;
  }

  if (props.session.isSessionActive) {
    return <button onClick={() => signOut({ redirect: false })}>Sign out</button>;
  }

  return (
    <button onClick={() => signIn(props.providers.github?.id)}>
      Sign in
    </button>
  );
}
