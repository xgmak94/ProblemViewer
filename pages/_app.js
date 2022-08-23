import { useEffect } from 'react';
import Head from 'next/head';
import { GlobalContextProvider } from '../components/GlobalStore';
import Navbar from '../components/header/Navbar';
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <GlobalContextProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

export default MyApp;
