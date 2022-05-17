import { Card, Col, Divider, Row, Statistic } from 'antd';

export const VerifierCardBody = ({ verifier }) => {
  return (
    <>
      <Divider plain>General</Divider>
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
        <Col flex='auto'>
          <Card
            size='small'
            className='card-stats'
          >
            <Statistic
              title='Average TTD'
              value={verifier.averageTtd}
            />
          </Card>
        </Col>
      </Row>
      <Divider plain>DataCap</Divider>
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
      </Row>
    </>
  );
};
