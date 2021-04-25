import Head from 'next/head';
import { AppProps } from 'next/app';
import AppLayout from 'src/components/shared/AppLayout';
import 'styles/index.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Travel Log</title>
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}
