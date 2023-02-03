import * as React from 'react';
import { HYDRATE } from 'next-redux-wrapper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Resume, DeepPartial } from '@/shared/types';
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
