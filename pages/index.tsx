import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Layout, Row, Typography, Divider, Input, Select, Statistic, Card, Col, Space } from 'antd';
import { getVerifiers } from '../lib/getVerifiers';
import _ from 'lodash';
import { formatData } from '../utils/formats';

import { LayoutHeader, LayoutFooter, NotaryCard, NotaryTable } from '../components';
import verifier from '../lib/verifier';

const { Content } = Layout;
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
  console.log('pageProps.notaries ->', pageProps.notaries[0]);
  // return <></>;
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
