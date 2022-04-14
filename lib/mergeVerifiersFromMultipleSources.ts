export async function mergeVerifiersFromMultipleSources() {
  const API_ENDPOINTS = {
    OUR_OWN: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getVerifiers`,
    KEYKO: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getVerifiersFromKeyko`,
    INTERPLANETARY_ONE:
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getVerifiersFromInterplanetaryOne`,
  };

  const keykoRes = await fetch(API_ENDPOINTS.KEYKO);
  const keykoData = await keykoRes.json();

  // console.log(keykoData);

  const data = keykoData;

  return data;
}
