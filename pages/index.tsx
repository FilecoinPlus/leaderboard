import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import {
  Layout,
  Row,
} from 'antd';
import prettyBytes from 'pretty-bytes';
import getVerifiersMock from './getVerifiersMock';
import _ from 'lodash';

import {
  CustomLayoutHeader,
  CustomLayoutFooter,
  NotaryCard,
} from '../components'

const { Content } = Layout;

type Notary = {
  name: string;
  organization: string;
  address: string;
  addressId: string;
  verifiedClientsCount: number;
  allowance: number;
  initialAllowance: number;
  auditTrail: string;
};

export const getStaticProps: GetStaticProps = async () => {
  // const res = await fetch(
  //   'https://api.filplus.d.interplanetary.one/api/getVerifiers?limit=10&page=1'
  //   // 'https://api.filplus.d.interplanetary.one/api/getVerifiers'
  // );
  // const notaries = await res.json();

  const notariesMock = getVerifiersMock;
  const notaries = _.orderBy(notariesMock.data, ['verifiedClientsCount', 'initialAllowance'], ['desc', 'desc']);
  // console.log('notariesSorted ->', notariesSorted);

  // console.log(notaries);

  return {
    props: {
      notaries,
    },
  };
};

const App: NextPage = (
  pageProps: InferGetStaticPropsType<typeof getStaticProps>
) => {
  // console.log(pageProps);

  return (
    <div className='App'>
      <Head>
        <title>Filecoin Plus - Leaderboard</title>
        <meta name='description' content='Filecoin Plus - Leaderboard App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout className='layout'>
        <CustomLayoutHeader />
        {/* <Sider>Sider</Sider> */}

        <Content style={{ padding: '50px 50px' }}>

          <Row
            className='notary-cards'
            gutter={16}
            style={{ rowGap: '20px' }}
            justify='center'
          >
            {pageProps.notaries
              .filter((v: Notary) => !!v.name)
              .map((notary: Notary, index: any) => (
                // console.log(notary)
                // console.log(bytesToSize(notary.initialAllowance)),
                // console.log(/^https?/i.test(notary.auditTrail)),
                <NotaryCard
                  key={index}
                  name={notary.name}
                  organization='Organization'
                  addressId={notary.addressId}
                  clients={notary.verifiedClientsCount}
                  datacapAvailable={prettyBytes(Number(notary.allowance), {binary: true})}
                  // datacapAllocated={bytesToSize(Number((Number(notary.initialAllowance)-Number(notary.allowance))))}
                  datacapAllocated={prettyBytes((Number(notary.initialAllowance)-(notary.allowance)), {binary: true})}
                  url={/^https?/i.test(notary.auditTrail) && notary.auditTrail}
                />
              ))}
          </Row>
        </Content>

        <CustomLayoutFooter />
      </Layout>
    </div>
  );
};

export default App;
