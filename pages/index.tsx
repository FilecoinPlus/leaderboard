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
} from '@adobe/react-spectrum';
import Edit from '@spectrum-icons/workflow/Edit';
import { ActionMenu, Item, Menu, MenuTrigger } from '@react-spectrum/menu';

let columns = [
  { name: 'Name', uid: 'name' },
  { name: 'Type', uid: 'type' },
  { name: 'Date Modified', uid: 'date' },
];

let rows = [
  { id: 1, name: 'Games', date: '6/7/2020', type: 'File folder' },
  { id: 2, name: 'Program Files', date: '4/7/2021', type: 'File folder' },
  { id: 3, name: 'bootmgr', date: '11/20/2010', type: 'System file' },
  { id: 4, name: 'log.txt', date: '1/18/2016', type: 'Text Document' },
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Filecoin Plus - Leaderboard</title>
        <meta name="description" content="Filecoin Plus - Leaderboard App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Fil+ Leaderboard</h1>

        <Flex direction="column" gap="size-125">
          <TableView
            aria-label="Example table with dynamic content"
            maxWidth="size-6000"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <Column
                  key={column.uid}
                  align={column.uid === 'date' ? 'end' : 'start'}
                >
                  {column.name}
                </Column>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>
              )}
            </TableBody>
          </TableView>
        </Flex>

        <Heading level={2}>Navigation</Heading>
        <Divider />

        <Breadcrumbs>
          <Item key="home">Home</Item>
          <Item key="trendy">Trendy</Item>
          <Item key="march 2020 assets">March 2020 Assets</Item>
        </Breadcrumbs>

        <Link>
          <a
            href="https://www.imdb.com/title/tt6348138/"
            target="_blank"
            rel="noreferrer"
          >
            The missing link.
          </a>
        </Link>

        <Tabs aria-label="History of Ancient Rome">
          <TabList>
            <Item key="FoR">Founding of Rome</Item>
            <Item key="MaR">Monarchy and Republic</Item>
            <Item key="Emp">Empire</Item>
          </TabList>
          <TabPanels>
            <Item key="FoR">
              Arma virumque cano, Troiae qui primus ab oris.
            </Item>
            <Item key="MaR">Senatus Populusque Romanus.</Item>
            <Item key="Emp">Alea jacta est.</Item>
          </TabPanels>
        </Tabs>
      </main>

      <footer>© Filecoin Foundation</footer>
    </div>
  );
}
