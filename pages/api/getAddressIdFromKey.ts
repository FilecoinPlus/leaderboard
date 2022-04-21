import type { NextApiRequest, NextApiResponse } from 'next';
export default async function getAddressIdFromKey(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiEndpoint = 'https://api.node.glif.io/rpc/v0';
  // const addressKey = 'f1k6wwevxvp466ybil7y2scqlhtnrz5atjkkyvm4a';
  const addressKey = req.query?.verifierAddressKey;
  //  && /^[a-zA-Z0-9]+$/.test(req.query.verifierAddressKey.toString());
  // console.log(addressKey);

  const requestBody = {
    jsonrpc: '2.0',
    method: 'Filecoin.StateLookupID',
    id: 1,
    params: [`${addressKey}`, null],
  };

  const response = await fetch(`${apiEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!!addressKey) {
    const data = await response.json();
    res.status(200).json(data);
  }

  // res.status(200).end('Not found');

  // res.status(400).end();
}
