import { useEffect } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../components/header/Navbar';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
