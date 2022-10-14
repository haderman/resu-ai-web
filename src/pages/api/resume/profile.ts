import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

import { protectedHandler } from '@/server/protected-api-handler';

export default protectedHandler(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<any>, session: Session) {
  res.status(200).json({ name: 'el profile_', session });
}
