import { Table, Tag, Space, Input, Button, Typography, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import prettyBytes from 'pretty-bytes';
import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';

const { Link, Text } = Typography;

type Notary = {
  key: number;
  name: string;
  organization: string;
  address: string;
  addressId: string;
  verifiedClientsCount: number;
  allowance: number;
  initialAllowance: number;
  auditTrail: string;
};

function onChange(pagination: any, sorter: any, extra: any) {
  console.log('params', pagination, sorter, extra);
}

export const NotaryTable = (props: any) => {
  // console.log(props);

  const columns: ColumnsType<any> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      // defaultSortOrder: 'descend',
      sorter: true,
      fixed: true,
      render: (value, record, index) => {
        // console.log('value ->', value);
        // console.log('record ->', record);
        // console.log('index ->', index);
        return (<Link href={record.url} style={{color: 'inherit'}}>{value}</Link>)
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
      sorter: true,
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
      sorter: true,
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
      // onCell: (record, rowIndex) => {
      //   // console.log('record ->', record);
      //   // console.log('rowIndex ->', rowIndex);
        
      //   return {
      //     align: 'left',
      //   };
      // },
      sorter: (a, b) => a.datacapAllocatedRaw - b.datacapAllocatedRaw,
    },
  ];

  // const data: Notary[] = [
  //   {
  //     key: 1,
  //     name: 'John Brown',
  //     organization: '',
  //     address: '',
  //     addressId: '',
  //     verifiedClientsCount: 0,
  //     allowance: 0,
  //     initialAllowance: 0,
  //     auditTrail: '',
  //   },
  // ];

  const data: Notary[] = props.props.notaries
    .filter((v: any) => !!v.name)
    .map((notary: any, index: any) => ({
      key: index,
      name: notary.name,
      organization: 'Organization',
      addressId: notary.addressId,
      url: /^https?/i.test(notary.auditTrail) && notary.auditTrail,
      clients: notary.verifiedClientsCount,
      datacapAvailable: prettyBytes(Number(notary.allowance), {
        binary: true,
      }),
      datacapAvailableRaw: Number(notary.allowance),
      // datacapAllocated: bytesToSize(Number((Number(notary.initialAllowance)-Number(notary.allowance))))
      datacapAllocated: prettyBytes(
        Number(notary.initialAllowance) - Number(notary.allowance),
        { binary: true }
      ),
      datacapAllocatedRaw:
        Number(notary.initialAllowance) - Number(notary.allowance),
      datacapTotal: prettyBytes(
        Number(notary.initialAllowance) + Number(notary.allowance),
        { binary: true }
      ),
      datacapTotalRaw:
        Number(notary.initialAllowance) + Number(notary.allowance),
    }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      // onHeaderRow={(record, rowIndex) => {
      //   // console.log('record ->', record);
      //   // console.log('rowIndex ->', rowIndex);
        
      //   return {
      //     align: 'left',
      //   };
      // }}
    />
  );
};
