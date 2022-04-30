import { Card, Row, Col, Divider, Statistic } from 'antd';

export const DatacapStatsCard = (props: any) => {
  return (
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
};
