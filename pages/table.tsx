import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import { Divider, Typography } from 'antd';

import _ from 'lodash';

import { getVerifiers } from '../lib/getVerifiers';
import verifier from '../lib/verifier';

import Layout from '../components/Layout/Layout';
import { VerifierCard, VerifierTable } from '../components/Verifier';

import { formatData } from '../utils/formats';

const { Title } = Typography;

export const getStaticProps: GetStaticProps = async () => {
  const verifiers = await getVerifiers();

  return {
    props: {
      notaries: verifiers,
    },
  };
};

const App: NextPage = (pageProps: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Layout>
        <Title>All notaries</Title>
        <Divider
          style={{
            background: 'linear-gradient(145deg,#c65aff,#248dff)',
            height: '6px',
            // minWidth: '24px',
            // width: '24px'
          }}
        />

        <VerifierTable props={formatData(pageProps)} />
      </Layout>
    </>
  );
};

export default App;
