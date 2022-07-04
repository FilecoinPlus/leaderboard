import { Avatar, Badge, Card, Col, Divider, Row, Space, Statistic, Tag, Typography } from 'antd';

import {
  ArrowUpOutlined,
  CompassOutlined,
  FieldTimeOutlined,
  GlobalOutlined,
  IdcardOutlined,
  LinkOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';

import _ from 'lodash';

const { Meta } = Card;
const { Text, Link } = Typography;

export const VerifierGridCard = (props) => {
  // console.log('VerifierGridCard | props ->', props);
  const verifier = _.isArray(props.children) && props.children.map((v) => v.props.record)[0];
  if (_.isEmpty(verifier)) return null;
  // console.log('verifier ->', verifier);

  return (
    // <Badge.Ribbon text='New'>
    <Card
      bordered={false}
      style={{
        // minWidth: '360px',
        // maxWidth: '400px',
        width: '360px',
      }}
      className={'verifier-card'}
      actions={[
        <Link
          key='link'
          href={verifier.issueUrl}
          target='_blank'
          color='262626'
        >
          <SolutionOutlined
            style={{
              marginRight: '4px',
            }}
          />
          <span>Application</span>
          <span style={{ marginLeft: '4px', fontSize: '70%', verticalAlign: 'top' }}>↗</span>
        </Link>,
        // <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      {/* <Tag style={{ float: 'right', border: 'inherit', fontSize: '13px', color: '#8e8e8e' }}>
        <Space size={'small'}>
          <IdcardOutlined style={{ fontSize: '16px', verticalAlign: 'text-top' }} />
          Notary
        </Space>
      </Tag> */}
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
            shape='square'
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
          // verifier.name
        }
        description={verifier.organization}
      />

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
          style={{ rowGap: '8px' }}
        >
          <Col flex='auto'>
            <Card
              size='small'
              className='card-stats'
            >
              <Statistic
                title='Avg. TTD'
                value={verifier.averageTtd}
                valueRender={(value) => {
                  if (verifier.averageTtd === '–') {
                    return value;
                  }
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
                title='Avg. LDN TTD'
                value={verifier.averageLdnTtd}
                valueRender={(value) => {
                  if (verifier.averageLdnTtd === '–') {
                    return value;
                  }
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
          {/* <Col flex='auto'>
          <Card
            size='small'
            className='card-stats'
          >
            <Statistic
              title='Decisions'
              value={'–'}
            />
          </Card>
        </Col> */}
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
        <Divider
          orientation='left'
          plain
        >
          Regions
        </Divider>
        <Row
          gutter={8}
          justify='space-around'
        >
          <Col flex='auto'>
            <Tag style={{ border: 'inherit', fontSize: '13px', color: 'rgba(0, 0, 0, 0.60)' }}>
              <Space size={'small'}>{verifier.region}</Space>
            </Tag>
          </Col>
        </Row>
      </>

      {/* <Divider
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
      </div> */}
    </Card>
    // </Badge.Ribbon>
  );
};
