import { addHttpsIfNotLocal } from '../utils/general';

export async function mergeVerifiersFromMultipleSources() {
  const API_ENDPOINTS = {
    OUR_OWN: `${addHttpsIfNotLocal(
      process.env.NEXT_PUBLIC_VERCEL_URL
    )}/api/getVerifiers`,
    KEYKO: `${addHttpsIfNotLocal(
      process.env.NEXT_PUBLIC_VERCEL_URL
    )}/api/getVerifiersFromKeyko`,
    INTERPLANETARY_ONE: `${addHttpsIfNotLocal(
      process.env.NEXT_PUBLIC_VERCEL_URL
    )}/api/getVerifiersFromInterplanetaryOne`,
  };

  const keykoRes = await fetch(API_ENDPOINTS.KEYKO);
  const keykoData = await keykoRes.json();

  // console.log(keykoData);

  const data = keykoData;

  return data;
}
