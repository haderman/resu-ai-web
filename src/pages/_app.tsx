import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

import { wrapper } from '../state';

type AppPropsWithSession = AppProps<{ session: Session }>;

function MyApp({ Component, ...rest }: AppPropsWithSession) {
  const { session } = rest.pageProps;
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <Component {...props.pageProps} />
      </ReduxProvider>
    </SessionProvider>
  );
}

export default MyApp;
