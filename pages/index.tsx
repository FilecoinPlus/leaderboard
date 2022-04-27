import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Layout, Row, Typography, Divider, Input, Select, Statistic, Card, Col, Space } from 'antd';
import getVerifiersMock from '../mocks/getVerifiersMock';
import { getVerifiers } from '../lib/getVerifiersRefactored';
import _ from 'lodash';
import { loadVerifiers } from '../lib/fetch-verifiers';
import { loadVerifiersMoreInfo } from '../lib/fetch-verifiers-more-info';
import { getAddressKeyFromId } from '../lib/getAddressKeyFromId';
import { getAddressIdFromKey } from '../lib/getAddressIdFromKey';
import { formatData } from '../utils/formats';
import { getAverageTtd } from '../utils/general';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import { LayoutHeader, LayoutFooter, NotaryCard, NotaryTable } from '../components';
import verifier from '../lib/verifier';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export const getStaticProps: GetStaticProps = async () => {
  // const verifiers = await loadVerifiers();
  // const notariesData = verifiers.data;
  // const notariesData = getVerifiersMock.data;
  // const notariesData = {...await getVerifiers, verifiedClientsCount: 0, initialAllowance: 0, };
  let notariesData = await getVerifiers();
  notariesData = _.orderBy(notariesData, ['issueNumber'], ['desc']);
  notariesData = _.uniqBy(notariesData, 'addressId');
  notariesData = notariesData.map((v) => ({
    ...v,
    verifiedClientsCount: v.fromInterplanetaryOneApi.verifiedClientsCount || 0,
    initialAllowance: v.fromInterplanetaryOneApi.initialAllowance || 0,
    allowance: v.fromInterplanetaryOneApi.allowance || 0,
    allowanceArray: v.fromInterplanetaryOneApi.allowanceArray,
    auditTrail: v.fromInterplanetaryOneApi.auditTrail,
  }));
  // console.log('notariesData ->', notariesData);

  const orderVerifiers = (verifiers) =>
    _.orderBy(notariesData, ['verifiedClientsCount', 'initialAllowance'], ['desc', 'desc']);
  let notaries = orderVerifiers(notariesData);

  notaries = await Promise.all(
    notaries.map(async (notary) => {
      const verifiedClients = await verifier.getVerifiedClients(notary.addressId);
      const addressId = notary.addressId || (notary.address && (await getAddressIdFromKey(notary.address))) || null;
      const addressKey = notary.address || (notary.addressId && (await getAddressKeyFromId(notary.addressId))) || null;

      const removeInvalidTimestamps = (verifier: any) =>
        verifier
          .filter((v: any) => !!v.createMessageTimestamp)
          .filter((v: any) => !!v.issueCreateTimestamp)
          .filter((v: any) => v.createMessageTimestamp > v.issueCreateTimestamp)
          .filter((v: any) => v.addressId != notary.addressId);

      const secondsToDatacapForEveryClient = removeInvalidTimestamps(verifiedClients.data).map((v: any) => {
        return v.createMessageTimestamp - v.issueCreateTimestamp;
      });

      return {
        ...notary,
        addressId,
        addressKey,
        ttdAverages: getAverageTtd(secondsToDatacapForEveryClient),
      };
    }),
  );

  return {
    props: {
      notaries,
    },
  };
};

const App: NextPage = (pageProps: InferGetStaticPropsType<typeof getStaticProps>) => {
  // console.log('pageProps.notaries.slice(0,1) ->', pageProps.notaries.slice(0, 1));

  return (
    <div className='App'>
      <Layout className='layout'>
        <LayoutHeader />

        <Content style={{ padding: '45px 45px' }}>
          {/* <Space><div style={{margin: '20px'}}></div></Space> */}
          <Title>All notaries</Title>
          <Divider
            style={{
              background: 'linear-gradient(145deg,#c65aff,#248dff)',
              height: '6px',
              // minWidth: '24px',
              // width: '24px'
            }}
          />

          <NotaryTable props={formatData(pageProps)} />

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

        <LayoutFooter />
      </Layout>
    </div>
  );
};

export default App;
