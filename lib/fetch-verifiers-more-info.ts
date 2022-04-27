export async function loadVerifiersMoreInfo(verifierAddressId: string) {
  const res = await fetch(
    `https://api.filplus.d.interplanetary.one/public/api/getVerifiedClients/${verifierAddressId}`,
    {
      headers: {
        'x-api-key': `${process.env.INTERPLANETARY_ONE_API_KEY}`,
      },
    }
  );
  const data = await res.json();

  return data;
}
