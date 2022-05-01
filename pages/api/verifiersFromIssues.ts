import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getVerifiersFromIssues } from '../../lib/getVerifiersFromIssues';

export default async function verifiersFromIssues(req: VercelRequest, res: VercelResponse) {
  const normalized = !!req.query.normalized;

  const response = await getVerifiersFromIssues(undefined, { normalized });

  res.status(200).json(response);
}
