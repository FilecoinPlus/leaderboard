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

      <main>
        <h1>Fil+ Leaderboard</h1>
        <Divider />

        <Flex direction="column" gap="size-125">
          <TableView
            aria-label="List of notaries"
            maxWidth="size-6000"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <Column
                  key={column.uid}
                >
                  {column.name}
                </Column>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <Row>
                  {(columnKey) => <Cell>{item[columnKey]}</Cell>}
                </Row>
              )}
            </TableBody>
          </TableView>
        </Flex>

      </main>

      <footer>© Filecoin Foundation</footer>
    </div>
  );
}
