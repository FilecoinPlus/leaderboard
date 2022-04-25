const apiEndpoint = 'https://api.node.glif.io/rpc/v0';

export async function getAddressKeyFromId(addressId: string) {
  if (!addressId) {
    return;
  }

  const response = await fetch(`${apiEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'Filecoin.StateAccountKey',
      id: 1,
      params: [`${addressId}`, null],
    }),
  });

  const data = await response.json();

  return data?.result;
}
