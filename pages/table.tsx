import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import { Divider, Typography } from 'antd';

import _ from 'lodash';

import { getVerifiers } from '../lib/getVerifiers';
import verifier from '../lib/verifier';

import Layout from '../components/Layout/Layout';
import { VerifierTable } from '../components/Verifier';

import { formatData } from '../utils/formats';

const { Title } = Typography;

export const getStaticProps: GetStaticProps = async () => {
  const verifiers = await getVerifiers();

  return {
    props: {
      verifiers,
    },
  };
};

const App: NextPage = (pageProps: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { verifiers } = pageProps.props;

  return (
    <>
      <Layout>
        <Title>Notaries</Title>
        <Divider
          style={{
            // background: 'linear-gradient(145deg,#c65aff,#248dff)',
            height: '6px',
            borderTopWidth: '2px',
            // minWidth: '24px',
            // width: '24px'
          }}
        />

        <VerifierTable props={formatData(verifiers)} />
      </Layout>
    </>
  );
};

export default App;
