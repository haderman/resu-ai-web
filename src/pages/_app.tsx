import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { wrapper } from '../state';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default MyApp;
