import { Button, Row, Select, Space, Table, Tag, Typography } from 'antd';
import type { TableProps } from 'antd';
// import { ColumnsType } from 'antd/es/table';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/lib/table/interface';

import { FieldTimeOutlined } from '@ant-design/icons';

import _ from 'lodash';
import { useRef, useState } from 'react';

import { VerifierGridCard } from './VerifierGridCard';

const { Option } = Select;

const { Link } = Typography;

interface DataType {
  key: string;
  name: string;
  organization: string;
  location: string;
}

export const VerifierListNew = ({ verifiers }) => {
  // console.log('VerifierGridNew | verifiers ->', verifiers);
  const [data, setData] = useState(verifiers);

  const columns: ColumnsType<any> = [
    {
      key: 'averageTtd',
      title: 'Avg. TTD',
      dataIndex: 'averageTtd',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.averageTtdRaw - b.averageTtdRaw,
      // sortOrder: sortedInfo.columnKey === 'averageTtd' ? sortedInfo.order : null,
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
      key: 'averageLdnTtd',
      title: 'Avg. LDN TTD',
      dataIndex: 'averageLdnTtd',
      // defaultSortOrder: 'ascend',
      sorter: (a, b) => a.averageLdnTtdRaw - b.averageLdnTtdRaw,
      // sortOrder: sortedInfo.columnKey === 'averageLdnTtd' ? sortedInfo.order : null,
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
      sorter: (a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
      // sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      render: (value, record, index) => {
        return (
          <Link
            href={record.issueUrl}
            target='_blank'
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
      // ellipsis: true,
    },
    {
      key: 'addressId',
      title: 'Address ID',
      dataIndex: 'addressId',
      responsive: ['lg'],
      width: 125,
    },
    {
      key: 'location',
      title: 'Region',
      dataIndex: 'region',
      responsive: ['xl'],
      // filteredValue: filteredInfo.location || null,
      // onFilter: (value, record) => {
      //   console.log('inside filter | value ->', value);
      //   console.log('inside filter | record ->', record);
      //   return record.regionRaw.includes(value);
      // },
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
    // {
    //   key: 'addressKey',
    //   title: 'Address Key',
    //   dataIndex: 'addressKey',
    //   responsive: ['xxl'],
    //   ellipsis: true,
    // },
    {
      key: 'clients',
      title: 'Clients',
      dataIndex: 'clientsCount',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.clientsCount - b.clientsCount,
      // sortOrder: sortedInfo.columnKey === 'clients' ? sortedInfo.order : null,
      width: 80,
      align: 'right',
      responsive: ['md'],
    },
    {
      key: 'datacapTotal',
      title: 'DataCap Total',
      dataIndex: 'datacapTotal',
      sorter: (a, b) => a.datacapTotalRaw - b.datacapTotalRaw,
      align: 'right',
      responsive: ['lg'],
    },
    {
      key: 'datacapAvailable',
      title: 'DataCap Available',
      dataIndex: 'datacapAvailable',
      sorter: (a, b) => a.datacapAvailableRaw - b.datacapAvailableRaw,
      align: 'right',
      responsive: ['md'],
    },
    {
      key: 'datacapAllocated',
      title: 'DataCap Allocated',
      dataIndex: 'datacapAllocated',
      sorter: (a, b) => a.datacapAllocatedRaw - b.datacapAllocatedRaw,
      align: 'right',
      responsive: ['sm'],
    },
  ];

  return (
    <>
      <Space style={{ marginTop: 16 }}>
        <div></div>
      </Space>
      <Table
        className='list-view'
        // title={() => 'All notaries'}
        columns={columns}
        dataSource={data}
        // size='middle'
        // onChange={handleChange}
        // pagination={{
        //   showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} notaries`,
        // }}
        pagination={{
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} notaries`,
          showSizeChanger: true,
          // defaultPageSize: 50,
        }}
        // components={components}
        // showHeader={false}
        // scroll={{ x: 'max-content' }}
      />
    </>
  );
};
