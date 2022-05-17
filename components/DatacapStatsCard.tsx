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

export const DatacapStatsCard = (props: any) => {
  return (
    <div className='DatacapStatsCard'>
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
              title='Available'
              value={props.datacapAvailable}
              valueStyle={{ fontSize: '1rem' }}
              // suffix='TiB'
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
