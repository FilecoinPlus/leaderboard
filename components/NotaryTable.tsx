import { Table, Typography, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import _, { values } from 'lodash';

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
      width: 220,
      sorter: true,
      fixed: 'left',
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
      width: 120,
      sorter: true,
      responsive: ['sm'],
      render: (value) =>
        value.map((v: any, index: any) => {
          return (
            <Tag key={index} color='default'>
              {value}
            </Tag>
          );
        }),
    },
    {
      key: 'addressId',
      title: 'Address ID',
      dataIndex: 'addressId',
      width: 140,
      responsive: ['lg'],
    },
    {
      key: 'addressKey',
      title: 'Address Key',
      dataIndex: 'addressKey',
      width: 140,
      ellipsis: true,
      responsive: ['lg'],
    },
    {
      key: 'clients',
      title: 'Clients',
      dataIndex: 'clients',
      width: 120,
      responsive: ['md'],
      sorter: (a, b) => a.clients - b.clients,
    },
    {
      key: 'averageTtd',
      title: 'Average TTD',
      dataIndex: 'averageTtd',
      width: 140,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.averageTtdRaw - b.averageTtdRaw,
    },
    {
      key: 'datacapTotal',
      title: 'DataCap Total',
      dataIndex: 'datacapTotal',
      width: 130,
      align: 'right',
      responsive: ['md'],
      sorter: (a, b) => a.datacapTotalRaw - b.datacapTotalRaw,
    },
    {
      key: 'datacapAvailable',
      title: 'DataCap Available',
      dataIndex: 'datacapAvailable',
      width: 130,
      align: 'right',
      sorter: (a, b) => a.datacapAvailableRaw - b.datacapAvailableRaw,
    },
    {
      key: 'datacapAllocated',
      title: 'DataCap Allocated',
      dataIndex: 'datacapAllocated',
      width: 130,
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
      // scroll={{ x: 'max-content' }}
    />
  );
};
