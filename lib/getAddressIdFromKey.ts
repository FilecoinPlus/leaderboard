const apiEndpoint = 'https://api.node.glif.io/rpc/v0';

export async function getAddressIdFromKey(addressKey: string) {
  if (!addressKey) {
    return;
  }

  const response = await fetch(`${apiEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'Filecoin.StateLookupID',
      id: 1,
      params: [`${addressKey}`, null],
    }),
  });

  const data = await response.json();

  return data?.result;
}
