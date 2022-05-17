import { Button, DatePicker, version } from 'antd';

import Layout from '../components/Layout/Layout';
import { VerifierList } from '../components/Verifier';

export const Homepage = ({ verifiers }) => {
  return (
    <>
      <Layout>
        <VerifierList verifiers={verifiers} />
      </Layout>
    </>
  );
};
