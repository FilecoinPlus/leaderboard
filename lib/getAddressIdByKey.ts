export async function getAddressIdByKey(addressKey: string) {
  const res = await fetch(
    `http://localhost:3000/api/getAddressIdByKey?verifierAddressKey=${addressKey}`
  );
  const data = await res.json();

  return data.result;
}
