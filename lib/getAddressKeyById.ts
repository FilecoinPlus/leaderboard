import { addHttpsIfNotLocal } from '../utils/general';

export async function getAddressKeyById(addressId: string) {
  const res = await fetch(
    `${addHttpsIfNotLocal(
      process.env.NEXT_PUBLIC_VERCEL_URL
    )}/api/getAddressKeyById?verifierAddressId=${addressId}`
  );
  const data = await res.json();

  return data.result;
}
