const Card = (children) => <>{children}</>;
const Meta = (children) => <>{children}</>;
const Avatar = (children) => <>{children}</>;
const Link = (children) => <>{children}</>;
const Divider = (children) => <>{children}</>;
const Text = (children) => <>{children}</>;
const GlobalOutlined = (children) => <>{children}</>;
const Row = (children) => <>{children}</>;
const Col = (children) => <>{children}</>;
const Statistic = (children) => <>{children}</>;

export const GeneralStatsCard = (props: any) => {
  return (
    <div className='GeneralStatsCard'>
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
              value={props.clients}
              valueStyle={{ fontSize: '1rem' }}
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
              value='-'
              valueStyle={{ fontSize: '1rem' }}
              // prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
