import { Col, Row } from 'antd';

import { VerifierCard } from './VerifierCard';

export const VerifierList = ({ verifiers }) => {
  // console.log('verifiers ->', verifiers);
  console.log('typeof verifiers ->', typeof verifiers);
  console.log('verifiers.length ->', verifiers.length);

  return (
    <Row style={{ rowGap: '20px', columnGap: '20px' }}>
      {!Array.isArray(verifiers) || verifiers.length === 0 ? (
        <h3>No verifiers yet!</h3>
      ) : (
        Array.isArray(verifiers) &&
        verifiers.map((verifier, index) => (
          <Col
            key={index}
            span={4}
            className='notary-card'
          >
            <VerifierCard verifier={verifier} />
          </Col>
        ))
      )}
    </Row>
  );
};
