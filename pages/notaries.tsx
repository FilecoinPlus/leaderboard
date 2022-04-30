import type { NextPage } from 'next';
import { useQuery, gql } from '@apollo/client';

const VerifierQuery = gql`
  {
    verifiers {
      id
      name
    }
  }
`;

const Notaries: NextPage = () => {
  const { data } = useQuery(VerifierQuery);
  return (
    <div>
      <ul>
        {data?.verifiers.map((v: any) => {
          return (
            <li key={v.id}>
              ID: {v.id} | Name: {v.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notaries;
