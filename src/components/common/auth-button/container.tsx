import { useSelector } from 'react-redux';

import { selectSession } from '@/state/session';
import { selectAuthProviders } from '@/state/auth-providers';

import { AuthButton } from './component';

/**
 * AuthButton connected to the store to get the session and auth providers
 * Use this to sign in and out
 * @returns
 */
export function AuthButtonContainer() {
  const session = useSelector(selectSession);
  const providers = useSelector(selectAuthProviders);

  return <AuthButton session={session} providers={providers} />;
}
