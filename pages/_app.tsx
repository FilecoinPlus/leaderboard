import type { AppProps } from 'next/app';
import Head from 'next/head';

// import 'antd/dist/antd.css';
import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';

import '@ant-design/aliyun-theme/index.less';

import '../styles/variables.less';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Leaderboard | Filecoin Plus</title>
        <meta
          name='description'
          content='The leaderboard for Filecoin Plus Notaries!'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
