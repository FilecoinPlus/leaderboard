import type { VercelRequest, VercelResponse } from '@vercel/node';

// TODO(alexxnica): make this return data from the `data` git repository.
export default async function verifiers(req: VercelRequest, res: VercelResponse) {
  const response = {};

  res.status(200).json(response);
}
