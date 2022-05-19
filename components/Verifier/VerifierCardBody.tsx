import { Card, Col, Divider, Row, Space, Statistic, Tag } from 'antd';

import { DatabaseOutlined, FieldTimeOutlined } from '@ant-design/icons';

export const VerifierCardBody = ({ verifier }) => {
  return (
    <>
      <Divider
        orientation='left'
        plain
      >
        General
      </Divider>
      <Row
        gutter={8}
        justify='space-around'
      >
        <Col flex='auto'>
          <Card
            size='small'
            className='card-stats'
          >
            <Statistic
              title='Average TTD'
              value={verifier.averageTtd}
              valueRender={(value) => {
                return (
                  <Space size={'small'}>
                    <FieldTimeOutlined />
                    {value}
                  </Space>
                );
              }}
            />
          </Card>
        </Col>
        <Col flex='auto'>
          <Card
            size='small'
            className='card-stats'
          >
            <Statistic
              title='Clients'
              value={verifier.clientsCount}
            />
          </Card>
        </Col>
        <Col flex='auto'>
          <Card
            size='small'
            className='card-stats'
          >
            <Statistic
              title='Decisions'
              value={'–'}
            />
          </Card>
        </Col>
      </Row>
      <Divider
        orientation='left'
        plain
      >
        DataCap
      </Divider>
      <Row
        gutter={8}
        justify='space-around'
      >
        <Col flex='auto'>
          <Card
            size='small'
            className='card-stats'
          >
            <Statistic
              title='Total'
              value={verifier.datacapTotal}
            />
          </Card>
        </Col>
        <Col flex='auto'>
          <Card
            size='small'
            className='card-stats'
          >
            <Statistic
              title='Available'
              value={verifier.datacapAvailable}
            />
          </Card>
        </Col>
        <Col flex='auto'>
          <Card
            size='small'
            className='card-stats'
          >
            <Statistic
              title='Allocated'
              value={verifier.datacapAllocated}
            />
          </Card>
        </Col>
        {/* <Col flex='auto'>
          <Card
            size='small'
            className='card-stats'
          >
            <Statistic
              title='Used in deals'
              value={'–'}
            />
          </Card>
        </Col> */}
      </Row>
    </>
  );
};
