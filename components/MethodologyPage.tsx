import { Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import Layout from './Layout/Layout';

const { Title } = Typography;

export const MethodologyPage = () => {
  return (
    <>
      <Layout>
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontSize: '14px',
              textTransform: 'uppercase',
              fontVariantCaps: 'all-small-caps',
              lineHeight: '2em',
              // color: 'rgba(0, 0, 0, 0.60)',
              // fontWeight: 500,
            }}
          >
            LEADERBOARD
          </span>
          <Title level={2}>Methodology</Title>
        </div>
        <Content style={{ textAlign: 'center' }}>TBD.</Content>
      </Layout>
    </>
  );
};
