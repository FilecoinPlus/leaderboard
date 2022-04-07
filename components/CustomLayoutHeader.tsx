import { Layout, Image } from 'antd';

const { Header } = Layout;

export const CustomLayoutHeader = () => {
  return (
    <Header className='header CustomLayoutHeader'>
      <Image
        className='logo'
        // width={34}
        height={34}
        src='/filecoin-plus-leaderboard-logo-new.png'
        alt='Filecoin Plus Leaderboard logo'
        title='Filecoin Plus Leaderboard'
        preview={false}
      />
    </Header>
  );
};
