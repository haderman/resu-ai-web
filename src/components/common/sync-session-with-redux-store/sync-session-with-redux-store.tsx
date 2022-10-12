import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from 'react-redux';

import { sessionSlice } from '@/state/session';

export function SyncSessionWithReduxStore() {
  const session = useSession();
  const store = useStore();

  React.useEffect(() => {
    store.dispatch(sessionSlice.actions.setSession(session.data));
  }, [session, store]);

  return null;
}
