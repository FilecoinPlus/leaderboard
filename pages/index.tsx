import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';
import { ActionButton, Breadcrumbs, Button, ButtonGroup, Cell, Checkbox, CheckboxGroup, Column, Divider, Flex, Form, Heading, Link, ListBox, LogicButton, NumberField, Radio, RadioGroup, Row, SearchField, Switch, TableBody, TableHeader, TableView, TabList, TabPanels, Tabs, Text, TextArea, TextField, ToggleButton } from '@adobe/react-spectrum';
import Edit from '@spectrum-icons/workflow/Edit';
import { ActionMenu, Item, Menu, MenuTrigger } from '@react-spectrum/menu';

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Filecoin Plus - Leaderboard</title>
        <meta name="description" content="Filecoin Plus - Leaderboard App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Fil+ Leaderboard
        </h1>

        <Flex direction="column" gap="size-125">
          <Heading level={2}>Buttons</Heading>
          <Divider />
          <ButtonGroup>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <ActionButton>
              <Edit />
              <Text>Action Button</Text>
            </ActionButton>
            <LogicButton variant="and">Logic Button</LogicButton>
            <ToggleButton>Toggle Button</ToggleButton>
          </ButtonGroup>

          <Heading level={2}>Collections</Heading>
          <Divider />

          <ActionMenu>
            <Item>Action Menu Item 1</Item>
            <Item>Action Menu Item 2</Item>
            <Item>Action Menu Item 3</Item>
          </ActionMenu>
          <ListBox width="size-2400" aria-label="Listbox">
            <Item>ListBox Item 1</Item>
            <Item>ListBox Item 2</Item>
            <Item>ListBox Item 3</Item>
          </ListBox>

          <MenuTrigger>
            <ActionButton>
              Menu
            </ActionButton>
            <Menu onAction={(key) => alert(key)}>
              <Item key="cut">Cut</Item>
              <Item key="copy">Copy</Item>
              <Item key="paste">Paste</Item>
              <Item key="replace">Replace</Item>
            </Menu>
          </MenuTrigger>
          <MenuTrigger>
            <ActionButton>
              Menu Trigger
            </ActionButton>
            <Menu>
              <Item>Cut</Item>
              <Item>Copy</Item>
              <Item>Paste</Item>
            </Menu>
          </MenuTrigger>
          <TableView
            aria-label="Example table with static contents"
            selectionMode="multiple"
          >
            <TableHeader>
              <Column>Name</Column>
              <Column>Type</Column>
              <Column align="end">Date Modified</Column>
            </TableHeader>
            <TableBody>
              <Row>
                <Cell>Games</Cell>
                <Cell>File folder</Cell>
                <Cell>6/7/2020</Cell>
              </Row>
              <Row>
                <Cell>Program Files</Cell>
                <Cell>File folder</Cell>
                <Cell>4/7/2021</Cell>
              </Row>
              <Row>
                <Cell>bootmgr</Cell>
                <Cell>System file</Cell>
                <Cell>11/20/2010</Cell>
              </Row>
              <Row>
                <Cell>log.txt</Cell>
                <Cell>Text Document</Cell>
                <Cell>1/18/2016</Cell>
              </Row>
            </TableBody>
          </TableView>
        </Flex>

        <Heading level={2}>Forms</Heading>
        <Divider />

        <Form maxWidth="size-3600">
            <CheckboxGroup label="Favorite sports">
            <Checkbox value="soccer">Soccer</Checkbox>
            <Checkbox value="baseball">Baseball</Checkbox>
            <Checkbox value="basketball">Basketball</Checkbox>
          </CheckboxGroup>
         <NumberField label="Width" defaultValue={1024} minValue={0} />
          <RadioGroup label="Favorite pet">
            <Radio value="dogs">Dogs</Radio>
            <Radio value="cats">Cats</Radio>
          </RadioGroup>
          <SearchField
          label="Search"
          placeholder="Enter text"
          />
          <Switch>Low power mode</Switch>
          <TextArea label="Description" />
          <TextField label="Email" placeholder="abc@adobe.com" />
          <TextField label="Password" placeholder="1234" />
        </Form>

        <Heading level={2}>Navigation</Heading>
        <Divider />

        <Breadcrumbs>
          <Item key="home">Home</Item>
          <Item key="trendy">Trendy</Item>
          <Item key="march 2020 assets">March 2020 Assets</Item>
        </Breadcrumbs>

        <Link>
          <a href="https://www.imdb.com/title/tt6348138/" target="_blank" rel="noreferrer">
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
            <Item key="MaR">
              Senatus Populusque Romanus.
            </Item>
            <Item key="Emp">
              Alea jacta est.
            </Item>
          </TabPanels>
        </Tabs>

      </main>

      <footer className={styles.footer}>
        <a href="https://fil.org">© Filecoin Foundation</a>
      </footer>
    </div>
  )
}
