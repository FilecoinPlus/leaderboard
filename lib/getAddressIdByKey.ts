import { addHttpsIfNotLocal } from '../utils/general';

export async function getAddressIdByKey(addressKey: string) {
  const res = await fetch(
    `${addHttpsIfNotLocal(
      process.env.NEXT_PUBLIC_VERCEL_URL
    )}/api/getAddressIdByKey?verifierAddressKey=${addressKey}`
  );
  const data = await res.json();

  return data.result;
}
