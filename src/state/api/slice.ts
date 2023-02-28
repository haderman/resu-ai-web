import * as React from 'react';
import { HYDRATE } from 'next-redux-wrapper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Resume, DeepPartial, ResumeFieldPath, ResumeContent } from '@/shared/types';
import { getHost, mutateObjectProperties } from '@/shared/helpers';
import { useSelector } from 'react-redux';
import { createAction, createSelector } from '@reduxjs/toolkit';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${getHost()}/api/` }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getResume: builder.query<Resume, void>({
      query: () => 'resume',
      transformResponse: Resume.decode,
    }),
    updateResume: builder.mutation<void, DeepPartial<Resume>>({
      query: (resume) => {
        return {
          url: `resume/${resume.id}`,
          method: 'PATCH',
          body: resume,
        };
      },
      onQueryStarted: async (resume, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getResume', undefined, (draft) => {
            mutateObjectProperties(draft, resume);
          })
        );
        try {
          dispatch(resumeUpdated(resume));
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const resumeUpdated = createAction<DeepPartial<Resume>>('resume-updated');

export const { useGetResumeQuery } = apiSlice;

const selectResumeResult = apiSlice.endpoints.getResume.select();

export const selectResumeStatus = createSelector(
  selectResumeResult,
  (result) => result.status,
);

export const selectResume = createSelector(
  selectResumeResult,
  (result) => result.data
);

export function selectResumeProperty(path: ResumeFieldPath) {
  return createSelector(selectResume, (resume) => {
    if (!resume) {
      return undefined;
    }

    return pick(resume.content, path as ResumePath);
  });
}

export const selectResumeId = createSelector(
  selectResume,
  (resume) => resume?.id
);

export function useResumeUpdaters() {
  const resumeId = useSelector(selectResumeId);
  const [updateResume_] = apiSlice.useUpdateResumeMutation({ fixedCacheKey: 'update-resume', });

  const updateResume = React.useCallback(
    (resume: DeepPartial<Resume>) => {
      updateResume_({
        ...resume,
        id: resumeId,
      });
    },
    [resumeId, updateResume_]
  );

  return updateResume;
}

export function useResumeUpdateStatus() {
  const [_, meta] = apiSlice.useUpdateResumeMutation({ fixedCacheKey: 'update-resume', });

  return [meta] as const;
}

export default apiSlice;

// created with chatGPT
type Path<T> = T extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? `${Key}.${Rest}`
      : never
    : never
  : T extends keyof any
    ? T
    : never;

// created with chatGPT
function pick<T, K extends Path<keyof T>>(obj: T, path: K): K extends `${infer Key1}.${infer Key2}.${infer Key3}`
  ? Key1 extends keyof T
    ? Key2 extends keyof T[Key1]
      ? Key3 extends keyof T[Key1][Key2]
        ? T[Key1][Key2][Key3]
        : never
      : never
    : never
  : K extends `${infer Key1}.${infer Key2}`
    ? Key1 extends keyof T
      ? Key2 extends keyof T[Key1]
        ? T[Key1][Key2]
        : never
      : never
    : K extends keyof T
      ? T[K]
      : never {
  const parts = (path as string).split('.') as Array<keyof T & string>; // type assertion to tell TypeScript that keys are strings
  if (parts.length > 3) {
    throw new Error('Path too deep');
  }
  let result = obj;
  for (const part of parts) {
    if (result == null) {
      break;
    }
    result = result[part] as T;
  }
  return result as any;
}

type ResumePath = Path<Resume['content']>
