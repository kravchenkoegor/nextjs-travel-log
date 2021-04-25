import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Travel Log</title>
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
