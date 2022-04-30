export async function loadGithubAvatar() {
  const res = await fetch(
    'https://api.filplus.d.interplanetary.one/public/api/getVerifiers?limit=30&page=1'
  );
  const data = await res.json();

  return data;
}
