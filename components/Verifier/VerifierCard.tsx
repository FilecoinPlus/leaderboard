import Image from 'next/image';

import { Avatar, Badge, Card, Col, Divider, Space, Statistic, Tag, Typography } from 'antd';

import { CompassOutlined, GlobalOutlined, IdcardOutlined, UserOutlined } from '@ant-design/icons';

import { DatacapStatsCard } from '../DatacapStatsCard';
import { GeneralStatsCard } from '../GeneralStatsCard';
import { VerifierCardBody } from './VerifierCardBody';

const { Meta } = Card;
const { Text, Link } = Typography;

export const VerifierCard = ({ verifier }) => {
  return (
    // <Badge.Ribbon text='New'>
    <Card
      bordered={false}
      style={{ minWidth: '360px', maxWidth: '400px', width: '360px' }}
      className={'verifier-card'}
    >
      <Tag style={{ float: 'right', border: 'inherit', fontSize: '13px', color: '#8e8e8e' }}>
        <Space size={'small'}>
          <IdcardOutlined style={{ fontSize: '16px', verticalAlign: 'text-top' }} />
          Notary
        </Space>
      </Tag>
      <Meta
        avatar={
          <Avatar
            icon={
              <UserOutlined />
              // <Image
              //   layout='raw'
              //   alt='Avatar'
              //   src={verifier.avatar}
              //   width={46}
              //   height={46}
              //   // style={{backgroundImage: `url(${verifier.avatar})`}}
              // />
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
          <CompassOutlined style={{ marginRight: '8px' }} />
          {verifier.region}
        </Text>
      </div>
    </Card>
    // </Badge.Ribbon>
  );
};
