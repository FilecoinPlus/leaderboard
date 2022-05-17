import Image from 'next/image';

import { Avatar, Card, Col, Divider, Statistic, Typography } from 'antd';

import { GlobalOutlined, UserOutlined } from '@ant-design/icons';

import { DatacapStatsCard } from '../DatacapStatsCard';
import { GeneralStatsCard } from '../GeneralStatsCard';
import { VerifierCardBody } from './VerifierCardBody';

const { Meta } = Card;
const { Text, Link } = Typography;

export const VerifierCard = ({ verifier }) => {
  return (
    <Card
      bordered={false}
      style={{ minWidth: '360px', maxWidth: '400px', width: '360px' }}
      className={'verifier-card'}
    >
      <Meta
        avatar={
          <Avatar
            icon={
              <Image
                layout='raw'
                alt='Avatar'
                src={verifier.avatar}
                width={46}
                height={46}
                // style={{backgroundImage: `url(${verifier.avatar})`}}
              />
            }
            size={46}
          />
        }
        title={
          <Link
            href={verifier.issueUrl}
            target='_blank'
            color='262626'
          >
            {verifier.name}
          </Link>
        }
        description={verifier.organization}
      />

      <VerifierCardBody verifier={verifier} />

      <Divider
        plain
        style={{
          width: '100%',
          // marginTop: '12px',
          // marginBottom: '12px'
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <Text
          key='location'
          style={{ color: '#8e8e8e' }}
        >
          <GlobalOutlined style={{ marginRight: '8px' }} />
          {verifier.region}
        </Text>
      </div>
    </Card>
  );
};
