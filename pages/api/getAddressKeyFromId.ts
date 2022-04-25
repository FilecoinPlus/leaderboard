import type { NextApiRequest, NextApiResponse } from 'next';
export default async function getAddressKeyFromId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiEndpoint = 'https://api.node.glif.io/rpc/v0';
  // const addressKey = 'f0107408';
  const addressId = req.query?.verifierAddressId;
  //  && /^[a-zA-Z0-9]+$/.test(req.query.verifierAddressId.toString());
  // console.log(addressId);

  const requestBody = {
    jsonrpc: '2.0',
    method: 'Filecoin.StateAccountKey',
    id: 1,
    params: [`${addressId}`, null],
  };

  const response = await fetch(`${apiEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!!addressId) {
    const data = await response.json();
    // console.log('data ->', data);
    res.status(200).json(data);
  }

  // res.status(200).end('Not found');

  // res.status(400).end();
}
