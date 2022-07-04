/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Divider, MenuProps, Space } from 'antd';
import { Menu } from 'antd';

const Header = () => {
  const router = useRouter();
  const handleMenuClick = ({ item, key, keyPath, domEvent }) => {
    if (key === 'leaderboard') {
      return (
        <Link href='/'>
          <a>Home</a>
        </Link>
      );
    }
  };
  return (
    <>
      {/* <div style={{ display: 'flex' }}> */}
      {/* <div> */}
      <div style={{ display: 'flex' }}>
        <div className='logo'>
          <Space
            direction='horizontal'
            size={'large'}
          />
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
            selectedKeys={[router.pathname]}
            // defaultSelectedKeys={['/']}
            // items={[
            //   { label: 'Leaderboard', key: 'leaderboard' },
            //   { label: 'Methodology', key: 'methodology' },
            // ]}
            // onClick={handleMenuClick}
          >
            <Menu.Item key='/'>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='/methodology'>
              <Link href='/methodology'>
                <a>Methodology</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='/statuspage'>
              <Link href='https://filecoinplus.statuspage.io/'>
                <a>
                  System Status<span style={{ marginLeft: '4px', fontSize: '70%', verticalAlign: 'top' }}>↗</span>
                </a>
              </Link>
            </Menu.Item>
          </Menu>
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
