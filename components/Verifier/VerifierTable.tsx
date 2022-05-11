import { FieldTimeOutlined } from '@ant-design/icons';
import { Table, Typography, Tag, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import _, { values } from 'lodash';

const { Link } = Typography;

function onChange(pagination: any, sorter: any, extra: any) {
  // console.log('params', pagination, sorter, extra);
}

export const VerifierTable = (props: any) => {
  const columns: ColumnsType<any> = [
    {
      key: 'averageTtd',
      title: 'Average TTD',
      dataIndex: 'averageTtd',
      width: 135,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.averageTtdRaw - b.averageTtdRaw,
      render: (value) => {
        if (value === '–') return <span>{value}</span>;
        return (
          <Tag color='default'>
            <Space size={'small'}>
              <FieldTimeOutlined />
              {value}
            </Space>
          </Tag>
        );
      },
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      // width: 220,
      sorter: true,
      // fixed: 'left',
      render: (value, record, index) => {
        return (
          <Link
            href={record.url}
            // style={{ color: 'inherit' }}
            // style={{ fontWeight: 500 }}
          >
            {value}
          </Link>
        );
      },
    },
    {
      key: 'organization',
      title: 'Organization',
      dataIndex: 'organization',
      sorter: true,
    },
    {
      key: 'location',
      title: 'Location',
      dataIndex: 'location',
      // width: 120,
      // sorter: true,
      responsive: ['lg'],
      render: (value) =>
        value.map((v: any, index: any) => {
          return (
            // <Tag key={index} color='default'>
            <span
              key={index}
              // style={{ color: 'rgba(0, 0, 0, 0.55)' }}
              // style={{ fontWeight: 300 }}
            >
              {value}
            </span>
            // </Tag>
          );
        }),
    },
    {
      key: 'addressId',
      title: 'Address ID',
      dataIndex: 'addressId',
      // width: 140,
      responsive: ['lg'],
      // render: (value) => <span style={{ color: 'rgba(0, 0, 0, 0.55)' }}>{value}</span>,
    },
    {
      key: 'addressKey',
      title: 'Address Key',
      dataIndex: 'addressKey',
      // width: 140,
      ellipsis: true,
      responsive: ['lg'],
      // render: (value) => <span style={{ color: 'rgba(0, 0, 0, 0.55)' }}>{value}</span>,
    },
    {
      key: 'clients',
      title: 'Clients',
      dataIndex: 'clients',
      width: 100,
      align: 'right',
      responsive: ['md'],
      sorter: (a, b) => a.clients - b.clients,
      // render: (value) => <span style={{ color: 'rgba(0, 0, 0, 0.55)' }}>{value}</span>,
    },
    {
      key: 'datacapTotal',
      title: 'DataCap Total',
      dataIndex: 'datacapTotal',
      // width: 130,
      align: 'right',
      responsive: ['lg'],
      sorter: (a, b) => a.datacapTotalRaw - b.datacapTotalRaw,
      // render: (value) => <span style={{ color: 'rgba(0, 0, 0, 0.55)' }}>{value}</span>,
    },
    {
      key: 'datacapAvailable',
      title: 'DataCap Available',
      dataIndex: 'datacapAvailable',
      // width: 130,
      align: 'right',
      // responsive: ['sm'],
      sorter: (a, b) => a.datacapAvailableRaw - b.datacapAvailableRaw,
      // render: (value) => <span style={{ color: 'rgba(0, 0, 0, 0.55)' }}>{value}</span>,
    },
    {
      key: 'datacapAllocated',
      title: 'DataCap Allocated',
      dataIndex: 'datacapAllocated',
      // width: 130,
      align: 'right',
      responsive: ['sm'],
      sorter: (a, b) => a.datacapAllocatedRaw - b.datacapAllocatedRaw,
      // render: (value) => <span style={{ color: 'rgba(0, 0, 0, 0.55)' }}>{value}</span>,
    },
  ];

  return (
    <Table
      // title={() => 'All notaries'}
      columns={columns}
      dataSource={props.props}
      // size='middle'
      onChange={onChange}
      pagination={{
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} notaries`,
      }}
      // scroll={{ x: 'max-content' }}
    />
  );
};
