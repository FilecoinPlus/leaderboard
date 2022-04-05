import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
// import fetch from '@vercel/fetch';
// import Image from 'next/image';
// import styles from '../styles/App.module.css'
import {
  Card,
  Avatar,
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Divider,
  Space,
  Statistic,
  Typography,
  Image,
} from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  GlobalOutlined,
  UserOutlined,
} from '@ant-design/icons';
import prettyBytes from 'pretty-bytes';

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { Title, Text, Link } = Typography;

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
  const res = await fetch(
    'https://api.filplus.d.interplanetary.one/api/getVerifiers?limit=50&page=1'
  );
  const notaries = await res.json();

  // console.log(notaries);

  return {
    props: {
      notaries,
    },
  };
};

const CustomLayoutHeader = () => (
  <Header className='header CustomLayoutHeader'>
    <Image
      className='logo'
      // width={34}
      height={34}
      src='/filecoin-plus-leaderboard-logo-new.png'
      alt='Filecoin Plus Leaderboard logo'
      title='Filecoin Plus Leaderboard'
      preview={false}
    />
  </Header>
);

const CustomLayoutFooter = () => (
  <div className='CustomLayoutFooter'>
    <Space direction='vertical' style={{ display: 'flex', flexGrow: 1 }}>
      <div></div>
    </Space>
    <Footer style={{ textAlign: 'center' }}>
      &copy; Filecoin Foundation
      <Divider type='vertical' />
      <a href='#'>Terms</a>
      <Divider type='vertical' />
      <a href='#'>Privacy</a>
      <Divider type='vertical' />
      <a href='#'>Status</a>
      <Divider type='vertical' />
      <a href='#'>Docs</a>
      <Divider type='vertical' />
      <a href='#'>About</a>
    </Footer>
  </div>
);

const GeneralStatsCard = (props: any) => (
  <div className='GeneralStatsCard'>
    <Divider plain>General</Divider>
    <Row gutter={8} justify='space-around'>
      <Col flex='auto'>
        <Card size='small'>
          <Statistic
            title='Clients'
            value={props.clients}
            valueStyle={{ fontSize: '1rem' }}
          />
        </Card>
      </Col>
      <Col flex='auto'>
        <Card size='small'>
          <Statistic
            title='Average TTD'
            value='120 days'
            valueStyle={{ fontSize: '1rem' }}
            // prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
    </Row>
  </div>
);

const DatacapStatsCard = (props: any) => (
  <div className='DatacapStatsCard'>
    <Divider plain>DataCap</Divider>

    <Row gutter={8} justify='space-around'>
      <Col flex='auto'>
        <Card size='small'>
          <Statistic
            title='Available'
            value={props.datacapAvailable}
            valueStyle={{ fontSize: '1rem' }}
            // suffix='TiB'
          />
        </Card>
      </Col>

      <Col flex='auto'>
        <Card size='small'>
          <Statistic
            title='Allocated'
            value={props.datacapAllocated}
            valueStyle={{ fontSize: '1rem' }}
            // prefix={<ArrowUpOutlined />}
            // suffix='TiB'
          />
        </Card>
      </Col>
    </Row>
  </div>
);

const NotaryCard = (props: any) => (
  <Col className='notary-card' span={4}>
    <Col
      className='NotaryCard'
      style={{ minWidth: '360px', maxWidth: '400px', width: '360px' }}
    >
      <Card
        bordered={false}
        actions={[
          <Text key='location' style={{ color: '#6e6e6e' }}>
            <GlobalOutlined style={{ marginRight: '8px' }} />
            North America
          </Text>,
        ]}
      >
        <Meta
          avatar={<Avatar icon={<UserOutlined />} size={46} />}
          title={<Link href={props.url} target="_blank" color='262626'>{props.name}</Link>}
          description={props.addressId}
        />

        <GeneralStatsCard clients={props.clients} />
        <DatacapStatsCard datacapAvailable={props.datacapAvailable} datacapAllocated={props.datacapAllocated} />
      </Card>
    </Col>
  </Col>
);

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
            {pageProps.notaries.data
              .filter((v: Notary) => !!v.name)
              .map((notary: Notary) => (
                // console.log(notary)
                // console.log(bytesToSize(notary.initialAllowance)),
                // console.log(/^https?/i.test(notary.auditTrail)),
                <NotaryCard
                  name={notary.name}
                  organization='Organization'
                  addressId={notary.addressId}
                  clients={notary.verifiedClientsCount}
                  datacapAvailable={prettyBytes(Number(notary.allowance), {binary: true})}
                  // datacapAllocated={bytesToSize(Number((Number(notary.initialAllowance)-Number(notary.allowance))))}
                  datacapAllocated={prettyBytes(Number(notary.initialAllowance), {binary: true})}
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
