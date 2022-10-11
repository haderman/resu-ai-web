import { useSelector } from 'react-redux';

import { selectSession } from '@/state/session';

import { AuthButton } from './component';

/**
 * This is a test
 * @returns
 */
export function AuthButtonContainer() {
  const session = useSelector(selectSession);

  return <AuthButton session={session} />;
}
