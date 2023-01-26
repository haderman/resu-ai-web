import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

import { protectedHandler } from '@/server/protected-api-handler';
import * as dbApi from '@/server/db-api';
import { Resume, ErrorResponse, OkResponse } from '@/shared/types';

export default protectedHandler(handler);

export async function handler(req: NextApiRequest, res: NextApiResponse<Resume | ErrorResponse | OkResponse>, s: Session) {
  const { id: resumeId } = req.query;
  if (typeof resumeId !== 'string' || resumeId === undefined) {
    res.status(400).json({ msg: `resumeId should be sent as string but it got: ${resumeId}` });
    return;
  }

  if (req.method === 'GET') {
    return dbApi.getResume(resumeId)
      .then((resume) => res.status(200).json(resume))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ msg: `error getting resume ${resumeId}. Error details: ${err}` });
      });
  }

  if (req.method === 'DELETE') {
    return dbApi.deleteResume(resumeId)
      .then(() => res.status(200).json({ msg: 'Ok' }))
      .catch(err => {
        console.error(err);
        res.status(500).json({ msg: 'error deleting resume'});
      });
  }

  if (req.method === 'PATCH') {
    return dbApi.patchResume(resumeId, req.body)
      .then(() => res.status(200).json({ msg: 'Ok' }))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ msg: `error patching resume ${resumeId}. Error details: ${err}` });
      });
  }

  res.status(404).json({ msg: 'not found'});
}

