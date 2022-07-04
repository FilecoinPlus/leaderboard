import { Segmented, Typography } from 'antd';

import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

import { useState } from 'react';

import Layout from './Layout/Layout';
import { VerifierGridNew } from './Verifier/VerifierGridNew';
import { VerifierListNew } from './Verifier/VerifierListNew';

const { Title } = Typography;

export const GridViewNew = ({ verifiers }) => {
  const [viewMode, setViewMode] = useState('GRID_VIEW');

  const handleViewChange = (value) => {
    // console.log('handleViewChange | value ->', value);

    if (value === 'GRID_VIEW') setViewMode('GRID_VIEW');
    if (value === 'LIST_VIEW') setViewMode('LIST_VIEW');
  };

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
            FILECOIN PLUS
          </span>
          <Title level={2}>Notary Leaderboard</Title>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Segmented
            // size='large'
            defaultValue='GRID_VIEW'
            options={[
              {
                label: 'Grid',
                value: 'GRID_VIEW',
                icon: <AppstoreOutlined />,
              },
              {
                label: 'List',
                value: 'LIST_VIEW',
                icon: <BarsOutlined />,
              },
            ]}
            onChange={handleViewChange}
          />
        </div>
        {(viewMode === 'GRID_VIEW' && <VerifierGridNew verifiers={verifiers} />) || (
          <VerifierListNew verifiers={verifiers} />
        )}
      </Layout>
    </>
  );
};
