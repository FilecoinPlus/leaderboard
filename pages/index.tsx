import createFetch from '@vercel/fetch';

import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import _ from 'lodash';

import { getVerifiers } from '../lib/getVerifiers';

import Layout from '../components/Layout/Layout';
import { VerifierList } from '../components/Verifier';

import { Homepage } from '../components';
import { formatData } from '../utils/formats';

const fetch = createFetch();

export const getStaticProps: GetStaticProps = async () => {
  const verifiers = await getVerifiers();

  const verifiersWithAvatars = await Promise.all(
    verifiers
      .filter((v) => !v.name.includes('LDN'))
      .slice(0, 12)
      .map(async (verifier) => {
        const res = await fetch('https://joeschmoe.io/api/v1/random');
        const resBlob = Buffer.from(await res.buffer());
        const avatar = `data:${res.headers.get('content-type')};base64,${resBlob.toString('base64')}`;
        return { ...verifier, avatar };
      }),
  );

  return {
    props: {
      verifiers: verifiersWithAvatars,
    },
  };
};

const App: NextPage = (pageProps: InferGetStaticPropsType<typeof getStaticProps>) => {
  const verifiers = formatData(pageProps.verifiers);

  return <Homepage verifiers={verifiers} />;
};

export default App;
