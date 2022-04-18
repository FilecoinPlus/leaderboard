import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';

const { Link } = Typography;

function onChange(pagination: any, sorter: any, extra: any) {
  // console.log('params', pagination, sorter, extra);
}

export const NotaryTable = (props: any) => {
  const columns: ColumnsType<any> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      fixed: true,
      render: (value, record, index) => {
        return (
          <Link href={record.url} style={{ color: 'inherit' }}>
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
      sorter: true,
    },
    {
      key: 'addressId',
      title: 'Address ID',
      dataIndex: 'addressId',
    },
    {
      key: 'addressKey',
      title: 'Address Key',
      dataIndex: 'addressKey',
      ellipsis: true,
    },
    {
      key: 'clients',
      title: 'Clients',
      dataIndex: 'clients',
      sorter: (a, b) => a.clients - b.clients,
    },
    {
      key: 'averageTtd',
      title: 'Average TTD',
      dataIndex: 'averageTtd',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.averageTtdRaw - b.averageTtdRaw,
    },
    {
      key: 'datacapTotal',
      title: 'DataCap Total',
      dataIndex: 'datacapTotal',
      align: 'right',
      sorter: (a, b) => a.datacapTotalRaw - b.datacapTotalRaw,
    },
    {
      key: 'datacapAvailable',
      title: 'DataCap Available',
      dataIndex: 'datacapAvailable',
      align: 'right',
      sorter: (a, b) => a.datacapAvailableRaw - b.datacapAvailableRaw,
    },
    {
      key: 'datacapAllocated',
      title: 'DataCap Allocated',
      dataIndex: 'datacapAllocated',
      align: 'right',
      sorter: (a, b) => a.datacapAllocatedRaw - b.datacapAllocatedRaw,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={props.props}
      onChange={onChange}
      pagination={{
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} notaries`,
      }}
    />
  );
};
