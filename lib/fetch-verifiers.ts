export async function loadVerifiers() {
  const res = await fetch(
    'https://api.filplus.d.interplanetary.one/public/api/getVerifiers?limit=30&page=1',
    // 'https://api.filplus.d.interplanetary.one/public/api/getVerifiers',
    {
      headers: {
        'x-api-key': `${process.env.INTERPLANETARY_ONE_API_KEY}`,
      },
    }
  );
  const data = await res.json();

  return data;
}
