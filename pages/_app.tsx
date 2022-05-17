import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/sass/global.scss';

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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
