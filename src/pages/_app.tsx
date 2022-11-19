import * as React from 'react';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { wrapper } from '../state';
import { SyncSessionWithReduxStore } from '../components/common';

import '../styles/globals.css';
import '../styles/utility.css';
import '../themes/resume-theme.css';

type AppPropsWithSession = AppProps<{ session: Session }>;

function MyApp({ Component, ...rest }: AppPropsWithSession) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <SessionProvider session={rest.pageProps.session}>
      <ReduxProvider store={store}>
        <SyncSessionWithReduxStore />
        <Component {...props.pageProps} />
      </ReduxProvider>
    </SessionProvider>
  );
}

export default MyApp;
