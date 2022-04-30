export async function getVerifier(addressId: string) {
  const res = await fetch(`https://api.filplus.d.interplanetary.one/public/api/getVerifiers?filter=${addressId}`, {
    headers: {
      'x-api-key': `${process.env.INTERPLANETARY_ONE_API_KEY}`,
    },
  });
  const data = await res.json();

  return data;
}
