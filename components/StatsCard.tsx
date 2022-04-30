import { ArrowDownOutlined } from '@ant-design/icons';
import { Card, Row, Col, Divider, Statistic } from 'antd';

export const StatsCard = (props: any) => {
  return (
    <Row gutter={16}>
      <Col span={4} xs={6} md={5} sm={4}>
        <Card>
          <Statistic
            title='Time To DataCap (MoM, avg.)'
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowDownOutlined />}
            suffix='%'
          />
        </Card>
      </Col>
      <Col span={4} xs={6} md={5} sm={4}>
        <Card>
          <Statistic
            title='DataCap Used In Deals (QoQ)'
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix='%'
          />
        </Card>
      </Col>
    </Row>
  );
};
