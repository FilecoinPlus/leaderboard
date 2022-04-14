export async function getAddressKeyById(addressId: string) {
  const res = await fetch(
    `http://localhost:3000/api/getAddressKeyById?verifierAddressId=${addressId}`
  );
  const data = await res.json();

  return data.result;
}
