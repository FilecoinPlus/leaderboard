import { Descriptions, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';

import Layout from './Layout/Layout';

const glossaryItems = [
  { term: 'Avg. TTD', description: 'Average time to DataCap for standard allocations.' },
  { term: 'Avg. LDN TTD', description: 'Average time to DataCap for allocations in the Large Dataset Notary program.' },
  { term: 'Name', description: 'Name of the Notary.' },
  { term: 'Organization', description: 'Organization the Notary is affiliated with.' },
  { term: 'Address ID', description: 'Address ID of the Notary.' },
  { term: 'Address Key', description: 'Address key (also called robust address) of the Notary.' },
  { term: 'Region', description: 'Region of the Notary.' },
  { term: 'Clients', description: 'Total number of unique clients the Notary has allocated DataCap.' },
  {
    term: 'DataCap Total',
    description: 'The total amount of DataCap the Notary has, regardless of status (available or allocated).',
  },
  { term: 'DataCap Available', description: 'The total amount of DataCap available to use.' },
  { term: 'DataCap Allocated', description: 'The total amount of DataCap already allocated/used.' },
];

const formulaItems = [
  {
    term: 'Avg. TTD',
    description:
      'We run all allocations from the Notary through (approval message on-chain timestamp - GitHub issue created timestamp), then sum the results and divide by the number of allocations.',
  },
  {
    term: 'Avg. LDN TTD',
    description: "We currently use InterPlanetary One's API to get the LDN TTD information directly.",
  },
];

export const MethodologyPage = () => {
  return (
    <>
      <Layout>
        <Title level={1}>Leaderboard Methodology</Title>
        {/* <Content style={{ textAlign: 'center' }}>TBD.</Content> */}
        {/* <Paragraph>Paragraph...</Paragraph> */}

        {/* <Title level={2}>Glossary</Title> */}
        <div
          style={
            {
              // maxWidth: '50%'
            }
          }
        >
          <Descriptions
            title='Glossary'
            bordered
            size='middle'
            column={1}
          >
            {glossaryItems.map((item, index) => (
              <Descriptions.Item
                key={index}
                labelStyle={{ backgroundColor: 'rgba(228, 228, 228, 0.8)' }}
                contentStyle={{ backgroundColor: 'rgba(228, 228, 228, 0.4)' }}
                label={item.term}
                // span={32}
              >
                {item.description}
              </Descriptions.Item>
            ))}
          </Descriptions>
          <br />
          <Descriptions
            title='Formulas & Calculations'
            bordered
            size='middle'
            column={1}
          >
            {formulaItems.map((item, index) => (
              <Descriptions.Item
                key={index}
                labelStyle={{ backgroundColor: 'rgba(228, 228, 228, 0.8)' }}
                contentStyle={{ backgroundColor: 'rgba(228, 228, 228, 0.4)' }}
                label={item.term}
                // span={32}
              >
                {item.description}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </div>
      </Layout>
    </>
  );
};
