import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

import { protectedHandler } from '@/server/protected-api-handler';
import * as dbApi from '@/server/db-api';
import { Resume, ErrorResponse, OkResponse } from '@/shared/types';

export default protectedHandler(handler);

export async function handler(req: NextApiRequest, res: NextApiResponse<Resume | ErrorResponse | OkResponse>, session: Session) {
  const { id: resumeId } = req.query;
  if (typeof resumeId !== 'string' || resumeId === undefined) {
    res.status(400).json({ msg: `resumeId should be sent as string but it got: ${resumeId}` });
    return;
  }

  if (req.method === 'DELETE') {
    return dbApi.deleteResume(req.body.resumeId)
      .then(() => res.status(200).json({ msg: 'Ok' }))
      .catch(err => {
        console.error(err);
        res.status(500).json({ msg: 'error deleting resume'});
      });
  }

  if (req.method === 'PATCH') {
    console.log('-> req.body.data -> ', req.body);
    return dbApi.patchResume(resumeId, req.body)
      .then(() => res.status(200).json({ msg: 'Ok' }))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ msg: `error patching resume ${resumeId}. Error details: ${err}` });
      });
  }

  res.status(404).json({ msg: 'not found'});
}

