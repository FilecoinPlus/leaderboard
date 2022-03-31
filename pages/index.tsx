import Head from 'next/head';
import Image from 'next/image';
// import styles from '../styles/Home.module.css';
import React from 'react';
import {
  ActionButton,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Cell,
  Checkbox,
  CheckboxGroup,
  Column,
  Divider,
  Flex,
  Form,
  Heading,
  Link,
  ListBox,
  LogicButton,
  NumberField,
  Radio,
  RadioGroup,
  Row,
  SearchField,
  Switch,
  TableBody,
  TableHeader,
  TableView,
  TabList,
  TabPanels,
  Tabs,
  Text,
  TextArea,
  TextField,
  ToggleButton,
  Grid,
  View,
  Header,
  Footer,
  Content,
} from '@adobe/react-spectrum';
import Edit from '@spectrum-icons/workflow/Edit';
import { ActionMenu, Item, Menu, MenuTrigger } from '@react-spectrum/menu';

let columns = [
  { name: 'Name', uid: 'name' },
  { name: 'Role', uid: 'role' },
  // { name: 'Date Modified', uid: 'date' },
];

let rows = [
  { id: 1, name: 'Notary 1', role: 'Notary' },
  { id: 2, name: 'Notary 2', role: 'Notary' },
  { id: 3, name: 'Notary 3', role: 'Notary' },
  { id: 4, name: 'Notary 4', role: 'Notary' },
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Filecoin Plus - Leaderboard</title>
        <meta name="description" content="Filecoin Plus - Leaderboard App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid
        areas={['header header', 'content content', 'footer footer']}
        columns={['1fr', '3fr']}
        rows={['size-1000', 'auto', 'size-1000']}
        height="size-6000"
        gap="size-100"
      >
        <View
          borderWidth="thin"
          borderColor="dark"
          borderRadius="medium"
          padding="size-50"
          gridArea="header"
        >
          <Header>
            <Heading>Fil+ Leaderboard</Heading>
            <Divider />
          </Header>
        </View>

        <View
          borderWidth="thin"
          borderColor="dark"
          borderRadius="medium"
          padding="size-50"
          gridArea="content"
        >
          <Content>
            <Flex direction="column" gap="size-125">
              <TableView aria-label="List of notaries" maxWidth="size-6000">
                <TableHeader columns={columns}>
                  {(column) => <Column key={column.uid}>{column.name}</Column>}
                </TableHeader>
                <TableBody items={rows}>
                  {(item) => (
                    <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>
                  )}
                </TableBody>
              </TableView>
            </Flex>
          </Content>
        </View>

        <View
          borderWidth="thin"
          borderColor="dark"
          borderRadius="medium"
          padding="size-50"
          gridArea="footer"
        >
          <Footer>
            {/* <Flex direction="row"> */}
            <Text>&copy; Filecoin Foundation</Text>
            {/* <Text>
              Content on this site is licensed under a Creative Commons
              Attribution 4.0 International license.
            </Text> */}
            {/* </Flex> */}
          </Footer>
        </View>
      </Grid>
    </div>
  );
}
