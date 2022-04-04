import type { NextPage } from 'next';
// import Head from 'next/head';
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
} from '@ant-design/icons';

const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const App: NextPage = () => {
  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  return (
    <div>
      <Layout className="layout">
        <Header className="header">
          <Image
            className="logo"
            width={34}
            height={34}
            src="/logo.png"
            alt="Filecoin Plus logo"
            title="Fil+ Leaderboard"
            preview={false}
          />
        </Header>

        <Content style={{ padding: '50px 50px' }}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={8}>
                <Card bordered={false}>
                  <Meta
                    avatar={
                      <Avatar src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
                    }
                    title="Notary Name"
                    description="Organization"
                    style={{marginBottom:0}}
                  />

                  <Divider plain>General</Divider>

                  <Row gutter={8} justify="space-around">
                  <Col flex='auto'>
                    <Card size="small">
                      <Statistic
                        title="Clients"
                        value={102}
                        valueStyle={{ fontSize: '1rem' }}
                      />
                    </Card>
                  </Col>
                  <Col flex='auto'>
                    <Card size="small">
                      <Statistic
                        title="Average TTD"
                        value="120 days"
                        valueStyle={{ color: '#3f8600', fontSize: '1rem' }}
                        // prefix={<ArrowUpOutlined />}
                      />
                    </Card>
                  </Col>
                  </Row>

                  <Divider plain>DataCap</Divider>

                  <Row gutter={8} justify="space-around">
                  <Col flex='auto'>
                    <Card size="small">
                      <Statistic
                        title="Available"
                        value={300}
                        valueStyle={{ fontSize: '1rem' }}
                        suffix="TiB"
                      />
                    </Card>
                  </Col>

                  <Col flex='auto'>
                    <Card size="small">
                      <Statistic
                        title="Allocated"
                        value={200}
                        valueStyle={{ fontSize: '1rem' }}
                        // prefix={<ArrowUpOutlined />}
                        suffix="TiB"
                      />
                    </Card>
                  </Col>
                  </Row>

                </Card>
              </Col>
          </Row>
        </Content>

        <Space direction="vertical" style={{ display: 'flex', flexGrow: 1 }}>
          <div></div>
        </Space>
        <Footer style={{ textAlign: 'center' }}>
          &copy; Filecoin Foundation
          <Divider type="vertical" />
          <a href="#">Terms</a>
          <Divider type="vertical" />
          <a href="#">Privacy</a>
          <Divider type="vertical" />
          <a href="#">Status</a>
          <Divider type="vertical" />
          <a href="#">Docs</a>
          <Divider type="vertical" />
          <a href="#">About</a>
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
