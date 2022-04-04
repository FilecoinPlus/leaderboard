import type { NextPage } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css'
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
} from '@ant-design/icons';

const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const GeneralStatsCard = () => (
  <div className='GeneralStatsCard'>
    <Divider plain>General</Divider>
    <Row gutter={8} justify='space-around'>
      <Col flex='auto'>
        <Card size='small'>
          <Statistic
            title='Clients'
            value={102}
            valueStyle={{ fontSize: '1rem' }}
          />
        </Card>
      </Col>
      <Col flex='auto'>
        <Card size='small'>
          <Statistic
            title='Average TTD'
            value='120 days'
            valueStyle={{ color: '#3f8600', fontSize: '1rem' }}
            // prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
    </Row>
  </div>
);

const DatacapStatsCard = () => (
  <div className='DatacapStatsCard'>
    <Divider plain>DataCap</Divider>

    <Row gutter={8} justify='space-around'>
      <Col flex='auto'>
        <Card size='small'>
          <Statistic
            title='Available'
            value={300}
            valueStyle={{ fontSize: '1rem' }}
            suffix='TiB'
          />
        </Card>
      </Col>

      <Col flex='auto'>
        <Card size='small'>
          <Statistic
            title='Allocated'
            value={200}
            valueStyle={{ fontSize: '1rem' }}
            // prefix={<ArrowUpOutlined />}
            suffix='TiB'
          />
        </Card>
      </Col>
    </Row>
  </div>
);

const NotaryCard = () => (
  <div style={{ minWidth: '210px', maxWidth: '400px' }}>
    <Col className='NotaryCard'>
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
          avatar={
            <Avatar src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' />
          }
          title='Notary Name'
          description='Organization'
        />

        <GeneralStatsCard />
        <DatacapStatsCard />
      </Card>
    </Col>
  </div>
);

const CustomLayoutHeader = () => (
  <Header className='header CustomLayoutHeader'>
    <Image
      className='logo'
      width={34}
      height={34}
      src='/logo.png'
      alt='Filecoin Plus logo'
      title='Fil+ Leaderboard'
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

const App: NextPage = () => {
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

          <Row gutter={16} style={{rowGap: '20px'}}>
            <Col span={8}>
              <NotaryCard />
            </Col>
            <Col span={8}>
              <NotaryCard />
            </Col>

            <Col span={8}>
              <NotaryCard />
            </Col>
            <Col span={8}>
              <NotaryCard />
            </Col>
          </Row>

        </Content>

        <CustomLayoutFooter />
      </Layout>
    </div>
  );
};

export default App;
