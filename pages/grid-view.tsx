import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import _ from 'lodash';

import { getVerifiers } from '../lib/getVerifiers';

import { GridViewNew } from '../components/GridViewNew';

import { formatData } from '../utils/formats';

export const getStaticProps: GetStaticProps = async () => {
  const verifiers = await getVerifiers();

  return {
    props: {
      verifiers: verifiers,
    },
  };
};

const App: NextPage = (pageProps: InferGetStaticPropsType<typeof getStaticProps>) => {
  const verifiers = formatData(pageProps.verifiers.filter((verifier) => verifier.status === 'ACTIVE'));

  return <GridViewNew verifiers={verifiers} />;
};

export default App;
