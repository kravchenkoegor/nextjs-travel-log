import { useMemo } from 'react';
import Head from 'next/head';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { AuthProvider } from 'src/auth/useAuth';
import AppLayout from 'src/components/shared/AppLayout';
import { AppProps } from 'next/app';
import 'styles/index.scss';

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: '/api/graphql', credentials: 'same-origin' }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network'
      }
    }
  });
}

// export function useApollo() {
//   const client = useMemo(() => createApolloClient(), []);
//   return client;
// }

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useMemo(() => createApolloClient(), []);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Head>
          <title>Travel Log</title>
          <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        </Head>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </AuthProvider>
    </ApolloProvider>
  );
}
