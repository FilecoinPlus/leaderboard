import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Layout, Row, Typography, Divider, Input, Select } from 'antd';
import getVerifiersMock from '../mocks/getVerifiersMock';
import _ from 'lodash';
import moment from 'moment';

import {
  CustomLayoutHeader,
  CustomLayoutFooter,
  NotaryCard,
  NotaryTable,
} from '../components';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

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
  const humanizeDate = (seconds: any) =>
    moment.duration(seconds, 'seconds').humanize();
  const fetchFromApi = await fetch(
    // 'https://api.filplus.d.interplanetary.one/public/api/getVerifiers?limit=100&page=1'
    'https://api.filplus.d.interplanetary.one/public/api/getVerifiers',
    {
      headers: {
        'x-api-key': `299416a2-ebcb-46ba-8675-6a9a115d7ec0`,
      },
    }
  );
  const fetchFromApiRes = await fetchFromApi.json();

  // const notariesMock = getVerifiersMock;
  // const notariesData = notariesMock;
  const notariesData = fetchFromApiRes.data;

  let notaries = _.orderBy(
    notariesData,
    ['verifiedClientsCount', 'initialAllowance'],
    ['desc', 'desc']
  );

  const getAverageTtd = (secondsToDatacapList: any) => {
    if (_.isEmpty(secondsToDatacapList)) {
      // return null;
      // return {averageTtdInSeconds: 0, averageTtdInDuration: 0};
      return { averageTtdInSeconds: null, averageTtdInDuration: null };
    }

    const sumInSeconds = secondsToDatacapList.reduce(
      (previous: any, current: any) => previous + current
    );
    // console.log('sumInSeconds ->', sumInSeconds);

    const averageTtdInSeconds = Number(
      sumInSeconds / secondsToDatacapList.length
    ).toFixed();
    const averageTtdInDuration = humanizeDate(averageTtdInSeconds);

    const datesHumanized = secondsToDatacapList.map((v: any) =>
      humanizeDate(v)
    );
    // console.log('datesHumanized ->', datesHumanized);

    // console.log('averageTtdInDuration ->', averageTtdInDuration);
    // console.log('averageTtdInSeconds ->', averageTtdInSeconds);

    return {
      averageTtdInSeconds,
      averageTtdInDuration,
    };
  };

  const getNotariesWithMoreInfo = async (addressId: any) => {
    const res = await fetch(
      `https://api.filplus.d.interplanetary.one/public/api/getVerifiedClients/${addressId}`,
      {
        headers: {
          'x-api-key': `299416a2-ebcb-46ba-8675-6a9a115d7ec0`,
        },
      }
    );
    return res.json();
  };

  // const newNotariesArray: any = [];

  const newNotariesArray = notaries.map(async (notary) => {
    const { addressId } = notary;
    const newInfo = await getNotariesWithMoreInfo(addressId);
    // console.log(newInfo);

    const secondsToDatacapForEveryClient = newInfo.data
      ?.filter(
        (v: any) => !!v.createMessageTimestamp && !!v.issueCreateTimestamp
      )
      .filter((v: any) => v.createMessageTimestamp > v.issueCreateTimestamp)
      .map((v: any) => {
        return v.createMessageTimestamp - v.issueCreateTimestamp;
      });
    // console.log(
    //   'secondsToDatacapForEveryClient ->',
    //   secondsToDatacapForEveryClient
    // );

    const ttdAverages = getAverageTtd(secondsToDatacapForEveryClient);
    // console.log('ttdAverages ->', ttdAverages);

    return {
      ...notary,
      ttdAverages,
    };

    // console.log('getVerifierTtd ->', getVerifierTtd);
    // return ({ ...notary, averageTtd: 1 });
  });

  // newNotaries;
  // console.log(newNotaries);
  // console.log('newNotariesArray ->', await Promise.all(newNotariesArray));

  notaries = await Promise.all(newNotariesArray);
  // console.log('notariesNew ->', notariesNew);

  // console.log(await getNotariesWithMoreInfo());

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
          <Title style={{ textAlign: 'center' }}>Notaries</Title>
          <Divider
            style={{
              background: 'linear-gradient(145deg,#c65aff,#248dff)',
              height: '6px',
              // minWidth: '24px',
              // width: '24px'
            }}
          />

          <NotaryTable props={pageProps} />

          {/* Notary Cards */}
          {/* <Row
            className='notary-cards'
            gutter={16}
            style={{ rowGap: '20px' }}
            // justify='center'
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
                  datacapAvailable={prettyBytes(Number(notary.allowance), {
                    binary: true,
                  })}
                  // datacapAllocated={bytesToSize(Number((Number(notary.initialAllowance)-Number(notary.allowance))))}
                  datacapAllocated={prettyBytes(
                    Number(notary.initialAllowance) - notary.allowance,
                    { binary: true }
                  )}
                  url={/^https?/i.test(notary.auditTrail) && notary.auditTrail}
                />
              ))}
          </Row> */}
        </Content>

        <CustomLayoutFooter />
      </Layout>
    </div>
  );
};

export default App;
