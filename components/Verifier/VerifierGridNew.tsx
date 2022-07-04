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

const BodyRow = ({ index, className, style, ...restProps }) => {
  const ref = useRef<HTMLTableRowElement>(null);
  // console.log('restProps ->', restProps);

  return (
    <VerifierGridCard
      // ref={ref}
      className={`BodyRow`}
      style={{ ...style }}
      {...restProps}
    />
  );
};

export const VerifierGridNew = ({ verifiers }) => {
  // console.log('VerifierGridNew | verifiers ->', verifiers);
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [data, setData] = useState(verifiers);

  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('handleChange parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  // const clearFilters = () => {
  //   setFilteredInfo({});
  // };

  // const clearAll = () => {
  //   setFilteredInfo({});
  //   setSortedInfo({});
  // };

  // const setNameSort = () => {
  //   setSortedInfo({
  //     order: 'ascend',
  //     columnKey: 'name',
  //   });
  // };

  const setSort = (sortSelected: string) => {
    // console.log('sortSelected ->', sortSelected);
    if (sortSelected == 'nameAsc') setSortedInfo({ order: 'ascend', columnKey: 'name' });
    if (sortSelected == 'bestAvgTtd') setSortedInfo({ order: 'ascend', columnKey: 'averageTtd' });
    if (sortSelected == 'bestAvgLdnTtd') setSortedInfo({ order: 'ascend', columnKey: 'averageLdnTtd' });
    if (sortSelected == 'clients') setSortedInfo({ order: 'descend', columnKey: 'clients' });
  };

  const setFilter = (filterSelected: string) => {
    // console.log('filterSelected ->', filterSelected);
    if (filterSelected == 'ALL') setFilteredInfo({});
    if (filterSelected == 'AFRICA') setFilteredInfo({ location: ['AFRICA'] });
    if (filterSelected == 'ASIA_NOT_GREATER_CHINA') setFilteredInfo({ location: ['ASIA_NOT_GREATER_CHINA'] });
    if (filterSelected == 'EUROPE') setFilteredInfo({ location: ['EUROPE'] });
    if (filterSelected == 'GREATER_CHINA') setFilteredInfo({ location: ['GREATER_CHINA'] });
    if (filterSelected == 'NORTH_AMERICA') setFilteredInfo({ location: ['NORTH_AMERICA'] });
    if (filterSelected == 'OCEANIA') setFilteredInfo({ location: ['OCEANIA'] });
    if (filterSelected == 'SOUTH_AMERICA') setFilteredInfo({ location: ['SOUTH_AMERICA'] });
    if (filterSelected == 'GLOBAL') setFilteredInfo({ location: ['GLOBAL'] });
    if (filterSelected == 'OTHER') setFilteredInfo({ location: ['OTHER'] });
    if (filterSelected == 'GLOBAL_AND_OTHER') setFilteredInfo({ location: ['GLOBAL', 'OTHER'] });
  };

  const columns: ColumnsType<any> = [
    {
      key: 'averageTtd',
      title: 'Average TTD',
      dataIndex: 'averageTtd',
      // defaultSortOrder: 'ascend',
      sorter: (a, b) => a.averageTtdRaw - b.averageTtdRaw,
      sortOrder: sortedInfo.columnKey === 'averageTtd' ? sortedInfo.order : null,
    },
    {
      key: 'averageLdnTtd',
      title: 'Average LDN TTD',
      dataIndex: 'averageLdnTtd',
      // defaultSortOrder: 'ascend',
      sorter: (a, b) => a.averageLdnTtdRaw - b.averageLdnTtdRaw,
      sortOrder: sortedInfo.columnKey === 'averageLdnTtd' ? sortedInfo.order : null,
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
    },
    {
      key: 'organization',
      title: 'Organization',
      dataIndex: 'organization',
    },
    {
      key: 'location',
      title: 'Location',
      dataIndex: 'location',
      filteredValue: filteredInfo.location || null,
      onFilter: (value, record) => {
        // console.log('inside filter | value ->', value);
        // console.log('inside filter | record ->', record);
        return record.regionRaw.includes(value);
      },
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
    },
    {
      key: 'clients',
      title: 'Clients',
      dataIndex: 'clients',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.clientsCount - b.clientsCount,
      sortOrder: sortedInfo.columnKey === 'clients' ? sortedInfo.order : null,
    },
    {
      key: 'datacapTotal',
      title: 'DataCap Total',
      dataIndex: 'datacapTotal',
      sorter: (a, b) => a.datacapTotalRaw - b.datacapTotalRaw,
    },
    {
      key: 'datacapAvailable',
      title: 'DataCap Available',
      dataIndex: 'datacapAvailable',
      sorter: (a, b) => a.datacapAvailableRaw - b.datacapAvailableRaw,
    },
    {
      key: 'datacapAllocated',
      title: 'DataCap Allocated',
      dataIndex: 'datacapAllocated',
      sorter: (a, b) => a.datacapAllocatedRaw - b.datacapAllocatedRaw,
    },
  ];

  const TableRender = ({ ...restProps }) => {
    // console.log('TableRender | restProps ->', restProps.length);
    return (
      <div
        {...restProps}
        className={'TableRender'}
      />
    );
  };

  const BodyWrapper = ({ ...restProps }) => {
    // console.log('BodyWrapper | restProps ->', restProps.length);
    return (
      <div
        {...restProps}
        // className={'BodyWrapper'}
      ></div>
    );
  };

  const BodyCell = ({ ...restProps }) => {
    // console.log('BodyCell | restProps ->', restProps.length);
    return (
      <div
        {...restProps}
        // className={'BodyCell'}
      ></div>
    );
  };

  const HeaderWrapper = ({ ...restProps }) => {
    // console.log('HeaderWrapper | restProps ->', restProps.length);
    return (
      <div
        {...restProps}
        // className={'HeaderWrapper'}
      ></div>
    );
  };

  const HeaderRow = ({ ...restProps }) => {
    // console.log('HeaderRow | restProps ->', restProps.length);
    return (
      <div
        {...restProps}
        // className={'HeaderRow'}
      ></div>
    );
  };

  const HeaderCell = ({ ...restProps }) => {
    // console.log('HeaderCell | restProps ->', restProps.length);
    return (
      <div
        {...restProps}
        // className={'HeaderCell'}
      ></div>
    );
  };

  const components = {
    table: TableRender,
    body: {
      row: BodyRow,
      wrapper: BodyWrapper,
      cell: BodyCell,
    },
    header: {
      wrapper: HeaderWrapper,
      row: HeaderRow,
      cell: HeaderCell,
    },
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Select
          defaultValue='bestAvgTtd'
          // labelInValue={true}
          // style={{ width: 120 }}
          bordered={false}
          onChange={setSort}
          // onSelect={setSort}
          dropdownMatchSelectWidth={false}
          filterOption={false}
          // menuItemSelectedIcon={<>•</>}
        >
          <Option value='bestAvgTtd'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Sort by:</span> Best Avg. TTD
          </Option>
          <Option value='bestAvgLdnTtd'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Sort by:</span> Best Avg. LDN TTD
          </Option>
          <Option value='nameAsc'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Sort by:</span> Name (A-Z)
          </Option>
          <Option value='clients'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Sort by:</span> Clients
          </Option>
        </Select>
        <Select
          defaultValue='ALL'
          bordered={false}
          onChange={setFilter}
          dropdownMatchSelectWidth={false}
          filterOption={false}
          // virtual={false}
          // menuItemSelectedIcon={<>•</>}
        >
          <Option value='ALL'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Region:</span> All
          </Option>
          {/* <Option value='AFRICA'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Region:</span> Africa
          </Option> */}
          <Option value='ASIA_NOT_GREATER_CHINA'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Region:</span> Asia (excl. Greater China)
          </Option>
          <Option value='EUROPE'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Region:</span> Europe
          </Option>
          <Option value='GREATER_CHINA'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Region:</span> Greater China
          </Option>
          <Option value='NORTH_AMERICA'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Region:</span> North America
          </Option>
          <Option value='OCEANIA'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Region:</span> Oceania
          </Option>
          {/* <Option value='SOUTH_AMERICA'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Region:</span> South America
          </Option> */}
          {/* <Option value='GLOBAL'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Region:</span> Global
          </Option>
          <Option value='OTHER'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Region:</span> Other
          </Option> */}
          <Option value='GLOBAL_AND_OTHER'>
            <span style={{ color: 'rgba(0, 0, 0, 0.60)' }}>Region:</span> Global & Other Regions
          </Option>
        </Select>
      </Space>
      <Table
        className='grid-view'
        // title={() => 'All notaries'}
        columns={columns}
        dataSource={data}
        // size='middle'
        onChange={handleChange}
        // pagination={{
        //   showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} notaries`,
        // }}
        pagination={false}
        components={components}
        showHeader={false}
        // scroll={{ x: 'max-content' }}
      />
    </>
  );
};
