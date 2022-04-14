import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getVerifiersFromKeyko(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiEndpoint =
    // 'https://github.com/filecoin-project/notary-governance/blob/main/notaries/README.md';
    'https://api.github.com/repos/keyko-io/filecoin-verifier-frontend/contents/src/data/verifiers-registry.json';

  const response = await fetch(`${apiEndpoint}`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
    },
  });
  const data = await response.json();
  const dataDecoded = Buffer.from(data.content, 'base64').toString();

  res.status(200).json(dataDecoded);
}
