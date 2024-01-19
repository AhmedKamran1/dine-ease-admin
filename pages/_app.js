// Store
import { Provider } from 'react-redux';
import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

// Styles
import { ThemeContextProvider } from '@/context/theme-provider';
import '@/styles/globals.css';

// Layout
import Layout from '@/components/layout/layout';

export default function App({ Component, pageProps, ...rest }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
        <ThemeContextProvider>
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  );
}
