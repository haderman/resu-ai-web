import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

import { protectedHandler } from '@/server/protected-api-handler';
import * as dbApi from '@/server/db-api';
import { Resume, ErrorResponse, OkResponse } from '@/shared/types';
import { generateId } from '@/shared/helpers';

export default protectedHandler(handler);

export async function handler(req: NextApiRequest, res: NextApiResponse<Resume | ErrorResponse | OkResponse>, session: Session) {
  if (req.method === 'GET') {
    return dbApi.getAllResumesByUserID(session.user.id)
      .then(res.status(200).json)
      .catch(err => {
        console.error(err);
        res.status(500).json({ msg: 'error getting resume'});
      });
  }

  if (req.method === 'PUT') {
    return dbApi.createOrUpdateResume(prepareData(req, session))
      .then(res.status(200).json)
      .catch(err => {
        console.error(err);
        res.status(500).json({ msg: 'error creating or updating resume'});
      });
  }

  if (req.method === 'DELETE') {
    return dbApi.deleteResume(req.body.resumeId)
      .then(() => res.status(200).json({ msg: 'Ok' }))
      .catch(err => {
        console.error(err);
        res.status(500).json({ msg: 'error deleting resume'});
      });
  }

  res.status(404).json({ msg: 'not found'});
}

function prepareData(req: NextApiRequest, session: Session): Resume {
  return {
    id: req.body.id ?? generateId(),
    userId:  session.user.id,
    content: req.body.content,
  };
}
