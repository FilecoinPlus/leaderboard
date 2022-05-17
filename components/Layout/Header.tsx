/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { Divider, MenuProps, Space } from 'antd';
import { Menu } from 'antd';

const items = [
  { label: 'Overview', key: 'overview' },
  { label: 'Leaderboard', key: 'leaderboard' },
];

const Header = () => {
  return (
    <>
      {/* <div style={{ display: 'flex' }}> */}
      {/* <div> */}
      <div style={{ display: 'flex' }}>
        <div className='logo'>
          <Space direction='horizontal' size={'large'} />
          <img
            // className='logo'
            // width={34}
            height={34}
            // layout='raw'
            src='/filecoin-plus-logo.png'
            alt='Filecoin Plus Leaderboard'
            title='Filecoin Plus Leaderboard'
            // style={{ alignSelf: 'center' }}
          />
        </div>
        {/* </div> */}
        <div style={{ flex: 'auto' }}>
          <Menu
            mode='horizontal'
            // defaultSelectedKeys={['overview']}
            items={items}
          />
        </div>
      </div>
      {/* <Menu
          mode='horizontal'
          // defaultSelectedKeys={['overview']}
        >
          <Menu.Item key="1">Test</Menu.Item>
          <Menu.Item key="2">Test2</Menu.Item>
        </Menu> */}
      {/* </div> */}
    </>
  );
};

export default Header;
