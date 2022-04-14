export async function getVerifiers() {
  const res = await fetch(
    'http://localhost:3000/api/getVerifiers'
  );
  const data = await res.json();

  return data;
}
