import type { NextApiRequest, NextApiResponse } from 'next';
import { mergeVerifiersFromMultipleSources } from '../../lib/mergeVerifiersFromMultipleSources';

export default async function getVerifiersMerged(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await mergeVerifiersFromMultipleSources();

  res.status(200).json(data);
}
