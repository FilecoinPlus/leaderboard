import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import _ from 'lodash';

import { getVerifiers } from '../lib/getVerifiers';

import { Homepage } from '../components/Homepage';

import { formatData } from '../utils/formats';

export const getStaticProps: GetStaticProps = async () => {
  const verifiers = await getVerifiers();
  const verifiersNormalizedAndFiltered = formatData(verifiers.filter((v) => v.status === 'ACTIVE'));

  return {
    props: {
      verifiers: verifiersNormalizedAndFiltered,
    },
  };
};

const App: NextPage = (pageProps: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Homepage verifiers={pageProps.verifiers} />;
};

export default App;
