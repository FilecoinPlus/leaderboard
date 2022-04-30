export async function loadVerifiersFromGithub() {
  const res = await fetch(
    'https://github.com/filecoin-project/notary-governance/blob/main/notaries/README.md'
  );
  const data = await res.text();

  return data;
}
