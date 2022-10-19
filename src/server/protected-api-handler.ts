import type { NextApiRequest, NextApiResponse } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';

import { authOptions } from '../pages/api/auth/[...nextauth]';

export type ProtectedHandlerCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => Promise<void>

export function protectedHandler(cb: ProtectedHandlerCallback) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    await cb(req, res, session);
  };
}
