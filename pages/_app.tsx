import Head from 'next/head';
import { AuthProvider } from 'src/auth/useAuth';
import AppLayout from 'src/components/shared/AppLayout';
import { AppProps } from 'next/app';
import 'styles/index.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Travel Log</title>
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AuthProvider>
  );
}
