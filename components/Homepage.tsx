import { CardAreaModule, SummaryCard, SummaryCardHeader } from '@carbon/ibm-products';
import { Footer } from '@carbon/ibmdotcom-react';
import {
  AppSwitcher,
  Button,
  Column,
  Content,
  Grid,
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  Notification,
  Row,
  Search,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  SkipToContent,
} from '@carbon/react';

const TestCards = (props) => {
  return (
    <CardAreaModule>
      {({ getLayoutProps }) => (
        <Row narrow>
          <Column>
            <SummaryCard {...getLayoutProps()}>
              <SummaryCardHeader title='Label' />
            </SummaryCard>
          </Column>

          <Column>
            <SummaryCard {...getLayoutProps()}>
              <SummaryCardHeader title='Label' />
            </SummaryCard>
          </Column>

          <Column>
            <SummaryCard {...getLayoutProps()}>
              <SummaryCardHeader title='Label' />
            </SummaryCard>
          </Column>
        </Row>
      )}
    </CardAreaModule>
  );
};

const Fade16 = () => (
  <svg
    width='16'
    height='16'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 32 32'
    aria-hidden='true'
  >
    <path d='M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z' />
  </svg>
);

export const Homepage = () => {
  return (
    <div>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label='Filecoin Plus Platform Name'>
              <SkipToContent />
              <HeaderMenuButton
                aria-label='Open menu'
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName
                href='#'
                prefix='Filecoin Plus'
              >
                [Platform]
              </HeaderName>
              <HeaderNavigation aria-label='Filecoin Plus [Platform]'>
                <HeaderMenuItem href='#'>Overview</HeaderMenuItem>
                <HeaderMenuItem href='#'>Leaderboard</HeaderMenuItem>
              </HeaderNavigation>
              <SideNav
                aria-label='Side navigation'
                expanded={isSideNavExpanded}
                isPersistent={false}
              >
                <SideNavItems>
                  <HeaderSideNavItems>
                    <HeaderMenuItem href='#'>Overview</HeaderMenuItem>
                    <HeaderMenuItem href='#'>Leaderboard</HeaderMenuItem>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
            </Header>
          </>
        )}
      />
      <div className='cds--grid'>
        <Content
          id='main-content'
          style={{ margin: '64px', height: '100%', width: '100%' }}
        >
          {/* <TestCards /> */}
        </Content>
        <Footer
          type='micro'
          disableLocaleButton={true}
          // style={{ display: 'inline-flex' }}
          navigation={{
            footerThin: [
              {
                title: '@ Filecoin Foundation',
                url: 'https://fil.org/',
              },
              {
                title: 'Privacy',
                url: 'https://fil.org/policy/',
              },
              {
                title: 'Terms of use',
                url: 'https://fil.org/terms/',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
