import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import type { Session } from 'next-auth';

import { wrapper } from '../state';

type AppPropsWithSession = AppProps<{ session: Session }>;

function MyApp({ Component, ...rest }: AppPropsWithSession) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ReduxProvider store={store}>
      <Component {...props.pageProps} />
    </ReduxProvider>
  );
}

export default MyApp;
