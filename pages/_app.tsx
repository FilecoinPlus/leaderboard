// import 'antd/dist/antd.css';
// import '../styles/variables.less';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import type { AppProps } from 'next/app';

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
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
