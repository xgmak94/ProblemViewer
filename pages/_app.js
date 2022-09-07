import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
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
        <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
      </Head>

      <Navbar />
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

export default MyApp;
