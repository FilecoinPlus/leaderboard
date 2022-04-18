import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Layout, Row, Typography, Divider, Input, Select } from 'antd';
import getVerifiersMock from '../mocks/getVerifiersMock';
import _ from 'lodash';
import moment from 'moment';
import { loadVerifiers } from '../lib/fetch-verifiers';
import { loadVerifiersMoreInfo } from '../lib/fetch-verifiers-more-info';
import { getAddressKeyById } from '../lib/getAddressKeyById';
import { getAddressIdByKey } from '../lib/getAddressIdByKey';

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

const humanizeDate = (seconds: any) =>
  moment.duration(seconds, 'seconds').humanize();

export const getStaticProps: GetStaticProps = async () => {
  // const verifiers = await loadVerifiers();
  // const notariesData = verifiers.data;
  const notariesData = getVerifiersMock.data;

  let notaries = _.orderBy(
    notariesData,
    ['verifiedClientsCount', 'initialAllowance'],
    ['desc', 'desc']
  );

  const getAverageTtd = (secondsToDatacapList: any) => {
    if (_.isEmpty(secondsToDatacapList)) {
      return { averageTtdInSeconds: null, averageTtdInDuration: null };
    }

    const sumInSeconds = secondsToDatacapList.reduce(
      (previous: any, current: any) => previous + current
    );

    const averageTtdInSeconds = Number(
      sumInSeconds / secondsToDatacapList.length
    ).toFixed();
    const averageTtdInDuration = humanizeDate(averageTtdInSeconds);

    const datesHumanized = secondsToDatacapList.map((v: any) =>
      humanizeDate(v)
    );

    return {
      averageTtdInSeconds,
      averageTtdInDuration,
    };
  };

  const newNotariesArray = notaries.map(async (notary) => {
    const newInfo = await loadVerifiersMoreInfo(notary.addressId);

    const secondsToDatacapForEveryClient = newInfo.data
      ?.filter(
        (v: any) => !!v.createMessageTimestamp && !!v.issueCreateTimestamp
      )
      .filter((v: any) => v.createMessageTimestamp > v.issueCreateTimestamp)
      .filter((v: any) => v.addressId != notary.addressId)
      .map((v: any) => {
        // console.log(`notary.addressId: ${notary.addressId} | v.addressId: ${v.addressId} | different: ${v.addressId != notary.addressId}`);
        return v.createMessageTimestamp - v.issueCreateTimestamp;
      });

    const ttdAverages = getAverageTtd(secondsToDatacapForEveryClient);
    // console.log('ttdAverages ->', ttdAverages);

    const addressId =
      notary.addressId ||
      (notary.address && (await getAddressIdByKey(notary.address)));
    const addressKey =
      notary.address ||
      (notary.addressId && (await getAddressKeyById(notary.addressId)));

    return {
      ...notary,
      addressId,
      address: addressKey,
      ttdAverages,
    };
  });

  notaries = await Promise.all(newNotariesArray);

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
