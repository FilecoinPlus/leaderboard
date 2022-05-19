import { Button, DatePicker, Segmented, Space, version } from 'antd';

import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

import Layout from '../components/Layout/Layout';
import { VerifierList } from '../components/Verifier';

export const Homepage = ({ verifiers }) => {
  return (
    <>
      <Layout>
        <Segmented
          options={[
            {
              value: 'Grid',
              icon: <AppstoreOutlined />,
            },
            {
              value: 'Table',
              icon: <BarsOutlined />,
            },
          ]}
        />
        <div style={{ marginBottom: '10px' }}></div>
        <VerifierList verifiers={verifiers} />
      </Layout>
    </>
  );
};
