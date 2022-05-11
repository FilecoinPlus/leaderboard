// import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

import '../styles/variables.less';

function createApolloClient() {
  const link = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    // ssrMode: true,
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Filecoin Plus - Leaderboard</title>
        <meta
          name='description'
          content='Filecoin Plus - Leaderboard App'
        />
      </Head>
      <ApolloProvider client={createApolloClient()}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
