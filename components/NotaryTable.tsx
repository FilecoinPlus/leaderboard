import { Table, Tag, Space, Input, Button, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import prettyBytes from 'pretty-bytes';
import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';

const { Link } = Typography;

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
    },
    {
      key: 'organization',
      title: 'Organization',
      dataIndex: 'organization',
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
      key: 'datacapAvailable',
      title: 'DataCap Available',
      dataIndex: 'datacapAvailable',
      sorter: (a, b) =>
        parseFloat(a.datacapAvailable) - parseFloat(b.datacapAvailable),
    },
    {
      key: 'datacapAllocated',
      title: 'DataCap Allocated',
      dataIndex: 'datacapAllocated',
      sorter: (a, b) =>
        parseFloat(a.datacapAllocated) - parseFloat(b.datacapAllocated),
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
      clients: notary.verifiedClientsCount,
      datacapAvailable: prettyBytes(Number(notary.allowance), {
        binary: true,
      }),
      // datacapAllocated: bytesToSize(Number((Number(notary.initialAllowance)-Number(notary.allowance))))
      datacapAllocated: prettyBytes(
        Number(notary.initialAllowance) - notary.allowance,
        { binary: true }
      ),
    }));

  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};
