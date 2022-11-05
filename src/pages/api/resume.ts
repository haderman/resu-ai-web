import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

import { protectedHandler } from '@/server/protected-api-handler';
import * as dbApi from '@/server/db-api';
import { Resume, ErrorResponse, OkResponse } from '@/shared/types';
import { generateId } from '@/shared/helpers';

export default protectedHandler(handler);

export async function handler(req: NextApiRequest, res: NextApiResponse<Resume | ErrorResponse | OkResponse>, session: Session) {
  if (req.method === 'GET') {
    return dbApi.getResumeOrCreateIfNotExists(session.user.id)
      .then(res.status(200).json)
      .catch((err) => res.status(500).json({ msg: err.message }));
  }

  if (req.method === 'PUT') {
    return prepareData(req, session)
      .then(dbApi.createOrUpdateResume)
      .then(res.status(200).json)
      .catch(err => {
        console.error(err.message);
        res.status(500).json({ msg: `error creating or updating resume: ${err.message}` });
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

/**
 * I wrapped this in a promise so if it fails, it will be caught by the catch block
 * and the error will be returned to the client.
*/
function prepareData(req: NextApiRequest, session: Session): Promise<Resume> {
  return new Promise((resolve, reject) => {
    try {
      const decodedData = Resume.decode({
        id: req.body.id ?? generateId(),
        userId:  session.user.id,
        content: req.body.content,
      });
      resolve(decodedData);
    } catch (error) {
      reject(error);
    }
  });
}
