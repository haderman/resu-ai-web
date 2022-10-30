import { query as q } from 'faunadb';

import { Resume } from '@/shared/types';
import { faunaClient as client } from '../adapters';

type Response = {
  data: Resume;
}

export function getAllResumesByUserID(userId: string) {
  return client.query<Response>(
    q.Map(
      q.Paginate(
        q.Match(q.Index('resume_by_user_id'), userId)
      ),
      q.Lambda('resumeRef', q.Select(['data'], q.Get(q.Var('resumeRef'))))
    )
  ).then((res) => res.data);
}

export function createOrUpdateResume(resume: Resume) {
  return client.query<Response>(
    q.Create(q.Collection('resumes'), {
      data: resume,
    })
  ).then((res) => res.data);
}
