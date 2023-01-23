import { query as q } from 'faunadb';

import { Resume, Profile, Skills, BasicInfo } from '@/shared/types';
import { faunaClient as client } from '../adapters';

type Response<T = Resume | Resume[]> = {
  data: T;
}

export function getAllResumesByUserID(userId: string): Promise<Resume[]> {
  return client.query<Response<Resume[]>>(
    q.Map(
      q.Paginate(
        q.Match(q.Index('resume_by_user_id'), userId)
      ),
      q.Lambda('resumeRef', q.Select(['data'], q.Get(q.Var('resumeRef'))))
    )
  ).then((res) => res.data);
}

export function getResumeOrCreateIfNotExists(userId: string): Promise<Resume> {
  return getAllResumesByUserID(userId)
    .then((data) => {
      if (data.length === 0) {
        return createOrUpdateResume(Resume.create(userId, {
          basicInfo: BasicInfo.create(),
          profile: Profile.create(),
          skills: Skills.create(),
        }));
      } else {
        return data[0];
      }
    });
}

export function createOrUpdateResume(resume: Resume): Promise<Resume> {
  return client.query<Response<Resume>>(
    q.If(q.Exists(q.Match(q.Index('resume_by_user_id'), resume.userId)),
      q.Update(
        q.Select(['ref'], q.Get(q.Match(q.Index('resume_by_user_id'), resume.userId))),
        { data: resume }
      ),
      q.Create(q.Collection('resumes'), { data: resume })
    )
  ).then((res) => res.data);
}

export function deleteResume(resumeId: string): Promise<Response> {
  return client.query<Response>(
    q.Delete(
      q.Select(['ref'], q.Get(q.Match(q.Index('resume_by_id'), resumeId)))
    )
  );
}

export function patchResume(resumeId: string, resume: Partial<Resume>): Promise<Resume | undefined> {
  console.log('-------- res ----------');
  console.log('resumeId: ', resumeId);
  console.log('resume content: ', resume);

  return client.query<Response<Resume>>(
    q.Update(
      q.Select(['ref'], q.Get(q.Match(q.Index('resume_by_id'), resumeId))),
      { data: resume }
    )
  )
    .then((res) => {
      console.log(res.data.content.profile.title.text);
      return res.data;
    })
    .catch((err) => { throw err; });
}
