import * as React from 'react';
import { useSelector } from 'react-redux';
import { HYDRATE } from 'next-redux-wrapper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createAction, createSelector } from '@reduxjs/toolkit';

import { Resume, DeepPartial, ResumeContentPath, ResumeContent } from '@/shared/types';
import { getHost, mutateObjectProperties, pick } from '@/shared/helpers';

export const apiSlice = createApi({
  reducerPath: 'api',
  /**
   * This is temporary until we have a backend
   *
   * it should be something like:
   * baseQuery: fetchBaseQuery({ baseUrl: `${getHost()}/api/`
   *
   */
  baseQuery: ({ method, body }) => {
    return new Promise((resolve, reject) => {
      if (method === 'GET') {
        resolve({
          data: getResumeFromLocalStorage(),
        });
      }

      if (method === 'PATCH') {
        const resume = getResumeFromLocalStorage();
        mutateObjectProperties(resume, body);
        setResumeToLocalStorage(resume);
      }
    });
  },
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getResume: builder.query<Resume, void>({
      query: () => {
        return {
          url: 'resume',
          method: 'GET',
        };
      },
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

export function selectResumeProperty<T>(path: ResumeContentPath, defaultValue?: T) {
  return createSelector(selectResume, (resume) => {
    if (!resume) {
      return defaultValue as T;
    }

    // TODO: Wrap this in a assert
    return pick(resume.content, path as any) as T;
  });
}

export const selectResumeId = createSelector(
  selectResume,
  (resume) => resume?.id
);

export function useResumeContentUpdater() {
  const resumeId = useSelector(selectResumeId);
  const [updateResume_] = apiSlice.useUpdateResumeMutation({ fixedCacheKey: 'update-resume', });

  const updateResume = React.useCallback(
    (newContent: DeepPartial<ResumeContent>) => {
      updateResume_({
        content: newContent,
        id: resumeId,
      });
    },
    [resumeId, updateResume_]
  );

  return updateResume;
}

export function useResumeUpdater() {
  const resumeId = useSelector(selectResumeId);
  const [updateResume_] = apiSlice.useUpdateResumeMutation({ fixedCacheKey: 'update-resume', });

  const updateResume = React.useCallback(
    (newContent: DeepPartial<Resume>) => {
      updateResume_({
        ...newContent,
        id: resumeId,
      });
    },
    [resumeId, updateResume_]
  );

  return updateResume;
}

// export function useResumeFetchStatus() {
//   const re = apiSlice.useGetResumeQuery();

//   return [meta] as const;
// }

export function useResumeUpdateStatus() {
  const [_, meta] = apiSlice.useUpdateResumeMutation({ fixedCacheKey: 'update-resume', });

  return [meta] as const;
}

function getResumeFromLocalStorage(): Resume {
  try{
    let rawResume = localStorage.getItem('resume');
    if (!rawResume) {
      rawResume = JSON.stringify(Resume.createDefault());
    }
    const resume = JSON.parse(rawResume);
    setResumeToLocalStorage(resume);
    return resume;
  } catch (err) {
    let resume = Resume.createDefault();
    setResumeToLocalStorage(resume);
    return resume;
  }
}

function setResumeToLocalStorage(r: Resume) {
  localStorage.setItem('resume', JSON.stringify(r));
}

export default apiSlice;

