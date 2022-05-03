import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getVerifierFromIssue } from '../../lib/getVerifiersFromIssues';

export default async function verifierFromIssue(req: VercelRequest, res: VercelResponse) {
  const normalized = !!req.query.normalized;
  const issueNumber = Number(req.query.issueNumber);

  const response = await getVerifierFromIssue(issueNumber, { normalized });

  res.status(200).json(response);
}
