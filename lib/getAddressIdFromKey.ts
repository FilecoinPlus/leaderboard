import { addHttpsIfNotLocal } from '../utils/general';

export async function getAddressIdFromKey(addressKey: string) {
  const res = await fetch(
    `${addHttpsIfNotLocal(
      process.env.NEXT_PUBLIC_VERCEL_URL
    )}/api/getAddressIdFromKey?verifierAddressKey=${addressKey}`
  );
  const data = await res.json();

  return data.result;
}
