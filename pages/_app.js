//Store
import { Provider } from 'react-redux';
import { wrapper } from '@/store/store';
import { ThemeContextProvider } from '@/context/theme-provider';

//Styles
import '@/styles/globals.css';

//Layout
import Layout from '@/components/layout/layout';

export default function App({ Component, pageProps, ...rest }) {
  const { store } = wrapper.useWrappedStore(rest);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </ThemeContextProvider>
    </Provider>
  );
}
