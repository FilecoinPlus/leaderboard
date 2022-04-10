export async function loadVerifiersMoreInfo(verifierAddressId: string) {
  const res = await fetch(
    `https://api.filplus.d.interplanetary.one/public/api/getVerifiedClients/${verifierAddressId}`,
    {
      headers: {
        'x-api-key': `299416a2-ebcb-46ba-8675-6a9a115d7ec0`,
      },
    }
  );
  const data = await res.json();

  return data;
}
