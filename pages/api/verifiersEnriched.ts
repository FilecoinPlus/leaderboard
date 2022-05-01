import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getVerifiers } from '../../lib/getVerifiersRefactored';

export default async function verifiers(req: VercelRequest, res: VercelResponse) {
  const response = await getVerifiers({ enrichedBy: 'INTERPLANETARY_ONE' });

  res.status(200).json(response);
}
