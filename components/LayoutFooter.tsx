import { Layout, Divider, Space } from 'antd';

const { Footer } = Layout;

export const LayoutFooter = () => {
  return (
    <div className='LayoutFooter'>
      <Space direction='vertical' style={{ display: 'flex', flexGrow: 1 }}>
        <div></div>
      </Space>
      <Footer style={{ textAlign: 'center' }}>
        &copy; Filecoin Foundation
        {/* <Divider type='vertical' />
        <a href='#'>Terms</a>
        <Divider type='vertical' />
        <a href='#'>Privacy</a>
        <Divider type='vertical' />
        <a href='#'>Status</a>
        <Divider type='vertical' />
        <a href='#'>Docs</a>
        <Divider type='vertical' />
        <a href='#'>About</a> */}
      </Footer>
    </div>
  );
};
