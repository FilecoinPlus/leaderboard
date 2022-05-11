import { Card, Avatar, Col, Typography } from 'antd';
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { GeneralStatsCard } from '../GeneralStatsCard';
import { DatacapStatsCard } from '../DatacapStatsCard';

const { Meta } = Card;
const { Text, Link } = Typography;

export const VerifierCard = (props: any) => {
  return (
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
            title={
              <Link href={props.url} target='_blank' color='262626'>
                {props.name}
              </Link>
            }
            description='Organization'
          />

          <GeneralStatsCard clients={props.clients} />
          <DatacapStatsCard
            datacapAvailable={props.datacapAvailable}
            datacapAllocated={props.datacapAllocated}
          />
        </Card>
      </Col>
    </Col>
  );
};
