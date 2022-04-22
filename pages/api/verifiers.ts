import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getVerifiers } from '../../lib/getVerifiersRefactored';

export default async function verifiers(
  req: VercelRequest,
  res: VercelResponse
) {
  const response = await getVerifiers();

  res.status(200).json(response);
}
