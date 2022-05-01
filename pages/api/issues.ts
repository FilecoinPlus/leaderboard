import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getIssues } from '../../lib/getIssues';

export default async function verifiers(req: VercelRequest, res: VercelResponse) {
  const response = await getIssues();

  res.status(200).json(response);
}
