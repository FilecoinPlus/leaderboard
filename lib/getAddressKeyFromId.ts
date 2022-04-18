import { addHttpsIfNotLocal } from '../utils/general';

export async function getAddressKeyFromId(addressId: string) {
  const res = await fetch(
    `${addHttpsIfNotLocal(
      process.env.NEXT_PUBLIC_VERCEL_URL
    )}/api/getAddressKeyFromId?verifierAddressId=${addressId}`
  );
  const data = await res.json();

  return data.result;
}
